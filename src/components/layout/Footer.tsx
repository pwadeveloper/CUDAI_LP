"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "@carbon/icons-react";
import { gsap } from "@/lib/gsap";

type QuickTo = (v: number) => void;

export default function Footer() {
  const stage = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const q = useRef<{ rx?: QuickTo; ry?: QuickTo; x?: QuickTo; y?: QuickTo }>({});
  const lenis = useLenis();
  const reduced = useReducedMotion();

  // Cursor-driven 3D tilt + magnetic drift on the wordmark (same gsap.quickTo
  // technique as the Enrol button), with perspective on the stage.
  useGSAP(
    () => {
      if (reduced || !word.current) return;
      // snappy + bouncy for a playful, hyper-responsive feel
      const o = { duration: 0.45, ease: "back.out(2.4)" };
      q.current = {
        rx: gsap.quickTo(word.current, "rotationX", o),
        ry: gsap.quickTo(word.current, "rotationY", o),
        x: gsap.quickTo(word.current, "x", o),
        y: gsap.quickTo(word.current, "y", o),
      };
    },
    { scope: stage, dependencies: [reduced] },
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !stage.current || !q.current.rx) return;
    const r = stage.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    q.current.ry!(px * 46);
    q.current.rx!(-py * 34);
    q.current.x!(px * 64);
    q.current.y!(py * 40);
  };

  const onLeave = () => {
    q.current.rx?.(0);
    q.current.ry?.(0);
    q.current.x?.(0);
    q.current.y?.(0);
  };

  const scrollTo = (sel: string) => {
    const el = typeof document !== "undefined" && document.querySelector(sel);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement);
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  const linkCls =
    "text-left uppercase tracking-wide transition-colors duration-300 hover:text-accent";

  return (
    <footer className="relative overflow-hidden bg-[#100e0a] text-paper">
      {/* Top: clusters */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-10 text-base font-medium">
          {/* <div className="uppercase tracking-wide">
            <p>Now enrolling</p>
            <p className="text-paper/45">Cohort 01</p>
          </div> */}

          <div className="uppercase tracking-wide">
            <p>Contains taste™</p>
            <p className="text-paper/45">Not generic AI output</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <button onClick={() => scrollTo("#curriculum")} className={linkCls}>
              Curriculum
            </button>
            <button onClick={() => scrollTo("#outcomes")} className={linkCls}>
              Outcomes
            </button>
            <button onClick={() => scrollTo("#faq")} className={linkCls}>
              FAQs
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-1 ${linkCls}`}
            >
              @INSTAGRAM
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            {/* <button onClick={() => scrollTo("#top")} className={linkCls}>
              Enrol now
            </button> */}
          </div>

          <button
            onClick={() => scrollTo("#top")}
            className="group inline-flex items-center gap-1.5 text-base font-medium uppercase tracking-wide text-paper/55 transition-colors hover:text-paper"
          >
            <ArrowUpRight
              size={16}
              className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Top
          </button>
        </div>
      </div>

      {/* Giant full-bleed wordmark with 3D tilt */}
      <div
        ref={stage}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative z-0 mb-16 mt-28 w-full sm:mb-24 sm:mt-40"
        style={{ perspective: "1200px" }}
      >
        <h2
          ref={word}
          aria-label="CUDAI"
          className="pointer-events-none select-none text-center font-extrabold uppercase leading-[0.72] tracking-[-0.04em] text-paper will-change-transform [font-size:31vw]"
        >
          CUDAI
        </h2>
      </div>

      {/* Bottom meta */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-base font-medium uppercase tracking-wide text-paper/45">
          {/* <span>Design / Code / Ship</span> */}
          <span>© CUDAI 2026</span>
          <a href="#" className="transition-colors hover:text-paper">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-paper">
            Privacy
          </a>
          <span>Design by hand · Build with AI Code</span>
        </div>
      </div>
    </footer>
  );
}
