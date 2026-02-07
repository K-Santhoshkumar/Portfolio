"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import HolographicImage from "./HolographicImage";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-4xl mx-auto py-24 px-4 flex flex-col items-center text-center relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-card-bg/80 border border-card-border p-8 md:p-12 rounded-3xl shadow-xl z-20 relative"
      >
        <div className="mb-8 inline-block">
          <HolographicImage />
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          About Me
        </h2>
        <p className="mb-10 text-lg md:text-xl text-foreground dark:text-gray-200 max-w-2xl mx-auto font-bold leading-relaxed">
          I am a Full Stack Web Developer based in India, specializing in React, Next.js, and Python. I love building tools that are not only functional but also beautiful and easy to use.
        </p>
        <Link
          href="/Santhosh.pdf"
          className="inline-block px-10 py-4 rounded-full bg-secondary/10 hover:bg-secondary/20 text-foreground font-bold border border-card-border backdrop-blur-md transition-all active:scale-95"
        >
          Download Resume
        </Link>
      </motion.div>
    </section>
  );
}
