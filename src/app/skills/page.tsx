"use client";
import { skills } from "../../data/skills";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";

const iconMap: Record<string, React.ElementType> = {
  ...FaIcons,
  ...SiIcons,
  ...GiIcons,
};

interface TiltCardProps {
  children: React.ReactNode;
}
function TiltCard({ children }: TiltCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8; // max 8deg
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  function handleMouseLeave() {
    const card = ref.current;
    if (card)
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08, boxShadow: "0 4px 24px 0 #22d3ee33" }}
      className="transition-transform duration-200"
    >
      {children}
    </motion.div>
  );
}

export default function Skills(): React.ReactElement {
  const technicalSkills = skills.filter((s) => s.type === "technical");
  const softSkills = skills.filter((s) => s.type === "soft");

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="py-16 px-2 sm:px-4 max-w-6xl mx-auto bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-500">
          Skills
        </h2>
        <p className="text-lg font-bold text-white max-w-2xl mx-auto">
          Technologies and soft skills I work with
        </p>
      </motion.div>

      {/* Technical Skills Section */}
      <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6 mt-8">
        Technical Skills
      </h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
        {technicalSkills.map((skill, idx) => {
          const Icon = iconMap[skill.icon];
          return (
            <TiltCard key={skill.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg bg-white/80 hover:bg-white/90 transition-all min-h-[120px] min-w-[100px] group border border-transparent hover:border-cyan-300`}
              >
                <motion.div
                  whileHover={{ scale: 1.18, rotate: [0, 10, -10, 0] }}
                  className={`mb-2 text-3xl sm:text-4xl ${skill.color}`}
                >
                  {Icon &&
                    ([
                      "SiNextdotjs",
                      "FaGithub",
                      "SiVercel",
                      "SiExpress",
                      "SiShadcnui",
                    ].includes(skill.icon) ? (
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black">
                        <Icon
                          className={skill.color + " text-2xl sm:text-3xl"}
                        />
                      </span>
                    ) : (
                      <Icon />
                    ))}
                </motion.div>
                <h4 className="font-semibold text-gray-900 text-center text-xs sm:text-sm">
                  {skill.name}
                </h4>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>

      {/* Soft Skills Section */}
      <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6 mt-8">
        Soft Skills
      </h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
        {softSkills.map((skill, idx) => {
          const Icon = iconMap[skill.icon];
          return (
            <TiltCard key={skill.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg bg-white/80 hover:bg-white/90 transition-all min-h-[120px] min-w-[100px] group border border-transparent hover:border-cyan-300`}
              >
                <motion.div
                  whileHover={{ scale: 1.18, rotate: [0, 10, -10, 0] }}
                  className={`mb-2 text-3xl sm:text-4xl ${skill.color}`}
                >
                  {Icon && <Icon />}
                </motion.div>
                <h4 className="font-semibold text-gray-900 text-center text-xs sm:text-sm">
                  {skill.name}
                </h4>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </motion.section>
  );
}
