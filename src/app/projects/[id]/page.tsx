"use client";

import React, { useEffect, useState } from "react";


import { projects } from "../../../data/projects";
import type { Project } from "@/data/projects";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertTriangle, Zap, Layers, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import AiOsWindow from "@/components/ui/AiOsWindow";

const DUMMY_IMAGE = "https://placehold.co/600x400?text=Project";
const DUMMY_SCREENSHOT = "https://placehold.co/800x500?text=Screenshot";

function getProjectScreenshots(project: Project) {
  if (project.title.includes("SocioPedia")) {
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
  if (project.title.includes("Blog App")) {
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
  if (project.title.includes("Recipe App")) {
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
  if (project.title.includes("Excel Analysis Platform")) {
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
  if (project.title.includes("Car Rental System")) {
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
  if (project.title.toLowerCase().includes("bmi")) {
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
  if (project.screenshots && project.screenshots.length > 0) {
    return project.screenshots.filter((src) => src && src.startsWith("/"));
  }
  return [DUMMY_SCREENSHOT];
}

// Automated Showcase Reel Component with Progress Bar Timer & Controls
function AutomatedShowcaseReel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1 || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
      setProgressKey((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [screenshots.length, isPlaying, currentIndex]);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    setProgressKey((prev) => prev + 1);
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    setProgressKey((prev) => prev + 1);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = DUMMY_IMAGE;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Automated Slideshow Screen */}
      <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/40 shadow-2xl mb-4 group/reel flex items-center justify-center">
        {/* Animated Cyan Timer Progress Line at top */}
        {isPlaying && screenshots.length > 1 && (
          <motion.div
            key={progressKey}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 z-40 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
          />
        )}

        {/* Previous Button */}
        {screenshots.length > 1 && (
          <button
            onClick={goLeft}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-slate-950/80 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/50 rounded-full p-2.5 shadow-xl transition-colors font-bold text-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Active Screenshot with Ken Burns Motion Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={screenshots[currentIndex]}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <Image
              src={screenshots[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              fill
              className="object-cover"
              onError={handleImageError}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        {screenshots.length > 1 && (
          <button
            onClick={goRight}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-slate-950/80 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/50 rounded-full p-2.5 shadow-xl transition-colors font-bold text-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Automated Showcase Controls Ribbon (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 bg-slate-950/90 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md">
          <span className="text-cyan-300 font-bold">
            {currentIndex + 1} / {screenshots.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold ml-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 animate-pulse" /> PAUSE
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> AUTO PLAY
              </>
            )}
          </button>
        </div>

        {/* Cyber Frame Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
      </div>

      {/* Sliding Filmstrip Thumbnail Reel */}
      {screenshots.length > 1 && (
        <div className="flex gap-2.5 flex-wrap justify-center max-h-28 overflow-y-auto p-1 w-full">
          {screenshots.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => {
                setCurrentIndex(i);
                setProgressKey((prev) => prev + 1);
              }}
              className={`relative rounded-xl overflow-hidden w-16 h-12 border-2 transition-all ${
                currentIndex === i
                  ? "border-cyan-400 scale-105 shadow-[0_0_14px_rgba(0,240,255,0.7)]"
                  : "border-slate-800 opacity-60 hover:opacity-100"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                onError={handleImageError}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
function CyberSection({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 rounded-2xl bg-slate-900/80 border border-cyan-500/25 p-5 shadow-xl backdrop-blur-xl">
      <button
        className="flex items-center justify-between w-full font-mono font-bold text-base text-cyan-300 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2.5">
          {icon}
          {title}
        </span>
        <span
          className={`transform transition-transform text-cyan-400 font-bold text-sm ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          ▶
        </span>
      </button>
      {open && <div className="mt-4 pt-3 border-t border-cyan-500/15">{children}</div>}
    </div>
  );
}

export default function ProjectDetail() {
  const params = useParams<{ id: string }>() || { id: "" };
  const { id } = params;
  const project: Project | undefined = projects.find(
    (p: Project) => p.id === id
  );
  if (!project) notFound();
  const screenshots = getProjectScreenshots(project);

  return (
    <section className="py-10 px-2 md:px-4 max-w-6xl mx-auto font-mono relative z-10">
      {/* Return to Project Explorer Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 bg-slate-900/80 border border-cyan-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-slate-800 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Project Explorer
        </Link>
        <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
          STATUS::DEPLOYED_SYSTEM
        </span>
      </div>

      <AiOsWindow
        title={`PROJECT_INSPECTOR::${project.id.toUpperCase()}`}
        command={`./inspect_project.sh --id=${project.id}`}
        statusText="INSPECTOR::ONLINE"
        depth={35}
      >
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Automated Showcase Reel */}
          <div className="lg:w-1/2 w-full">
            <AutomatedShowcaseReel screenshots={screenshots} title={project.title} />
          </div>

          {/* Project Details Panel */}
          <div className="lg:w-1/2 w-full flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 mb-3 tracking-tight">
                {project.title}
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="mb-6">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-2">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08 }}
                      className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 shadow-sm hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Accordion Sections: Features, Challenges, Solutions */}
              {project.features && project.features.length > 0 && (
                <CyberSection title="System Features" icon={<Zap className="w-4 h-4 text-cyan-400" />}>
                  <ul className="space-y-2 text-slate-200 text-xs sm:text-sm font-sans">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CyberSection>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <CyberSection title="Technical Challenges" icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}>
                  <ul className="space-y-2 text-slate-200 text-xs sm:text-sm font-sans">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold">&gt;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </CyberSection>
              )}

              {project.solutions && project.solutions.length > 0 && (
                <CyberSection title="Engineering Solutions" icon={<Layers className="w-4 h-4 text-purple-400" />}>
                  <ul className="space-y-2 text-slate-200 text-xs sm:text-sm font-sans">
                    {project.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CyberSection>
              )}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-cyan-500/20 flex-wrap">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2.5 text-xs font-mono font-bold px-6 py-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-xl hover:shadow-cyan-500/20"
                >
                  <Github className="w-4 h-4" /> View Source Code
                </Link>
              )}
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  className="flex items-center gap-2.5 text-xs font-mono font-black px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 transition-all shadow-xl shadow-cyan-500/30"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>
      </AiOsWindow>
    </section>
  );
}


