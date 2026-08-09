"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Terminal,
  User,
  Briefcase,
  Cpu,
  FolderGit2,
  Mail,
  FileText
} from "lucide-react";
import React from "react";

export default function AiOsDesktopIcons(): React.ReactElement {
  const desktopShortcuts = [
    { name: "Kernel.core", href: "/", icon: Terminal, color: "text-cyan-400" },
    { name: "Identity.json", href: "/about", icon: User, color: "text-purple-400" },
    { name: "Career.log", href: "/experience", icon: Briefcase, color: "text-amber-400" },
    { name: "Skills.matrix", href: "/skills", icon: Cpu, color: "text-emerald-400" },
    { name: "Projects.sys", href: "/projects", icon: FolderGit2, color: "text-blue-400" },
    { name: "Comms.sh", href: "/contact", icon: Mail, color: "text-rose-400" },
    { name: "Resume.pdf", href: "/Santhosh.pdf", icon: FileText, color: "text-cyan-300", isExternal: true },
  ];

  return (
    <div className="hidden 2xl:flex flex-col gap-4 fixed top-24 left-6 z-30 pointer-events-auto select-none">

      {desktopShortcuts.map((shortcut, index) => {
        const Icon = shortcut.icon;

        return (
          <motion.div
            key={shortcut.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={shortcut.href}
              target={shortcut.isExternal ? "_blank" : undefined}
              rel={shortcut.isExternal ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-slate-950/60 hover:bg-slate-900/90 border border-white/5 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 group w-20 shadow-xl shadow-slate-950/50"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-inner">
                <Icon className={`w-5 h-5 ${shortcut.color}`} />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-cyan-300 truncate max-w-full text-center">
                {shortcut.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
