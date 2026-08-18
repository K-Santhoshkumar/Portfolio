"use client";

import { motion } from "framer-motion";
import { ArrowDown, Terminal, Sparkles, Zap } from "lucide-react";



import Link from "next/link";
import React, { useState, useEffect } from "react";
import AiOsWindow from "./ui/AiOsWindow";

export default function WelcomeSection(): React.ReactElement {
  const [typedText, setTypedText] = useState("");
  const fullText = "./initialize_neural_kernel.sh --mode=interactive";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="welcome"
      className="max-w-5xl mx-auto py-1 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center min-h-0 text-center relative z-10"
    >
      <AiOsWindow
        title="JARVIS_KERNEL_CORE::v4.2.0"
        command={typedText || "./initialize_neural_kernel.sh"}
        statusText="KERNEL::ONLINE"
        depth={45}
        spotlightColor="rgba(0, 240, 255, 0.4)"
      >
        <div className="flex flex-col items-center max-w-4xl py-1 sm:py-4 relative">
          {/* AI OS System Core Floating Icon with Pulse Ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-3 sm:mb-8 p-2 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/25 via-purple-500/25 to-emerald-500/25 border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 group cursor-pointer relative"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-950 border border-cyan-400/70 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-6 h-6 sm:w-9 sm:h-9 text-cyan-400 animate-pulse" />
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 absolute -top-1 -right-1 animate-ping" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 absolute -bottom-1 -left-1 animate-spin" style={{ animationDuration: "6s" }} />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-cyan-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          <motion.h1
            className="text-xl xs:text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-2 sm:mb-6 tracking-tight drop-shadow-2xl font-mono break-words w-full"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{ transform: "translateZ(60px)" }}
          >
            I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 animate-gradient inline-block">Santhoshkumar K</span>
          </motion.h1>

          <motion.p
            className="text-xs sm:text-xl md:text-2xl max-w-2xl mb-4 sm:mb-10 text-slate-200 font-medium drop-shadow leading-relaxed px-1 sm:px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ transform: "translateZ(30px)" }}
          >
            Full Stack Web Developer crafting interactive,
            scalable, and visually stunning digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ transform: "translateZ(50px)" }}
          >
            <Link
              href="#about"
              className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-2.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black shadow-2xl shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/60 font-mono tracking-wider text-xs sm:text-base"
            >
              Explore My Work <ArrowDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-y-1.5 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>
      </AiOsWindow>
    </section>
  );
}




