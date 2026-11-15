"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Building } from "lucide-react";
import { EducationData } from "@/data/initialData";

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEdu, setEditingEdu] = useState<EducationData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<EducationData | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await fetch("/api/admin/education");
      const json = await res.json();
      if (json.success && json.educations) {
        setEducations(json.educations);
      }
    } catch (err) {
      console.error("Failed to load educations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    try {
      const url = "/api/admin/education";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEdu),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setEducations(json.educations);
        setEditingEdu(null);
        setIsNew(false);
        setStatusMessage({
          type: "success",
          text: isNew ? "Education added successfully!" : "Education updated!",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Operation failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving education." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/education?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setEducations(json.educations);
        setDeleteConfirm(null);
        setStatusMessage({ type: "success", text: "Education entry deleted." });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Failed to delete." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error deleting education." });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
            Education Management
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Manage degrees, institutions, grades, and academic credentials.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingEdu({
              id: `edu_${Date.now()}`,
              degree: "",
              institution: "",
              period: "November 2022 – June 2026",
              grade: "CGPA: 8.41 / 10",
              order: educations.length + 1,
            });
          }}
          className="lime-btn text-xs self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center justify-between ${
            statusMessage.type === "success"
              ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
              : "bg-red-500/10 border border-red-500/25 text-red-400"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
          LOADING EDUCATION QUALIFICATIONS...
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933]/50 shadow-sm transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#F2F2EE]">{edu.degree}</h3>
                <p className="text-xs text-[#92969F] flex items-center gap-1.5 font-medium">
                  <Building size={13} className="text-[#D4F933]" />
                  {edu.institution}
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <span className="font-mono text-[#656B75]">{edu.period}</span>
                  {edu.grade && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1F242D] border border-[#252A32] text-[#D4F933] text-[11px] font-mono font-bold">
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingEdu(edu);
                  }}
                  className="p-2.5 rounded-xl bg-[#161A20] text-[#92969F] hover:text-[#D4F933] border border-[#252A32] hover:border-[#D4F933]/50 transition-colors"
                  title="Edit Entry"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(edu)}
                  className="p-2.5 rounded-xl bg-red-950/30 text-red-400 hover:bg-red-950/60 border border-red-800/40 transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F2F2EE]">Confirm Deletion</h3>
            <p className="text-xs text-[#92969F] leading-relaxed">
              Are you sure you want to delete <span className="text-[#F2F2EE] font-bold">&quot;{deleteConfirm.degree}&quot;</span>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-red-500 hover:bg-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Education Modal */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] max-w-md w-full my-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#252A32]">
              <h3 className="text-base font-bold text-[#F2F2EE]">
                {isNew ? "Add Education" : "Edit Education"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="text-[#656B75] hover:text-[#F2F2EE] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Degree / Qualification *
              </label>
              <input
                type="text"
                value={editingEdu.degree}
                onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                required
                placeholder="B.Tech (Hons.), Information Technology"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Institution Name *
              </label>
              <input
                type="text"
                value={editingEdu.institution}
                onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                required
                placeholder="Government College of Engineering, Erode"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Years / Period *
                </label>
                <input
                  type="text"
                  value={editingEdu.period}
                  onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  required
                  placeholder="November 2022 – June 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Grade / CGPA
                </label>
                <input
                  type="text"
                  value={editingEdu.grade || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                  placeholder="CGPA: 8.41 / 10"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252A32]">
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="lime-btn text-xs"
              >
                Save Education
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
