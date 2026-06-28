import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Practice from "@/components/sections/Practice";
import Curriculum from "@/components/sections/Curriculum";
import Outcomes from "@/components/sections/Outcomes";
import Instructors from "@/components/sections/Instructors";
import Projects from "@/components/sections/Projects";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import EnrolCta from "@/components/sections/EnrolCta";
import WhoItsFor from "@/components/sections/WhoItsFor";
import FooterReveal from "@/components/layout/FooterReveal";
import Marquee from "@/components/ui/Marquee";
import { MARQUEE } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10 bg-paper">
        <Hero />
        <div className="border-y border-line py-5 text-2xl font-medium sm:text-3xl">
          <Marquee items={MARQUEE} />
        </div>
        <Practice />
        <Outcomes />
        <Curriculum />
        <Instructors />
        <Projects />
        <Pricing />
        <Faq />
        <EnrolCta />
        <WhoItsFor />
      </main>
      <FooterReveal />
    </>
  );
}
