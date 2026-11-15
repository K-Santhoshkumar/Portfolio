"use client";

import React, { useState } from "react";
import {
  Code,
  Server,
  Layers,
  Database,
  Cloud,
  Workflow,
  Brain,
} from "lucide-react";
import { SkillItem } from "@/data/skills";

interface SkillsSectionProps {
  skillsList?: SkillItem[];
}

interface SkillGroup {
  id: string;
  number: string;
  title: string;
  icon: React.ElementType;
  skills: string[];
}

const EXACT_SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    number: "01",
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "PHP"],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend Engineering",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "Spring Boot",
      "FastAPI",
      "Flask",
      "REST API Design",
      "JWT Authentication",
      "Socket.IO",
      "WebSockets",
      "Kafka",
      "Prisma ORM",
      "Mongoose",
    ],
  },
  {
    id: "frontend",
    number: "03",
    title: "Frontend Engineering",
    icon: Layers,
    skills: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "EJS",
      "Redux",
      "Vite",
      "SASS",
      "Shadcn UI",
    ],
  },
  {
    id: "databases",
    number: "04",
    title: "Database Engineering",
    icon: Database,
    skills: [
      "MongoDB",
      "MongoDB Atlas",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
    ],
  },
  {
    id: "devops",
    number: "05",
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "Git",
      "GitHub",
      "CI/CD Pipelines",
      "Docker",
      "Vercel",
      "Netlify",
      "Linux",
    ],
  },
  {
    id: "practices",
    number: "06",
    title: "Tools & Practices",
    icon: Workflow,
    skills: [
      "Postman",
      "Agile/Scrum",
      "Secure Coding",
      "API Testing",
      "Performance Optimization",
      "VS Code",
      "Axios",
      "OAuth 2.0",
    ],
  },
  {
    id: "fundamentals",
    number: "07",
    title: "Core Fundamentals & Soft Skills",
    icon: Brain,
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "Database Management Systems",
      "System Architecture",
      "Analytical Thinking",
      "Cross-Functional Collaboration",
      "Problem Solving",
    ],
  },
];

export default function SkillsSection({ skillsList = [] }: SkillsSectionProps) {
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const totalSkillCount =
    skillsList.length > 0
      ? skillsList.length
      : EXACT_SKILL_GROUPS.reduce((acc, group) => acc + group.skills.length, 0);

  const filteredGroups =
    activeGroup === "all"
      ? EXACT_SKILL_GROUPS
      : EXACT_SKILL_GROUPS.filter((g) => g.id === activeGroup);

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Technical Capabilities &amp; Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F2EE]">
            Technical Stack.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] max-w-md font-mono">
          Comprehensive inventory of verified languages, backend engines, databases, and architectural fundamentals ({totalSkillCount} active capabilities).
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <button
          onClick={() => setActiveGroup("all")}
          className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
            activeGroup === "all"
              ? "lime-btn text-xs font-bold shadow-md"
              : "bg-[#101216] text-[#92969F] border border-[#252A32] hover:border-[#D4F933] hover:text-[#D4F933] shadow-xs"
          }`}
        >
          All Categories ({totalSkillCount})
        </button>

        {EXACT_SKILL_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              activeGroup === group.id
                ? "lime-btn text-xs font-bold shadow-md"
                : "bg-[#101216] text-[#92969F] border border-[#252A32] hover:border-[#D4F933] hover:text-[#D4F933] shadow-xs"
            }`}
          >
            {group.number} {group.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Editorial Skill Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.id}
              className="glow-hover-card p-6 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#232730] mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#12151B] border border-[#232730] flex items-center justify-center text-[#D4F933] group-hover:border-[#D4F933]/60 transition-colors">
                      <Icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-[#F2F2EE] tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#656B75] group-hover:text-[#D4F933] transition-colors">
                    /{group.number}
                  </span>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skillName) => (
                    <span
                      key={skillName}
                      className="tech-tag text-xs"
                    >
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group Footer Count */}
              <div className="pt-4 mt-6 border-t border-[#232730] flex items-center justify-between text-[11px] font-mono text-[#656B75]">
                <span className="font-medium">CONFIRMED PROFICIENCY</span>
                <span className="text-[#D4F933] font-bold">{group.skills.length} TECHNOLOGIES</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
