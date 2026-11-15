"use client";

import React, { useState, useEffect } from "react";
import { FileText, Upload, Download, Eye, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface ResumeInfo {
  fileName: string;
  filePath: string;
  fileSize: number;
  updatedAt: string;
}

export default function AdminResumePage() {
  const [resume, setResume] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch("/api/admin/resume");
      const json = await res.json();
      if (json.success && json.resume) {
        setResume(json.resume);
      }
    } catch (err) {
      console.error("Failed to fetch resume:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatusMessage({ type: "error", text: "Please upload a valid PDF document." });
      return;
    }

    setUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "resume");

    try {
      // 1. Upload file directly into public/Santhosh.pdf
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok || !uploadJson.url) {
        throw new Error(uploadJson.error || "File upload failed.");
      }

      // 2. Set active resume in local portfolio store
      const saveRes = await fetch("/api/admin/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filePath: uploadJson.url,
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      const saveJson = await saveRes.json();
      if (saveRes.ok && saveJson.success) {
        setResume(saveJson.resume);
        setStatusMessage({
          type: "success",
          text: `Active resume replaced with "${file.name}"! Saved directly into public/Santhosh.pdf.`,
        });
      } else {
        throw new Error(saveJson.error || "Failed to update resume record.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error uploading resume.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
          Resume Document Management
        </h1>
        <p className="text-xs text-[#92969F] mt-1 font-mono">
          Uploaded resumes are directly stored into <span className="font-mono text-[#D4F933] font-semibold">public/Santhosh.pdf</span> for immediate public download.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 font-mono ${
            statusMessage.type === "success"
              ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
              : "bg-red-500/10 border border-red-500/25 text-red-400"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={15} className="text-[#D4F933] shrink-0" />
          ) : (
            <AlertCircle size={15} className="text-red-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {loading || !resume ? (
        <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
          LOADING RESUME STATUS...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Resume Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-xl bg-[#1F242D] border border-[#252A32] flex items-center justify-center text-[#D4F933] shrink-0">
                <FileText size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4F933]/10 border border-[#D4F933]/20 text-[#D4F933] text-[10px] font-mono font-bold mb-1">
                  <CheckCircle2 size={11} />
                  <span>ACTIVE RESUME DOCUMENT</span>
                </div>
                <h3 className="text-base font-bold text-[#F2F2EE]">{resume.fileName}</h3>
                <div className="flex items-center gap-3 text-xs text-[#656B75] font-mono mt-0.5">
                  <span>{(resume.fileSize / 1024).toFixed(1)} KB</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <label className="lime-btn text-xs cursor-pointer">
                <Upload size={14} />
                <span>{uploading ? "Uploading..." : "Replace Resume PDF"}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUploadResume}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <a
                href={resume.filePath}
                download={resume.fileName}
                className="btn-secondary text-xs"
              >
                <Download size={14} />
                <span>Download</span>
              </a>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary text-xs"
              >
                <Eye size={14} />
                <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
              </button>
            </div>
          </div>

          {/* PDF Viewer Frame */}
          {showPreview && (
            <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#92969F] font-semibold mb-4">
                Active Document Preview
              </h3>
              <div className="w-full h-[650px] rounded-xl overflow-hidden border border-[#252A32] bg-[#161A20]">
                <iframe
                  src={`${resume.filePath}#toolbar=0`}
                  className="w-full h-full border-0"
                  title="Resume Viewer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
