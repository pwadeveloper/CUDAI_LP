"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis from GSAP's ticker so ScrollTrigger and Lenis update on the same
 * frame. Rendered INSIDE <ReactLenis> so useLenis() reads the instance from
 * context - the instance is created in ReactLenis state and only appears after a
 * re-render, so reading a ref in a one-shot parent effect races and loses.
 */
function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000); // ticker secs → Lenis ms
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

/**
 * Smooth scroll. autoRaf:false hands the loop to GSAP (above). Disabled entirely
 * under prefers-reduced-motion - native scroll, no smoothing.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}
    >
      {children}
      <GsapLenisSync />
    </ReactLenis>
  );
}
