"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import { PRACTICE } from "@/lib/content";

// bg = card colour, ph = solid placeholder behind the (optional) image.
const SKINS: { bg: string; fg: string; body: string; ph: string }[] = [
  { bg: "#F6A93B", fg: "text-ink", body: "text-ink/80", ph: "#511528" }, // design
  { bg: "#83D9E7", fg: "text-ink", body: "text-ink/75", ph: "#15140f" }, // code
  { bg: "#511528", fg: "text-paper", body: "text-paper/85", ph: "#163b42" }, // ship
];

const FLING = [0, 9, -8]; // entrance tilt per card (settles to 0)

// Cards live in a fixed region under the (pinned) heading. Small OFFSET so each
// card mostly covers the previous, leaving just its label strip.
const CARD_H = "clamp(300px, 48vh, 580px)";
const OFFSET = "clamp(64px, 8vh, 108px)";

export default function Practice() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".practice-card");

      // Pin heading + stack together. Design shows first; Code then Ship fly up
      // tilted from below and settle flat, each covering the one before.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.9,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.slice(1).forEach((card, i) => {
        tl.fromTo(
          card,
          { yPercent: 135, rotation: FLING[i + 1] },
          { yPercent: 0, rotation: 0, ease: "power3.out", duration: 1 },
          i === 0 ? 0.2 : ">-0.05",
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section id="approach" ref={root} className="bg-paper">
      <div ref={pin} className="relative h-svh overflow-hidden">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-24 sm:px-8 sm:pt-28">
          {/* Heading — stays pinned at the top through the whole sequence */}
          <Reveal>
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.035em]">
              <span className="block">{PRACTICE.heading[0]}</span>
              <span className="block">{PRACTICE.heading[1]}</span>
            </h2>
          </Reveal>

          {/* Card region */}
          <div className="relative mt-[clamp(1.5rem,4vh,3rem)] flex-1">
            {PRACTICE.cards.map((card, i) => {
              const s = SKINS[i];
              return (
                <div
                  key={card.key}
                  className="practice-card absolute inset-x-0 will-change-transform"
                  style={{ top: `calc(${i} * ${OFFSET})`, zIndex: i + 1 }}
                >
                  <article
                    className="flex"
                    style={{ height: CARD_H, backgroundColor: s.bg }}
                  >
                    {/* Content (left) */}
                    <div className="flex flex-1 flex-col p-[clamp(1.5rem,3vw,3rem)]">
                      <h3
                        className={`text-[clamp(1.9rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] ${s.fg}`}
                      >
                        {card.label}
                      </h3>
                      <p
                        className={`mt-auto max-w-[34ch] text-[clamp(0.9rem,1.2vw,1.1rem)] leading-relaxed ${s.body}`}
                      >
                        {card.body}
                      </p>
                    </div>

                    {/* Image (portrait, inset right) */}
                    <div className="hidden shrink-0 items-center justify-center p-[clamp(1.5rem,3vw,3rem)] sm:flex sm:w-[42%]">
                      <div
                        className="h-[80%] max-w-full aspect-[3/4]"
                        style={{
                          backgroundColor: s.ph,
                          backgroundImage: `url(${card.img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
