"use client";
import { motion } from "framer-motion";
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
    icon: <SiExpress className="text-black dark:text-white" size={32} />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-blue-700" size={32} />,
  },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" size={32} /> },
  {
    name: "GitHub",
    icon: <FaGithub className="text-black dark:text-white" size={32} />,
  },
  {
    name: "Vercel",
    icon: <SiVercel className="text-black dark:text-white" size={32} />,
  },
];

export default function SkillsSection(): React.ReactElement {
  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
          Technical Skills
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Technologies I work with regularly
        </p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="p-6 rounded-lg bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700 flex flex-col items-center"
          >
            <div className="mb-3">{skill.icon}</div>
            <h3 className="font-medium text-white text-center">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
