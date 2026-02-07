import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects, Project } from "../data/projects";
import GlareCard from "@/components/ui/GlareCard";

const DUMMY_IMAGE = "https://placehold.co/600x400?text=Project";

export default function ProjectsSection(): React.ReactElement {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
          Featured Projects
        </h2>
        <p className="text-lg text-foreground dark:text-gray-300 max-w-2xl mx-auto font-medium">
          A selection of my recent works and technical contributions.
        </p>
      </motion.div>
      {isMobile ? (
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
          {projects.slice(0, 3).map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[300px] snap-center rounded-2xl overflow-hidden bg-card-bg/90 backdrop-blur-md border border-card-border shadow-xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.imagePath}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DUMMY_IMAGE;
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tech) => (
                    <span key={tech} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href={project.githubUrl} target="_blank" className="p-2 rounded-full border border-card-border hover:bg-primary/10 text-foreground transition-colors"><FaGithub size={20} /></Link>
                  {project.demoUrl && <Link href={project.demoUrl} target="_blank" className="p-2 rounded-full border border-card-border hover:bg-primary/10 text-foreground transition-colors"><FiExternalLink size={20} /></Link>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project: Project) => (
            <GlareCard
              key={project.id}
              className="rounded-3xl bg-card-bg/80 backdrop-blur-xl border-card-border/60 shadow-xl group"
            >
              <div className="relative h-full flex flex-col">
                <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={project.imagePath}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DUMMY_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full flex justify-between items-center">
                      <span className="font-bold text-lg text-primary">View Project</span>
                      <FiExternalLink className="text-primary" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-foreground dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-foreground/80 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tech) => (
                      <span key={tech} className="text-[10px] uppercase font-bold px-3 py-1.5 rounded-full bg-secondary/5 text-secondary border border-secondary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link href={project.githubUrl} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-background font-bold hover:bg-primary hover:text-white transition-all shadow-md z-20 relative">
                      <FaGithub size={18} /> Code
                    </Link>
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-card-border font-bold hover:border-primary hover:text-primary transition-all z-20 relative">
                        <FiExternalLink size={18} /> Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </GlareCard>
          ))}
        </div>
      )}
    </section>
  );
}
