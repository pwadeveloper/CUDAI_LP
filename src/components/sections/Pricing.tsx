import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { PRICING } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="enrol" className="bg-panel px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20 xl:gap-32">
          {/* Left — heading block */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:w-[42%]">
            <Reveal>
              <span className="inline-block rounded-full border border-paper/15 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/50">
                {PRICING.badge}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-[clamp(3rem,7.5vw,7rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-paper">
                {PRICING.heading[0]}
                <br />
                {PRICING.heading[1]}
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-paper/35">
                {PRICING.note}
              </p>
            </Reveal>
          </div>

          {/* Right — pricing card */}
          <Reveal delay={0.1} className="lg:flex-1">
            <div className="flex flex-col border border-paper/10 p-8 sm:p-10">
              {/* Price */}
              <div className="flex items-end gap-4 border-b border-paper/10 pb-8">
                <span className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-[-0.04em] text-paper">
                  {PRICING.price}
                </span>
                <span className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-paper/35">
                  {PRICING.period}
                </span>
              </div>

              {/* Includes */}
              <ul className="mt-8 flex flex-col gap-4">
                {PRICING.includes.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span
                      className="mt-[0.35em] block h-1.5 w-1.5 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span className="text-[0.95rem] leading-snug text-paper/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-12 flex flex-col items-start gap-4">
                <MagneticButton className="rounded-full bg-accent px-8 py-3.5 text-[1rem] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 hover:bg-accent-deep">
                  {PRICING.cta}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
