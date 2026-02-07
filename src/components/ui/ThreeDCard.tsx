"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export default function ThreeDCard({
    children,
    className = "",
    spotlightColor = "rgba(14, 165, 233, 0.15)", // Default to Sky Blue
}: ThreeDCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXWithOffset = e.clientX - rect.left;
        const mouseYWithOffset = e.clientY - rect.top;

        const xPct = mouseXWithOffset / width - 0.5;
        const yPct = mouseYWithOffset / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative active:scale-95 transition-transform duration-200 ease-linear ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl -z-10"
            />
            <div className={`relative h-full w-full overflow-hidden ${className}`}>
                {children}
                <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
                    style={{
                        background: `radial-gradient(600px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, ${spotlightColor}, transparent 40%)`,
                    }}
                />
            </div>
        </motion.div>
    );
}
