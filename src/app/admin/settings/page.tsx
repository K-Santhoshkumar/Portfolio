"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle, Lock, Shield } from "lucide-react";
import { WebsiteSettingsData } from "@/data/initialData";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  // Password reset state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (json.success && json.settings) {
          setSettings(json.settings);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({
          type: "success",
          text: "Website settings saved and public cache revalidated!",
        });
      } else {
        setStatusMessage({ type: "error", text: json.error || "Failed to save settings." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error saving settings." });
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setPasswordStatus({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordStatus({ type: "error", text: json.error || "Password update failed." });
      }
    } catch {
      setPasswordStatus({ type: "error", text: "Network error during password update." });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 text-center text-xs text-[#656B75] font-mono animate-pulse">
        LOADING SYSTEM CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
          Website Settings &amp; Security
        </h1>
        <p className="text-xs text-[#92969F] mt-1 font-mono">
          Manage SEO metadata, section toggles, and administrator credentials.
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

      {/* SEO & Site Meta Settings */}
      <form onSubmit={handleSettingsSubmit} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] space-y-4 shadow-sm">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#92969F] font-semibold mb-2">
            SEO &amp; Metadata Configuration
          </h3>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              Website Browser Title
            </label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              Meta Description (Search Engines &amp; OpenGraph)
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              rows={3}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              Social Share Image URL (og:image)
            </label>
            <input
              type="text"
              value={settings.ogImage}
              onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
            />
          </div>

          {/* Section Visibility Toggles */}
          <div className="pt-4 border-t border-[#252A32]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#92969F] font-semibold mb-3">
              Public Section Visibility
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Show Experience Section", key: "showExperience" },
                { label: "Show Skills Section", key: "showSkills" },
                { label: "Show Projects Section", key: "showProjects" },
                { label: "Show Education Section", key: "showEducation" },
                { label: "Show Contact Section", key: "showContact" },
              ].map(({ label, key }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#161A20] border border-[#252A32] cursor-pointer hover:border-[#D4F933]/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(settings[key as keyof WebsiteSettingsData])}
                    onChange={(e) =>
                      setSettings({ ...settings, [key]: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#D4F933] rounded"
                  />
                  <span className="text-xs font-medium text-[#F2F2EE]">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={savingSettings}
          className="lime-btn text-xs inline-flex items-center gap-2"
        >
          <Save size={14} />
          <span>{savingSettings ? "Saving Settings..." : "Save Settings"}</span>
        </button>
      </form>

      {/* Security: Password Update */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-6 border-t border-[#252A32]">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <Shield size={18} className="text-[#D4F933]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F2F2EE] font-bold">
              Administrator Credentials
            </h3>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                New Password (min 8 characters)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter new strong password"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Re-type new password"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium"
              />
            </div>
          </div>

          {passwordStatus && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2 font-mono ${
                passwordStatus.type === "success"
                  ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
                  : "bg-red-500/10 border border-red-500/25 text-red-400"
              }`}
            >
              {passwordStatus.type === "success" ? (
                <CheckCircle2 size={15} className="text-[#D4F933] shrink-0" />
              ) : (
                <AlertCircle size={15} className="text-red-400 shrink-0" />
              )}
              <span>{passwordStatus.text}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="btn-secondary text-xs inline-flex items-center gap-2"
            >
              <Lock size={14} />
              <span>{savingPassword ? "Updating..." : "Update Admin Password"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
