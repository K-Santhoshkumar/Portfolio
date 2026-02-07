"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HolographicImage() {
    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            {/* Holographic Container */}
            <motion.div
                className="relative rounded-full p-1 bg-black overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                {/* RGB Split Layers (Hidden by default, visible on hover) */}
                <div className="absolute inset-0 rounded-full mix-blend-screen opacity-0 group-hover:opacity-70 animate-pulse pointer-events-none translate-x-[2px] bg-red-500/20 z-10" />
                <div className="absolute inset-0 rounded-full mix-blend-screen opacity-0 group-hover:opacity-70 animate-pulse delay-75 pointer-events-none -translate-x-[2px] bg-blue-500/20 z-10" />

                {/* Scanline */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[url('/scanline.png')] opacity-0 group-hover:opacity-20 animate-scan" style={{ backgroundSize: '100% 4px' }} />

                <Image
                    src="/portfolio_logo.png"
                    alt="Santhoshkumar Logo"
                    width={150}
                    height={150}
                    className="rounded-full relative z-0"
                    priority
                />
            </motion.div>
        </div>
    );
}
