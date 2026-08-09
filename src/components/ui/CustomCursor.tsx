"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";

export default function CustomCursor(): React.ReactElement | null {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/laptop)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Glowing Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_12px_rgba(0,240,255,0.9)] mix-blend-screen"
        animate={{
          x: mousePosition.x - 7,
          y: mousePosition.y - 7,
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50, mass: 0.1 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-cyan-400/60 rounded-full pointer-events-none z-[9998] shadow-[0_0_18px_rgba(168,85,247,0.4)]"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(168, 85, 247, 0.9)" : "rgba(0, 240, 255, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      />
    </>
  );
}
