"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { HERO } from "@/lib/content";
import HeroVisual from "@/components/sections/HeroVisual";
import EnrolButton from "@/components/ui/EnrolButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();

  const goEnrol = () => {
    const el =
      typeof document !== "undefined" && document.querySelector("#enrol");
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement);
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

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
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-start px-5 sm:px-8 lg:pt-[5vh]">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-end lg:gap-12">
          {/* Left: headline + supporting copy + CTA */}
          <div className="flex flex-col gap-8 lg:w-[62%]">
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

            <p className="hero-fade max-w-[30ch] text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-[1.12] text-ink-2">
              {HERO.subhead}
            </p>

            <div className="hero-fade">
              <EnrolButton size="md" onClick={goEnrol} />
            </div>
          </div>

          {/* Right: square reel card, aligned with the supporting text */}
          <div
            ref={visual}
            className="aspect-video w-full lg:ml-auto lg:aspect-square lg:w-[18%]"
            style={{ willChange: "transform, clip-path" }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
