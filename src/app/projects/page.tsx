import React from "react";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/portfolioService";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <ProjectsSection projectsList={projects} />
      </div>
      <Footer />
    </div>
  );
}
