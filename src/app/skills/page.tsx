import React from "react";
import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import { getSkills } from "@/lib/portfolioService";

export const revalidate = 60;

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <SkillsSection skillsList={skills} />
      </div>
      <Footer />
    </div>
  );
}
