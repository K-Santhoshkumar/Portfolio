"use client";
import WelcomeSection from "@/components/WelcomeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col gap-0">
        <WelcomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
