"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";

export default function CustomCursor(): React.ReactElement | null {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { stiffness: 1200, damping: 50, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 1200, damping: 50, mass: 0.1 });

  const ringX = useSpring(rawX, { stiffness: 400, damping: 28, mass: 0.2 });
  const ringY = useSpring(rawY, { stiffness: 400, damping: 28, mass: 0.2 });

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/laptop)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [rawX, rawY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Glowing Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_12px_rgba(0,240,255,0.9)] mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-cyan-400/60 rounded-full pointer-events-none z-[9998] shadow-[0_0_18px_rgba(168,85,247,0.4)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(168, 85, 247, 0.9)" : "rgba(0, 240, 255, 0.6)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
