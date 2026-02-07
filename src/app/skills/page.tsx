"use client";
import React from "react";
import { skills } from "../../data/skills";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import { motion } from "framer-motion";
import MagicCard from "@/components/ui/MagicCard";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

type IconComponent = React.ComponentType<{ className?: string }>;

const iconMap: Record<string, IconComponent> = {
  ...FaIcons,
  ...SiIcons,
  ...GiIcons,
};



export default function Skills(): React.ReactElement {
  const technicalSkills = skills.filter((s) => s.type === "technical");
  const softSkills = skills.filter((s) => s.type === "soft");

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="py-16 px-4 max-w-6xl mx-auto bg-transparent min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Skills & Expertise
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
          A comprehensive overview of my technical arsenal and professional capabilities.
        </p>
      </motion.div>

      {/* Technical Skills Section */}
      <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-8 mt-12 border-b border-cyan-500/30 pb-4 inline-block">
        Technical Skills
      </h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-16">
        {technicalSkills.map((skill, idx) => {
          const Icon = iconMap[skill.icon] as IconComponent;
          return (
            <MagicCard
              key={skill.name}
              className="rounded-2xl bg-white/5 dark:bg-card-bg/40 backdrop-blur-xl border border-white/10 dark:border-card-border/60 shadow-lg group h-40 w-full flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 flex flex-col items-center justify-center gap-4 h-full w-full relative z-10"
              >
                <MagneticWrapper strength={0.5} className="z-20">
                  <div className="p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner relative group-hover:bg-white/10">
                    <div className={`text-4xl transition-all duration-300 group-hover:scale-110 drop-shadow-md`}>
                      {Icon &&
                        (["SiNextdotjs", "FaGithub", "SiVercel", "SiExpress", "SiShadcnui"].includes(skill.icon) ? (
                          <Icon className={`${skill.color}`} />
                        ) : (
                          <div className={skill.color}>
                            <Icon />
                          </div>
                        ))}
                    </div>
                  </div>
                </MagneticWrapper>
                <h4 className="font-bold text-gray-200 group-hover:text-cyan-400 transition-colors text-center text-sm sm:text-base z-10 relative mt-2">
                  {skill.name}
                </h4>
              </motion.div>
            </MagicCard>
          );
        })}
      </div>

      {/* Soft Skills Section */}
      <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-8 mt-4 border-b border-cyan-500/30 pb-4 inline-block">
        Soft Skills
      </h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {softSkills.map((skill, idx) => {
          const Icon = iconMap[skill.icon] as IconComponent;
          return (
            <MagicCard
              key={skill.name}
              className="rounded-2xl bg-white/5 dark:bg-card-bg/40 backdrop-blur-xl border border-white/10 dark:border-card-border/60 shadow-lg group h-40 w-full flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 flex flex-col items-center justify-center gap-4 h-full w-full relative z-10"
              >
                <MagneticWrapper strength={0.5} className="z-20">
                  <div className="p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner relative group-hover:bg-white/10">
                    <div className={`text-4xl ${skill.color} transition-all duration-300 group-hover:scale-110 drop-shadow-md`}>
                      {Icon && <Icon />}
                    </div>
                  </div>
                </MagneticWrapper>
                <h4 className="font-bold text-gray-200 group-hover:text-cyan-400 transition-colors text-center text-sm sm:text-base z-10 relative mt-2">
                  {skill.name}
                </h4>
              </motion.div>
            </MagicCard>
          );
        })}
      </div>
    </motion.section>
  );
}
