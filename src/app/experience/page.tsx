import React from "react";
import Navbar from "@/components/Navbar";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import { getExperiences } from "@/lib/portfolioService";

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <ExperienceSection experiences={experiences} />
      </div>
      <Footer />
    </div>
  );
}
