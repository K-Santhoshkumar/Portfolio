"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";

// Subtle Floating Micro Starfield Particle Stream
function MinimalistStarfield() {
    const ref = useRef<THREE.Points>(null!);
    const [sphere] = useState(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 50;
            ref.current.rotation.y -= delta / 60;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#38bdf8"
                    size={0.035}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export default function ThreeBackground() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#030712] pointer-events-none overflow-hidden">
            {/* Deep Obsidian Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#030712] to-[#02040a]" />

            {/* Subtle Soft Cyan Ambient Glow Aura */}
            <div
                className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(800px circle at ${(mouse.x + 1) * 50}% ${(-mouse.y + 1) * 50}%, rgba(0, 240, 255, 0.06), rgba(168, 85, 247, 0.04) 40%, transparent 75%)`,
                }}
            />

            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <color attach="background" args={["#030712"]} />

                <Suspense fallback={null}>
                    <MinimalistStarfield />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}





