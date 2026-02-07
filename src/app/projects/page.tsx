"use client";
import React, { useState, useEffect } from "react";
import { projects, Project } from "../../data/projects";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

function isValidImagePath(path: string): boolean {
  return (
    typeof path === "string" &&
    (path.startsWith("/") || path.startsWith("http"))
  );
}

const tagColors = {
  "Next.js": "bg-gray-200 text-gray-800",
  TypeScript: "bg-blue-100 text-blue-700",
  Prisma: "bg-purple-100 text-purple-700",
  Clerk: "bg-red-100 text-red-700",
  "Tailwind CSS": "bg-teal-100 text-teal-700",
  UploadThing: "bg-orange-100 text-orange-700",
  Neon: "bg-green-100 text-green-700",
  Shadcn: "bg-indigo-100 text-indigo-700",
  "React (Vite)": "bg-blue-100 text-blue-700",
  "React.js": "bg-blue-100 text-blue-700",
  "Node.js": "bg-green-100 text-green-700",
  Express: "bg-gray-100 text-gray-700",
  "Express.js": "bg-gray-100 text-gray-700",
  MongoDB: "bg-emerald-100 text-emerald-700",
  "MongoDB (Mongoose)": "bg-emerald-100 text-emerald-700",
  JWT: "bg-yellow-100 text-yellow-700",
  Multer: "bg-pink-100 text-pink-700",
  ImageKit: "bg-purple-100 text-purple-700",
  GoogleGenAI: "bg-rose-100 text-rose-700",
  Quill: "bg-violet-100 text-violet-700",
  "Chart.js": "bg-red-100 text-red-700",
  SheetJS: "bg-lime-100 text-lime-700",
  ThreeJS: "bg-cyan-100 text-cyan-700",
  PDFtoCanvas: "bg-amber-100 text-amber-700",
  PHP: "bg-indigo-100 text-indigo-700",
  HTML: "bg-orange-100 text-orange-700",
  CSS: "bg-blue-100 text-blue-700",
  JavaScript: "bg-yellow-100 text-yellow-700",
  EJS: "bg-emerald-100 text-emerald-700",
  "express-fileupload": "bg-pink-100 text-pink-700",
  "connect-flash": "bg-rose-100 text-rose-700",
};

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

      <div className="flex flex-col gap-16 md:gap-24">
        {projects.map((project: Project, index: number) => (
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
                <div className="fallback-img absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white text-center text-base font-semibold hidden">
                  {project.title}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold flex items-center gap-2">
                    View Project <FiExternalLink />
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

              <p className="text-lg text-foreground/70 dark:text-gray-300 leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border border-white/5 ${tagColors[tag as keyof typeof tagColors] ||
                      "bg-white/5 text-gray-400"
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4">
                <Link href={`/projects/${project.id}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-bold group/link underline underline-offset-8">
                  <span>Full details</span>
                  <FiExternalLink size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </Link>
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-bold group/link">
                    <FiExternalLink size={24} className="group-hover/link:scale-110 transition-transform" />
                    <span>Live Demo</span>
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
