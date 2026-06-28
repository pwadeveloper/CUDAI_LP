"use client";

import { PlayFilledAlt } from "@carbon/icons-react";
import { HERO } from "@/lib/content";

/**
 * Hero panel: the reel still with a small square play button and a label/heading
 * overlaid - no glass container. Overlay sizes off the card width (@container)
 * so it stays proportional at any card size. Stays the swap boundary: drop a real
 * <video>/WebGL in place of the still later.
 */
export default function HeroVisual() {
  const { title, img } = HERO.reel;

  return (
    <div className="@container group relative h-full w-full overflow-hidden bg-panel">
      {/* reel still */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${img})` }}
      />
      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />

      {/* centered play button (small square) */}
      <button
        type="button"
        aria-label="Watch the reel"
        className="absolute left-1/2 top-1/2 grid aspect-square w-[clamp(2rem,17cqw,3.25rem)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[clamp(0.4rem,3cqw,0.7rem)] bg-accent text-on-light shadow-lg transition duration-300 hover:scale-110 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <PlayFilledAlt className="h-[44%] w-[44%] translate-x-[2%]" />
      </button>

      {/* heading */}
      <div className="absolute inset-x-0 bottom-0 p-[clamp(0.65rem,5cqw,1.3rem)]">
        <h3 className="text-[clamp(1rem,9cqw,1.9rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white">
          {title}
        </h3>
      </div>
    </div>
  );
}
