"use client";

// Single source of truth for GSAP + plugin registration.
// Every client component imports the configured instance from here so
// registerPlugin runs exactly once, client-side only.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin is idempotent — safe to call once per client load.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
