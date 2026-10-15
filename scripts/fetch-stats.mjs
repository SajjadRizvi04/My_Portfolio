// Fetches GitHub + LeetCode activity once, at build time, and writes public/stats.json.
// The site reads that static file, so visitors never hit a rate-limited API.
// Run automatically before `dev` and `build`. Never fails the build: on any error
// it keeps the previous values from stats.json.
import { readFile, writeFile } from "node:fs/promises";
import { profile } from "../src/data.js";

const OUT = new URL("../public/stats.json", import.meta.url);
const iso = (d) => d.toISOString().slice(0, 10);
const level = (n) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4);

const ok = (r) => {
  if (!r.ok) throw new Error(`${r.url} responded ${r.status}`);
  return r.json();
};

async function getGithub(user) {
  const headers = { "User-Agent": "portfolio-stats" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const contrib = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`).then(ok);
  const events = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, { headers })
    .then(ok)
    .catch(() => []); // recent commits are optional

  return {
    total: Object.values(contrib.total ?? {}).reduce((a, b) => a + b, 0),
    days: (contrib.contributions ?? []).map((d) => ({ date: d.date, count: d.count, level: d.level })),
    activity: events
      .filter((e) => e.type === "PushEvent")
      .slice(0, 3)
      .map((e) => ({
        id: e.id,
        repo: e.repo.name.split("/").pop(),
        date: new Date(e.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        message:
          e.payload?.commits?.at(-1)?.message?.split("\n")[0] ??
          `Pushed to ${e.payload?.ref?.replace("refs/heads/", "") ?? "a branch"}`,
      })),
  };
}

async function getLeetCode(user) {
  const year = new Date().getUTCFullYear();
  const query = `query($u: String!) {
    matchedUser(username: $u) {
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      cur: userCalendar(year: ${year}) { streak totalActiveDays submissionCalendar }
      prev: userCalendar(year: ${year - 1}) { submissionCalendar }
    }
  }`;
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com", "User-Agent": "Mozilla/5.0" },
    body: JSON.stringify({ query, variables: { u: user } }),
  });
  const u = (await ok(res)).data?.matchedUser;
  if (!u) throw new Error(`LeetCode user "${user}" not found`);

  const by = Object.fromEntries(u.submitStatsGlobal.acSubmissionNum.map((x) => [x.difficulty, x.count]));

  // submissionCalendar is a JSON string of { unixSeconds: count }; merge this year + last year.
  const perDay = {};
  for (const cal of [u.prev, u.cur]) {
    if (!cal?.submissionCalendar) continue;
    for (const [ts, n] of Object.entries(JSON.parse(cal.submissionCalendar))) {
      const key = iso(new Date(Number(ts) * 1000));
      perDay[key] = (perDay[key] ?? 0) + Number(n);
    }
  }
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    const date = iso(d);
    const count = perDay[date] ?? 0;
    days.push({ date, count, level: level(count) });
  }

  return {
    stats: { solved: by.All, easy: by.Easy, medium: by.Medium, hard: by.Hard },
    days,
    total: days.reduce((a, d) => a + d.count, 0),
    activeDays: days.filter((d) => d.count > 0).length,
    streak: u.cur?.streak ?? null,
  };
}

let prev = {};
try { prev = JSON.parse(await readFile(OUT, "utf8")); } catch { /* first run */ }

const out = { updatedAt: new Date().toISOString(), github: prev.github ?? null, leetcode: prev.leetcode ?? null };

if (profile.github) {
  try { out.github = await getGithub(profile.github); console.log("GitHub stats updated"); }
  catch (e) { console.warn("GitHub stats skipped:", e.message); }
}
if (profile.leetcode) {
  try { out.leetcode = await getLeetCode(profile.leetcode); console.log("LeetCode stats updated"); }
  catch (e) { console.warn("LeetCode stats skipped:", e.message); }
}

await writeFile(OUT, JSON.stringify(out));
