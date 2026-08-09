"use client";

import React, { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

interface DataStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function ModernAiOs3dBackground(): React.ReactElement {
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
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Layer 2: Particle Field (Star Dust)
    const starCount = Math.min(Math.floor(width / 12), 110);
    const stars: Particle3D[] = [];
    const starColors = ["#00f0ff", "#a855f7", "#38bdf8", "#34d399"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 900 + 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Layer 3: Neural Network Data Nodes
    const nodeCount = Math.min(Math.floor(width / 22), 55);
    const nodes: Particle3D[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 700 + 100,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.8 + 1.2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Layer 4: Digital Data Streams (Kafka Packet Streams)
    const streamCount = 14;
    const streams: DataStream[] = [];
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.15,
        color: Math.random() > 0.5 ? "#00f0ff" : "#a855f7",
      });
    }

    const fov = 420;
    let radarRotation = 0;

    const render = () => {
      const isLightMode = document.documentElement.classList.contains("cyber-light-mode");

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      radarRotation += 0.006;

      // Layer 1: Ambient Base & Radial Lighting
      if (isLightMode) {
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(0, 0, width, height);

        const lightGrad = ctx.createRadialGradient(
          width / 2 + mouseX,
          height * 0.35 + mouseY,
          80,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        lightGrad.addColorStop(0, "rgba(2, 132, 199, 0.14)");
        lightGrad.addColorStop(0.5, "rgba(126, 34, 206, 0.08)");
        lightGrad.addColorStop(1, "#f1f5f9");
        ctx.fillStyle = lightGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = "#030712";
        ctx.fillRect(0, 0, width, height);

        const darkGrad = ctx.createRadialGradient(
          width / 2 + mouseX,
          height * 0.35 + mouseY,
          80,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        darkGrad.addColorStop(0, "rgba(0, 240, 255, 0.18)");
        darkGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.1)");
        darkGrad.addColorStop(1, "rgba(3, 7, 18, 0.98)");
        ctx.fillStyle = darkGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Layer 2: Render Particle Field (Star Dust)
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        if (Math.abs(star.x) > width) star.vx *= -1;
        if (Math.abs(star.y) > height) star.vy *= -1;
        if (star.z < 50 || star.z > 950) star.vz *= -1;

        const scale = fov / (fov + star.z);
        const px = (star.x + mouseX * 0.4) * scale + width / 2;
        const py = (star.y + mouseY * 0.4) * scale + height / 2;
        const pr = star.radius * scale;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = isLightMode ? 0.4 : Math.min(0.8, 350 / star.z);
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Layer 4: Render Digital Data Streams (Kafka Streams)
      for (let i = 0; i < streamCount; i++) {
        const s = streams[i];
        s.y += s.speed;
        if (s.y > height + s.length) {
          s.y = -s.length;
          s.x = Math.random() * width;
        }

        const streamGrad = ctx.createLinearGradient(s.x, s.y - s.length, s.x, s.y);
        streamGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        streamGrad.addColorStop(
          1,
          isLightMode
            ? `rgba(2, 132, 199, ${s.opacity * 0.6})`
            : `rgba(0, 240, 255, ${s.opacity})`
        );

        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.length);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      // Layer 5: Floating HUD Rings & System Radar Reticles
      const radarCenterX = width * 0.85 + mouseX * 0.3;
      const radarCenterY = height * 0.25 + mouseY * 0.3;
      const radarRadius = 140;

      ctx.save();
      ctx.translate(radarCenterX, radarCenterY);

      // Outer HUD Ring
      ctx.strokeStyle = isLightMode ? "rgba(2, 132, 199, 0.25)" : "rgba(0, 240, 255, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Reticle Ring
      ctx.strokeStyle = isLightMode ? "rgba(126, 34, 206, 0.2)" : "rgba(168, 85, 247, 0.2)";
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, radarRadius * 0.65, radarRotation, radarRotation + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating Radar Sweep Line
      const sweepX = Math.cos(radarRotation) * radarRadius;
      const sweepY = Math.sin(radarRotation) * radarRadius;
      ctx.strokeStyle = isLightMode ? "rgba(2, 132, 199, 0.35)" : "rgba(0, 240, 255, 0.35)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      ctx.restore();

      // Layer 3: Render Neural Network Nodes & Laser Connections
      const projectedNodes: { x: number; y: number; z: number; color: string; radius: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (Math.abs(node.x) > width) node.vx *= -1;
        if (Math.abs(node.y) > height) node.vy *= -1;
        if (node.z < 40 || node.z > 800) node.vz *= -1;

        const scale = fov / (fov + node.z);
        const px = (node.x + mouseX) * scale + width / 2;
        const py = (node.y + mouseY) * scale + height / 2;
        const pr = Math.max(1, node.radius * scale * 1.3);

        projectedNodes.push({ x: px, y: py, z: node.z, color: node.color, radius: pr });
      }

      // Draw Laser Connections Between Nearby Nodes
      const maxDistance = 150;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isLightMode ? 0.35 : 0.45);
            ctx.strokeStyle = isLightMode
              ? `rgba(2, 132, 199, ${alpha})`
              : `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = Math.max(0.4, 1.3 * (1 - dist / maxDistance));
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const alpha = Math.min(1, 400 / p.z);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isLightMode ? 4 : 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
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
