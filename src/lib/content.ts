// All course content, typed. Sourced from docs/CUDAI_Course_Outline.md.
// This is the single content model the sections read from.

export const HERO = {
  // Headline is split into tokens so the build can highlight "AI." precisely.
  headline: ["Creative", "UI", "Development", "with", "AI."],
  highlight: "AI.",
  subhead:
    "A premium, hands-on course for designers, founders, and builders. Combine design thinking and visual taste with AI speed, and make work that still feels unmistakably yours, not generic AI output.",
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

// "More than prompting": the Design / Code / Ship practice cards.
// img: drop a file in /public/practice and the card shows it; until then a
// styled placeholder fills the image panel.
export const PRACTICE = {
  heading: ["More than prompting.", "A real design practice."],
  cards: [
    {
      key: "design",
      label: "Design",
      body: "Direct AI with taste. Moodboards, art direction, and unique visual styles you control instead of accept.",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&h=1100&q=80",
    },
    {
      key: "code",
      label: "Code",
      body: "Brief, review, and direct AI agents that write real code, orchestrating GSAP, Lenis, Framer Motion, and WebGL into the build.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&h=1100&q=80",
    },
    {
      key: "ship",
      label: "Ship",
      body: "Idea to deployed: animated, interactive, production-ready experiences that go live, not just mockups.",
      img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=900&h=1100&q=80",
    },
  ],
} as const;

// "You'll work with modern tools...": scroll-fill statement with inline IBM icons.
// Rendered in DOM order: text segments split into words, icon segments become chips.
export type ToolkitSegment =
  | { type: "text"; value: string }
  | { type: "icon"; name: "cube" | "code" | "rocket"; tone: "pink" | "amber" | "green" };

export const TOOLKIT: { segments: ToolkitSegment[] } = {
  segments: [
    {
      type: "text",
      value:
        "You'll work with modern tools and AI coding agents to create fast, polished work that stands out. By the end, you'll have the skills to",
    },
    { type: "icon", name: "cube", tone: "pink" },
    { type: "text", value: "design" },
    { type: "icon", name: "code", tone: "amber" },
    { type: "text", value: "build" },
    { type: "icon", name: "rocket", tone: "green" },
    { type: "text", value: "and launch with confidence." },
  ],
};

export const ENROL = {
  lead: "Most AI tools help you generate. CUDAI teaches you to",
  highlight: "create.",
} as const;

export type Part = {
  no: string;
  // One-line summary (~7-8 words) shown big on the card.
  summary: string;
  // The word/phrase within the summary to amber-highlight.
  highlight: string;
};

export const CURRICULUM: Part[] = [
  { no: "01", summary: "Direct AI coding agents to ship real builds.", highlight: "builds." },
  { no: "02", summary: "Develop the taste that makes work feel premium.", highlight: "taste" },
  { no: "03", summary: "Add the motion that wins Awwwards-level attention.", highlight: "motion" },
  { no: "04", summary: "Build custom tools shaped around your own workflow.", highlight: "tools" },
  { no: "05", summary: "Add immersive 3D and WebGL with AI assistance.", highlight: "WebGL" },
  { no: "06", summary: "Go from idea to a deployed, complete product.", highlight: "deployed" },
  { no: "07", summary: "Leave with a repeatable framework and resources.", highlight: "framework" },
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
  // Optional one-liner shown under the name tag, left blank by default so we
  // don't invent titles for real people. Fill in when known.
  role?: string;
  // Drop a portrait in /public/instructors and set the path here; until then a
  // styled placeholder (initial + gradient) renders in its place.
  src?: string;
  initial: string;
};

export const INSTRUCTORS_INTRO =
  "Not lecturers, but working builders who ship. You'll learn the exact AI-driven workflow they use to design, code, and launch premium work: taught live, hands-on, with direct feedback on your own projects.";

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=1200&q=80`;

export const INSTRUCTORS: Instructor[] = [
  { name: "Yahaya Muhammad", initial: "Y", src: U("1500648767791-00dcc994a43e") },
  { name: "Mudia", initial: "M", src: U("1507003211169-0a1dd7228f2d") },
  { name: "Precious", initial: "P", src: U("1494790108377-be9c29b29330") },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. You'll learn to direct AI coding agents to write real code. The focus is taste, judgment, and workflow. If you can read and review, you can build.",
  },
  {
    q: "How is the course structured?",
    a: "Three weeks of live classes (2 to 3 sessions a week, 7 parts), then a final week of project presentations, feedback, and portfolio recommendations.",
  },
  {
    q: "What tools will I use?",
    a: "AI coding agents like Claude Code and Antigravity, orchestrating modern web tech: GSAP, Lenis, Framer Motion, and WebGL/Three.js.",
  },
  {
    q: "What will I walk away with?",
    a: "A deployed client build, a custom tool you made for yourself, and a repeatable framework for shipping award-worthy work at the speed of AI.",
  },
  {
    q: "Who is this for?",
    a: "Designers, founders, freelancers, and developers who want to ship premium, original work, not generic AI output.",
  },
];
