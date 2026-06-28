import Reveal from "@/components/ui/Reveal";
import ShaderImage from "@/components/ui/ShaderImage";
import { INSTRUCTORS, INSTRUCTORS_INTRO } from "@/lib/content";

// Solid placeholder behind each portrait until a real photo is set.
const PLACEHOLDER = "#211d18";

export default function Instructors() {
  return (
    <section id="instructors" className="px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        {/* Heading + intro */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-5">
            <Reveal>
              <h2 className="whitespace-nowrap text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Your craftmen
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-[44ch] text-lg leading-relaxed text-ink-2 sm:text-xl lg:pt-3">
              {INSTRUCTORS_INTRO}
            </p>
          </Reveal>
        </div>

        {/* Portrait cards */}
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-7">
          {INSTRUCTORS.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.09}>
              <article className="group relative">
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ background: PLACEHOLDER }}
                >
                  {/* Placeholder initial - hidden once a real photo covers it */}
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center text-[clamp(4rem,12vw,7rem)] font-semibold text-paper/15"
                  >
                    {person.initial}
                  </span>

                  {person.src && (
                    <div className="absolute inset-0">
                      <ShaderImage src={person.src} placeholder={PLACEHOLDER} />
                    </div>
                  )}
                </div>

                {/* Amber name tag, overlapping the lower-left of the portrait */}
                <div className="absolute bottom-5 left-0 bg-accent px-4 py-2 sm:px-5 sm:py-2.5">
                  <span className="block text-[1.05rem] font-medium leading-none tracking-[-0.01em] text-ink sm:text-xl">
                    {person.name}
                  </span>
                  {person.role && (
                    <span className="mt-1.5 block text-base font-medium uppercase tracking-[0.18em] text-ink/70">
                      {person.role}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
