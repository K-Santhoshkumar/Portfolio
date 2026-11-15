"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { SkillItem } from "@/data/skills";

const ICON_OPTIONS = [
  "FaJava", "FaPython", "FaJs", "SiTypescript", "FaPhp", "FaDatabase",
  "FaHtml5", "FaCss3Alt", "SiTailwindcss", "FaSass", "FaReact", "FaNodeJs",
  "SiExpress", "SiMongoose", "SiVite", "FaKey", "FaCode", "SiRedux",
  "SiNextdotjs", "SiShadcnui", "SiMongodb", "SiMysql", "SiPostgresql",
  "SiPrisma", "SiSupabase", "FaGithub", "SiNetlify", "SiVercel",
  "SiSpringboot", "FaDocker", "SiGithubactions", "SiApachekafka", "FaLinux",
  "SiFlask", "FaNetworkWired", "SiDjango", "SiFastapi"
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "technical" | "soft">("all");

  const [editingSkill, setEditingSkill] = useState<{
    originalName?: string;
    name: string;
    icon: string;
    color: string;
    type: "technical" | "soft";
  } | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      const json = await res.json();
      if (json.success && json.skills) {
        setSkills(json.skills);
      }
    } catch (err) {
      console.error("Failed to load skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    try {
      const isEdit = Boolean(editingSkill.originalName);
      const url = "/api/admin/skills";
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit
        ? { originalName: editingSkill.originalName, updated: editingSkill }
        : editingSkill;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSkills(json.skills);
        setEditingSkill(null);
        setStatusMessage({
          type: "success",
          text: isEdit
            ? "Skill updated and persisted directly in skills.ts!"
            : "New skill saved directly into skills.ts!",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Operation failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving skill." });
    }
  };

  const handleDeleteSkill = async (name: string) => {
    try {
      const res = await fetch(`/api/admin/skills?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSkills(json.skills);
        setDeleteConfirm(null);
        setStatusMessage({ type: "success", text: `Skill "${name}" deleted from skills.ts.` });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Deletion failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error deleting skill." });
    }
  };

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || s.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
            Skills Management
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Synchronized directly with <code className="text-[#D4F933] font-semibold">src/data/skills.ts</code> ({skills.length} total).
          </p>
        </div>

        <button
          onClick={() =>
            setEditingSkill({
              name: "",
              icon: "FaCode",
              color: "text-emerald-400",
              type: "technical",
            })
          }
          className="lime-btn text-xs"
        >
          <Plus size={14} />
          <span>Add New Skill</span>
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

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 font-mono">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]" />
          <input
            type="text"
            placeholder="Search skills by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101216] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {(["all", "technical", "soft"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs capitalize transition-all font-semibold ${
                filterType === t
                  ? "lime-btn text-xs"
                  : "bg-[#101216] text-[#92969F] border border-[#252A32] hover:border-[#D4F933]/50 hover:text-[#D4F933] shadow-xs"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
          LOADING SKILLS REPOSITORY...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 font-mono">
          {filteredSkills.map((s) => (
            <div
              key={s.name}
              className="p-4 rounded-xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933]/50 shadow-xs transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-[#F2F2EE]">{s.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-[#656B75] mt-0.5">
                  <span className="capitalize font-medium">{s.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setEditingSkill({
                      originalName: s.name,
                      name: s.name,
                      icon: s.icon,
                      color: s.color,
                      type: s.type,
                    })
                  }
                  className="p-1.5 rounded-lg bg-[#161A20] text-[#92969F] hover:text-[#D4F933] border border-[#252A32] transition-colors"
                  title="Edit Skill"
                >
                  <Edit2 size={12} />
                </button>

                <button
                  onClick={() => setDeleteConfirm(s.name)}
                  className="p-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-950/60 border border-red-800/40 transition-colors"
                  title="Delete Skill"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] max-w-sm w-full space-y-4 shadow-2xl font-mono">
            <h3 className="text-sm font-bold text-[#F2F2EE]">Confirm Skill Deletion</h3>
            <p className="text-xs text-[#92969F] leading-relaxed">
              Remove <span className="text-[#F2F2EE] font-bold">&quot;{deleteConfirm}&quot;</span> from <code className="text-[#D4F933]">skills.ts</code>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSkill(deleteConfirm)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-red-500 hover:bg-red-400 shadow-sm"
              >
                Delete Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveSkill}
            className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#252A32]">
              <div>
                <h3 className="text-base font-bold text-[#F2F2EE]">
                  {editingSkill.originalName ? "Edit Skill" : "Add New Skill"}
                </h3>
                <span className="text-[10px] font-mono text-[#656B75]">
                  Persists into <code className="text-[#D4F933] font-semibold">src/data/skills.ts</code>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="text-[#656B75] hover:text-[#F2F2EE]"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                  Type
                </label>
                <select
                  value={editingSkill.type}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      type: e.target.value as "technical" | "soft",
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                >
                  <option value="technical" className="bg-[#101216] text-[#F2F2EE]">Technical</option>
                  <option value="soft" className="bg-[#101216] text-[#F2F2EE]">Soft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                  Icon Identifier
                </label>
                <select
                  value={editingSkill.icon}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico} className="bg-[#101216] text-[#F2F2EE]">
                      {ico}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252A32]">
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="lime-btn text-xs"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
