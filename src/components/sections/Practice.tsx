"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import ShaderImage from "@/components/ui/ShaderImage";
import { PRACTICE } from "@/lib/content";

// bg = card colour, ph = solid placeholder behind the (optional) image.
const SKINS: { bg: string; fg: string; body: string; ph: string }[] = [
  { bg: "#F6A93B", fg: "text-ink", body: "text-ink/80", ph: "#511528" }, // design
  { bg: "#83D9E7", fg: "text-ink", body: "text-ink/75", ph: "#15140f" }, // code
  { bg: "#511528", fg: "text-paper", body: "text-paper/85", ph: "#163b42" }, // ship
];

const FLING = [-23, 19, -17]; // entrance tilt per card

/**
 * Sticky card stack. Each card sits a strip lower than the one before, so as you
 * scroll they rise and stack one by one. As each enters it is flung in tilted
 * (like tossing a book onto a pile) and settles flat with a spring overshoot.
 */
export default function Practice() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const flings = gsap.utils.toArray<HTMLElement>(".practice-fling");
      flings.forEach((el, i) => {
        const tilt = FLING[i % FLING.length];
        gsap.fromTo(
          el,
          {
            rotation: tilt,
            yPercent: 40,
            xPercent: tilt > 0 ? 14 : -14,
            scale: 0.82,
            transformOrigin: "50% 135%",
          },
          {
            rotation: 0,
            yPercent: 0,
            xPercent: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "top 35%",
              scrub: 0.8,
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
      id="approach"
      ref={root}
      className="bg-paper px-5 pb-[14vh] sm:px-8"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="pt-24 sm:pt-28">
          <Reveal>
            <h2 className="text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              <span className="block">{PRACTICE.heading[0]}</span>
              <span className="block">{PRACTICE.heading[1]}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 [--card-h:clamp(560px,90vh,881px)] [--strip:clamp(104px,13vh,150px)] sm:mt-16">
          {PRACTICE.cards.map((card, i) => {
            const s = SKINS[i];
            return (
              <div
                key={card.key}
                className="practice-card sticky"
                style={{
                  top: `calc(1.5rem + ${i} * 1.4rem)`,
                  height: "var(--card-h)",
                  zIndex: i + 1,
                }}
              >
                <div className="practice-fling h-full w-full will-change-transform">
                  <article
                    className="flex h-full w-full"
                    style={{ backgroundColor: s.bg }}
                  >
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-[clamp(1.75rem,3vw,3.5rem)]">
                      <h3
                        className={`text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] ${s.fg}`}
                      >
                        {card.label}
                      </h3>
                      <p
                        className={`mt-auto max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-snug ${s.body}`}
                      >
                        {card.body}
                      </p>
                    </div>

                    {/* Image panel: 537x646, rendered through the cursor shader */}
                    <div className="hidden shrink-0 items-center justify-center p-[clamp(1.75rem,3vw,3.5rem)] sm:flex sm:w-[42%]">
                      <div className="h-[646px] max-h-full w-[537px] max-w-full">
                        <ShaderImage src={card.img} placeholder={s.ph} />
                      </div>
                    </div>
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
