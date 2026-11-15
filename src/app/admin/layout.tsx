"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  FileText,
  Phone,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Resume", href: "/admin/resume", icon: FileText },
  { name: "Contact Info", href: "/admin/contact", icon: Phone },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuth(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          window.location.href = "/admin/login";
        }
      } catch {
        setIsAuth(false);
        window.location.href = "/admin/login";
      }
    }

    checkAuth();
  }, [pathname, isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      window.location.href = "/admin/login";
    }
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#090A0C] text-[#F2F2EE]">{children}</div>;
  }

  if (isAuth === false) {
    return (
      <div className="min-h-screen bg-[#090A0C] flex items-center justify-center text-[#92969F] text-xs font-mono">
        REDIRECTING TO LOGIN...
      </div>
    );
  }

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#090A0C] flex items-center justify-center text-[#92969F] text-xs font-mono">
        AUTHENTICATING ADMIN SESSION...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F2F2EE] flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#101216] border-b border-[#252A32] shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#161A20] border border-[#252A32] flex items-center justify-center text-[#D4F933] font-mono text-[10px] font-bold">
            SK
          </div>
          <span className="text-xs font-bold text-[#F2F2EE]">Admin Console</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#92969F] hover:text-[#D4F933]"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#101216] border-r border-[#252A32] shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Admin Header */}
          <div className="p-5 border-b border-[#252A32] flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#161A20] border border-[#252A32] flex items-center justify-center text-[#D4F933] font-mono font-bold text-xs shadow-xs">
                SK
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#F2F2EE] tracking-tight">Admin Console</h3>
                <span className="text-[10px] text-[#D4F933] font-mono font-semibold block">
                  Santhoshkumar K
                </span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? "bg-[#161A20] text-[#D4F933] border border-[#D4F933]/40 font-bold shadow-xs"
                      : "text-[#92969F] hover:text-[#D4F933] hover:bg-[#161A20]"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#D4F933]" : "text-[#656B75]"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#252A32] space-y-1 font-mono">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#92969F] hover:text-[#D4F933] hover:bg-[#161A20] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} />
              View Public Website
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-6xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
