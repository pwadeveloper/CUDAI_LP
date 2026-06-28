"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { Cube, Code, Rocket } from "@carbon/icons-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TOOLKIT } from "@/lib/content";

const ICONS = { cube: Cube, code: Code, rocket: Rocket } as const;
const TONES = { pink: "#F8C9C9", amber: "#F6B45C", green: "#A8E6A1" } as const;

type Token =
  | { kind: "word"; text: string }
  | { kind: "chip"; name: keyof typeof ICONS; tone: keyof typeof TONES };

// Flatten segments into an ordered token list (words + icon chips).
const TOKENS: Token[] = TOOLKIT.segments.flatMap((seg) =>
  seg.type === "text"
    ? seg.value
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ kind: "word", text }) as Token)
    : [{ kind: "chip", name: seg.name, tone: seg.tone } as Token],
);

export default function Outcomes() {
  const root = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const tokens = gsap.utils.toArray<HTMLElement>(".tk-token");

      // Start state: words light gray, chips shrunk + faint.
      tokens.forEach((el) => {
        if (el.dataset.kind === "chip") {
          gsap.set(el, { autoAlpha: 0.25, scale: 0.4, transformOrigin: "center" });
        } else {
          gsap.set(el, { color: "#bfbdb2" });
        }
      });

      // Pin the section and fill word-by-word over a long scroll distance, so the
      // statement stays in place and is slow enough to read.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "center center",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tokens.forEach((el, i) => {
        if (el.dataset.kind === "chip") {
          tl.to(el, { autoAlpha: 1, scale: 1, ease: "back.out(1.8)", duration: 1 }, i);
        } else {
          tl.to(el, { color: "#16150f", ease: "none", duration: 1 }, i);
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="outcomes"
      ref={root}
      className="px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <p
          ref={textRef}
          className="max-w-[15em] text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink"
        >
          {TOKENS.map((t, i) => (
            <Fragment key={i}>
              {t.kind === "word" ? (
                <span className="tk-token" data-kind="word">
                  {t.text}
                </span>
              ) : (
                (() => {
                  const Icon = ICONS[t.name];
                  return (
                    <span
                      className="tk-token inline-flex -translate-y-[0.06em] items-center justify-center rounded-[0.18em] p-[0.2em] align-middle text-ink [&>svg]:size-[0.6em]"
                      data-kind="chip"
                      style={{ backgroundColor: TONES[t.tone] }}
                      aria-hidden
                    >
                      <Icon />
                    </span>
                  );
                })()
              )}{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
