"use client";

import React, { useEffect, useRef } from "react";

export default function Cyberpunk3dBackground(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Stars System
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? "#00f0ff" : "#b026ff",
      speed: Math.random() * 0.8 + 0.2,
    }));

    let gridOffset = 0;

    const render = () => {
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Radial Ambient Gradient Light
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        50,
        width / 2,
        height * 0.4,
        Math.max(width, height)
      );
      grad.addColorStop(0, "rgba(0, 240, 255, 0.15)");
      grad.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
      grad.addColorStop(1, "rgba(3, 7, 18, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Perspective Grid
      gridOffset = (gridOffset + 0.6) % 40;
      const horizonY = height * 0.55;
      const fov = 300;

      ctx.strokeStyle = "rgba(0, 240, 255, 0.18)";
      ctx.lineWidth = 1;

      // Perspective Lines originating from Horizon Center
      const totalPerspectiveLines = 28;
      const centerX = width / 2;
      for (let i = -totalPerspectiveLines; i <= totalPerspectiveLines; i++) {
        const xPos = centerX + i * 60;
        ctx.beginPath();
        ctx.moveTo(centerX, horizonY);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }

      // Moving Horizontal 3D Grid Lines
      for (let z = 10; z < 600; z += 40) {
        const currentZ = z - gridOffset;
        if (currentZ <= 0) continue;
        const scale = fov / (fov + currentZ);
        const yPos = horizonY + scale * (height - horizonY);

        ctx.strokeStyle = `rgba(0, 240, 255, ${Math.min(0.3, scale * 0.4)})`;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // Draw Floating Holographic Particle Dust
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
