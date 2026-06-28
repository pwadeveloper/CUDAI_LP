"use client";

import MagneticButton from "@/components/ui/MagneticButton";

// Black pill. Same shape for nav and the big CTA, just scaled.
type Props = {
  size?: "nav" | "md" | "cta";
  onClick?: () => void;
  className?: string;
};

export default function EnrolButton({ size = "cta", onClick, className }: Props) {
  const sized =
    size === "nav"
      ? "px-6 py-3 text-base"
      : size === "md"
        ? "px-[clamp(2.25rem,4.5vw,3.5rem)] py-[clamp(1rem,2vw,1.45rem)] text-[clamp(1.3rem,2.5vw,1.9rem)]"
        : "px-[clamp(2.75rem,6vw,5rem)] py-[clamp(1.25rem,2.6vw,2rem)] text-[clamp(1.5rem,3.2vw,2.6rem)]";

  return (
    <MagneticButton
      onClick={onClick}
      strength={size === "nav" ? 0.45 : 0.3}
      className={`rounded-full bg-ink font-semibold tracking-[-0.01em] text-paper transition-colors duration-300 hover:bg-ink-2 ${sized} ${className ?? ""}`}
    >
      Enrol Now
    </MagneticButton>
  );
}
