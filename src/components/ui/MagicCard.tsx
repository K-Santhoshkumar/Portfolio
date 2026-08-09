"use client";

import React from "react";
import { motion } from "framer-motion";


interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
    depth?: number;
}

export default function MagicCard({
    children,
    className = "",
}: MagicCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: [0, -5, 0],
            }}
            transition={{
                y: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.4 },
            }}
            whileHover={{ scale: 1.03, zIndex: 30 }}
            className={`relative rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-cyan-950/20 hover:border-cyan-400 hover:shadow-cyan-500/20 ${className}`}
        >
            {children}
        </motion.div>
    );
}



