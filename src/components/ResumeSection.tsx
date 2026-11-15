"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  CheckCircle,
  Globe,
  Monitor,
} from "lucide-react";

interface ResumeSectionProps {
  resumeUrl?: string;
  fileName?: string;
}

export default function ResumeSection({
  resumeUrl = "/Santhosh.pdf",
  fileName = "Santhosh.pdf",
}: ResumeSectionProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [viewerMode, setViewerMode] = useState<"google" | "native">("google");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      setOrigin(currentOrigin);
      // If running on localhost, Google Docs viewer cannot access private loopback, so use native
      if (currentOrigin.includes("localhost") || currentOrigin.includes("127.0.0.1")) {
        setViewerMode("native");
      } else {
        // In production on Vercel, default to Google Docs viewer for universal cross-browser/mobile rendering
        setViewerMode("google");
      }
    }
  }, []);

  const fullPdfUrl = origin ? `${origin}${resumeUrl}` : resumeUrl;
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    fullPdfUrl
  )}&embedded=true`;

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
            {/* Viewer Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#656B75]">
                  Viewer:
                </span>
                <div className="inline-flex rounded-lg bg-[#161A20] border border-[#252A32] p-0.5 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setViewerMode("google")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                      viewerMode === "google"
                        ? "bg-[#D4F933] text-black font-bold shadow-xs"
                        : "text-[#92969F] hover:text-[#F2F2EE]"
                    }`}
                    title="Universal Cloud Viewer (works on all devices & mobile)"
                  >
                    <Globe size={11} />
                    <span>Cloud Viewer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewerMode("native")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                      viewerMode === "native"
                        ? "bg-[#D4F933] text-black font-bold shadow-xs"
                        : "text-[#92969F] hover:text-[#F2F2EE]"
                    }`}
                    title="Native Browser PDF Reader"
                  >
                    <Monitor size={11} />
                    <span>Native Reader</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D4F933] font-semibold hover:underline flex items-center gap-1.5 font-mono"
                >
                  <span>Open in Fullscreen</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Embedded Viewport */}
            <div className="w-full h-[650px] sm:h-[750px] rounded-xl overflow-hidden border border-[#252A32] bg-[#090A0C] relative">
              {viewerMode === "google" ? (
                <iframe
                  src={googleViewerUrl}
                  className="w-full h-full border-0 bg-white"
                  title="Cloud Resume Viewer"
                />
              ) : (
                <iframe
                  src={`${resumeUrl}#toolbar=0`}
                  className="w-full h-full border-0"
                  title="Native Resume Viewer"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
