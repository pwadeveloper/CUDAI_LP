"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS, type ProjectCard as ProjectCardData } from "@/lib/content";

const WHEEL_RADIUS = 1382.5;
const WHEEL_SIZE = WHEEL_RADIUS * 2;
const ARC_START = -150;
const ARC_STEP = 20;
const SCROLL_ROTATE = 120;
const CARD_W = 348;
const CARD_IMG_H = 209;

function ProjectCard({
  card,
  className = "",
  style,
}: {
  card: ProjectCardData;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[6px] border border-black/4 shadow-[0_18px_34px_rgba(22,21,15,0.14)] dark:border-white/8 dark:shadow-[0_18px_38px_rgba(0,0,0,0.42)] ${className}`}
      style={{ backgroundColor: card.color, ...style }}
    >
      <div
        className="mx-[7px] mt-[7px] overflow-hidden rounded-[3.6px] bg-white/85 dark:bg-white/10"
        style={{ height: CARD_IMG_H }}
      >
        <div
          className="size-full bg-cover bg-center"
          style={{
            backgroundColor: card.src ? undefined : "rgb(0 0 0 / 0.25)",
            backgroundImage: card.src ? `url(${card.src})` : undefined,
          }}
        />
      </div>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap px-[14.4px] py-[14.4px] text-[0.975rem] font-medium leading-[1.2] tracking-[-0.012em] text-white/90">
        {card.name}
      </p>
    </div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const cards = PROJECTS.cards;
  const count = cards.length;

  useGSAP(() => {
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.from([".projects-heading", ".projects-intro"], {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${Math.max(count, 6) * window.innerHeight * 0.42}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!wheel.current) return;
          gsap.set(wheel.current, { rotation: -self.progress * SCROLL_ROTATE });
        },
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, { scope: root, dependencies: [reduced, count], revertOnUpdate: true });

  const before = "What you'll ";
  const highlight = PROJECTS.headingHighlight;

  return (
    <section
      id="projects"
      ref={root}
      className={`relative bg-paper text-ink ${reduced ? "py-28 md:py-40" : "py-24 lg:h-svh lg:overflow-hidden"}`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, color-mix(in srgb, var(--c-accent) 10%, transparent) 0%, transparent 38%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 dark:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--c-ink) 2%, transparent), transparent 24%, color-mix(in srgb, var(--c-ink) 4%, transparent) 100%)",
        }}
      />

      {/* Text block */}
      <div className="relative z-20 px-5 pt-20 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="projects-heading text-[clamp(2.75rem,5.5vw,5rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
            {before}
            <span className="relative inline-block px-[0.1em] text-on-light">
              <span className="relative z-10">{highlight}</span>
              <svg
                className="absolute left-[-0.04em] top-[-0.16em] z-0 h-[1.35em] w-[calc(100%+0.08em)]"
                viewBox="0 0 170 108"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 14.0213L169.197 0L170 108L2.8728 107.566L0 14.0213Z"
                  fill="#FFB149"
                />
              </svg>
            </span>
          </h2>
          <p className="projects-intro mt-5 max-w-[860px] text-[clamp(1.2rem,5vw,2.5rem)] leading-[1.09] tracking-[-0.035em] text-ink-2">
            {PROJECTS.intro}
          </p>
        </div>
      </div>

      {/* Desktop rotating wheel */}
      {!reduced && (
        <div
          ref={wheel}
          className="absolute z-10 hidden will-change-transform lg:block"
          style={{
            left: "50%",
            top: "clamp(33rem, 60vh, 38rem)",
            width: WHEEL_SIZE,
            height: WHEEL_SIZE,
            marginLeft: -WHEEL_RADIUS,
            transformOrigin: "center center",
          }}
        >
          {cards.map((card, i) => {
            const angle = ARC_START + i * ARC_STEP;
            const rad = (angle * Math.PI) / 180;
            const cx = WHEEL_RADIUS + WHEEL_RADIUS * Math.cos(rad);
            const cy = WHEEL_RADIUS + WHEEL_RADIUS * Math.sin(rad);

            return (
              <div
                key={card.name}
                className="group absolute pointer-events-auto"
                style={{
                  left: cx,
                  top: cy,
                  width: CARD_W,
                  transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                }}
              >
                <ProjectCard
                  card={card}
                  className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile carousel */}
      {!reduced && (
        <div className="relative z-20 mt-20 sm:mt-24 lg:hidden">
          <div className="overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-4">
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="min-w-0 shrink-0 snap-center"
                  style={{ width: "min(85vw, 348px)" }}
                >
                  <ProjectCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reduced-motion fallback */}
      {reduced && (
        <div className="mx-auto mt-12 grid max-w-[1600px] grid-cols-2 gap-4 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
          {cards.map((card) => (
            <ProjectCard key={card.name} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}
