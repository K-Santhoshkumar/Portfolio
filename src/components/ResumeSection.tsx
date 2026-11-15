"use client";

import React, { useState } from "react";
import { FileText, Download, Eye, ExternalLink, CheckCircle } from "lucide-react";

interface ResumeSectionProps {
  resumeUrl?: string;
  fileName?: string;
}

export default function ResumeSection({
  resumeUrl = "/Santhosh.pdf",
  fileName = "Santhosh.pdf",
}: ResumeSectionProps) {
  const [showPreview, setShowPreview] = useState(false);

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
              <p className="text-xs sm:text-sm text-[#92969F] mt-1 max-w-md">
                Detailed career summary, full technical stack, engineering achievements, and educational credentials.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary text-xs"
            >
              <Eye size={14} className="text-[#D4F933]" />
              <span>{showPreview ? "Hide Preview" : "Preview PDF"}</span>
            </button>

            <a
              href={resumeUrl}
              download={fileName}
              className="lime-btn text-xs"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Inline PDF Preview Modal/Frame */}
        {showPreview && (
          <div className="mt-8 pt-8 border-t border-[#252A32]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#656B75]">
                Displaying {fileName}
              </span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D4F933] font-semibold hover:underline flex items-center gap-1 font-mono"
              >
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-[#252A32] bg-[#090A0C]">
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                className="w-full h-full border-0"
                title="Resume Preview"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
