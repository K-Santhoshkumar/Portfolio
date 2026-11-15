"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Building2, Calendar } from "lucide-react";
import { ExperienceData } from "@/data/initialData";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<ExperienceData | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/admin/experience");
      const json = await res.json();
      if (json.success && json.experiences) {
        setExperiences(json.experiences);
      }
    } catch (err) {
      console.error("Failed to load experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    try {
      const url = "/api/admin/experience";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExp),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setExperiences(json.experiences);
        setEditingExp(null);
        setIsNew(false);
        setStatusMessage({
          type: "success",
          text: isNew ? "Experience entry added!" : "Experience entry updated!",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Operation failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving experience." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/experience?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setExperiences(json.experiences);
        setDeleteConfirm(null);
        setStatusMessage({ type: "success", text: "Experience entry deleted." });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Failed to delete experience." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error deleting experience." });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
            Work Experience Management
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Manage professional roles, internships, and key accomplishments.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingExp({
              id: `exp_${Date.now()}`,
              role: "",
              company: "",
              date: "Month Year – Present",
              type: "FULL_TIME",
              description: [""],
              techStack: ["Python", "Django"],
            });
          }}
          className="lime-btn text-xs self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Add Experience</span>
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
          LOADING EXPERIENCES ARCHIVE...
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933]/50 shadow-sm transition-all flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-[#F2F2EE]">{exp.role}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1F242D] border border-[#252A32] text-[#D4F933]">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#F2F2EE] font-bold">
                    <Building2 size={13} className="text-[#D4F933]" />
                    {exp.company}
                  </span>
                  <span className="text-[#252A32]">•</span>
                  <span className="flex items-center gap-1.5 text-[#656B75]">
                    <Calendar size={13} className="text-[#D4F933]" />
                    {exp.date}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {exp.description.map((d, idx) => (
                    <p key={idx} className="text-xs text-[#92969F] leading-relaxed">
                      • {d}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingExp(exp);
                  }}
                  className="p-2.5 rounded-xl bg-[#161A20] text-[#92969F] hover:text-[#D4F933] border border-[#252A32] hover:border-[#D4F933]/50 transition-colors"
                  title="Edit Entry"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(exp)}
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
              Are you sure you want to delete experience at <span className="text-[#F2F2EE] font-bold">&quot;{deleteConfirm.company}&quot;</span>?
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
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-red-500 hover:bg-red-400 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Experience Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] max-w-xl w-full my-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#252A32]">
              <h3 className="text-base font-bold text-[#F2F2EE]">
                {isNew ? "Add Experience" : "Edit Experience"}
              </h3>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="text-[#656B75] hover:text-[#F2F2EE] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Job Title / Role *
                </label>
                <input
                  type="text"
                  value={editingExp.role}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, role: e.target.value })
                  }
                  required
                  placeholder="Software Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={editingExp.company}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, company: e.target.value })
                  }
                  required
                  placeholder="e.g. GoalStox"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Dates of Employment *
                </label>
                <input
                  type="text"
                  value={editingExp.date}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, date: e.target.value })
                  }
                  required
                  placeholder="November 2025 – February 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  Role Type
                </label>
                <select
                  value={editingExp.type}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, type: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                >
                  <option value="FULL_TIME" className="bg-[#101216] text-[#F2F2EE]">Full Time</option>
                  <option value="INTERNSHIP" className="bg-[#101216] text-[#F2F2EE]">Internship</option>
                  <option value="CONTRACT" className="bg-[#101216] text-[#F2F2EE]">Contract</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Descriptions (one bullet per line) *
              </label>
              <textarea
                value={editingExp.description?.join("\n") || ""}
                onChange={(e) =>
                  setEditingExp({
                    ...editingExp,
                    description: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none leading-relaxed font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Technologies Used (comma-separated) *
              </label>
              <input
                type="text"
                value={editingExp.techStack?.join(", ") || ""}
                onChange={(e) =>
                  setEditingExp({
                    ...editingExp,
                    techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                required
                placeholder="Python, Django, REST APIs, RBAC"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252A32]">
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="lime-btn text-xs"
              >
                Save Experience
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
