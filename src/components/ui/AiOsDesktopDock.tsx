"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  User,
  Briefcase,
  Cpu,
  FolderGit2,
  Mail,
  FileText,
  Radio
} from "lucide-react";
import React from "react";

export default function AiOsDesktopDock(): React.ReactElement {
  const pathname = usePathname();

  const dockApps = [
    { name: "Terminal Core", href: "/", icon: Terminal, pathMatch: pathname === "/" },
    { name: "Profile Matrix", href: "/about", icon: User, pathMatch: pathname?.startsWith("/about") },
    { name: "Career Logs", href: "/experience", icon: Briefcase, pathMatch: pathname?.startsWith("/experience") },
    { name: "Neural Skills", href: "/skills", icon: Cpu, pathMatch: pathname?.startsWith("/skills") },
    { name: "Deployments", href: "/projects", icon: FolderGit2, pathMatch: pathname?.startsWith("/projects") },
    { name: "Comms Terminal", href: "/contact", icon: Mail, pathMatch: pathname?.startsWith("/contact") },
    { name: "Resume PDF", href: "/Santhosh.pdf", icon: FileText, isExternal: true },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw] sm:max-w-max">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-slate-950/90 backdrop-blur-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 overflow-x-auto no-scrollbar max-w-full"
      >
        {/* Desktop Taskbar Apps */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 shrink-0">

          {dockApps.map((app) => {
            const Icon = app.icon;
            const isActive = app.pathMatch;

            return (
              <motion.div
                key={app.name}
                whileHover={{ y: -6, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <Link
                  href={app.href}
                  target={app.isExternal ? "_blank" : undefined}
                  rel={app.isExternal ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(0,240,255,0.4)]"
                      : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {/* Active App Indicator Light */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </Link>


                {/* Tooltip Label */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  {app.name}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="w-px h-6 bg-slate-800 mx-1" />

        {/* System Signal Pulse */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-emerald-400 select-none">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-[10px] font-bold tracking-wider hidden sm:inline-block">
            JARVIS_LINK::100%
          </span>
        </div>
      </motion.div>
    </div>
  );
}
