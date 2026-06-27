"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** how far the element drifts toward the cursor (0–1) */
  strength?: number;
};

/**
 * Cursor-magnetic button. gsap.quickTo gives buttery, allocation-free pointer
 * tracking. The label drifts a touch further than the shell for depth.
 * No-ops under reduced motion.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.4,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const lx = useRef<((v: number) => void) | null>(null);
  const ly = useRef<((v: number) => void) | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const o = { duration: 0.5, ease: "power3.out" };
      xTo.current = gsap.quickTo(ref.current, "x", o);
      yTo.current = gsap.quickTo(ref.current, "y", o);
      lx.current = gsap.quickTo(labelRef.current, "x", o);
      ly.current = gsap.quickTo(labelRef.current, "y", o);
    },
    { scope: ref, dependencies: [reduced] },
  );

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    xTo.current?.(x);
    yTo.current?.(y);
    lx.current?.(x * 0.35);
    ly.current?.(y * 0.35);
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
    lx.current?.(0);
    ly.current?.(0);
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...props}
    >
      <span ref={labelRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
