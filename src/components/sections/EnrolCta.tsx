import EnrolButton from "@/components/ui/EnrolButton";
import { ENROL } from "@/lib/content";

export default function EnrolCta() {
  return (
    <section id="enrol" className="px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-14">
        <h2 className="max-w-[20ch] text-[clamp(2.25rem,7vw,6.25rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
          {ENROL.lead}{" "}
          <span className="box-decoration-clone bg-accent px-[0.12em] text-ink">
            {ENROL.highlight}
          </span>
        </h2>
        <EnrolButton size="cta" />
      </div>
    </section>
  );
}
