import { Heatmap, Legend } from "./Heatmap.jsx";
import { useStats } from "./hooks.js";
import {
  profile, stackStrip, featured, projects, leetcodeFallback, timeline, skills, about,
} from "./data.js";

// Shared class strings
const card = "flex min-w-0 flex-col gap-3.5 border-[1.5px] border-ink bg-card p-7";
const h2 = "border-b-2 border-ink pb-3 font-display text-[28px] font-normal sm:text-[34px]";
const h3 = "font-display text-[22px] font-normal";
const meta = "text-[13px] text-subtle";
const btn = "inline-flex min-h-11 items-center px-6 py-2.5 font-bold transition-colors";
const section = "flex scroll-mt-6 flex-col gap-8";

const Tags = ({ items }) => (
  <ul className="flex flex-wrap gap-2.5 text-[13px] text-accent">
    {items.map((t) => <li key={t}>{t}</li>)}
  </ul>
);

const Links = ({ source, demo }) =>
  source || demo ? (
    <div className="flex gap-6 font-bold">
      {source && <a className="hover:text-accent" href={source}>Source on GitHub</a>}
      {demo && <a className="hover:text-accent" href={demo}>Live demo</a>}
    </div>
  ) : null;

const Row = ({ left, right }) => (
  <li className="flex justify-between gap-4 border-b border-dashed border-subtle pb-2">
    <span>{left}</span>
    <span className="text-right text-subtle">{right}</span>
  </li>
);

function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4">
      <a className="text-lg font-bold" href="#top">sajjad ali</a>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] text-muted">
        {[["Work", "#work"], ["Activity", "#activity"], ["Experience", "#path"], ["Skills", "#skills"], ["About", "#about"]].map(([l, h]) => (
          <a key={h} className="hover:text-accent" href={h}>{l}</a>
        ))}
        <a className={`${btn} bg-accent text-paper hover:bg-ink`} href="#contact">Let's talk</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="flex flex-wrap items-center gap-14">
      <div className="flex basis-[440px] flex-1 flex-col gap-6">
        <p className="text-[15px] font-bold text-accent">{profile.status}</p>
        <h1 className="font-display text-4xl font-normal leading-[1.15] sm:text-[50px]">{profile.headline}</h1>
        <p className="max-w-[540px] text-lg leading-relaxed text-muted">{profile.intro}</p>
        <div className="flex flex-wrap gap-4">
          <a className={`${btn} bg-accent text-paper hover:bg-ink`} href="#work">View projects</a>
          {profile.resume && (
            <a className={`${btn} border-[1.5px] border-ink hover:bg-ink hover:text-paper`} href={profile.resume}>Download resume</a>
          )}
        </div>
      </div>
      <figure className="m-0 flex max-w-[440px] basis-80 flex-1 flex-col gap-3 border-[1.5px] border-ink bg-paper-light px-3 pb-4 pt-3">
        <img className="block aspect-[4/5] w-full object-cover object-[50%_20%]" src={profile.photo} alt={profile.photoAlt} />
        <figcaption className="text-sm text-muted">
          {profile.name}, final-year B.Tech CSE<br />{profile.location}
        </figcaption>
      </figure>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className={section}>
      <h2 className={h2}>Selected work</h2>
      <article className={`${card} gap-5 border-2 p-6 sm:p-10`}>
        <p className={meta}>{featured.label}</p>
        <h3 className={`${h3} text-[32px]`}>{featured.title}</h3>
        <p className="max-w-[820px] leading-relaxed text-muted">{featured.summary}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 leading-snug text-body">
          {featured.points.map((p) => <p key={p}>{p}</p>)}
        </div>
        <Tags items={featured.tags} />
        <Links source={featured.source} demo={featured.demo} />
      </article>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {projects.map((p) => (
          <article className={card} key={p.title}>
            <h3 className={h3}>{p.title}</h3>
            <p className="leading-relaxed text-muted">{p.text}</p>
            <Tags items={p.tags} />
            <Links source={p.source} demo={p.demo} />
          </article>
        ))}
      </div>
    </section>
  );
}

function GithubCard({ data, loading }) {
  const url = `https://github.com/${profile.github}`;

  return (
    <article className={card}>
      <div className="flex flex-wrap justify-between gap-2">
        <h3 className={h3}>GitHub contributions</h3>
        <a className="text-sm font-bold text-accent" href={url}>github.com/{profile.github}</a>
      </div>
      {data?.days?.length > 0 ? (
        <>
          <Heatmap days={data.days} tone="red" label="GitHub contribution heatmap for the last year" />
          <div className="flex flex-wrap justify-between gap-2 text-[13px] text-subtle">
            <span>{data.total} contributions in the last year</span>
            <Legend tone="red" />
          </div>
          {data.activity.length > 0 && (
            <ul className="flex flex-col gap-2.5 text-[15px]">
              {data.activity.map((a) => (
                <Row key={a.id} left={a.message} right={`${a.repo}, ${a.date}`} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-muted">
          {loading ? "Loading contributions..." : "No contribution data yet. "}
          {!loading && <a className="text-accent" href={url}>See it on GitHub</a>}
        </p>
      )}
    </article>
  );
}

function LeetCodeCard({ data }) {
  const stats = data?.stats;
  const url = profile.leetcode && `https://leetcode.com/u/${profile.leetcode}`;

  return (
    <article className={card}>
      <div className="flex flex-wrap justify-between gap-2">
        <h3 className={h3}>LeetCode</h3>
        {url && <a className="text-sm font-bold text-accent" href={url}>leetcode.com/u/{profile.leetcode}</a>}
      </div>

      <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-6xl leading-none">{stats ? stats.solved : leetcodeFallback.solved}</span>
          <span className="text-muted">problems solved{stats ? "" : ` in ${leetcodeFallback.language}`}</span>
        </div>
        {stats && (
          <ul className="flex gap-6 text-[15px]">
            <li>Easy <b>{stats.easy}</b></li>
            <li>Medium <b>{stats.medium}</b></li>
            <li>Hard <b>{stats.hard}</b></li>
          </ul>
        )}
      </div>

      {data?.days?.length > 0 && (
        <>
          <Heatmap days={data.days} tone="ink" unit="submissions" label="LeetCode submission heatmap for the last year" />
          <div className="flex flex-wrap justify-between gap-2 text-[13px] text-subtle">
            <span>
              {data.total} submissions, {data.activeDays} active days
              {data.streak != null && `, ${data.streak} day streak`}
            </span>
            <Legend tone="ink" />
          </div>
        </>
      )}
    </article>
  );
}

function Activity() {
  const { stats, loading } = useStats();
  return (
    <section id="activity" className={section}>
      <h2 className={h2}>Activity</h2>
      <GithubCard data={stats?.github} loading={loading} />
      <LeetCodeCard data={stats?.leetcode} />
    </section>
  );
}

function Path() {
  return (
    <section id="path" className={section}>
      <h2 className={h2}>Experience and education</h2>
      <div className="ml-1.5 flex flex-col gap-10 border-l-2 border-ink">
        {timeline.map((t) => (
          <div key={t.title} className="relative flex flex-col gap-1.5 pl-8 before:absolute before:-left-[7px] before:top-1.5 before:size-3 before:bg-accent before:content-['']">
            <p className={meta}>{t.when}</p>
            <h3 className={h3}>{t.title}</h3>
            <p className="font-bold text-accent">{t.org}</p>
            <p className="leading-relaxed text-muted">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className={section}>
      <h2 className={h2}>Skills</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        {skills.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 border-t-2 border-accent pt-4">
            <p className={meta}>{s.label}</p>
            <p>{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className={section}>
      <h2 className={h2}>About</h2>
      <div className="flex flex-wrap gap-10 text-lg">
        {about.map((p) => (
          <p key={p} className="max-w-[640px] flex-1 basis-80 leading-relaxed text-muted">{p}</p>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    profile.email && { label: profile.email, href: `mailto:${profile.email}`, solid: true },
    { label: "GitHub", href: `https://github.com/${profile.github}` },
    profile.leetcode && { label: "LeetCode", href: `https://leetcode.com/u/${profile.leetcode}` },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
  ].filter(Boolean);

  return (
    <section id="contact" className="flex scroll-mt-6 flex-wrap items-center justify-between gap-6 bg-accent px-6 py-10 text-paper sm:px-12 sm:py-14">
      <h2 className="max-w-[560px] font-display text-[28px] font-normal leading-tight sm:text-4xl">
        Hiring entry-level full stack engineers? Let's talk.
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={`${btn} ${l.solid ? "bg-ink text-paper hover:bg-black" : "border-[1.5px] border-paper hover:bg-paper hover:text-ink"}`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-6 sm:px-10 sm:pb-20 sm:pt-8">
      <Nav />
      <main className="mt-8 flex flex-col gap-22">
        <Hero />
        <ul className="flex flex-wrap justify-between gap-x-8 gap-y-3 border-y-[1.5px] border-ink py-3.5 text-[15px] font-bold">
          {stackStrip.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <Work />
        <Activity />
        <Path />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="mt-12 flex flex-wrap justify-between gap-2 text-sm text-subtle">
        <span>2026 {profile.name}</span>
        <a className="hover:text-accent" href="#top">Back to top</a>
      </footer>
    </div>
  );
}
