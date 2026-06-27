"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CURRICULUM } from "@/lib/content";

// Card skins, cycled across the curriculum. Same brand colours as the
// Design / Code / Ship cards so the whole page reads as one system.
const SKINS = [
  { bg: "#15140f", fg: "text-paper", body: "text-paper/65", num: "text-paper/20" },
  { bg: "#F6A93B", fg: "text-ink", body: "text-ink/80", num: "text-ink/25" },
  { bg: "#83D9E7", fg: "text-ink", body: "text-ink/70", num: "text-ink/25" },
  { bg: "#511528", fg: "text-paper", body: "text-paper/75", num: "text-paper/20" },
] as const;

/**
 * Pinned horizontal-scroll curriculum.
 *
 * On enter the section pins to the viewport; vertical scroll is translated into
 * horizontal travel of the track via a scrubbed ScrollTrigger, then the page
 * resumes vertical scroll once the track's right edge is reached. Lenis drives
 * ScrollTrigger from the same frame (see providers/SmoothScroll), so the pin and
 * the smooth scroll stay in sync.
 *
 * Under prefers-reduced-motion there is no pin: the track falls back to a native
 * horizontally-scrollable strip so the content stays fully reachable.
 */
export default function Curriculum() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const trackEl = track.current;
      if (!trackEl) return;

      // Distance the track must travel to bring its right edge into view.
      // Read live (functional values) so it recomputes on resize/refresh.
      const distance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth);

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="curriculum"
      ref={root}
      className={`relative flex flex-col bg-paper ${
        reduced ? "pb-24" : "h-svh overflow-hidden"
      }`}
    >
      {/* Heading */}
      <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 pt-24 sm:px-8 sm:pt-28">
        <div className="flex flex-col gap-5">
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            What you&rsquo;ll learn
          </h2>
        </div>
        <span className="mb-2 hidden font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted sm:block">
          7 parts
        </span>
      </div>

      {/* Horizontal track */}
      <div
        className={`flex min-h-0 flex-1 items-center ${
          reduced ? "overflow-x-auto" : ""
        }`}
      >
        <div
          ref={track}
          className="flex items-center gap-5 px-5 will-change-transform sm:gap-7 sm:px-8"
        >
          {CURRICULUM.map((part, i) => {
            const s = SKINS[i % SKINS.length];
            return (
              <article
                key={part.no}
                className="flex h-[clamp(340px,56vh,560px)] w-[78vw] shrink-0 flex-col p-7 sm:w-[420px] sm:p-9 md:w-[470px]"
                style={{ backgroundColor: s.bg }}
              >
                <h3
                  className={`max-w-[16ch] text-[clamp(1.5rem,2.4vw,2.15rem)] font-semibold leading-[1.05] tracking-[-0.02em] ${s.fg}`}
                >
                  {part.title}
                </h3>
                <p
                  className={`mt-5 max-w-[36ch] text-[0.95rem] leading-relaxed ${s.body}`}
                >
                  {part.blurb}
                </p>
                <span
                  className={`mt-auto self-end pt-8 text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums ${s.num}`}
                >
                  {part.no}
                </span>
              </article>
            );
          })}

          {/* Closing card: the payoff at the end of the horizontal run */}
          <article className="flex h-[clamp(340px,56vh,560px)] w-[78vw] shrink-0 flex-col justify-between border border-line-strong p-7 sm:w-[420px] sm:p-9 md:w-[470px]">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              And then
            </span>
            <h3 className="max-w-[14ch] text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
              A capstone you actually ship.
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
