"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ThreeDCard from "./ThreeDCard";

interface AiOsWindowProps {
    children: React.ReactNode;
    title?: string;
    command?: string;
    statusText?: string;
    className?: string;
    depth?: number;
    spotlightColor?: string;
    isDraggable?: boolean;
}

export default function AiOsWindow({
    children,
    title = "JARVIS_AI_MODULE",
    command = "cat /sys/info.log",
    statusText = "SYS_CORE::ACTIVE",
    className = "",
    depth = 30,
    spotlightColor = "rgba(0, 240, 255, 0.25)",
    isDraggable = true,
}: AiOsWindowProps) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [zIndex, setZIndex] = useState(20);

    if (isClosed) {
        return (
            <div className="w-full p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 text-center font-mono text-xs text-slate-400">
                <span>[WINDOW_CLOSED] Click </span>
                <button onClick={() => setIsClosed(false)} className="text-cyan-300 underline font-bold">
                    Re-Open Window
                </button>
            </div>
        );
    }

    return (
        <ThreeDCard depth={depth} spotlightColor={spotlightColor} className="w-full">
            <motion.div
                drag={isDraggable && !isMaximized}
                dragElastic={0.05}
                dragMomentum={false}
                onMouseDown={() => setZIndex(40)}
                className={`relative rounded-3xl bg-slate-950/85 backdrop-blur-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden transition-all duration-300 group/window ${
                    isMaximized ? "scale-[1.02] border-cyan-400/70" : ""
                } ${className}`}
                style={{ transformStyle: "preserve-3d", zIndex }}
            >
                {/* Metallic Cyber Border Gradient Sweep */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-cyan-400/20 group-hover/window:border-cyan-400/50 transition-colors duration-500 z-10" />

                {/* AI OS Window Top Bar / Header (Drag Handle) */}
                <div
                    className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-white/10 select-none relative z-30 cursor-grab active:cursor-grabbing"
                    style={{ transform: "translateZ(25px)" }}
                >
                    {/* Window Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            title="Minimize Window"
                            className="w-3.5 h-3.5 rounded-full bg-amber-500/90 hover:bg-amber-400 border border-amber-400/60 flex items-center justify-center transition-colors text-[9px] font-bold text-amber-950 shadow-sm"
                        >
                            –
                        </button>
                        <button
                            onClick={() => setIsMaximized(!isMaximized)}
                            title="Maximize Window"
                            className="w-3.5 h-3.5 rounded-full bg-emerald-500/90 hover:bg-emerald-400 border border-emerald-400/60 flex items-center justify-center transition-colors text-[9px] font-bold text-emerald-950 shadow-sm"
                        >
                            +
                        </button>
                        <button
                            onClick={() => setIsClosed(true)}
                            title="Close Window"
                            className="w-3.5 h-3.5 rounded-full bg-rose-500/90 hover:bg-rose-400 border border-rose-400/60 flex items-center justify-center transition-colors text-[9px] font-bold text-rose-950 shadow-sm"
                        >
                            ×
                        </button>
                    </div>

                    {/* Window Title & Command */}
                    <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider overflow-hidden">
                        <span className="text-cyan-300 flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            {title}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">|</span>
                        <span className="text-slate-400 font-normal hidden sm:inline truncate max-w-[250px]">
                            {command}
                        </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-widest hidden md:inline-block shadow-inner">
                            {statusText}
                        </span>
                    </div>
                </div>

                {/* Cyber HUD Terminal Command Strip */}
                <div
                    className="px-6 py-2 bg-slate-950/80 border-b border-white/5 font-mono text-[11px] text-slate-400 flex items-center justify-between"
                    style={{ transform: "translateZ(15px)" }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-bold">jarvis@core:~$</span>
                        <span className="text-cyan-300 font-medium">{command}</span>
                        <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
                    </div>
                    <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-slate-400">
                        <span>CPU: 14.2%</span>
                        <span>MEM: 4.8GB</span>
                        <span className="text-emerald-400">SEC: AES-256</span>
                    </div>
                </div>

                {/* Main Content Area */}
                {!isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, height: "auto" }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 sm:p-6 md:p-10 relative z-20"
                        style={{ transform: "translateZ(20px)" }}
                    >

                        {children}
                    </motion.div>
                )}

                {/* Futuristic Corner HUD Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none z-40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70 pointer-events-none z-40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70 pointer-events-none z-40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70 pointer-events-none z-40" />
            </motion.div>
        </ThreeDCard>
    );
}


