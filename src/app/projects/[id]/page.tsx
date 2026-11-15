import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectShowcaseReel from "@/components/ProjectShowcaseReel";
import { getProjectById, getProjects } from "@/lib/portfolioService";
import { Project } from "@/data/projects";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

function resolveProjectScreenshots(project: Project): string[] {
  const title = project.title.toLowerCase();

  if (title.includes("sociopedia") || title.includes("social media")) {
    return [
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165546.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165452.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165437.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165419.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165404.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165348.png",
      "/SocioPedia_Screenshots/Screenshot 2025-07-09 165311.png",
    ];
  }

  if (title.includes("blog")) {
    return [
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163812.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163748.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163730.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163721.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163709.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163653.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163639.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163602.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163548.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163534.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163523.png",
      "/Blog_app_Screenshots/Screenshot 2025-07-09 163454.png",
    ];
  }

  if (title.includes("recipe")) {
    return [
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164418.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164404.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164345.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164329.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164318.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164304.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164235.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164222.png",
      "/Recipe_app_Screenshots/Screenshot 2025-07-09 164210.png",
    ];
  }

  if (title.includes("nlp") || title.includes("excel") || title.includes("sql")) {
    return [
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165138.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165123.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165058.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165044.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165030.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165013.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164943.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164932.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164918.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164813.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164804.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164732.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164704.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164641.png",
      "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 164540.png",
    ];
  }

  if (title.includes("spotify") || title.includes("music")) {
    return [
      "/Music Streaming App/Screenshot 2026-02-04 210623.png",
      "/Music Streaming App/Screenshot 2026-02-04 210735.png",
      "/Music Streaming App/Screenshot 2026-02-04 210751.png",
      "/Music Streaming App/Screenshot 2026-02-04 210926.png",
      "/Music Streaming App/Screenshot 2026-02-04 210937.png",
      "/Music Streaming App/Screenshot 2026-02-04 210953.png",
      "/Music Streaming App/Screenshot 2026-02-04 211011.png",
      "/Music Streaming App/Screenshot 2026-02-04 211030.png",
      "/Music Streaming App/Screenshot 2026-02-04 211105.png",
      "/Music Streaming App/Screenshot 2026-02-04 211139.png",
      "/Music Streaming App/Screenshot 2026-02-04 211156.png",
      "/Music Streaming App/Screenshot 2026-02-04 211212.png",
      "/Music Streaming App/Screenshot 2026-02-04 211223.png",
    ];
  }

  if (title.includes("chat") || title.includes("chatify")) {
    return [
      "/Real Time Chat App/Screenshot 2026-02-04 225733.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225742.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225801.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225847.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225903.png",
      "/Real Time Chat App/Screenshot 2026-02-04 225932.png",
      "/Real Time Chat App/Screenshot 2026-02-04 230112.png",
    ];
  }

  if (title.includes("car rental")) {
    return [
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220825.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220848.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220919.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220938.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 220957.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 221018.png",
      "/Car_rental_system_Screenshots/Screenshot 2025-07-14 221046.png",
    ];
  }

  if (title.includes("bmi")) {
    return [
      "/BMI_Screenshots/Screenshot 2025-07-08 202021.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 202009.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201958.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201946.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201936.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201827.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201817.png",
      "/BMI_Screenshots/Screenshot 2025-07-08 201749.png",
    ];
  }

  if (title.includes("food")) {
    return [
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130304.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130315.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130327.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130346.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130402.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130412.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130429.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130441.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130452.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130508.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130518.png",
      "/Foodcart_Screenshots/Screenshot 2025-07-10 130543.png",
    ];
  }

  if (title.includes("weather")) {
    return [
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122421.png",
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122409.png",
      "/Weather_app_Screenshots/Screenshot 2025-07-10 122357.png",
    ];
  }

  if (title.includes("currency")) {
    return [
      "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125644.png",
      "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125633.png",
      "/Currency_convertor_Screenshots/Screenshot 2025-07-10 125619.png",
    ];
  }

  if (title.includes("crud")) {
    return [
      "/React_CRUD_Screenshots/Screenshot 2025-07-10 124231.png",
      "/React_CRUD_Screenshots/Screenshot 2025-07-10 124217.png",
      "/React_CRUD_Screenshots/Screenshot 2025-07-10 124203.png",
    ];
  }

  if (title.includes("watch")) {
    return [
      "/Branded_watch_web_Screenshots/Screenshot 2025-07-09 202636.png",
      "/Branded_watch_web_Screenshots/Screenshot 2025-07-09 202622.png",
      "/Branded_watch_web_Screenshots/Screenshot 2025-07-09 202611.png",
    ];
  }

  if (project.screenshots && project.screenshots.length > 0) {
    return project.screenshots;
  }

  return [project.imagePath];
}

export default async function ProjectDetailPage({ params }: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const screenshots = resolveProjectScreenshots(project);

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0C] text-[#F2F2EE] charcoal-grid-bg">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto w-full relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#92969F] hover:text-[#D4F933] transition-colors mb-8 px-4 py-2 rounded-full bg-[#161A20] border border-[#252A32] shadow-sm w-fit"
        >
          <ArrowLeft size={13} />
          <span>Back to Projects Archive</span>
        </Link>

        {/* Project Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>CASE STUDY • {project.category || "Full Stack Application"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#F2F2EE] tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#92969F] leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Action CTAs & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#252A32]">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs"
                >
                  <Github size={14} />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lime-btn text-xs"
                >
                  <ExternalLink size={14} />
                  <span>Live Production</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Automated Interactive Showcase Reel & Gallery */}
        <div className="mb-12">
          <ProjectShowcaseReel screenshots={screenshots} title={project.title} />
        </div>

        {/* Features List */}
        {project.features && project.features.length > 0 && (
          <div className="glow-hover-card p-8 rounded-2xl mb-8">
            <h3 className="text-lg font-bold text-[#F2F2EE] mb-6 flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-[#D4F933]" />
              <span>Key Features &amp; Architecture</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="glow-hover-smokey p-4 rounded-xl text-xs font-mono text-[#92969F] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-md bg-[#101216] text-[#D4F933] border border-[#232730] flex items-center justify-center text-[10px] font-bold shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {(project.challenges?.length > 0 || project.solutions?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {project.challenges && project.challenges.length > 0 && (
              <div className="glow-hover-card p-8 rounded-2xl">
                <h3 className="text-base font-bold text-[#F2F2EE] mb-6 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#D4F933]" />
                  <span>Technical Challenges</span>
                </h3>
                <div className="space-y-3">
                  {project.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="glow-hover-smokey p-4 rounded-xl text-xs font-mono text-[#92969F] leading-relaxed"
                    >
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.solutions && project.solutions.length > 0 && (
              <div className="glow-hover-card p-8 rounded-2xl">
                <h3 className="text-base font-bold text-[#F2F2EE] mb-6 flex items-center gap-2">
                  <Lightbulb size={18} className="text-[#D4F933]" />
                  <span>Implemented Solutions</span>
                </h3>
                <div className="space-y-3">
                  {project.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="glow-hover-smokey p-4 rounded-xl text-xs font-mono text-[#92969F] leading-relaxed"
                    >
                      {sol}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Navigation Footer (Prev / Next) */}
        <div className="pt-8 border-t border-[#232730] flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="glow-hover-card flex items-center gap-3 p-4 rounded-2xl text-left w-full sm:w-auto group"
            >
              <ArrowLeft size={16} className="text-[#D4F933] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] font-mono text-[#656B75] uppercase block">PREVIOUS PROJECT</span>
                <span className="text-xs font-bold text-[#F2F2EE] line-clamp-1 group-hover:text-[#D4F933] transition-colors">{prevProject.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="glow-hover-card flex items-center gap-3 p-4 rounded-2xl text-right w-full sm:w-auto justify-end ml-auto group"
            >
              <div>
                <span className="text-[10px] font-mono text-[#656B75] uppercase block">NEXT PROJECT</span>
                <span className="text-xs font-bold text-[#F2F2EE] line-clamp-1 group-hover:text-[#D4F933] transition-colors">{nextProject.title}</span>
              </div>
              <ArrowRight size={16} className="text-[#D4F933] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
