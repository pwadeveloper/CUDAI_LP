"use client";

type MarqueeProps = {
  items: readonly string[];
  duration?: number;
  className?: string;
};

/**
 * Seamless CSS marquee. The list is duplicated and the track translates -50%,
 * so the loop is gapless. Pauses on hover. Animation killed by reduced-motion.
 */
export default function Marquee({
  items,
  duration = 32,
  className,
}: MarqueeProps) {
  const group = (
    <ul className="marquee-group flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-[1.1ch] text-ink/90">{item}</span>
          <span className="text-accent-deep" aria-hidden>
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
