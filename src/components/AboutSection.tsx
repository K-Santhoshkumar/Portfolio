"use client";

import Link from "next/link";
import HolographicImage from "./HolographicImage";
import AiOsWindow from "./ui/AiOsWindow";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto py-8 sm:py-20 px-1 sm:px-4 flex flex-col items-center text-center relative z-10 w-full"
    >
      <AiOsWindow
        title="SYS_MODULE::ABOUT_ME"
        command="cat /sys/developer_profile.json"
        statusText="PROFILE::VERIFIED"
        depth={35}
        spotlightColor="rgba(0, 240, 255, 0.3)"
      >
        <div className="flex flex-col items-center justify-center py-2 sm:py-4">
          <div className="mb-6 sm:mb-8 inline-block" style={{ transform: "translateZ(40px)" }}>
            <HolographicImage />
          </div>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-mono"
            style={{ transform: "translateZ(30px)" }}
          >
            About Me
          </h2>
          <p
            className="mb-8 sm:mb-10 text-sm sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed px-2"
            style={{ transform: "translateZ(20px)" }}
          >
            I am a Full Stack Web Developer based in India, specializing in React, Next.js, and Python. I love building tools that are not only functional but also beautiful and easy to use.
          </p>
          <div style={{ transform: "translateZ(35px)" }}>
            <Link
              href="/Santhosh.pdf"
              download
              className="inline-block px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 font-bold border border-cyan-400/50 backdrop-blur-md transition-all active:scale-95 shadow-xl shadow-cyan-500/30 font-mono text-xs sm:text-sm tracking-wider"
            >
              Download Resume
            </Link>
          </div>
        </div>
      </AiOsWindow>
    </section>
  );
}



