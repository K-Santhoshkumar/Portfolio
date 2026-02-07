"use client";

import { useEffect, useRef, useState } from "react";

export default function MeteorBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const meteors: { x: number; y: number; length: number; speed: number; angle: number }[] = [];
        const stars: { x: number; y: number; size: number; opacity: number; pulseSpeed: number }[] = [];

        // Initialize Stars
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                opacity: Math.random(),
                pulseSpeed: 0.005 + Math.random() * 0.005
            });
        }

        // Meteor Generator
        const createMeteor = () => {
            const x = Math.random() * canvas.width;
            const y = 0; // Start at top
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly 45 degrees
            const speed = 2 + Math.random() * 5;
            const length = 50 + Math.random() * 100;
            return { x, y, length, speed, angle };
        }

        let animationFrameId: number;
        let meteorTimer = 0;

        const animate = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trails
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with fade for trails

            // Draw Stars
            stars.forEach(star => {
                star.opacity += star.pulseSpeed;
                if (star.opacity > 1 || star.opacity < 0.2) star.pulseSpeed = -star.pulseSpeed;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
                ctx.fill();
            });

            // Spawn Meteors
            meteorTimer++;
            if (meteorTimer > 100 && Math.random() > 0.95) { // Random chance to spawn
                meteors.push(createMeteor());
                meteorTimer = 0;
            }

            // Draw and Move Meteors
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += Math.cos(m.angle) * m.speed;
                m.y += Math.sin(m.angle) * m.speed;

                // Draw Meteor
                const gradient = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
                ctx.stroke();

                // Remove if off screen
                if (m.y > canvas.height + 100 || m.x > canvas.width + 100) {
                    meteors.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
            {/* Nebular Gradients overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-black opacity-80" />
            <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
