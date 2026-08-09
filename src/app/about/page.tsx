"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { FaGithub, FaLinkedin, FaPhoneAlt, FaCheckCircle, FaAward, FaGraduationCap } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import AiOsWindow from "@/components/ui/AiOsWindow";

export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-2 sm:py-16 sm:px-4 text-white relative z-10">
      {/* System HUD Overview Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <FaGraduationCap size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Education</span>
            <span className="text-sm font-mono font-bold text-slate-100">B.Tech IT (8.43)</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <GoLocation size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Location</span>
            <span className="text-sm font-mono font-bold text-slate-100">Erode, TN</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <FaAward size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Certifications</span>
            <span className="text-sm font-mono font-bold text-slate-100">6 Verified</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <FaCheckCircle size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Status</span>
            <span className="text-xs font-mono font-bold text-emerald-400">AVAILABLE</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left: Profile & Contact */}
        <div className="md:w-1/3">
          <AiOsWindow
            title="SYS_PROFILE_CARD"
            command="./view_identity.sh"
            statusText="IDENTITY::VERIFIED"
            depth={30}
          >
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="relative group">
                <Image
                  src="/portfolio_logo.png"
                  alt="Santhoshkumar Logo"
                  width={115}
                  height={115}
                  className="rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-500/40 mb-2 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h1 className="text-2xl font-bold text-cyan-300 mb-1 font-mono">
                Santhoshkumar K
              </h1>
              <div className="flex items-center gap-2 text-slate-300 mb-2 text-sm font-mono">
                <GoLocation className="text-purple-400" />
                Erode, Tamil Nadu
              </div>
              <div className="flex flex-col gap-2.5 text-sm mb-4 w-full font-mono">
                <span className="flex items-center gap-2 text-emerald-400">
                  <FaPhoneAlt />
                  <a href="tel:+918344790660" className="hover:underline">
                    +91 83447 90660
                  </a>
                </span>
                <span className="flex items-center gap-2 text-rose-400">
                  <MdEmail className="text-lg align-middle" />
                  <a
                    href="mailto:santhoshkumark2505@gmail.com"
                    className="hover:underline break-all"
                  >
                    santhoshkumark2505@gmail.com
                  </a>
                </span>
                <span className="flex items-center gap-2 text-cyan-400">
                  <FaLinkedin />
                  <a
                    href="https://www.linkedin.com/in/santhoshkumar-k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    santhoshkumar-k
                  </a>
                </span>
                <span className="flex items-center gap-2 text-slate-100">
                  <FaGithub />
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
                className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black shadow-xl shadow-cyan-500/30 transition-all text-sm text-center w-full font-mono tracking-wider"
              >
                Download Resume
              </motion.a>
              {/* Fun Fact / Hobbies */}
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 mt-2 w-full text-center">
                <h3 className="text-cyan-300 font-mono font-semibold mb-1 text-sm">
                  Fun Fact
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  I love visualizing data, exploring new tech, and I’m a big fan of
                  sci-fi movies and cricket!
                </p>
              </div>
              {/* Favorite Tools */}
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 w-full text-center">
                <h3 className="text-cyan-300 font-mono font-semibold mb-2 text-sm">
                  Favorite Tools
                </h3>
                <div className="flex flex-wrap justify-center gap-1.5 text-xs text-cyan-200 font-mono">
                  <span className="bg-slate-950 border border-cyan-500/30 px-2.5 py-1 rounded-lg">VS Code</span>
                  <span className="bg-slate-950 border border-cyan-500/30 px-2.5 py-1 rounded-lg">GitHub</span>
                  <span className="bg-slate-950 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
                    MongoDB Atlas
                  </span>
                  <span className="bg-slate-950 border border-cyan-500/30 px-2.5 py-1 rounded-lg">Netlify</span>
                  <span className="bg-slate-950 border border-cyan-500/30 px-2.5 py-1 rounded-lg">Vercel</span>
                </div>
              </div>
              {/* Soft Skills */}
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 w-full text-center">
                <h3 className="text-cyan-300 font-mono font-semibold mb-2 text-sm">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap justify-center gap-1.5 text-xs text-emerald-300 font-mono">
                  <span className="bg-slate-950 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    Quick Learner
                  </span>
                  <span className="bg-slate-950 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    Team Management
                  </span>
                  <span className="bg-slate-950 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    Adaptability
                  </span>
                </div>
              </div>
            </div>
          </AiOsWindow>
        </div>

        {/* Right: Details */}
        <div className="md:w-2/3 flex flex-col gap-6">
          {/* Personal Statement / Approach */}
          <AiOsWindow
            title="SYSTEM_APPROACH_MODULE"
            command="cat /sys/philosophy.txt"
            statusText="STRATEGY::ACTIVE"
            depth={25}
          >
            <div>
              <h2 className="text-xl font-bold text-cyan-300 mb-2 font-mono">
                My Approach
              </h2>
              <p className="text-slate-200 text-base md:text-lg leading-relaxed">
                I believe in building web apps that are not just functional, but
                delightful to use. My process is hands-on: I love rapid
                prototyping, iterating with feedback, and always keeping the user
                experience at the center. I enjoy collaborating with teams and
                learning from every project.
              </p>
            </div>
          </AiOsWindow>

          {/* Timeline for Education & Milestones */}
          <AiOsWindow
            title="MILESTONE_TIMELINE_DB"
            command="cat /var/log/education_history.log"
            statusText="TIMELINE::VERIFIED"
            depth={25}
          >
            <div>
              <h2 className="text-xl font-bold text-cyan-300 mb-4 font-mono">Timeline</h2>
              <ol className="relative border-l-2 border-cyan-500/40 ml-2 space-y-6">
                <li className="ml-4">
                  <div className="absolute w-3.5 h-3.5 bg-cyan-400 rounded-full -left-[7px] top-1.5 border-2 border-slate-950 animate-pulse" />
                  <div className="text-sm font-bold text-cyan-300 font-mono">
                    2019 – 2020
                  </div>
                  <div className="text-slate-200 text-sm font-medium">
                    10th Standard, Mangalam Higher Secondary School, Erode
                  </div>
                  <span className="inline-block mt-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                    Score: 97.6%
                  </span>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3.5 h-3.5 bg-purple-400 rounded-full -left-[7px] top-1.5 border-2 border-slate-950 animate-pulse" />
                  <div className="text-sm font-bold text-purple-300 font-mono">
                    2020 – 2022
                  </div>
                  <div className="text-slate-200 text-sm font-medium">
                    Higher Secondary, Mangalam Higher Secondary School, Erode
                  </div>
                  <span className="inline-block mt-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-400/30">
                    12th Score: 91.5%
                  </span>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3.5 h-3.5 bg-emerald-400 rounded-full -left-[7px] top-1.5 border-2 border-slate-950 animate-pulse" />
                  <div className="text-sm font-bold text-emerald-300 font-mono">
                    2022 – 2026
                  </div>
                  <div className="text-slate-200 text-sm font-medium">
                    B.Tech (Hons) IT, Government College of Engineering, Erode
                  </div>
                  <span className="inline-block mt-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                    CGPA: 8.43
                  </span>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3.5 h-3.5 bg-amber-400 rounded-full -left-[7px] top-1.5 border-2 border-slate-950 animate-pulse" />
                  <div className="text-sm font-bold text-amber-300 font-mono">
                    2025
                  </div>
                  <div className="text-slate-200 text-sm font-medium">
                    Launched SocioPedia, Blog App, and Excel Analysis Platform
                  </div>
                </li>
              </ol>
            </div>
          </AiOsWindow>

          {/* Certifications */}
          <AiOsWindow
            title="CERTIFICATION_CREDENTIALS"
            command="ls -la /credentials/certs"
            statusText="CERTS::AUTHENTIC"
            depth={25}
          >
            <div>
              <h2 className="text-xl font-bold text-cyan-300 mb-4 font-mono">
                Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="bg-slate-900/70 rounded-xl p-3.5 border border-cyan-500/25 hover:border-cyan-400 text-slate-200 text-xs shadow flex items-center gap-2.5 transition-all font-mono hover:bg-slate-900 group"
                  >
                    <FaCheckCircle className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </AiOsWindow>

          {/* Domain Interests */}
          <AiOsWindow
            title="DOMAIN_INTERESTS_DB"
            command="cat /sys/domain_interests.json"
            statusText="ACTIVE::FOCUS"
            depth={25}
          >
            <div>
              <h2 className="text-xl font-bold text-cyan-300 mb-2 font-mono">
                Domain Interests
              </h2>
              <p className="text-slate-200 text-base leading-relaxed">
                Full stack web development with PHP, MERN stack, database
                integration and querying, problem solving in Python, DSA.
              </p>
            </div>
          </AiOsWindow>
        </div>
      </div>
    </section>
  );
}


