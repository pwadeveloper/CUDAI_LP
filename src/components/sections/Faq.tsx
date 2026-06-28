"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { Close, ArrowLeft, ArrowRight, ArrowUpRight } from "@carbon/icons-react";
import { FAQS } from "@/lib/content";
import FaqVisual from "@/components/sections/FaqVisual";

// Black backdrop for the full-screen takeover.
const OVERLAY_BG = "#0d0c0a";
// Themed cube colour per question, cycling the brand palette.
const COLORS = ["#F6A93B", "#83D9E7", "#A8E6A1", "#F8C9C9", "#C9B6F8"];

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: {},
};
const fromLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
};
const fromRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, x: 24, transition: { duration: 0.25 } },
};
const pop: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const isOpen = open !== null;

  const go = (dir: number) =>
    setOpen((i) => (i === null ? i : (i + dir + FAQS.length) % FAQS.length));

  // Lock background scroll, focus the close button, wire keyboard nav.
  useEffect(() => {
    if (!isOpen) return;
    if (lenis) lenis.stop();
    else document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (lenis) lenis.start();
      else document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  const active = open === null ? null : FAQS[open];

  return (
    <>
      {/* List */}
      <section id="faq" className="px-5 py-28 sm:px-8 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Frequently asked
          </h2>

          <ul className="mt-12 border-t border-line sm:mt-16">
            {FAQS.map((f, i) => (
              <li key={i}>
                <button
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                  className="group flex w-full items-center justify-between gap-6 border-b border-line py-6 text-left sm:py-8"
                >
                  <span className="flex items-baseline gap-4 sm:gap-8">
                    <span className="text-base text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.2rem,2.6vw,2rem)] font-medium tracking-[-0.01em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {f.q}
                    </span>
                  </span>
                  <span className="shrink-0 text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-ink">
                    <ArrowUpRight size={28} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full-page overlay */}
      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.q}
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden text-on-dark"
            style={{ backgroundColor: OVERLAY_BG }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
              <span className="text-base uppercase tracking-[0.22em] text-on-dark/45">
                FAQ {String(open + 1).padStart(2, "0")} /{" "}
                {String(FAQS.length).padStart(2, "0")}
              </span>
              <button
                ref={closeBtn}
                onClick={() => setOpen(null)}
                className="group flex items-center gap-3 rounded-full bg-on-dark px-6 py-3.5 text-on-light transition-colors duration-300 hover:bg-accent"
              >
                <span className="text-base uppercase tracking-[0.16em]">
                  Close
                </span>
                <Close size={24} />
              </button>
            </div>

            {/* Body - question (left) · visual (center) · answer (right); stacked on mobile */}
            <div className="flex flex-1 items-center overflow-x-hidden overflow-y-auto px-5 py-8 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  variants={container}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mx-auto flex w-full max-w-[1600px] flex-col gap-12 lg:grid lg:grid-cols-3 lg:items-center lg:gap-10"
                >
                  {/* Question - left */}
                  <motion.div
                    variants={fromLeft}
                    className="order-1 flex flex-col gap-4 lg:order-none lg:col-start-1"
                  >
                    <span className="text-base uppercase tracking-[0.22em] text-on-dark/45">
                      Question
                    </span>
                    <h3 className="max-w-[18ch] text-[clamp(1.6rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-on-dark">
                      {active.q}
                    </h3>
                  </motion.div>

                  {/* Visual - center */}
                  <motion.div
                    variants={pop}
                    className="order-2 lg:order-none lg:col-start-2"
                  >
                    <FaqVisual color={COLORS[open % COLORS.length]} />
                  </motion.div>

                  {/* Answer - right */}
                  <motion.div
                    variants={fromRight}
                    className="order-3 flex flex-col gap-4 lg:order-none lg:col-start-3 lg:items-start"
                  >
                    <span className="text-base uppercase tracking-[0.22em] text-on-dark/45">
                      Answer
                    </span>
                    <p className="max-w-[42ch] text-lg leading-relaxed text-on-dark/80 sm:text-xl">
                      {active.a}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / next */}
            <div className="flex items-center justify-between border-t border-on-dark/15 px-5 py-4 sm:px-8 sm:py-5">
              <button
                onClick={() => go(-1)}
                className="group flex items-center gap-2.5 text-on-dark/60 transition-colors hover:text-on-dark"
              >
                <ArrowLeft
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                <span className="text-base uppercase tracking-[0.2em]">
                  Prev
                </span>
              </button>
              <button
                onClick={() => go(1)}
                className="group flex items-center gap-2.5 text-on-dark/60 transition-colors hover:text-on-dark"
              >
                <span className="text-base uppercase tracking-[0.2em]">
                  Next
                </span>
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
