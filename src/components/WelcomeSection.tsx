"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function WelcomeSection(): React.ReactElement {
  return (
    <section
      id="welcome"
      className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-white text-center relative z-10"
    >
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6"
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        Hi, I&apos;m <span className="text-cyan-400">Santhoshkumar K</span>
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl max-w-2xl mb-8 text-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Full Stack Web Developer passionate about building interactive,
        scalable, and visually stunning web applications.
      </motion.p>
      <motion.a
        href="#about"
        whileHover={{ y: 6, scale: 1.08, backgroundColor: "#22d3ee" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-colors text-lg"
      >
        Learn More <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
