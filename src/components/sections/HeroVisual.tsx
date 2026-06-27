"use client";

import { useRef } from "react";

/**
 * The hero's dark panel. Styled placeholder for now — a living dark surface with
 * a cursor-tracking amber glow and a slow ambient drift, so it reads as crafted
 * rather than an empty box. This is the swap boundary: drop a WebGL <Canvas> or a
 * <video> in place of the inner decoration later (via next/dynamic, ssr:false).
 */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="hero-visual group relative h-full w-full overflow-hidden bg-panel"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* cursor-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(246,169,59,0.22), transparent 60%)",
        }}
      />
      {/* slow ambient aurora */}
      <div
        className="pointer-events-none absolute -inset-1/4 opacity-50 blur-2xl hero-aurora"
        style={{
          background:
            "conic-gradient(from 120deg at 60% 40%, rgba(246,169,59,0.18), transparent 35%, rgba(224,138,20,0.14), transparent 70%)",
        }}
      />
      {/* faint blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(120% 120% at 70% 30%, black, transparent 75%)",
        }}
      />

      {/* corner meta */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.22em] text-paper/55">
          <span>Interactive build</span>
          <span>01 / WebGL</span>
        </div>
        <div className="flex items-end justify-between">
          <p className="max-w-[16ch] text-[0.95rem] leading-snug text-paper/70">
            The kind of work that wins Awwwards — built, not just rendered.
          </p>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            ↳ soon
          </span>
        </div>
      </div>

      {/* inner hairline frame */}
      <div className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
  );
}
