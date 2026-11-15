import React from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { getProfile, getEducations } from "@/lib/portfolioService";

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, educations] = await Promise.all([
    getProfile(),
    getEducations(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <AboutSection
          bio={profile.bio}
          approach={profile.approach}
          funFact={profile.funFact}
          domainInterests={profile.domainInterests}
          educations={educations}
        />
      </div>
      <Footer />
    </div>
  );
}
