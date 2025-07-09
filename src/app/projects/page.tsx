"use client";
import { projects, Project } from "../../data/projects";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <section
      id="projects"
      className="py-20 px-4 max-w-6xl mx-auto bg-transparent"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Projects
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Explore my work. Click a project for details.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: Project, idx: number) => {
          const imagePath = project.imagePath;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-left focus:outline-none focus:ring-2 focus:ring-cyan-400"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                }}
                className="transition-transform duration-300"
              >
                <div className="relative h-48 w-full">
                  {isValidImagePath(imagePath) ? (
                    <Image
                      src={imagePath}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget
                          .parentNode as HTMLElement | null;
                        if (parent) {
                          const fallback =
                            parent.querySelector(".fallback-img");
                          fallback?.classList.remove("hidden");
                        }
                      }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={idx === 0}
                    />
                  ) : null}
                  <div className="fallback-img absolute inset-0 flex items-center justify-center bg-black text-white text-center text-base font-semibold hidden">
                    {project.title}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 min-h-[40px]">
                    {project.description}
                  </p>
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
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
