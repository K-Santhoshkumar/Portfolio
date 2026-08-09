"use client";
import React from "react";
import { skills } from "../../data/skills";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import { motion } from "framer-motion";
import MagicCard from "@/components/ui/MagicCard";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import AiOsWindow from "@/components/ui/AiOsWindow";

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
    <section
      id="skills"
      className="py-16 px-4 max-w-6xl mx-auto min-h-screen relative z-10"
    >
      <AiOsWindow
        title="NEURAL_SKILL_MATRIX::FULL_DB"
        command="cat /sys/skills_database.json --verbose"
        statusText="MATRIX::LOADED"
        depth={35}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-mono">
            Skills & Expertise
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            A comprehensive overview of my technical arsenal and professional capabilities.
          </p>
        </motion.div>

        {/* Technical Skills Section */}
        <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-8 border-b border-cyan-500/30 pb-3 inline-block font-mono">
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 mb-12">
          {technicalSkills.map((skill, idx) => {
            const Icon = iconMap[skill.icon] as IconComponent;
            return (
              <MagicCard
                key={skill.name}
                className="rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400 shadow-lg group h-28 sm:h-36 w-full flex items-center justify-center relative overflow-hidden transition-colors"
              >

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="p-3 flex flex-col items-center justify-center gap-3 h-full w-full relative z-10"
                >
                  <MagneticWrapper strength={0.5} className="z-20">
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner relative group-hover:border-cyan-400">
                      <div className="text-3xl transition-all duration-300 group-hover:scale-110 drop-shadow-md">
                        {Icon &&
                          (["SiNextdotjs", "FaGithub", "SiVercel", "SiExpress", "SiShadcnui", "SiSpringboot", "FaDocker", "SiGithubactions", "SiApachekafka", "FaLinux"].includes(skill.icon) ? (
                            <Icon className={`${skill.color}`} />
                          ) : (
                            <div className={skill.color}>
                              <Icon />
                            </div>
                          ))}
                      </div>

                    </div>
                  </MagneticWrapper>
                  <h4 className="font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors text-center text-xs z-10 relative">
                    {skill.name}
                  </h4>
                </motion.div>
              </MagicCard>
            );
          })}
        </div>

        {/* Soft Skills Section */}
        <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-8 border-b border-cyan-500/30 pb-3 inline-block font-mono">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
          {softSkills.map((skill, idx) => {
            const Icon = iconMap[skill.icon] as IconComponent;
            return (
              <MagicCard
                key={skill.name}
                className="rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400 shadow-lg group h-36 w-full flex items-center justify-center relative overflow-hidden transition-colors"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="p-3 flex flex-col items-center justify-center gap-3 h-full w-full relative z-10"
                >
                  <MagneticWrapper strength={0.5} className="z-20">
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner relative group-hover:border-cyan-400">
                      <div className={`text-3xl ${skill.color} transition-all duration-300 group-hover:scale-110 drop-shadow-md`}>
                        {Icon && <Icon />}
                      </div>
                    </div>
                  </MagneticWrapper>
                  <h4 className="font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-colors text-center text-xs z-10 relative">
                    {skill.name}
                  </h4>
                </motion.div>
              </MagicCard>
            );
          })}
        </div>
      </AiOsWindow>
    </section>
  );
}

