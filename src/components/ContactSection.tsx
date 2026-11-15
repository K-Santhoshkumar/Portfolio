"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

interface ContactSectionProps {
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function ContactSection({
  email = "santhoshkumark2505@gmail.com",
  phone = "+91 83447 90660",
  location = "Tamil Nadu, India",
  githubUrl = "https://github.com/K-Santhoshkumar",
  linkedinUrl = "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
}: ContactSectionProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // Anti-spam honeypot trigger

    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: "success",
          text: "Thank you! Your inquiry has been received. I will respond to your email promptly.",
        });
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus({
          type: "error",
          text: data.error || "Failed to submit message. Please try again or reach out directly via email.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error connecting to message endpoint. Please email directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Contact &amp; Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F2EE]">
            Have an interesting problem to solve?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] max-w-md font-mono">
          I&apos;m interested in building useful products, solving engineering challenges, and collaborating on meaningful software projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email */}
          <div className="glow-hover-card p-5 rounded-2xl flex items-center justify-between group">
            <a href={`mailto:${email}`} className="flex items-center gap-4 flex-1 mr-2">
              <div className="w-10 h-10 rounded-xl bg-[#161A20] border border-[#232730] flex items-center justify-center text-[#D4F933] group-hover:scale-105 transition-transform shrink-0">
                <Mail size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-[#656B75] uppercase tracking-wider block font-medium">
                  DIRECT EMAIL
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F2F2EE] break-all block truncate">
                  {email}
                </span>
              </div>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2.5 rounded-xl bg-[#161A20] hover:bg-[#1E232B] border border-[#232730] text-[#92969F] hover:text-[#D4F933] transition-colors shrink-0"
              title="Copy email to clipboard"
            >
              {copiedEmail ? <Check size={14} className="text-[#D4F933]" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Phone */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="glow-hover-card p-5 rounded-2xl flex items-center justify-between group block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#161A20] border border-[#232730] flex items-center justify-center text-[#22C55E] group-hover:scale-105 transition-transform">
                <Phone size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#656B75] uppercase tracking-wider block font-medium">
                  TELEPHONE / WHATSAPP
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#F2F2EE]">
                  {phone}
                </span>
              </div>
            </div>
            <ArrowUpRight size={15} className="text-[#656B75] group-hover:text-[#D4F933] transition-colors" />
          </a>

          {/* Location */}
          <div className="glow-hover-smokey p-5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#161A20] border border-[#232730] flex items-center justify-center text-[#92969F]">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#656B75] uppercase tracking-wider block font-medium">
                LOCATION
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#F2F2EE]">
                {location}
              </span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-hover-card p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold text-[#F2F2EE] hover:text-[#D4F933] group"
            >
              <svg className="w-4 h-4 text-[#656B75] group-hover:text-[#D4F933] transition-colors fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-hover-card p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold text-[#F2F2EE] hover:text-[#D4F933] group"
            >
              <svg className="w-4 h-4 text-[#656B75] group-hover:text-[#D4F933] transition-colors fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column (7 cols): Verified Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glow-hover-card p-8 rounded-2xl space-y-4"
          >
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                SUBJECT
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Software Engineering Role / Architecture Project"
                className="w-full px-4 py-3 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                MESSAGE *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share your goals, requirements, or opportunity details..."
                className="w-full px-4 py-3 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors resize-none font-mono font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full lime-btn text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={14} />
              <span>{loading ? "TRANSMITTING..." : "SUBMIT MESSAGE"}</span>
            </button>

            {status.text && (
              <div
                className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                  status.type === "success"
                    ? "bg-[#D4F933]/10 border border-[#D4F933]/25 text-[#D4F933]"
                    : "bg-red-500/10 border border-red-500/25 text-red-400"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} className="shrink-0 text-[#D4F933]" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 text-red-400" />
                )}
                <span>{status.text}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
