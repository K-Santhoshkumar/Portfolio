"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects, Project } from "../data/projects";

const DUMMY_IMAGE = "https://placehold.co/600x400?text=Project";

export default function ProjectsSection(): React.ReactElement {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
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
      {isMobile ? (
        <motion.div
          className="flex gap-6 overflow-x-auto pb-4"
          drag="x"
          dragConstraints={{
            left: -320 * (projects.slice(0, 3).length - 1),
            right: 0,
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.slice(0, 3).map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="min-w-[320px] max-w-xs rounded-xl overflow-hidden bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700"
            >
              <div className="relative h-48 w-full bg-gray-900">
                <Image
                  src={project.imagePath}
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
        </motion.div>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {projects.slice(0, 3).map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="rounded-xl overflow-hidden bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700"
            >
              <div className="relative h-48 w-full bg-gray-900">
                <Image
                  src={project.imagePath}
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
        </motion.div>
      )}
    </section>
  );
}
