import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <FeaturedProjectsSection />
      <ContactSection />
    </>
  );
}
