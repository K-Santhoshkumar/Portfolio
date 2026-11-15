"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowDown,
  Download,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { ProfileData } from "@/data/initialData";

interface WelcomeSectionProps {
  profileData: ProfileData;
}

export default function WelcomeSection({ profileData }: WelcomeSectionProps) {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-between">
      {/* Top Editorial Metadata Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#252A32] text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-[#D4F933]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933] animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">AVAILABLE FOR ENGINEERING ROLES</span>
          </div>

          <span className="hidden sm:inline text-[#252A32]">•</span>

          <span className="text-[#92969F] flex items-center gap-1.5">
            <MapPin size={12} className="text-[#D4F933]" />
            Tamil Nadu, India
          </span>

          <span className="hidden sm:inline text-[#252A32]">•</span>

          <span className="text-[#656B75] flex items-center gap-1.5">
            <Clock size={12} className="text-[#D4F933]" />
            {timeString ? `${timeString} IST` : "UTC+5:30"}
          </span>
        </div>

        <div className="text-[#656B75] font-mono text-xs hidden md:block">
          B.Tech (Hons.) IT • <strong className="text-[#F2F2EE]">8.41 CGPA</strong>
        </div>
      </div>

      {/* Main Editorial Hero Typography */}
      <div className="my-auto py-12 sm:py-16 space-y-8">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[#D4F933] uppercase font-bold block">
            {profileData.title}
          </span>

          <h1 className="text-4xl sm:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#F2F2EE] leading-[1.02]">
            Santhoshkumar K
          </h1>

          <p className="text-2xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-[#92969F] leading-[1.15] max-w-4xl">
            Designing and engineering digital systems with intentional architecture, clean code, and thoughtful craft.
          </p>
        </div>

        {/* Narrative Paragraph */}
        <p className="text-base sm:text-lg text-[#92969F] leading-relaxed max-w-3xl font-normal">
          Software engineer with strong computer science fundamentals in Data Structures &amp; Algorithms, Object-Oriented Programming, Operating Systems, and Database Management Systems. Experienced in building and testing full-stack applications with Python, Django, JavaScript, TypeScript, React, Node.js, and Java.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a href="#projects" className="lime-btn">
            <span>View Featured Projects</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="/Santhosh.pdf"
            download="Santhoshkumar_K_Resume.pdf"
            className="btn-secondary"
          >
            <Download size={14} />
            <span>Download Resume</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="btn-secondary text-xs"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#D4F933]" />
                <span className="text-[#D4F933]">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{profileData.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Social References */}
        <div className="flex items-center gap-5 pt-2 text-xs font-mono text-[#92969F]">
          <span className="text-[#656B75] uppercase tracking-wider text-[11px]">Connect:</span>
          {profileData.githubUrl && (
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4F933] transition-colors flex items-center gap-1"
            >
              <Github size={13} />
              <span>GitHub</span>
              <ArrowUpRight size={11} className="text-[#656B75]" />
            </a>
          )}
          {profileData.linkedinUrl && (
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4F933] transition-colors flex items-center gap-1"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
              <ArrowUpRight size={11} className="text-[#656B75]" />
            </a>
          )}
          <a
            href="#contact"
            className="hover:text-[#D4F933] transition-colors flex items-center gap-1"
          >
            <Mail size={13} />
            <span>Contact Form</span>
          </a>
        </div>
      </div>

      {/* Editorial Competency Index Strip with High Premium Hover */}
      <div className="pt-8 border-t border-[#232730] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="glow-hover-card p-4 rounded-xl space-y-1">
          <span className="text-[#656B75] block uppercase tracking-wider text-[10px] font-bold">
            01 / BACKEND &amp; APIS
          </span>
          <span className="text-[#F2F2EE] font-semibold block">
            Python, Django, Node.js, Spring Boot
          </span>
          <p className="text-[#92969F] text-[11px] leading-relaxed">
            RESTful workflows, RBAC, JWT, rate-limiting &amp; modular services.
          </p>
        </div>

        <div className="glow-hover-card p-4 rounded-xl space-y-1">
          <span className="text-[#656B75] block uppercase tracking-wider text-[10px] font-bold">
            02 / CLIENT ARCHITECTURE
          </span>
          <span className="text-[#F2F2EE] font-semibold block">
            Next.js, React, TypeScript, Tailwind
          </span>
          <p className="text-[#92969F] text-[11px] leading-relaxed">
            Component-driven systems, state machines &amp; responsive UI design.
          </p>
        </div>

        <div className="glow-hover-card p-4 rounded-xl space-y-1">
          <span className="text-[#656B75] block uppercase tracking-wider text-[10px] font-bold">
            03 / DATA PERSISTENCE
          </span>
          <span className="text-[#F2F2EE] font-semibold block">
            PostgreSQL, MongoDB, MySQL, SQL
          </span>
          <p className="text-[#92969F] text-[11px] leading-relaxed">
            ACID compliance, schema modeling, query optimization &amp; connection pooling.
          </p>
        </div>

        <div className="glow-hover-card p-4 rounded-xl space-y-1">
          <span className="text-[#656B75] block uppercase tracking-wider text-[10px] font-bold">
            04 / VERIFIED EXPERIENCE
          </span>
          <span className="text-[#D4F933] font-semibold block">
            NMSWorks • GoalStox • GCE Erode
          </span>
          <p className="text-[#92969F] text-[11px] leading-relaxed">
            Software Engineer at NMSWorks (Jul 2026 – Present), GoalStox SDE Intern, 8.41 CGPA.
          </p>
        </div>
      </div>
    </section>
  );
}
