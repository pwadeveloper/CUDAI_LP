import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Practice from "@/components/sections/Practice";
import Curriculum from "@/components/sections/Curriculum";
import Outcomes from "@/components/sections/Outcomes";
import Instructors from "@/components/sections/Instructors";
import Projects from "@/components/sections/Projects";
import Pricing from "@/components/sections/Pricing";
import Marquee from "@/components/ui/Marquee";
import { MARQUEE } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="border-y border-line py-5 text-2xl font-medium sm:text-3xl">
          <Marquee items={MARQUEE} />
        </div>
        <Practice />
        <Curriculum />
        <Outcomes />
        <Instructors />
        <Projects />
        <Pricing />
      </main>
    </>
  );
}
