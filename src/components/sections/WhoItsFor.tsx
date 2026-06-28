"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AUDIENCE } from "@/lib/content";

// Three lines built from the course audience.
const LINES = [AUDIENCE.slice(0, 2), AUDIENCE.slice(2, 4), AUDIENCE.slice(4, 6)];

// End xPercent per line (start is the negative). Lines 1 & 3 drift one way,
// line 2 drifts the other (and a touch less) so it reads as "going back".
const MOVE = [-22, 15, -24];

// Practice palette (maroon lifted so it reads on the near-black bg).
const COLORS = ["#F6A93B", "#83D9E7", "#A8324F"];

// Triple-chevron arrow, cycled through the palette.
function Arrow({ i }: { i: number }) {
  return (
    <span
      className="mx-[0.34em] inline-flex items-center"
      style={{ color: COLORS[i % COLORS.length] }}
      aria-hidden
    >
      <svg
        viewBox="0 0 23 24"
        fill="currentColor"
        className="h-[0.82em] w-[0.86em]"
      >
        <polygon points="1,4 8,12 1,20" />
        <polygon points="8,4 15,12 8,20" />
        <polygon points="15,4 22,12 15,20" />
      </svg>
    </span>
  );
}

export default function WhoItsFor() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const rows = gsap.utils.toArray<HTMLElement>(".who-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: -MOVE[i % MOVE.length] },
          {
            xPercent: MOVE[i % MOVE.length],
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="who"
      ref={root}
      className="overflow-hidden bg-[#0d0c0a] py-[clamp(3.5rem,9vh,8rem)] text-on-dark"
    >
      <div className="flex flex-col gap-[0.04em] text-[clamp(2.5rem,9vw,8rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
        {LINES.map((items, i) => (
          <div
            key={i}
            className="who-row flex justify-center will-change-transform"
          >
            <div className="flex shrink-0 items-center whitespace-nowrap">
              {[...items, ...items, ...items].map((term, j) => (
                <span key={j} className="inline-flex items-center">
                  {term}
                  <Arrow i={i + j} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
