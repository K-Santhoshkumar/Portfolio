import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects, Project } from "../data/projects";

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
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-xl text-foreground/80 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          A selection of my recent works and technical contributions.
        </p>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-24">
        {projects.slice(0, 3).map((project: Project, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center group`}
          >
            {/* Project Image */}
            <div className="w-full md:w-1/2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold flex items-center gap-2">
                    View Case Study <FiExternalLink />
                  </span>
                </div>
              </Link>
            </div>

            {/* Project Info */}
            <div className="w-full md:w-1/2 flex flex-col space-y-6">
              <div className="space-y-2">
                <span className="text-primary font-mono text-sm tracking-widest uppercase font-bold">Project 0{index + 1}</span>
                <Link href={`/projects/${project.id}`}>
                  <h3 className="text-3xl md:text-4xl font-bold hover:text-primary transition-colors cursor-pointer">
                    {project.title}
                  </h3>
                </Link>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tech) => (
                  <span key={tech} className="text-xs uppercase font-bold px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/20 backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4">
                <Link href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-bold group/link">
                  <FaGithub size={24} className="group-hover/link:scale-110 transition-transform" />
                  <span>Code</span>
                </Link>
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-bold group/link">
                    <FiExternalLink size={24} className="group-hover/link:scale-110 transition-transform" />
                    <span>Live Demo</span>
                  </Link>
                )}
                <Link href={`/projects/${project.id}`} className="ml-auto inline-flex items-center justify-center p-3 rounded-full bg-primary text-black hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <FiExternalLink size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
