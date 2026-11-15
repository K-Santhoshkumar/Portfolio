"use client";

import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { ExperienceData } from "@/data/initialData";

interface ExperienceSectionProps {
  experiences?: ExperienceData[];
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  // Use passed experiences or fallback to GoalStox
  const expList =
    experiences.length > 0
      ? experiences
      : [
          {
            id: "exp-1",
            role: "Software Development Intern",
            company: "GoalStox, Mumbai",
            date: "November 2025 – February 2026",
            type: "INTERNSHIP",
            description: [
              "Developed and unit-tested backend services and RESTful workflows using Python and Django.",
              "Implemented role-based access control across four user tiers.",
              "Worked on OTP authentication, profile-completion gates, and secure activation workflows.",
              "Built and tested REST APIs for deal management, portfolio tracking, KYC workflows, and secure onboarding.",
              "Collaborated with cross-functional teams in an Agile/Scrum environment.",
            ],
            techStack: [
              "Python",
              "Django",
              "PostgreSQL",
              "REST APIs",
              "JWT",
              "RBAC",
              "Agile/Scrum",
            ],
          },
        ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Career &amp; Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F2EE]">
            Professional Experience.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] max-w-md font-mono">
          Production engineering, backend systems, and agile team collaboration.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-8 relative">
        {expList.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="glow-hover-card p-8 rounded-2xl relative overflow-hidden group"
          >
            {/* Top Row: Role, Company & Meta */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#252A32]">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#161A20] border border-[#252A32] text-[#D4F933] text-[10px] font-mono font-bold mb-2">
                  <span>{exp.type || "INTERNSHIP"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F2EE] tracking-tight">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#92969F] font-mono mt-1">
                  <span className="text-[#F2F2EE] font-bold">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[#D4F933]" />
                    {exp.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#656B75]">
                    <MapPin size={12} className="text-[#D4F933]" />
                    Mumbai, India
                  </span>
                </div>
              </div>

              {/* Role Type Indicator */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] font-semibold self-start md:self-auto">
                <Briefcase size={14} />
                <span>Verified Engineering Role</span>
              </div>
            </div>

            {/* Middle: Responsibilities List */}
            <div className="py-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#656B75] block mb-2 font-bold">
                Key Engineering Responsibilities:
              </span>
              <ul className="space-y-2.5">
                {exp.description.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3 text-sm text-[#92969F] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: Tech Stack Metadata Badges */}
            <div className="pt-4 border-t border-[#252A32] flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#656B75] mr-2 font-bold">TECH STACK:</span>
              {exp.techStack.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
