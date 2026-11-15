"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  X,
  FolderPlus,
  Check,
} from "lucide-react";
import { Project } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Project | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const json = await res.json();
      if (json.success && json.projects) {
        setProjects(json.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const url = "/api/admin/projects";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setProjects(json.projects);
        setEditingProject(null);
        setIsNew(false);
        setStatusMessage({
          type: "success",
          text: isNew
            ? "Project created successfully! Stored directly in projects.ts."
            : "Project updated and persisted directly in projects.ts!",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Operation failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving project." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setProjects(json.projects);
        setDeleteConfirm(null);
        setStatusMessage({
          type: "success",
          text: "Project deleted and removed from projects.ts.",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Deletion failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error deleting project." });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    setUploadingImage(true);
    setStatusMessage(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("type", "project");
    formData.append("projectTitle", editingProject.title || "Untitled Project");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.urls && data.urls.length > 0) {
        const existingScreenshots = editingProject.screenshots || [];
        const newScreenshots = [...existingScreenshots, ...data.urls];

        setEditingProject({
          ...editingProject,
          imagePath: editingProject.imagePath || data.urls[0],
          screenshots: newScreenshots,
        });

        setStatusMessage({
          type: "success",
          text: `Saved ${data.urls.length} image(s) to public/${editingProject.title.replace(/[^a-zA-Z0-9]/g, "_")}_Screenshots/ sequentially!`,
        });
      } else {
        setStatusMessage({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Image upload error." });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveScreenshot = async (urlToRemove: string) => {
    if (!editingProject) return;

    const updatedScreenshots = (editingProject.screenshots || []).filter((url) => url !== urlToRemove);
    const updatedCover =
      editingProject.imagePath === urlToRemove
        ? updatedScreenshots[0] || "/portfolio_logo.png"
        : editingProject.imagePath;

    setEditingProject({
      ...editingProject,
      screenshots: updatedScreenshots,
      imagePath: updatedCover,
    });

    try {
      const res = await fetch(`/api/admin/upload?filePath=${encodeURIComponent(urlToRemove)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: `Image removed from project and deleted from disk (${urlToRemove.split("/").pop()}).`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to delete file from disk, but removed from project.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Error calling server to delete image file.",
      });
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
            Projects Management
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Synchronized directly with <code className="text-[#D4F933] font-semibold">src/data/projects.ts</code> ({projects.length} total).
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingProject({
              id: `proj_${Date.now()}`,
              title: "",
              description: "",
              tags: [],
              githubUrl: "",
              demoUrl: "",
              imagePath: "/portfolio_logo.png",
              features: [],
              challenges: [],
              solutions: [],
              screenshots: [],
              category: "Full Stack Application",
            });
          }}
          className="lime-btn text-xs"
        >
          <Plus size={14} />
          <span>Add New Project</span>
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

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]" />
        <input
          type="text"
          placeholder="Search projects by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101216] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono shadow-xs"
        />
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
          LOADING PROJECTS ARCHIVE...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933]/50 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#161A20] border border-[#252A32] shrink-0">
                      <Image
                        src={p.imagePath}
                        alt={p.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/portfolio_logo.png";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#F2F2EE] line-clamp-1">
                        {p.title}
                      </h3>
                      <span className="text-[10px] text-[#656B75] font-mono font-medium">
                        ID: {p.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingProject(p);
                      }}
                      className="p-2 rounded-lg bg-[#161A20] text-[#92969F] hover:text-[#D4F933] hover:bg-[#1F242D] border border-[#252A32] transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(p)}
                      className="p-2 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-950/60 border border-red-800/40 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#92969F] line-clamp-2 leading-relaxed mb-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded bg-[#161A20] text-[10px] font-mono text-[#656B75]">
                      +{p.tags.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#252A32] flex items-center justify-between text-[11px] font-mono text-[#656B75]">
                <div className="flex items-center gap-3">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D4F933] flex items-center gap-1 transition-colors font-medium"
                    >
                      <Github size={12} />
                      Code
                    </a>
                  )}
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D4F933] flex items-center gap-1 transition-colors font-medium"
                    >
                      <ExternalLink size={12} />
                      Demo
                    </a>
                  )}
                </div>

                <a
                  href={`/projects/${p.id}`}
                  target="_blank"
                  className="text-[#D4F933] font-semibold hover:underline"
                >
                  View Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] max-w-sm w-full space-y-4 shadow-2xl font-mono">
            <h3 className="text-sm font-bold text-[#F2F2EE]">Confirm Deletion</h3>
            <p className="text-xs text-[#92969F] leading-relaxed">
              Are you sure you want to delete <span className="text-[#F2F2EE] font-bold">&quot;{deleteConfirm.title}&quot;</span>? This will permanently update <code className="text-[#D4F933]">projects.ts</code>.
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
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-red-500 hover:bg-red-400 shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] max-w-2xl w-full my-8 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#252A32]">
              <div>
                <h3 className="text-base font-bold text-[#F2F2EE]">
                  {isNew ? "Create New Project" : `Edit Project: ${editingProject.title}`}
                </h3>
                <span className="text-[10px] font-mono text-[#656B75]">
                  Persists into <code className="text-[#D4F933] font-semibold">src/data/projects.ts</code>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-[#656B75] hover:text-[#F2F2EE]"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                Description *
              </label>
              <textarea
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
                rows={3}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                Technologies (comma-separated) *
              </label>
              <input
                type="text"
                value={Array.isArray(editingProject.tags) ? editingProject.tags.join(", ") : editingProject.tags}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                  })
                }
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                  GitHub Repository URL *
                </label>
                <input
                  type="url"
                  value={editingProject.githubUrl}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, githubUrl: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                  Live Demo URL (optional)
                </label>
                <input
                  type="url"
                  value={editingProject.demoUrl || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, demoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
                />
              </div>
            </div>

            {/* Screenshots & Dedicated Folder Upload */}
            <div className="p-4 rounded-xl bg-[#161A20] border border-[#252A32] space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-[#F2F2EE]">
                    Dedicated Screenshots Directory
                  </label>
                  <span className="text-[10px] text-[#656B75]">
                    Saved into: <code className="text-[#D4F933] font-semibold">public/{editingProject.title ? editingProject.title.replace(/[^a-zA-Z0-9]/g, "_") + "_Screenshots" : "&lt;ProjectTitle&gt;_Screenshots"}/Screenshot 01.png</code>
                  </span>
                </div>
                <label className="lime-btn text-xs cursor-pointer py-1.5 px-3">
                  <FolderPlus size={13} />
                  <span>{uploadingImage ? "Saving..." : "Upload Screenshots"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploadingImage}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[11px] text-[#92969F] font-semibold mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingProject.imagePath}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, imagePath: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101216] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-medium"
                />
              </div>

              {editingProject.screenshots && editingProject.screenshots.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-[#656B75] font-semibold">
                      Screenshots Gallery ({editingProject.screenshots.length}):
                    </span>
                    <span className="text-[10px] text-[#92969F] font-mono">
                      Hover to Set Cover or Delete
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {editingProject.screenshots.map((sUrl, idx) => {
                      const isCover = editingProject.imagePath === sUrl;
                      return (
                        <div
                          key={idx}
                          className={`relative w-24 h-16 rounded-xl overflow-hidden border group bg-[#101216] shadow-sm transition-all ${
                            isCover
                              ? "border-[#D4F933] ring-1 ring-[#D4F933]/50"
                              : "border-[#252A32] hover:border-[#3A4250]"
                          }`}
                        >
                          <Image
                            src={sUrl}
                            alt={`Screenshot ${idx + 1}`}
                            fill
                            className="object-cover"
                          />

                          {/* Cover badge */}
                          {isCover && (
                            <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded-md bg-[#D4F933] text-black text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
                              <Check size={10} strokeWidth={3} />
                              <span>Cover</span>
                            </div>
                          )}

                          {/* Delete image button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveScreenshot(sUrl);
                            }}
                            className="absolute top-1 right-1 z-20 w-6 h-6 rounded-md bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-105"
                            title="Delete this image from disk and project"
                          >
                            <Trash2 size={12} />
                          </button>

                          {/* Click overlay to set as cover */}
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => setEditingProject({ ...editingProject, imagePath: sUrl })}
                              className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Set as Cover"
                            >
                              Set Cover
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
                Key Features (one per line)
              </label>
              <textarea
                value={editingProject.features?.join("\n") || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    features: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none font-medium leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252A32]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="lime-btn text-xs"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
