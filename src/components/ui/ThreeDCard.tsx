"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    depth?: number;
}

export default function ThreeDCard({
    children,
    className = "",
    spotlightColor = "rgba(0, 240, 255, 0.15)",
}: ThreeDCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative group/card w-full rounded-3xl transition-all duration-300 ${className}`}
        >
            {/* Smooth Ambient Backlight Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

            {/* Main Content Container */}
            <div className="relative h-full w-full rounded-3xl">
                {children}

                {/* Smooth Mouse Follow Light Glare */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 overflow-hidden z-30"
                    style={{
                        background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, ${spotlightColor}, transparent 50%)`,
                    }}
                />

                {/* Elegant Glass Border Highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-cyan-500/20 group-hover/card:border-cyan-400/50 transition-colors duration-300 z-40" />
            </div>
        </motion.div>
    );
}


