import React from "react";
import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/WelcomeSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubSection from "@/components/GitHubSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import {
  getProfile,
  getSkills,
  getProjects,
  getExperiences,
  getEducations,
  getResume,
} from "@/lib/portfolioService";

// Dynamic revalidation: public pages revalidate periodically or on-demand
export const revalidate = 60;

export default async function HomePage() {
  const [profile, skills, projects, experiences, educations, resume] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getExperiences(),
      getEducations(),
      getResume(),
    ]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <WelcomeSection profileData={profile} />

        {/* About Section (including Education, Certs & Leadership) */}
        <AboutSection
          bio={profile.bio}
          approach={profile.approach}
          funFact={profile.funFact}
          domainInterests={profile.domainInterests}
          educations={educations}
        />

        {/* Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Technical & Soft Skills */}
        <SkillsSection skillsList={skills} />

        {/* Projects Showcase */}
        <ProjectsSection projectsList={projects} />

        {/* GitHub Live Activity */}
        <GitHubSection />

        {/* Resume Download & Preview */}
        <ResumeSection
          resumeUrl={resume.filePath}
          fileName={resume.fileName}
        />

        {/* Contact Form & Links */}
        <ContactSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          githubUrl={profile.githubUrl}
          linkedinUrl={profile.linkedinUrl}
        />
      </main>

      <Footer />
    </div>
  );
}
