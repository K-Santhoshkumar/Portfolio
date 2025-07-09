"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects, Project } from "../data/projects";

const DUMMY_IMAGE = "https://placehold.co/600x400?text=Project";

function getProjectImage(project: Project): string {
  if (project.title.includes("SocioPedia")) {
    return "/SocioPedia_Screenshots/Screenshot 2025-07-09 165546.png";
  }
  if (project.title.includes("Blog")) {
    return "/Blog_app_Screenshots/Screenshot 2025-07-09 163812.png";
  }
  if (project.title.includes("Recipe")) {
    return "/Recipe_app_Screenshots/Screenshot 2025-07-09 164418.png";
  }
  if (project.title.includes("Excel Analysis Platform")) {
    return "/Excel_analysis_platform_Screenshots/Screenshot 2025-07-09 165138.png";
  }
  if (project.title.toLowerCase().includes("bmi")) {
    return "/BMI_Screenshots/Screenshot 2025-07-08 202021.png";
  }
  return DUMMY_IMAGE;
}

export default function ProjectsSection(): React.ReactElement {
  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
          Featured Projects
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Selection of my recent work
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, 3).map((project: Project, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.03 }}
            className="rounded-xl overflow-hidden bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700"
          >
            <div className="relative h-48 w-full bg-gray-900">
              <Image
                src={getProjectImage(project)}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DUMMY_IMAGE;
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-cyan-300">
                {project.title}
              </h3>
              <p className="text-gray-200 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-gray-700 text-cyan-200 border border-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  <FaGithub /> GitHub
                </Link>
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <FiExternalLink /> Live Demo
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
