"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-3xl mx-auto py-20 px-4 text-white flex flex-col items-center text-center relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <Image
          src="/portfolio_logo.png"
          alt="Santhoshkumar Logo"
          width={100}
          height={100}
          className="rounded-full border-4 border-cyan-400 shadow-lg mx-auto"
          priority
        />
      </motion.div>
      <motion.h2
        className="text-3xl font-bold mb-4 text-cyan-400"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="mb-8 text-lg text-gray-200 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Full Stack Web Developer skilled in front-end, back-end, and database
        integration, with a passion for building interactive and responsive web
        applications.
      </motion.p>
      <motion.a
        href="/Santhosh.pdf"
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-colors text-lg mb-4"
      >
        Download Resume
      </motion.a>
    </section>
  );
}
