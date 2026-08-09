"use client";

import React, { useEffect, useRef } from "react";

interface Star3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function SpaceStarsBackground(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Generate 1,200 3D Spatial Stars
    const starCount = Math.min(Math.floor(width / 1.2), 1200);
    const stars: Star3D[] = [];
    const starColors = ["#00f0ff", "#a855f7", "#38bdf8", "#ffffff", "#34d399"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 950 + 50,
        radius: Math.random() * 1.8 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Dynamic Meteor / Shooting Star System
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (meteors.length >= 3) return;
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: -50,
        length: Math.random() * 140 + 80,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
      });
    };

    const fov = 400;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      if (frameCount % 120 === 0 && Math.random() > 0.4) {
        spawnMeteor();
      }

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Deep Midnight Obsidian Base
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // Deep Space Nebula Ambient Glows
      const nebula1X = width * 0.3 + mouseX;
      const nebula1Y = height * 0.3 + mouseY;
      const grad1 = ctx.createRadialGradient(
        nebula1X,
        nebula1Y,
        50,
        nebula1X,
        nebula1Y,
        Math.max(width, height) * 0.6
      );
      grad1.addColorStop(0, "rgba(0, 240, 255, 0.12)");
      grad1.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
      grad1.addColorStop(1, "rgba(2, 6, 23, 0.98)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Project & Render 3D Spatial Stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];

        // Slow 3D depth movement
        star.z -= 0.3;
        if (star.z < 20) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // 3D Perspective Projection
        const scale = fov / (fov + star.z);
        const px = (star.x + mouseX) * scale + width / 2;
        const py = (star.y + mouseY) * scale + height / 2;
        const pr = Math.max(0.4, star.radius * scale * 1.5);

        // Twinkle Opacity Math
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const alpha = Math.min(1, Math.max(0.2, (1 - star.z / 1000) * (0.4 + twinkle * 0.6)));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = pr > 1.8 ? 8 : 2;

        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // Render Dynamic Shooting Stars / Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const endX = m.x + Math.cos(m.angle) * m.length;
        const endY = m.y + Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        meteorGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        meteorGrad.addColorStop(0.7, "rgba(0, 240, 255, 0.7)");
        meteorGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Move meteor
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.008;

        if (m.y > height + m.length || m.x > width + m.length || m.opacity <= 0) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500"
    />
  );
}
