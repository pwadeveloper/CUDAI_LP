"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { HERO } from "@/lib/content";
import { SITE } from "@/lib/constants";
import HeroVisual from "@/components/sections/HeroVisual";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // Intro choreography: headline → panel → supporting copy → highlight wipe.
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      tl.from(".word", { yPercent: 118, duration: 1.15, stagger: 0.07 })
        .from(
          visual.current,
          { clipPath: "inset(0 0 100% 0)", duration: 1.2 },
          0.35,
        )
        .from(
          ".hero-fade",
          { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
          0.5,
        )
        .to(".highlight-bg", { scaleX: 1, duration: 0.8 }, 0.95);

      // Subtle parallax as the hero scrolls away.
      gsap.to(visual.current, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh flex-col pb-7 pt-24 sm:pt-28"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-center px-5 sm:px-8">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-12">
          {/* Left: headline + supporting copy */}
          <div className="flex flex-col gap-9 lg:w-[66%]">
            <h1 className="hero-title">
              <span className="line-mask">
                <span className="word">Creative</span>{" "}
                <span className="word">UI</span>
              </span>
              <span className="line-mask">
                <span className="word">Development</span>
              </span>
              <span className="line-mask">
                <span className="word">with</span>{" "}
                <span className="highlight">
                  <span className="highlight-bg" aria-hidden />
                  <span className="word">{HERO.highlight}</span>
                </span>
              </span>
            </h1>

            <div className="flex flex-col gap-8">
              <p className="hero-fade max-w-[46ch] text-lg leading-relaxed text-ink-2 sm:text-xl">
                {HERO.subhead}
              </p>

              <div className="hero-fade flex flex-wrap gap-x-10 gap-y-4">
                {[
                  { k: "Format", v: SITE.duration },
                  { k: "Structure", v: "7 parts + capstone" },
                ].map((s) => (
                  <div key={s.k} className="flex flex-col gap-1">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                      {s.k}
                    </span>
                    <span className="text-base font-medium text-ink">
                      {s.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: dark panel */}
          <div
            ref={visual}
            className="aspect-[16/11] w-full sm:aspect-[16/9] lg:ml-auto lg:aspect-[4/5] lg:w-[31%]"
            style={{ willChange: "transform, clip-path" }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom meta bar */}
      <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between px-5 pt-10 sm:px-8">
        <span className="hero-fade font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted">
          {SITE.cohort}
        </span>
        <span className="hero-fade scroll-cue hidden flex-col items-center font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted sm:flex">
          Scroll
        </span>
        <span className="hero-fade font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted">
          Limited seats
        </span>
      </div>
    </section>
  );
}
