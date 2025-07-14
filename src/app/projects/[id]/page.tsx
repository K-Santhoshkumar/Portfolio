"use client";

import React from "react";

import { projects } from "../../../data/projects";
import type { Project } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <button
        className="flex items-center gap-2 font-semibold text-base text-gray-900 dark:text-white focus:outline-none mb-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          ▶
        </span>
      </button>
      {open && <div className="pl-2">{children}</div>}
    </motion.div>
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
  const [mainImgIdx, setMainImgIdx] = React.useState<number>(0);
  const mainImg = screenshots[mainImgIdx];
  const goLeft = () =>
    setMainImgIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  const goRight = () =>
    setMainImgIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));

  // Autoplay logic
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isPaused.current) {
      autoplayRef.current = setInterval(() => {
        setMainImgIdx((prev) =>
          prev === screenshots.length - 1 ? 0 : prev + 1
        );
      }, 3500);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [screenshots.length, mainImgIdx]);

  // Pause on hover/focus
  const handleMouseEnter = () => {
    isPaused.current = true;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };
  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  // Swipe gesture logic
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 40) goLeft();
    else if (touchStartX - touchEndX > 40) goRight();
  };
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = DUMMY_IMAGE;
  };

  return (
    <section className="py-12 px-2 md:px-0 max-w-5xl mx-auto font-montserrat">
      <Link
        href="/projects"
        className="text-cyan-700 dark:text-cyan-300 hover:underline mb-6 inline-block font-semibold text-base"
      >
        Back to Projects
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-10 flex flex-col md:flex-row gap-10"
      >
        {/* Gallery */}
        <div className="md:w-2/5 w-full flex flex-col items-center">
          <div
            ref={carouselRef}
            className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            aria-label="Project screenshots carousel"
          >
            {screenshots.length > 1 && (
              <button
                onClick={goLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-cyan-500/80 text-white rounded-full p-2 shadow-lg focus:outline-none"
                aria-label="Previous screenshot"
              >
                &#8592;
              </button>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImg}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <Image
                  src={mainImg}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl border-2 border-cyan-400 shadow-xl"
                  onError={handleImageError}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {screenshots.length > 1 && (
              <button
                onClick={goRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-cyan-500/80 text-white rounded-full p-2 shadow-lg focus:outline-none"
                aria-label="Next screenshot"
              >
                &#8594;
              </button>
            )}
          </div>
          {screenshots.length > 1 && (
            <div className="flex gap-2 flex-wrap justify-center mt-2">
              {screenshots.map((src, i) => (
                <motion.button
                  key={src}
                  onClick={() => setMainImgIdx(i)}
                  className={`border-2 rounded-lg overflow-hidden w-16 h-12 focus:outline-none transition-all duration-200 ${
                    mainImgIdx === i
                      ? "border-cyan-500 scale-110 shadow-cyan-400/30 shadow-lg"
                      : "border-gray-200 dark:border-gray-600 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show screenshot ${i + 1}`}
                  whileHover={{ scale: 1.12 }}
                >
                  <Image
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    width={64}
                    height={48}
                    className="object-cover w-full h-full"
                    onError={handleImageError}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
        {/* Content */}
        <div className="md:w-3/5 w-full flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-1 text-gray-900 dark:text-white"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-gray-700 dark:text-gray-200 mb-2"
          >
            {project.description}
          </motion.p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full border border-gray-200 font-medium ${
                  tagColors[tag as keyof typeof tagColors] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <Section title="Features">
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 text-sm space-y-1">
              {project.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </Section>
          <Section title="Challenges">
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 text-sm space-y-1">
              {project.challenges?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>
          <Section title="Solutions">
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 text-sm space-y-1">
              {project.solutions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>
          <Section title="Screenshots" defaultOpen={false}>
            <div className="flex gap-3 flex-wrap">
              {screenshots.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  width={160}
                  height={112}
                  className="rounded-lg border w-40 h-28 object-cover bg-gray-200 dark:bg-gray-700"
                  onError={handleImageError}
                />
              ))}
            </div>
          </Section>
          <div className="flex gap-4 mt-4 flex-wrap">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800 transition-colors shadow-md"
              >
                GitHub
              </Link>
            )}
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-cyan-700 dark:text-cyan-200 border border-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors shadow-md"
              >
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
