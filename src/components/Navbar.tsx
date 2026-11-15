"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret owner shortcut to access admin dashboard: Ctrl + Shift + A or Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        window.location.href = "/admin";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#07080A]/90 backdrop-blur-md border-[#262B35] shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
            : "bg-[#07080A]/75 backdrop-blur-sm border-[#232730]/70"
        }`}
      >
        {/* Monogram / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#12151B] border border-[#232730] flex items-center justify-center font-mono text-xs font-bold text-[#D4F933] group-hover:border-[#D4F933] group-hover:shadow-[0_0_16px_rgba(212,249,51,0.35)] group-hover:scale-105 transition-all duration-300">
            SK
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-[#F2F2EE] group-hover:text-[#D4F933] transition-colors">
              SANTHOSHKUMAR
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#656B75] group-hover:text-[#92969F] transition-colors">
              ENGINEER
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0E1117] border border-[#232730] rounded-full p-1 shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#161B23] text-[#D4F933] font-semibold border border-[#D4F933]/50 shadow-[0_0_12px_rgba(212,249,51,0.15)]"
                    : "text-[#92969F] hover:text-[#F2F2EE] hover:bg-[#161B23]/50"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Availability Status */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1117] border border-[#232730] text-[10px] font-mono text-[#92969F]">
            <span className="status-beacon">
              <span className="status-beacon-ping" />
              <span className="status-beacon-dot" />
            </span>
            <span>AVAILABLE FOR ROLES</span>
          </div>

          {/* Resume Download */}
          <a
            href="/Santhosh.pdf"
            download="Santhoshkumar_K_Resume.pdf"
            className="lime-btn text-xs py-1.5 px-3.5"
          >
            <Download size={12} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-[#92969F] hover:text-[#D4F933]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 rounded-2xl bg-[#101216]/95 backdrop-blur-md border border-[#252A32] shadow-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161A20] border border-[#252A32] text-[11px] font-mono text-[#D4F933]">
            <span className="status-beacon">
              <span className="status-beacon-ping" />
              <span className="status-beacon-dot" />
            </span>
            <span>AVAILABLE FOR ROLES</span>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#92969F] hover:text-[#D4F933] hover:bg-[#161A20] rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#252A32] flex items-center justify-center">
            <a
              href="/Santhosh.pdf"
              download="Santhoshkumar_K_Resume.pdf"
              className="lime-btn text-xs py-2 px-4 w-full justify-center"
            >
              <Download size={13} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
