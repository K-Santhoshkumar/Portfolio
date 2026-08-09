"use client";

import React, { useState, useEffect } from "react";

import { projects } from "../../data/projects";
import type { Project } from "../../data/projects";

import Image from "next/image";

import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import { motion } from "framer-motion";
import AiOsWindow from "@/components/ui/AiOsWindow";




function isValidImagePath(path: string): boolean {
  return (
    typeof path === "string" &&
    (path.startsWith("/") || path.startsWith("http"))
  );
}


export default function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
        <div className="h-20 w-1/3 mx-auto bg-gray-200/10 rounded animate-pulse mb-16" />
        <div className="space-y-12 opacity-0">
          <div className="h-64 bg-gray-200/10 rounded-3xl" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-20 px-4 max-w-5xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary tracking-tighter">
          Projects
        </h2>
        <p className="text-xl text-foreground/80 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Explore my work. Click a project for details.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 md:gap-16">
        {projects.map((project: Project, index: number) => (
          <AiOsWindow
            key={project.id}
            title={`DEPLOYED_BUILD_0${index + 1}`}
            command={`./run_module.sh --project=${project.id}`}
            statusText="STATUS::DEPLOYED"
            depth={35}
          >
            <div
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center group`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Image */}
              <div 
                className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-500"
                style={{ transform: "translateZ(30px)" }}
              >
                <Link href={`/projects/${project.id}`} className="block h-full w-full relative">
                  {isValidImagePath(project.imagePath) ? (
                    <Image
                      src={project.imagePath}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentNode as HTMLElement | null;
                        if (parent) {
                          const fallback = parent.querySelector(".fallback-img");
                          fallback?.classList.remove("hidden");
                        }
                      }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  ) : null}
                  <div className="fallback-img absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white text-center text-base font-semibold hidden font-mono">
                    {project.title}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-cyan-300 font-mono text-sm font-bold flex items-center gap-2">
                      View Project <FiExternalLink />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Project Info */}
              <div 
                className="w-full md:w-1/2 flex flex-col space-y-5"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="space-y-1">
                  <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase font-bold">PROJECT_0{index + 1}</span>
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-100 hover:text-cyan-300 transition-colors cursor-pointer">
                      {project.title}
                    </h3>
                  </Link>
                </div>

                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <Link href={`/projects/${project.id}`} className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors font-mono font-bold group/link underline underline-offset-8 text-sm">
                    <span>Full details</span>
                    <FiExternalLink size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank" className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors font-mono font-bold group/link text-sm">
                      <FiExternalLink size={20} className="group-hover/link:scale-110 transition-transform" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </AiOsWindow>
        ))}
      </div>
    </section>
  );
}

