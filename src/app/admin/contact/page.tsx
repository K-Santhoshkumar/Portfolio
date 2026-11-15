"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { ProfileData } from "@/data/initialData";

export default function AdminContactPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/profile");
        const json = await res.json();
        if (json.success && json.profile) {
          setProfile(json.profile);
        }
      } catch (err) {
        console.error("Failed to load contact info:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({
          type: "success",
          text: "Contact details updated! Public website is immediately synced.",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Failed to update." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving contact info." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
        LOADING CONTACT CHANNELS...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
          Contact Details Management
        </h1>
        <p className="text-xs text-[#92969F] mt-1 font-mono">
          Configure public communication channels, social links, and physical location.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
              : "bg-red-500/10 border border-red-500/25 text-red-400"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={16} className="text-[#D4F933]" />
          ) : (
            <AlertCircle size={16} className="text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#F2F2EE] mb-2 font-mono">
            Direct Contact Channels
          </h3>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
              Public Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4F933]" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
              Phone / WhatsApp Contact
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4F933]" />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
              Physical Location
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]" />
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#F2F2EE] mb-2 font-mono">
            Developer &amp; Professional Profiles
          </h3>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
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

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1">
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
        </div>

        <button
          type="submit"
          disabled={saving}
          className="lime-btn text-xs"
        >
          <Save size={14} />
          <span>{saving ? "SAVING..." : "SAVE CONTACT DETAILS"}</span>
        </button>
      </form>
    </div>
  );
}
