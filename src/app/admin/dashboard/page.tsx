import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Wrench,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Plus,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getDashboardStats, getContactMessages } from "@/lib/portfolioService";

export const revalidate = 0; // Always fresh in admin

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const messages = await getContactMessages();

  const recentMessages = messages.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#161A20] border border-[#252A32] text-[#D4F933] text-xs font-mono font-bold mb-2">
              <Sparkles size={11} />
              <span>DYNAMIC CMS ACTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F2EE] tracking-tight">
              Welcome back, {stats.profileName}
            </h1>
            <p className="text-xs sm:text-sm text-[#92969F] mt-1 font-mono">
              Directly synchronized with local stores, projects.ts, and skills.ts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="lime-btn text-xs"
            >
              <Eye size={13} />
              <span>View Live Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Projects */}
        <Link
          href="/admin/projects"
          className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#92969F] font-semibold">Projects</span>
            <FolderGit2 size={16} className="text-[#D4F933]" />
          </div>
          <span className="text-2xl font-bold text-[#F2F2EE] font-mono">
            {stats.totalProjects}
          </span>
          <span className="text-[10px] text-[#656B75] font-mono block mt-1 font-medium">100% active showcase</span>
        </Link>

        {/* Skills */}
        <Link
          href="/admin/skills"
          className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#92969F] font-semibold">Skills</span>
            <Wrench size={16} className="text-[#D4F933]" />
          </div>
          <span className="text-2xl font-bold text-[#F2F2EE] font-mono">
            {stats.totalSkills}
          </span>
          <span className="text-[10px] text-[#656B75] font-mono block mt-1 font-medium">Technical Stack</span>
        </Link>

        {/* Experience */}
        <Link
          href="/admin/experience"
          className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#92969F] font-semibold">Experience</span>
            <Briefcase size={16} className="text-[#22C55E]" />
          </div>
          <span className="text-2xl font-bold text-[#F2F2EE] font-mono">
            {stats.totalExperiences}
          </span>
          <span className="text-[10px] text-[#656B75] font-mono block mt-1 font-medium">Career Timeline</span>
        </Link>

        {/* Education */}
        <Link
          href="/admin/education"
          className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#92969F] font-semibold">Education</span>
            <GraduationCap size={16} className="text-[#D4F933]" />
          </div>
          <span className="text-2xl font-bold text-[#F2F2EE] font-mono">
            {stats.totalEducations}
          </span>
          <span className="text-[10px] text-[#656B75] font-mono block mt-1 font-medium">Academic Degree</span>
        </Link>

        {/* Messages */}
        <Link
          href="/admin/messages"
          className="p-5 rounded-2xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#92969F] font-semibold">Inquiries</span>
            <MessageSquare size={16} className="text-[#D4F933]" />
          </div>
          <span className="text-2xl font-bold text-[#F2F2EE] font-mono">
            {stats.totalMessages}
          </span>
          <span className="text-[10px] text-[#D4F933] font-mono font-bold block mt-1">
            {stats.unreadMessages} unread
          </span>
        </Link>
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-[#F2F2EE] tracking-tight font-mono">
            {"// Quick Shortcuts"}
          </h2>

          <div className="space-y-2">
            <Link
              href="/admin/projects"
              className="p-4 rounded-xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-sm flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#161A20] text-[#D4F933] flex items-center justify-center">
                  <Plus size={15} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F2F2EE] block">Add New Project</span>
                  <span className="text-[10px] text-[#656B75] font-mono">Ordered screenshots folder</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-[#656B75] group-hover:text-[#D4F933] transition-colors" />
            </Link>

            <Link
              href="/admin/skills"
              className="p-4 rounded-xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-sm flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#161A20] text-[#D4F933] flex items-center justify-center">
                  <Wrench size={15} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F2F2EE] block">Manage Skills</span>
                  <span className="text-[10px] text-[#656B75] font-mono">Direct in skills.ts</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-[#656B75] group-hover:text-[#D4F933] transition-colors" />
            </Link>

            <Link
              href="/admin/resume"
              className="p-4 rounded-xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-sm flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#161A20] text-[#22C55E] flex items-center justify-center">
                  <CheckCircle size={15} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F2F2EE] block">Update Resume</span>
                  <span className="text-[10px] text-[#656B75] font-mono">Direct in public/Santhosh.pdf</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-[#656B75] group-hover:text-[#D4F933] transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Contact Submissions */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#F2F2EE] tracking-tight font-mono">
              {"// Inbound Inquiries"}
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs font-mono font-bold text-[#D4F933] hover:underline"
            >
              View all ({messages.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#101216] border border-[#252A32] text-center text-xs font-mono text-[#656B75] shadow-sm">
                No contact submissions logged yet.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-xl bg-[#101216] border border-[#252A32] hover:border-[#D4F933] shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#F2F2EE]">
                        {msg.name}
                      </span>
                      <span className="text-[11px] text-[#656B75] font-mono">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#656B75] font-mono">
                      <Clock size={11} className="text-[#D4F933]" />
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {msg.subject && (
                    <div className="text-xs font-mono text-[#D4F933] font-semibold mb-1">
                      Subject: {msg.subject}
                    </div>
                  )}
                  <p className="text-xs text-[#92969F] line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
