"use client";

import React from "react";

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
        <div className={`relative rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 shadow-xl hover:border-cyan-400 ${className}`}>
            {children}
        </div>
    );
}


