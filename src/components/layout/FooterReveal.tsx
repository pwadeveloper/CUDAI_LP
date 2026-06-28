"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Footer reveal: the footer is fixed behind the page; a spacer (its measured
 * height) gives the scroll room so the page content scrolls up off it and the
 * footer is uncovered from underneath as you reach the bottom.
 */
export default function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The spacer height changes the total page height after mount; ScrollTrigger
  // measured positions before that, so refresh once it settles or pinned
  // sections (the scroll-fill) desync and scrub jankily.
  useEffect(() => {
    if (h === 0) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 0);
    return () => window.clearTimeout(id);
  }, [h]);

  return (
    <>
      {/* spacer reserves scroll room equal to the footer height */}
      <div style={{ height: h }} aria-hidden />
      <div ref={ref} className="fixed inset-x-0 bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
}
