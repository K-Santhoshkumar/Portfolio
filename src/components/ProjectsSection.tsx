"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects, Project } from "../data/projects";
import AiOsWindow from "./ui/AiOsWindow";

const DUMMY_IMAGE = "https://placehold.co/600x400?text=Project";

export default function ProjectsSection(): React.ReactElement {
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
    <section id="projects" className="py-20 px-4 max-w-5xl mx-auto text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
          A selection of my recent works and technical contributions.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 md:gap-16">
        {projects.slice(0, 3).map((project: Project, index: number) => (
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
              {/* Project Image with Z-axis 3D Elevation */}
              <div 
                className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-500"
                style={{ transform: "translateZ(30px)" }}
              >
                <Link href={`/projects/${project.id}`} className="block h-full w-full relative">
                  <Image
                    src={project.imagePath}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DUMMY_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-cyan-300 font-mono text-sm font-bold flex items-center gap-2">
                      View Case Study <FiExternalLink />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Project Info with Z-axis 3D Depth */}
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
                  {project.tags.map((tech) => (
                    <span key={tech} className="text-xs font-mono uppercase font-bold px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <Link href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors font-mono font-bold group/link text-sm">
                    <FaGithub size={20} className="group-hover/link:scale-110 transition-transform" />
                    <span>Code</span>
                  </Link>
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank" className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors font-mono font-bold group/link text-sm">
                      <FiExternalLink size={20} className="group-hover/link:scale-110 transition-transform" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                  <Link href={`/projects/${project.id}`} className="ml-auto inline-flex items-center justify-center p-3 rounded-xl bg-cyan-500 text-slate-950 hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20 font-bold">
                    <FiExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </AiOsWindow>
        ))}
      </div>
    </section>
  );
}

