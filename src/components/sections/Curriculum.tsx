"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CURRICULUM } from "@/lib/content";
import CurriculumIcon from "@/components/sections/curriculumIcons";

// Card colours cycle from black through the brand colours. fg/body/num/icon
// adapt so contrast stays readable on each background.
const SKINS = [
  { bg: "#15140f", fg: "text-paper", body: "text-paper/65", num: "text-paper/35", icon: "text-accent" },
  { bg: "#F6A93B", fg: "text-ink", body: "text-ink/80", num: "text-ink/30", icon: "text-ink" },
  { bg: "#83D9E7", fg: "text-ink", body: "text-ink/75", num: "text-ink/30", icon: "text-ink" },
  { bg: "#511528", fg: "text-paper", body: "text-paper/70", num: "text-paper/35", icon: "text-accent" },
] as const;

/**
 * Pinned horizontal-scroll curriculum. On enter the section pins; vertical scroll
 * is translated into horizontal travel of the track. Each card: a big title, a
 * smaller description, a unique amber mark bottom-left, and the part number
 * bottom-right. Under prefers-reduced-motion the track is a native
 * horizontally-scrollable strip instead.
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
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          What you&rsquo;ll learn
        </h2>
        <span className="mb-2 hidden text-base uppercase tracking-[0.2em] text-muted sm:block">
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
          className="flex items-stretch gap-5 px-5 will-change-transform sm:gap-7 sm:px-8"
        >
          {CURRICULUM.map((part, i) => {
            const s = SKINS[i % SKINS.length];
            return (
              <article
                key={part.no}
                className={`flex h-[clamp(460px,66vh,620px)] w-[82vw] shrink-0 flex-col justify-between p-[clamp(1.75rem,2.4vw,2.75rem)] sm:w-[440px] md:w-[480px] ${s.fg}`}
                style={{ backgroundColor: s.bg }}
              >
                {/* Heading (large) + description (smaller) */}
                <div className="flex flex-col gap-4">
                  <h3 className="max-w-[15ch] text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
                    {part.title}
                  </h3>
                  <p className={`max-w-[34ch] text-[clamp(1.05rem,1.3vw,1.4rem)] leading-snug ${s.body}`}>
                    {part.blurb}
                  </p>
                </div>

                {/* Mark + number */}
                <div className="flex items-end justify-between gap-4">
                  <CurriculumIcon
                    index={i}
                    className={`w-[clamp(88px,8vw,124px)] ${s.icon}`}
                  />
                  <span className={`text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tabular-nums ${s.num}`}>
                    {part.no}
                  </span>
                </div>
              </article>
            );
          })}

          {/* Closing card: the payoff at the end of the run */}
          <article className="flex h-[clamp(460px,66vh,620px)] w-[82vw] shrink-0 flex-col justify-between border border-line-strong p-[clamp(1.75rem,2.4vw,2.75rem)] text-ink sm:w-[440px] md:w-[480px]">
            <span className="text-base uppercase tracking-[0.2em] text-muted">
              And then
            </span>
            <h3 className="max-w-[14ch] text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              A capstone you actually ship.
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
