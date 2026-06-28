"use client";

/**
 * The full-page FAQ centerpiece: a slowly rotating glass cube, themed per
 * question. Pure CSS 3D (transform-style: preserve-3d) - no deps. This is the
 * swap boundary: drop a real WebGL/3D render here later if desired.
 */
const FACES = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;

export default function FaqVisual({ color }: { color: string }) {
  return (
    <div className="faq-stage">
      <div
        className="faq-glow"
        aria-hidden
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        }}
      />
      <div
        className="faq-cube"
        aria-hidden
        style={{ ["--cube" as string]: color }}
      >
        {FACES.map((f) => (
          <span key={f} className={`faq-face ${f}`} />
        ))}
      </div>
    </div>
  );
}
