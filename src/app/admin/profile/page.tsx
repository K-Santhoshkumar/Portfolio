"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Save, CheckCircle2, AlertCircle, Upload, Eye, Trash2 } from "lucide-react";
import { ProfileData } from "@/data/initialData";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/profile");
        const json = await res.json();
        if (json.success && json.profile) {
          setProfile(json.profile);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({ type: "success", message: "Profile details updated and synchronized!" });
      } else {
        setStatus({ type: "error", message: json.error || "Failed to update profile." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error saving profile." });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "avatar");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setProfile({ ...profile, avatarUrl: data.url });
        setStatus({ type: "success", message: "Profile image uploaded! Click Save Profile Changes to commit." });
      } else {
        setStatus({ type: "error", message: data.error || "Upload failed." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error during avatar upload." });
    }
  };

  const handleRemoveAvatar = async () => {
    if (!profile || !profile.avatarUrl || profile.avatarUrl === "/portfolio_logo.png") return;
    const oldUrl = profile.avatarUrl;
    setProfile({ ...profile, avatarUrl: "/portfolio_logo.png" });
    try {
      await fetch(`/api/admin/upload?filePath=${encodeURIComponent(oldUrl)}`, { method: "DELETE" });
      setStatus({ type: "success", message: "Avatar reset to default and previous image removed from disk." });
    } catch {
      setStatus({ type: "error", message: "Failed to delete old avatar file." });
    }
  };

  if (loading || !profile) {
    return (
      <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
        LOADING PROFILE DATA...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
            Profile Management
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Update personal identity, titles, narrative, and external links.
          </p>
        </div>

        <a
          href="/#about"
          target="_blank"
          className="btn-secondary text-xs"
        >
          <Eye size={13} className="text-[#D4F933]" />
          <span>Preview Public Profile</span>
        </a>
      </div>

      {status.message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 font-mono ${
            status.type === "success"
              ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
              : "bg-red-500/10 border border-red-500/25 text-red-400"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 size={15} className="text-[#D4F933] shrink-0" />
          ) : (
            <AlertCircle size={15} className="text-red-400 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar Upload Card */}
        <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] shadow-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#252A32] bg-[#161A20] shrink-0 shadow-xs">
            <Image
              src={profile.avatarUrl || "/portfolio_logo.png"}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-[#F2F2EE]">Profile Avatar</h3>
            <p className="text-xs text-[#656B75] font-mono mt-0.5 mb-3">
              PNG, JPG, or WebP. Current: {profile.avatarUrl}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <label className="btn-secondary text-xs cursor-pointer">
                <Upload size={14} />
                <span>Choose New Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {profile.avatarUrl && profile.avatarUrl !== "/portfolio_logo.png" && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="btn-secondary text-xs text-red-400 hover:text-red-300 hover:border-red-500/30"
                  title="Remove custom avatar and delete from disk"
                >
                  <Trash2 size={13} />
                  <span>Remove Avatar</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Identity & Headings */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-2xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#656B75] font-bold mb-2">
            Personal Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              Hero Tagline / Intro
            </label>
            <textarea
              name="tagline"
              value={profile.tagline}
              onChange={handleChange}
              rows={2}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none leading-relaxed font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              About Me (Biography)
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none leading-relaxed font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              My Philosophy / Approach
            </label>
            <textarea
              name="approach"
              value={profile.approach}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono resize-none leading-relaxed font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Fun Fact
              </label>
              <input
                type="text"
                name="funFact"
                value={profile.funFact}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Current Status
              </label>
              <input
                type="text"
                name="status"
                value={profile.status}
                onChange={handleChange}
                placeholder="AVAILABLE FOR ROLES"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-2xl space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#656B75] font-bold mb-2">
            Contact &amp; Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={profile.linkedinUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={profile.githubUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="lime-btn text-xs"
        >
          <Save size={14} />
          <span>{saving ? "Saving Changes..." : "Save Profile Changes"}</span>
        </button>
      </form>
    </div>
  );
}
