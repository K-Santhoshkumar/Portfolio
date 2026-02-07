"use client";

import React, { useRef, useState } from "react";

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
}

export default function MagicCard({
    children,
    className = "",
    gradientColor = "#0ea5e9", // Sky Blue
}: MagicCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl border border-white/10 bg-black/50 overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${gradientColor}40, transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>

            {/* Animated Border Gradient */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition duration-500 pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 20px ${gradientColor}20, 0 0 20px ${gradientColor}20`
                }}
            />
        </div>
    );
}
