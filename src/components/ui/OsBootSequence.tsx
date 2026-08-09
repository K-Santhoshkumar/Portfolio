"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Activity } from "lucide-react";




import React from "react";

const bootLogs = [
  "BIOS VERSION: JARVIS-AI-3.04 (BUILD 2026.08)",
  "INITIALIZING HARDWARE SYSTEMS...",
  "CPU CORE 0-7: ONLINE [4.80 GHz]",
  "MEMORY TEST: 16384 MB OK",
  "LOADING WEBGL THREE.JS GRAPHICS ENGINE...",
  "MOUNTING NEURAL SKILL MATRIX & DEPLOYMENTS...",
  "CONFIGURING ENCRYPTED COMMS PROTOCOL (AES-256)...",
  "SANTHOSH_AI_OS SYSTEM READY.",
];

export default function OsBootSequence(): React.ReactElement | null {
  const [booting, setBooting] = useState(true);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage to only boot once per session
    const hasBooted = sessionStorage.getItem("santhosh_os_booted");
    if (hasBooted) {
      setBooting(false);
      return;
    }

    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < bootLogs.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 280);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 4;
        }
        clearInterval(progressInterval);
        setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem("santhosh_os_booted", "true");
        }, 500);
        return 100;
      });
    }, 80);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  if (!booting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-cyan-400 font-mono select-none overflow-hidden"
      >
        {/* Background Grid & Glowing Core */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15)_0,transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-2xl bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/80 backdrop-blur-3xl relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyan-400 animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-slate-100">
                SANTHOSH_AI_OS :: BOOT_LOADER
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Activity className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
              <span>BOOTING</span>
            </div>
          </div>

          {/* Terminal Logs Window */}
          <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-cyan-500/20 mb-6 h-48 overflow-y-auto flex flex-col gap-2 shadow-inner text-xs sm:text-sm">
            {bootLogs.slice(0, currentLogIndex + 1).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-cyan-500 font-bold">&gt;</span>
                <span className={index === currentLogIndex ? "text-cyan-300 font-bold" : "text-slate-400"}>
                  {log}
                </span>
                {index === currentLogIndex && (
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Boot Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span>SYSTEM INITIALIZATION</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full border border-cyan-500/30 overflow-hidden p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Skip Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                setBooting(false);
                sessionStorage.setItem("santhosh_os_booted", "true");
              }}
              className="px-4 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all"
            >
              Skip Boot [ESC]
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
