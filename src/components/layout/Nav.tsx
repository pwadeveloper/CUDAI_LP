"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { useLenis } from "lenis/react";
import EnrolButton from "@/components/ui/EnrolButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Nav() {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 16);
  });

  const goTo = (href: string) => {
    const el = typeof document !== "undefined" && document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8 });
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: reduced ? 0 : hidden ? "-130%" : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-paper/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 md:py-5">
          {/* Logo lockup */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 });
            }}
            className="group flex items-center gap-2.5"
            aria-label={`${SITE.name} home`}
          >
            <span className="block h-5 w-9 rounded-[4px] bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105" />
            <span className="text-[1.15rem] font-bold tracking-[-0.04em]">
              {SITE.name}
            </span>
          </a>

          {/* Links */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.href);
                  }}
                  className="group relative text-base text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-[width] duration-400 ease-[var(--ease-out-expo)] group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle + CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <EnrolButton size="nav" onClick={() => goTo(SITE.enrolHref)} />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
