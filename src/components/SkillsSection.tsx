"use client";
import { motion } from "framer-motion";
import MagicCard from "@/components/ui/MagicCard";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import AiOsWindow from "@/components/ui/AiOsWindow";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaGithub,
} from "react-icons/fa";
import { SiExpress, SiPostgresql, SiMongodb, SiVercel } from "react-icons/si";

import React from "react";

const skills = [
  { name: "Java", icon: <FaJava className="text-red-500" size={32} /> },
  { name: "Python", icon: <FaPython className="text-blue-400" size={32} /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" size={32} /> },
  { name: "React", icon: <FaReact className="text-cyan-400" size={32} /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={32} /> },
  { name: "Express", icon: <SiExpress className="text-slate-100" size={32} /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" size={32} /> },
  { name: "MongoDB", icon: <SiMongodb className="text-emerald-500" size={32} /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={32} /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={32} /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-400" size={32} /> },
  { name: "GitHub", icon: <FaGithub className="text-slate-100" size={32} /> },
  { name: "Vercel", icon: <SiVercel className="text-slate-100" size={32} /> },
];



export default function SkillsSection(): React.ReactElement {
  return (
    <section id="skills" className="py-8 sm:py-20 px-1 sm:px-4 max-w-6xl mx-auto text-foreground w-full">
      <AiOsWindow
        title="NEURAL_SKILL_MATRIX"
        command="cat /sys/skills_database.db --all"
        statusText="MATRIX::LOADED"
        depth={30}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="text-xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tight font-mono">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Technologies I work with regularly
          </p>
        </motion.div>
        <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4">
          {skills.map((skill, index) => (
            <MagicCard
              key={skill.name}
              className="rounded-xl sm:rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 shadow-md group h-24 sm:h-36 w-full flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="p-1.5 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-3 h-full w-full"
              >
                <MagneticWrapper strength={0.5} className="z-20">
                  <div className="p-2 sm:p-3 rounded-full bg-slate-950 skill-icon-bg border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner relative group-hover:border-cyan-400">
                    {React.cloneElement(skill.icon as React.ReactElement<{ size?: number; className?: string }>, { size: 22, className: (skill.icon as React.ReactElement<{ className?: string }>).props.className })}
                  </div>
                </MagneticWrapper>
                <h3 className="font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors text-center text-[10px] sm:text-xs z-10 relative truncate max-w-full">{skill.name}</h3>
              </motion.div>
            </MagicCard>
          ))}
        </div>
      </AiOsWindow>
    </section>
  );
}

