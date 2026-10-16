// Edit this file only. Everything on the site comes from here.
// Leave a link as "" and it simply won't render.

export const profile = {
  name: "Sajjad Ali",
  headline: "Sajjad Ali builds payment-grade backends and the interfaces on top.",
  intro:
    "Final-year B.Tech CS student. I built and deployed an AI-powered escrow platform with idempotent payments, state machines and background jobs, and I ship production sites.",
  status: "Full stack developer, open to entry-level roles",
  location: "Navi Mumbai and Chandigarh",
  photo: "/profile.jpg",
  photoAlt:
    "Sajjad Ali in a navy blazer and striped tie, arms crossed, standing in a corridor",
  github: "SajjadRizvi04",
  leetcode: "SajjadAli80", // your LeetCode username, e.g. "sajjad_ali"
  email: "rizvisajjad80@gmail.com", // e.g. "you@example.com"
  linkedin: "https://www.linkedin.com/in/sajjad-ali-42a27028b/", // full URL
  resume: "/Sajjad_Ali_Resume_Final_Chandigarh.pdf", // e.g. "/resume.pdf" (put the file in /public)
};

export const stackStrip = [
  "React", "Node.js", "Express", "PostgreSQL", "Redis", "Docker", "C++",
];

export const featured = {
  title: "PactPay",
  label: "Featured, independent project",
  summary:
    "An AI-powered escrow platform for freelance contracts. Funds are held until milestones are approved, and every movement of money is recorded so it can be audited.",
  points: [
    "Append-only ledger and strict state machines keep money movement consistent.",
    "Razorpay integration with idempotency handling, so retries never double-charge.",
    "BullMQ and Redis process async jobs, including a ghost-detection job that auto-releases funds after 14 days of inactivity.",
    "Gemini-assisted milestone review with a human in the loop.",
  ],
  tags: ["Node.js", "Express", "Redis", "BullMQ", "Razorpay", "Gemini", "Docker"],
  source: "https://github.com/SajjadRizvi04/PactPay",
  demo: "https://pactpay-frpntend.onrender.com/", // live demo URL, leave empty if there isn't a working one
};

export const projects = [
  {
    title: "HireFlow",
    text: "MERN job portal with Redux Toolkit state management. Job seeker flow is complete; employer dashboard is in progress.",
    tags: ["React", "Redux Toolkit", "Node", "MongoDB"],
    source: "https://github.com/SajjadRizvi04/JobSeekers",
    demo: "",
  },
  {
    title: "TeyZeeVisas",
    text: "60+ page production visa-services website built during my internship at KallTrip.",
    tags: ["Frontend", "Production"],
    source: "",
    demo: "https://www.teyzeevisas.com/",
  }
];

// Shown when the live LeetCode API is unreachable or no username is set.
export const leetcodeFallback = { solved: "200+", language: "C++" };

export const timeline = [
  {
    when: "Present, graduating 2027",
    title: "B.Tech, Computer Science",
    org: "I.K. Gujral Punjab Technical University",
    text: "GPA 8.38. Ranked 1st in department in two semesters.",
  },
  {
    when: "Jun 2025 to Oct 2025",
    title: "Web Support Intern, Frontend Development",
    org: "KallTrip Pvt Ltd",
    text: "Maintained 99% uptime across live production environments. Built TeyZeeVisas, a 60+ page production site, and a salon booking platform with Google Calendar OAuth.",
  },
  {
    when: "Leadership",
    title: "Co-Lead, COPE Peer Support Group",
    org: "Campus",
    text: "Completed a 7-day Mental Health First Aid certification and directed an MPower-backed campus initiative, including open mic events.",
  },
];

export const skills = [
  { label: "Frontend", value: "React, Redux Toolkit" },
  { label: "Backend", value: "Node.js, Express, REST APIs" },
  { label: "Data", value: "PostgreSQL, Prisma, Redis" },
  { label: "Tooling", value: "Docker, Git, BullMQ" },
  { label: "Problem solving", value: "C++, 200+ LeetCode problems" },
];

export const about = [
  "I'm a final-year computer science student who learns by building and debugging. My strongest work is PactPay, where I dealt with the unglamorous parts of a payments product: retries, concurrency and keeping the ledger honest.",
  "Outside code I co-lead a campus peer support group. Right now I'm working on my DevOps skills and hardening PactPay.",
];
