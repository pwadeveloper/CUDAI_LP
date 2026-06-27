"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import { PRACTICE } from "@/lib/content";

// Per-card presentation. Content lives in lib/content.ts.
const STYLES: Record<
  string,
  {
    bg: string;
    fg: string;
    body: string;
    rotate: number;
    x: string;
    z: string;
  }
> = {
  design: {
    bg: "#F6A93B",
    fg: "text-ink",
    body: "text-ink/80",
    rotate: 2.6,
    x: "5%",
    z: "z-10",
  },
  code: {
    bg: "#83D9E7",
    fg: "text-ink",
    body: "text-ink/75",
    rotate: 1,
    x: "-2%",
    z: "z-20",
  },
  ship: {
    bg: "#511528",
    fg: "text-paper",
    body: "text-paper/80",
    rotate: -1.6,
    x: "2%",
    z: "z-30",
  },
};

export default function Practice() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const floats = gsap.utils.toArray<HTMLElement>(".practice-float");

      gsap.from(floats, {
        yPercent: 135,
        autoAlpha: 0,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      // Gentle drift of the whole stack as it scrolls through.
      gsap.to(".practice-stack", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="approach"
      ref={root}
      className="px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="max-w-[15ch] text-[clamp(2rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            {PRACTICE.heading[0]} {PRACTICE.heading[1]}
          </h2>
        </Reveal>

        <div className="practice-stack mt-14 max-w-[1080px] sm:mt-20">
          {PRACTICE.cards.map((card, i) => {
            const s = STYLES[card.key];
            return (
              <div
                key={card.key}
                className={`practice-wrap group relative ${s.z} ${
                  i > 0 ? "-mt-[200px] sm:-mt-[244px]" : ""
                } transition-[z-index] hover:z-40`}
                style={{ transform: `translateX(${s.x}) rotate(${s.rotate}deg)` }}
              >
                <div className="practice-float will-change-transform">
                  <article
                    className="practice-card flex min-h-[330px] flex-col p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-4 sm:min-h-[380px] sm:p-10"
                    style={{ backgroundColor: s.bg }}
                  >
                    <h3
                      className={`text-[clamp(2.1rem,4.5vw,3.4rem)] font-semibold leading-none tracking-[-0.02em] ${s.fg}`}
                    >
                      {card.label}
                    </h3>
                    <p
                      className={`mt-auto max-w-[34ch] pt-12 text-[0.98rem] leading-relaxed ${s.body}`}
                    >
                      {card.body}
                    </p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
