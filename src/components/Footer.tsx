"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#252A32] bg-[#090A0C] text-[#92969F] py-16 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#161A20] border border-[#252A32] flex items-center justify-center font-mono text-xs font-bold text-[#D4F933]">
            SK
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F2F2EE] tracking-tight">
              Santhoshkumar K
            </h4>
            <p className="text-[11px] font-mono text-[#656B75]">
              Software Engineer / Full Stack Developer
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <a href="#about" className="hover:text-[#D4F933] transition-colors">
            About
          </a>
          <a href="#experience" className="hover:text-[#D4F933] transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-[#D4F933] transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-[#D4F933] transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-[#D4F933] transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/K-Santhoshkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#161A20] border border-[#252A32] hover:border-[#D4F933] text-[#92969F] hover:text-[#D4F933] flex items-center justify-center transition-all shadow-xs"
            title="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/santhoshkumar-k-83a2a8298"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#161A20] border border-[#252A32] hover:border-[#D4F933] text-[#92969F] hover:text-[#D4F933] flex items-center justify-center transition-all shadow-xs"
            title="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl bg-[#161A20] border border-[#252A32] hover:border-[#D4F933] text-[#92969F] hover:text-[#D4F933] flex items-center justify-center transition-all ml-1 shadow-xs"
            title="Scroll to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#252A32] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#656B75] gap-3">
        <p>© {new Date().getFullYear()} Santhoshkumar K. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
          <span>Designed &amp; Engineered with architectural precision.</span>
        </p>
      </div>
    </footer>
  );
}
