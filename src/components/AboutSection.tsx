"use client";

import React from "react";
import { EducationData } from "@/data/initialData";

interface AboutSectionProps {
  bio?: string;
  approach?: string;
  funFact?: string;
  domainInterests?: string;
  educations?: EducationData[];
}

export default function AboutSection({
  bio = "Software engineer with strong computer science fundamentals in Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, and Database Management Systems. Experienced in building and testing full-stack applications using Python, JavaScript, TypeScript, and Java. Comfortable across the complete software development lifecycle, including requirements analysis, architecture, development, testing, debugging, and deployment.",
  approach = "Clean architecture, modular backend APIs, type safety, and performance-first engineering. I prioritize thoughtful code structure, robust error boundaries, and reliable end-to-end user experiences.",
  funFact = "Passionate about systems design, interactive web mechanics, and exploring algorithmic problem-solving.",
  domainInterests = "Full stack engineering, backend architectures, distributed services, REST API design, real-time web mechanics, and database systems.",
  educations = [],
}: AboutSectionProps) {
  const displayEdu =
    educations.length > 0
      ? educations[0]
      : {
          degree: "B.Tech (Hons.), Information Technology",
          institution: "Government College of Engineering, Erode",
          period: "November 2022 – June 2026",
          grade: "CGPA: 8.41 / 10",
        };

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Profile &amp; Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F2EE]">
            Beyond the Code.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] max-w-md font-mono">
          Engineering principles, academic background, and technical philosophy.
        </p>
      </div>

      {/* Editorial Content Grid: Asymmetric Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (5 cols): Manifesto & Academic Credentials */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border-l-2 border-[#D4F933] pl-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#656B75] font-bold">
              Guiding Principle
            </span>
            <p className="text-xl sm:text-2xl font-bold text-[#F2F2EE] tracking-tight leading-snug">
              &ldquo;Clean architecture, modular services, and systems built with intentional engineering.&rdquo;
            </p>
          </div>

          {/* Academic Background Block */}
          <div className="glow-hover-card p-6 rounded-2xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4F933] font-bold block">
              ACADEMIC CREDENTIALS
            </span>
            <h3 className="text-base font-bold text-[#F2F2EE]">
              {displayEdu.degree}
            </h3>
            <p className="text-xs text-[#92969F]">
              {displayEdu.institution}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#232730] text-xs font-mono">
              <span className="text-[#656B75]">{displayEdu.period}</span>
              <span className="text-[#D4F933] font-bold">{displayEdu.grade}</span>
            </div>
          </div>

          {/* Domain Focus */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[#656B75] uppercase tracking-wider text-[10px] font-bold block">
              ENGINEERING FOCUS
            </span>
            <p className="text-[#92969F] leading-relaxed">
              {domainInterests}
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Full Narrative & Fundamental Strengths */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-5">
            <p className="text-lg sm:text-xl text-[#F2F2EE] font-normal leading-relaxed">
              {bio}
            </p>
            <p className="text-base text-[#92969F] leading-relaxed">
              {approach}
            </p>
            {funFact && (
              <p className="text-sm text-[#656B75] italic leading-relaxed">
                Perspective: {funFact}
              </p>
            )}
          </div>

          {/* Computer Science Fundamentals Editorial List */}
          <div className="pt-6 border-t border-[#252A32] space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#656B75] font-bold block">
              CORE COMPUTER SCIENCE FOUNDATIONS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {[
                { name: "Data Structures & Algorithms", note: "Time/space complexity analysis & problem-solving" },
                { name: "Object-Oriented Programming", note: "Encapsulation, inheritance, polymorphism, abstraction" },
                { name: "Operating Systems", note: "Concurrency, process synchronization & memory management" },
                { name: "Database Management (DBMS)", note: "Relational normalization, ACID transactions & indexing" },
                { name: "RESTful Service Design", note: "Stateless architecture, HTTP verbs, status codes & RBAC" },
                { name: "Software Testing & Debugging", note: "Unit testing, validation gates & lifecycle debugging" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="glow-hover-smokey p-3.5 rounded-xl cursor-default"
                >
                  <span className="text-xs font-bold text-[#F2F2EE] block mb-1">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#656B75] leading-relaxed block">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
