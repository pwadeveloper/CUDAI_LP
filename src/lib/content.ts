// All course content, typed. Sourced from docs/CUDAI_Course_Outline.md.
// This is the single content model the sections read from.

export const HERO = {
  // Headline is split into tokens so the build can highlight "AI." precisely.
  headline: ["Creative", "UI", "Development", "with", "AI."],
  highlight: "AI.",
  subhead:
    "A premium, hands-on course for designers, founders, and builders. Combine design thinking and visual taste with AI speed — and make work that still feels unmistakably yours, not generic AI output.",
} as const;

export const MARQUEE = [
  "GSAP",
  "Lenis",
  "Framer Motion",
  "WebGL",
  "Three.js",
  "Claude Code",
  "Antigravity",
  "Awwwards-ready",
] as const;

// "More than prompting" — the Design → Code → Ship practice cards.
// img: drop a file in /public/practice and the card shows it; until then a
// styled placeholder fills the image panel.
export const PRACTICE = {
  heading: ["More than prompting.", "A real design practice."],
  cards: [
    {
      key: "design",
      label: "Design",
      body: "Direct AI with taste. Moodboards, art direction, and unique visual styles you control instead of accept.",
      img: "/practice/design.jpg",
    },
    {
      key: "code",
      label: "Code",
      body: "Brief, review, and direct AI agents that write real code — orchestrating GSAP, Lenis, Framer Motion, and WebGL into the build.",
      img: "/practice/code.jpg",
    },
    {
      key: "ship",
      label: "Ship",
      body: "Idea to deployed: animated, interactive, production-ready experiences that go live — not just mockups.",
      img: "/practice/ship.jpg",
    },
  ],
} as const;

export type Part = {
  no: string;
  title: string;
  blurb: string;
};

export const CURRICULUM: Part[] = [
  {
    no: "01",
    title: "The New Build Stack",
    blurb:
      "From mockup-maker to site-shipper. Set up your AI coding environment and learn the agentic workflow: how to brief, review, and direct AI that writes real code.",
  },
  {
    no: "02",
    title: "Designing With Taste & Intention",
    blurb:
      "What makes a site feel premium and a product feel crafted. Develop visual judgment and direct AI outputs with intention instead of accepting generic results.",
  },
  {
    no: "03",
    title: "Motion & Interaction Foundations",
    blurb:
      "Where the Awwwards-level magic lives. GSAP timelines and scroll triggers, Lenis smooth scroll, and Framer Motion microinteractions — generated and refined with AI.",
  },
  {
    no: "04",
    title: "Building Custom Tools",
    blurb:
      "Turn AI on yourself. Product thinking for tools, ruthless scope-cutting, and architecting real working software with AI — utilities shaped around your own workflow.",
  },
  {
    no: "05",
    title: "WebGL & Immersive Experiences",
    blurb:
      "Add depth, literally. Three.js, shaders, and interactive canvases through AI assistance — and the judgment to know when immersive 3D elevates an experience.",
  },
  {
    no: "06",
    title: "Building Complete Products",
    blurb:
      "End-to-end: idea → design → code → deployed. Tie GSAP, Lenis, Framer Motion, and WebGL into one cohesive, production-ready experience.",
  },
  {
    no: "07",
    title: "Final Words & Resources",
    blurb:
      "A repeatable personal framework, curated tools and communities, and a clear path to keep growing as an AI-powered builder beyond the course.",
  },
];

export const OUTCOMES: string[] = [
  "A complete, portfolio-ready client project",
  "A custom tool built for your own workflow",
  "A personal AI-powered build workflow",
  "An interactive, motion-enhanced website or product UI",
  "Sharper visual design and craft skills",
  "A repeatable framework for building products with AI",
];

export const AUDIENCE: string[] = [
  "Product Designers",
  "UI Designers",
  "Freelancers",
  "Startup Founders",
  "Developers interested in design",
  "Creators building digital products",
];

export type Instructor = {
  name: string;
  // Optional one-liner shown under the name tag — left blank by default so we
  // don't invent titles for real people. Fill in when known.
  role?: string;
  // Drop a portrait in /public/instructors and set the path here; until then a
  // styled placeholder (initial + gradient) renders in its place.
  src?: string;
  initial: string;
};

export const INSTRUCTORS_INTRO =
  "Not lecturers — working builders who ship. You'll learn the exact AI-driven workflow they use to design, code, and launch premium work: taught live, hands-on, with direct feedback on your own projects.";

export const INSTRUCTORS: Instructor[] = [
  { name: "Yahaya Muhammad", initial: "Y" },
  { name: "Mudia", initial: "M" },
  { name: "Precious", initial: "P" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. You'll learn to direct AI coding agents to write real code — the focus is taste, judgment, and workflow. If you can read and review, you can build.",
  },
  {
    q: "How is the course structured?",
    a: "Three weeks of live classes (2–3 sessions a week, 7 parts), then a final week of project presentations, feedback, and portfolio recommendations.",
  },
  {
    q: "What tools will I use?",
    a: "AI coding agents like Claude Code and Antigravity, orchestrating modern web tech — GSAP, Lenis, Framer Motion, and WebGL/Three.js.",
  },
  {
    q: "What will I walk away with?",
    a: "A deployed client build, a custom tool you made for yourself, and a repeatable framework for shipping award-worthy work at the speed of AI.",
  },
  {
    q: "Who is this for?",
    a: "Designers, founders, freelancers, and developers who want to ship premium, original work — not generic AI output.",
  },
];
