"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  direction: number;
  color: string;
  delay: number;
  duration: number;
}

interface Comet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

const COMET_COUNT = 3;

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const drift = 30 + Math.random() * 30; // 30-60% horizontal drift
      const direction = Math.random() > 0.5 ? 1 : -1;
      return {
        id: i,
        x,
        y,
        size,
        drift,
        direction,
        color: "#fff",
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 6, // slower, medium speed
      };
    });
    setStars(generated);

    // Generate comets with random start/end positions
    const cometData = Array.from({ length: COMET_COUNT }, (_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = startX + 60 + Math.random() * 40; // much longer
      const endY = startY + (Math.random() * 30 - 15); // more vertical variance
      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 4,
      };
    });
    setComets(cometData);
  }, []);

  if (stars.length === 0) return null;

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: `radial-gradient(circle at 20% 30%, #2979ff 0%, transparent 60%),
           radial-gradient(circle at 80% 70%, #ff1744 0%, transparent 60%),
           radial-gradient(circle at 60% 20%, #000 0%, transparent 80%),
           radial-gradient(circle at 80% 20%, #000 0%, transparent 80%),
           radial-gradient(circle at 30% 80%, #000 0%, transparent 80%),
           radial-gradient(circle at 50% 50%, #000 70%, #1a237e 100%),
           linear-gradient(135deg, #0d133d 0%, #1a237e 50%, #b71c1c 100%)`,
      }}
    >
      {/* Comets */}
      {comets.map((comet: Comet) => (
        <motion.div
          key={comet.id}
          className="absolute z-10"
          style={{
            left: `${comet.startX}%`,
            top: `${comet.startY}%`,
            width: `260px`, // much longer
            height: `7px`, // thicker
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%)",
            borderRadius: "4px",
            boxShadow: "0 0 32px 8px #fff8",
            opacity: 0.8,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: `${comet.endX - comet.startX}%`,
            y: `${comet.endY - comet.startY}%`,
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: comet.duration,
            delay: comet.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Stars */}
      {stars.map((star: Star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full shadow-lg"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            opacity: 0.8,
          }}
          initial={{ x: 0, opacity: 0.8 }}
          animate={{
            x: `${star.drift * star.direction}%`,
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: star.duration,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}
