"use client";

import React from "react";
import { FileText, Download, ExternalLink, CheckCircle } from "lucide-react";

interface ResumeSectionProps {
  resumeUrl?: string;
  fileName?: string;
}

export default function ResumeSection({
  resumeUrl = "/Santhosh.pdf",
  fileName = "Santhosh.pdf",
}: ResumeSectionProps) {
  return (
    <section id="resume" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      <div className="glow-hover-card p-8 sm:p-12 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#161A20] border border-[#252A32] flex items-center justify-center text-[#D4F933] shrink-0 shadow-xs">
              <FileText size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#161A20] border border-[#252A32] text-[#D4F933] text-[11px] font-mono font-bold mb-1.5">
                <CheckCircle size={11} />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
                Curriculum Vitae / Resume
              </h3>
              <p className="text-xs sm:text-sm text-[#92969F] mt-1 max-w-md leading-relaxed">
                Detailed career summary, full technical stack, engineering achievements, and educational credentials.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
              title="Open resume PDF in a new tab"
            >
              <ExternalLink size={14} className="text-[#D4F933]" />
              <span>View Resume</span>
            </a>

            <a
              href={resumeUrl}
              download={fileName}
              className="lime-btn text-xs"
              title="Download resume PDF file"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
