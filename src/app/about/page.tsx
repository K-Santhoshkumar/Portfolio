"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects, Project } from "../../data/projects";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { GoLocation } from "react-icons/go";

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto py-10 px-2 sm:py-16 sm:px-4 text-white relative z-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left: Profile & Contact */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:w-1/3 flex flex-col items-center md:items-start bg-white/10 rounded-2xl p-4 sm:p-8 shadow-lg mb-8 md:mb-0 gap-6"
        >
          <Image
            src="/portfolio_logo.png"
            alt="Santhoshkumar Logo"
            width={110}
            height={110}
            className="rounded-full border-4 border-cyan-400 shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold text-cyan-400 mb-1">
            Santhoshkumar K
          </h1>
          <div className="flex items-center gap-2 text-gray-200 mb-2">
            <GoLocation className="text-blue-400" />
            Erode, Tamil Nadu
          </div>
          <div className="flex flex-col gap-2 text-base mb-4 w-full">
            <span className="flex items-center gap-2 text-green-400">
              <FaPhoneAlt className="text-green-400" />
              <a href="tel:+918344790660" className="hover:underline">
                +91 83447 90660
              </a>
            </span>
            <span className="flex items-center gap-2 text-red-400">
              <MdEmail className="text-red-400 text-xl align-middle" />
              <a
                href="mailto:santhoshkumark2505@gmail.com"
                className="hover:underline"
              >
                santhoshkumark2505@gmail.com
              </a>
            </span>
            <span className="flex items-center gap-2 text-blue-400">
              <FaLinkedin className="text-blue-400" />
              <a
                href="https://www.linkedin.com/in/santhoshkumar-k"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                santhoshkumar-k
              </a>
            </span>
            <span className="flex items-center gap-2 text-white">
              <FaGithub className="text-white" />
              <a
                href="https://github.com/K-Santhoshkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                K-Santhoshkumar
              </a>
            </span>
          </div>
          <motion.a
            href="/Santhosh.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-colors text-lg mt-2"
          >
            Download Resume
          </motion.a>
          {/* Fun Fact / Hobbies */}
          <div className="bg-cyan-900/30 rounded-xl p-4 mt-6 w-full text-center">
            <h3 className="text-cyan-300 font-semibold mb-1 text-base">
              Fun Fact
            </h3>
            <p className="text-gray-200 text-sm">
              I love visualizing data, exploring new tech, and I’m a big fan of
              sci-fi movies and cricket!
            </p>
          </div>
          {/* Favorite Tools */}
          <div className="bg-cyan-900/30 rounded-xl p-4 mt-4 w-full text-center">
            <h3 className="text-cyan-300 font-semibold mb-1 text-base">
              Favorite Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-cyan-100">
              <span className="bg-cyan-800 px-2 py-1 rounded">VS Code</span>
              <span className="bg-cyan-800 px-2 py-1 rounded">GitHub</span>
              <span className="bg-cyan-800 px-2 py-1 rounded">
                MongoDB Atlas
              </span>
              <span className="bg-cyan-800 px-2 py-1 rounded">Netlify</span>
              <span className="bg-cyan-800 px-2 py-1 rounded">Vercel</span>
            </div>
          </div>
          {/* Soft Skills */}
          <div className="bg-cyan-900/30 rounded-xl p-4 mt-4 w-full text-center">
            <h3 className="text-cyan-300 font-semibold mb-1 text-base">
              Soft Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-cyan-100">
              <span className="bg-cyan-800 px-2 py-1 rounded">
                Quick Learner
              </span>
              <span className="bg-cyan-800 px-2 py-1 rounded">
                Team Management
              </span>
              <span className="bg-cyan-800 px-2 py-1 rounded">
                Adaptability
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right: Details */}
        <div className="md:w-2/3 flex flex-col gap-6 sm:gap-8">
          {/* Personal Statement / Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-cyan-300 mb-2">
              My Approach
            </h2>
            <p className="text-gray-200 text-lg">
              I believe in building web apps that are not just functional, but
              delightful to use. My process is hands-on: I love rapid
              prototyping, iterating with feedback, and always keeping the user
              experience at the center. I enjoy collaborating with teams and
              learning from every project.
            </p>
          </motion.div>

          {/* Timeline for Education & Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-lg font-bold text-cyan-300 mb-4">Timeline</h2>
            <ol className="relative border-l-2 border-cyan-700 ml-2">
              <li className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-1.5 top-1.5 border-2 border-cyan-700" />
                <div className="text-base font-semibold text-cyan-200">
                  2019 – 2020
                </div>
                <div className="text-gray-200 text-sm">
                  10th Standard, Mangalam Higher Secondary School, Erode
                </div>
                <div className="text-gray-400 text-xs">97.6%</div>
              </li>
              <li className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-1.5 top-1.5 border-2 border-cyan-700" />
                <div className="text-base font-semibold text-cyan-200">
                  2020 – 2022
                </div>
                <div className="text-gray-200 text-sm">
                  Higher Secondary, Mangalam Higher Secondary School, Erode
                </div>
                <div className="text-gray-400 text-xs">12th: 91.5%</div>
              </li>
              <li className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-1.5 top-1.5 border-2 border-cyan-700" />
                <div className="text-base font-semibold text-cyan-200">
                  2022 – 2026
                </div>
                <div className="text-gray-200 text-sm">
                  B.Tech (Hons) IT, Government College of Engineering, Erode
                </div>
                <div className="text-gray-400 text-xs">CGPA: 8.43</div>
              </li>
              <li className="ml-4">
                <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-1.5 top-1.5 border-2 border-cyan-700" />
                <div className="text-base font-semibold text-cyan-200">
                  2025
                </div>
                <div className="text-gray-200 text-sm">
                  Launched SocioPedia, Blog App, and Excel Analysis Platform
                </div>
              </li>
            </ol>
          </motion.div>

          {/* Project Cards: SocioPedia & Excel Analysis Platform */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-md flex flex-col items-center gap-6"
          >
            <h2 className="text-lg font-bold text-cyan-300 mb-4">
              Featured Projects
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch w-full">
              {[projects[0], projects[3]].map(
                (project: Project, idx: number) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex flex-col items-center bg-gray-900/80 rounded-xl border-2 border-cyan-400 shadow-lg p-4 w-full max-w-xs transition-transform hover:scale-105 hover:shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <Image
                      src={project.imagePath}
                      alt={project.title}
                      width={220}
                      height={140}
                      className="rounded-lg border border-cyan-300 shadow mb-3 object-cover"
                      priority={idx === 0}
                    />
                    <h3 className="text-xl font-bold text-cyan-200 mb-1 text-center">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-2 text-center">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2 justify-center">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-cyan-800 text-cyan-100 border border-cyan-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-2 text-cyan-300 text-sm font-semibold flex items-center gap-1">
                      View Details <FiExternalLink />
                    </span>
                  </Link>
                )
              )}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-lg font-bold text-cyan-300 mb-2">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Infosys Springboard – Java Programming Fundamentals",
                "NPTEL – Data Structures and Algorithms with Python",
                "NPTEL – Privacy and Security in Online Social Media",
                "LetsUpgrade Bootcamp – HTML, CSS",
                "Udemy – JavaScript Mastery",
                "Newton School – SQL (MySQL)",
              ].map((cert) => (
                <div
                  key={cert}
                  className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-700 text-cyan-100 text-sm shadow flex items-center"
                >
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Domain Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-lg font-bold text-cyan-300 mb-2">
              Domain Interests
            </h2>
            <p className="text-gray-200 text-base">
              Full stack web development with PHP, MERN stack, database
              integration and querying, problem solving in Python, DSA.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
