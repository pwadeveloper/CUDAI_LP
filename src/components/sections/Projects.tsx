"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS } from "@/lib/content";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const lastStep = useRef(-1);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = PROJECTS.items.length;
  const project = PROJECTS.items[active];

  useGSAP(
    () => {
      if (reduced) return;

      // Heading entrance — fires as section approaches viewport, before pin
      gsap.from([".projects-heading", ".projects-intro"], {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Pin + drive active step from scroll progress
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${count * window.innerHeight * 0.75}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar.current) gsap.set(bar.current, { scaleX: self.progress });

          const step = Math.min(Math.floor(self.progress * count), count - 1);
          if (step !== lastStep.current) {
            lastStep.current = step;
            setActive(step);
          }
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced, count] },
  );

  return (
    <section
      id="projects"
      ref={root}
      className={`relative flex flex-col bg-paper px-5 sm:px-8 ${
        reduced ? "py-28 md:py-40" : "h-svh overflow-hidden"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col pt-24 sm:pt-28">
        {/* Heading + intro */}
        <div>
          <h2 className="projects-heading text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[0.975] tracking-[-0.035em]">
            {PROJECTS.heading}
          </h2>
          <p className="projects-intro mt-4 max-w-[50ch] text-[clamp(1rem,1.6vw,1.4rem)] leading-[1.35] text-ink-2">
            {PROJECTS.intro}
          </p>
        </div>

        {/* List + preview */}
        <div className="mt-10 flex flex-1 flex-col gap-10 pb-8 lg:flex-row lg:items-start lg:gap-16">

          {/* Wine pill indicator + project rows */}
          <div className="flex flex-1 gap-8 lg:gap-10">
            {/* Pill — one dot per project, matches count dynamically */}
            <div
              className="hidden shrink-0 flex-col items-center self-start rounded-full px-[21.6px] py-[14px] sm:flex"
              style={{ backgroundColor: "#323f56", gap: "9.6px" }}
            >
              {PROJECTS.items.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: i === active ? 48 : 10,
                    backgroundColor: i === active ? "#ffffff" : "#c8ceda",
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: 10, borderRadius: 999, flexShrink: 0 }}
                />
              ))}
            </div>

            {/* Project rows */}
            <ul className="flex-1 divide-y divide-line">
              {PROJECTS.items.map((item, i) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActive(i)}
                    className="flex w-full items-center justify-between gap-4 py-[clamp(0.85rem,1.7vh,1.4rem)] text-left"
                  >
                    <motion.span
                      animate={{ color: i === active ? "#16150f" : "#6f6d63" }}
                      transition={{ duration: 0.3 }}
                      className="text-[clamp(1rem,2.3vw,2rem)] font-semibold leading-tight tracking-[-0.02em]"
                    >
                      {item.name}
                    </motion.span>
                    {/* Arrow: skewed amber shape when active, plain icon when inactive */}
                    <span
                      className="relative flex shrink-0 items-center justify-center"
                      style={{ width: 30, height: 33 }}
                      aria-hidden
                    >
                      {/* Shaped amber background — fades in when active */}
                      <motion.svg
                        className="absolute inset-0"
                        animate={{ opacity: i === active ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        width="30"
                        height="33"
                        viewBox="0 0 30 33"
                        fill="none"
                      >
                        <path
                          d="M0 4.28429L29.8583 0L30 33L0.506965 32.8675L0 4.28429Z"
                          fill="#FFB149"
                        />
                      </motion.svg>
                      {/* Arrow icon — color shifts with active state */}
                      <motion.svg
                        className="relative z-10"
                        animate={{ color: i === active ? "#16150f" : "#6f6d63" }}
                        transition={{ duration: 0.25 }}
                        width="17"
                        height="13"
                        viewBox="0 0 17 13"
                        fill="none"
                      >
                        <path
                          d="M1 6.5H14.5M9.5 1L14.5 6.5L9.5 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Preview panel */}
          <div className="relative w-full lg:w-[38%] lg:shrink-0">
            {/* Amber project-type tag */}
            <div className="absolute -top-[14px] left-0 z-10 bg-accent px-4 py-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={project.type}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block text-[0.8rem] font-medium tracking-[-0.01em] text-ink"
                >
                  {project.type}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Image — gray placeholder until project.src is set */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
              <AnimatePresence mode="wait">
                {project.src ? (
                  <motion.img
                    key={project.src}
                    src={project.src}
                    alt={project.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <motion.div
                    key={`blank-${active}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={project.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-[1.125rem] leading-relaxed text-ink-2"
              >
                {project.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll progress bar — matches Curriculum pattern */}
      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-ink" />
        </div>
      )}
    </section>
  );
}
