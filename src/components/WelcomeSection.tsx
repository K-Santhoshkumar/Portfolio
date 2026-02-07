"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WelcomeSection(): React.ReactElement {
  return (
    <section
      id="welcome"
      className="flex flex-col items-center justify-center min-h-[80vh] py-16 px-4 text-center relative z-10"
    >
      <motion.h1
        className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Santhoshkumar K</span>
      </motion.h1>
      <motion.p
        className="text-lg sm:text-2xl max-w-2xl mb-12 text-foreground font-medium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Full Stack Web Developer crafting interactive,
        scalable, and visually stunning digital experiences.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="#about"
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Explore My Work <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </section>
  );
}
