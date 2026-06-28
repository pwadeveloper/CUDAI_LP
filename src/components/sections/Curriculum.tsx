"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CURRICULUM } from "@/lib/content";

// Renders the summary with its key word amber-highlighted.
function Summary({ text, hl }: { text: string; hl: string }) {
  const i = text.indexOf(hl);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="box-decoration-clone bg-accent px-[0.12em] text-ink">
        {hl}
      </span>
      {text.slice(i + hl.length)}
    </>
  );
}

/**
 * Pinned horizontal-scroll curriculum. Each card: a big summary headline with one
 * amber-highlighted word and the part number bottom-right. Under
 * prefers-reduced-motion the track is a native horizontally-scrollable strip.
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
        <h2 className="text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
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
          {CURRICULUM.map((part) => (
            <article
              key={part.no}
              className="flex h-[clamp(420px,54vh,560px)] w-[82vw] shrink-0 flex-col justify-between border border-line bg-paper p-[clamp(1.75rem,2.4vw,2.75rem)] text-ink sm:w-[450px] md:w-[490px]"
            >
              <h3 className="max-w-[15ch] text-[clamp(1.9rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                <Summary text={part.summary} hl={part.highlight} />
              </h3>

              <span className="self-end text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tabular-nums">
                {part.no}
              </span>
            </article>
          ))}

          {/* Closing card: the payoff at the end of the run */}
          <article className="flex h-[clamp(420px,54vh,560px)] w-[82vw] shrink-0 flex-col justify-between border border-line-strong bg-paper p-[clamp(1.75rem,2.4vw,2.75rem)] text-ink sm:w-[450px] md:w-[490px]">
            <span className="text-base uppercase tracking-[0.2em] text-muted">
              And then
            </span>
            <h3 className="max-w-[14ch] text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              A capstone you actually{" "}
              <span className="box-decoration-clone bg-accent px-[0.12em] text-ink">
                ship.
              </span>
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
