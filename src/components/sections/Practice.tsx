import Reveal from "@/components/ui/Reveal";
import { PRACTICE } from "@/lib/content";

// bg = card colour, ph = solid placeholder behind the (optional) image.
const SKINS: { bg: string; fg: string; body: string; ph: string }[] = [
  { bg: "#F6A93B", fg: "text-ink", body: "text-ink/80", ph: "#511528" }, // design
  { bg: "#83D9E7", fg: "text-ink", body: "text-ink/75", ph: "#15140f" }, // code
  { bg: "#511528", fg: "text-paper", body: "text-paper/85", ph: "#163b42" }, // ship
];

/**
 * Sticky card stack. Each card is sticky and sits a strip lower than the one
 * before, so as you scroll they rise and stack one by one, each covering the
 * previous and leaving its label strip. Scroll-driven (CSS sticky), so it stays
 * smooth and works the same with or without reduced motion.
 */
export default function Practice() {
  return (
    <section id="approach" className="bg-paper px-5 pb-[14vh] sm:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="pt-24 sm:pt-28">
          <Reveal>
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              <span className="block">{PRACTICE.heading[0]}</span>
              <span className="block">{PRACTICE.heading[1]}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 [--card-h:clamp(560px,90vh,881px)] [--strip:clamp(104px,13vh,150px)] sm:mt-16">
          {PRACTICE.cards.map((card, i) => {
            const s = SKINS[i];
            return (
              <div
                key={card.key}
                className="practice-card sticky"
                style={{
                  top: `calc(2rem + ${i} * var(--strip))`,
                  height: "var(--card-h)",
                  zIndex: i + 1,
                }}
              >
                <article
                  className="flex h-full w-full"
                  style={{ backgroundColor: s.bg }}
                >
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-[clamp(1.75rem,3vw,3.5rem)]">
                    <h3
                      className={`text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] ${s.fg}`}
                    >
                      {card.label}
                    </h3>
                    <p
                      className={`mt-auto max-w-[24ch] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-snug ${s.body}`}
                    >
                      {card.body}
                    </p>
                  </div>

                  {/* Image panel: 537x646 image (placeholder until a real image is set) */}
                  <div className="hidden shrink-0 items-center justify-center p-[clamp(1.75rem,3vw,3.5rem)] sm:flex sm:w-[42%]">
                    <div
                      className="h-[646px] max-h-full w-[537px] max-w-full"
                      style={{
                        backgroundColor: s.ph,
                        backgroundImage: `url(${card.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
