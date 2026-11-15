"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("santhoshkumark2505@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.error || "Authentication failed. Check your credentials.");
      }
    } catch {
      setError("Network error connecting to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F2F2EE] flex flex-col items-center justify-center p-4 relative overflow-hidden charcoal-grid-bg">
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#161A20] border border-[#252A32] flex items-center justify-center text-[#D4F933] font-mono font-bold text-base mb-4 shadow-xl">
            SK
          </div>
          <h1 className="text-xl font-bold text-[#F2F2EE] tracking-tight">
            Administrator Gateway
          </h1>
          <p className="text-xs text-[#92969F] mt-1 font-mono">
            Direct content management for Santhoshkumar K
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                ADMIN EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#92969F] font-semibold mb-1.5">
                SECURITY CREDENTIAL
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#161A20] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] transition-colors font-mono font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#656B75] hover:text-[#D4F933]"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full lime-btn text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <ShieldCheck size={15} />
              <span>{loading ? "AUTHENTICATING..." : "AUTHORIZE SIGN IN"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#252A32] text-center">
            <Link
              href="/"
              className="text-xs font-mono text-[#656B75] hover:text-[#D4F933] transition-colors inline-flex items-center gap-1 font-medium"
            >
              ← Return to public showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
