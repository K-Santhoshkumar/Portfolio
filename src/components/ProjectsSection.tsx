"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Database,
  ChevronDown,
} from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectsSectionProps {
  projectsList: Project[];
}

function SafeProjectImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      src={failed ? "/portfolio_logo.png" : src}
      alt={alt}
      fill
      className={className}
      onError={() => {
        if (!failed) {
          setFailed(true);
        }
      }}
    />
  );
}

export default function ProjectsSection({ projectsList }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Spotlight primary case studies (top 3)
  const spotlightProjects = projectsList.slice(0, 3);
  const remainingProjects = projectsList.slice(3);
  const filteredRemaining = remainingProjects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Selected Work &amp; Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F2EE]">
            Featured Projects.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] max-w-md font-mono">
          Full-stack architectures, real-time mechanics, and practical systems engineering.
        </p>
      </div>

      {/* Spotlight Digital Case Studies (Alternating Editorial Layouts) */}
      <div className="space-y-24">
        {spotlightProjects.map((project, idx) => {
          const projectNum = String(idx + 1).padStart(2, "0");
          const isEven = idx % 2 === 1;

          return (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text & Architecture Details Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Project Index & Category */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-bold text-[#D4F933]">
                    /{projectNum}
                  </span>
                  <span className="w-8 h-[1px] bg-[#252A32]" />
                  <span className="text-xs font-mono tracking-wider text-[#656B75] uppercase font-bold">
                    {project.category || "Full Stack Application"}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F2F2EE]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#92969F] leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features Bullet Highlights */}
                {project.features && project.features.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#92969F]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-3 flex-wrap">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lime-btn text-xs"
                    >
                      <span>Live Deployment</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  ) : null}

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-[#D4F933] hover:underline transition-colors"
                  >
                    <span>Read Architecture →</span>
                  </Link>
                </div>
              </div>

              {/* Visual Preview / Real Project Screenshot */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="glow-hover-card relative aspect-[16/10] w-full rounded-2xl overflow-hidden group">
                  <SafeProjectImage
                    src={project.imagePath}
                    alt={project.title}
                    className="object-cover object-top group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/80 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-xs font-mono font-bold text-[#D4F933] bg-[#101216]/90 px-3 py-1 rounded-full border border-[#252A32] shadow-sm">
                      {project.tags.slice(0, 3).join(" • ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Archive of All 14 Projects */}
      <div className="mt-28 pt-12 border-t border-[#252A32]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#F2F2EE]">
              Complete Project Archive
            </h3>
            <p className="text-xs text-[#92969F] font-mono mt-0.5">
              Full collection of utility tools, full-stack systems, and web applications ({projectsList.length} total).
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161A20] hover:bg-[#1E232B] border border-[#252A32] text-xs font-mono text-[#D4F933] font-semibold transition-colors self-start sm:self-auto shadow-xs"
          >
            <span>{showAll ? "Collapse Archive" : `View All (${remainingProjects.length} more)`}</span>
            <ChevronDown size={14} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
        </div>

        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredRemaining.map((p) => (
              <div
                key={p.id}
                className="glow-hover-card p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0B0D12] border border-[#232730] mb-4">
                    <SafeProjectImage
                      src={p.imagePath}
                      alt={p.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <h4 className="text-base font-bold text-[#F2F2EE] mb-2 line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#92969F] leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#252A32] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#92969F] hover:text-[#D4F933] flex items-center gap-1 font-medium"
                      >
                        <Github size={12} />
                        Code
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#92969F] hover:text-[#D4F933] flex items-center gap-1 font-medium"
                      >
                        <ExternalLink size={12} />
                        Demo
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${p.id}`}
                    className="text-[#D4F933] font-semibold hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
