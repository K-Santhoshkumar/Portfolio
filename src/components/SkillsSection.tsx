"use client";
import { motion } from "framer-motion";
import MagicCard from "@/components/ui/MagicCard";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
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
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={32} /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={32} /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" size={32} /> },
  { name: "Java", icon: <FaJava className="text-red-500" size={32} /> },
  { name: "Python", icon: <FaPython className="text-blue-800" size={32} /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-500" size={32} /> },
  { name: "React", icon: <FaReact className="text-blue-400" size={32} /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={32} /> },
  {
    name: "Express",
    icon: <SiExpress className="text-foreground" size={32} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-blue-700" size={32} />,
  },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" size={32} /> },
  {
    name: "GitHub",
    icon: <FaGithub className="text-foreground" size={32} />,
  },
  {
    name: "Vercel",
    icon: <SiVercel className="text-foreground" size={32} />,
  },
];

export default function SkillsSection(): React.ReactElement {
  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
          Technical Skills
        </h2>
        <p className="text-lg text-foreground dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Technologies I work with regularly
        </p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <MagicCard
            key={skill.name}
            className="rounded-2xl bg-white dark:bg-card-bg/50 backdrop-blur-xl border border-card-border/60 shadow-md group h-40 w-full flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 flex flex-col items-center justify-center gap-4 h-full w-full"
            >
              <MagneticWrapper strength={0.5} className="z-20">
                <div className="p-4 rounded-full bg-gradient-to-br from-background to-secondary/5 border border-card-border group-hover:scale-110 transition-transform duration-300 shadow-inner relative">
                  {/* Clone element to ensure className override works if needed, though direct render is usually fine if passed correctly */}
                  {React.cloneElement(skill.icon as React.ReactElement<{ size?: number; className?: string }>, { size: 32, className: (skill.icon as React.ReactElement<{ className?: string }>).props.className })}
                </div>
              </MagneticWrapper>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-center z-10 relative">{skill.name}</h3>
            </motion.div>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}
