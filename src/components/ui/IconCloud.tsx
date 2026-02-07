"use client";
import React from "react";
import { useTheme } from "next-themes";

export const IconCloud = ({ iconSlugs }: { iconSlugs: string[] }) => {
    useTheme();

    // Simple tag cloud implementation could go here, 
    // but for "Extreme" 3D physics without new deps, we will use a CSS 3D Sphere rotation

    return (
        <div className="flex items-center justify-center relative w-full h-[500px] perspective-1000 overflow-hidden">
            <div className="animate-spin-slow preserve-3d relative w-[300px] h-[300px]">
                {iconSlugs.map((slug, i) => {
                    const phi = Math.acos(-1 + (2 * i) / iconSlugs.length);
                    const theta = Math.sqrt(iconSlugs.length * Math.PI) * phi;
                    const x = 150 * Math.cos(theta) * Math.sin(phi);
                    const y = 150 * Math.sin(theta) * Math.sin(phi);
                    const z = 150 * Math.cos(phi);

                    return (
                        <div
                            key={slug}
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-white/30 transition-all hover:scale-150 cursor-pointer"
                            style={{
                                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                            }}
                        >
                            <img
                                src={`https://cdn.simpleicons.org/${slug}`}
                                alt={slug}
                                height={40}
                                width={40}
                                className="w-10 h-10 object-contain invert dark:invert-0"
                            />
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
            .perspective-1000 {
                perspective: 1000px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .animate-spin-slow {
                animation: spin 20s linear infinite;
            }
            @keyframes spin {
                from { transform: rotateY(0deg) rotateX(0deg); }
                to { transform: rotateY(360deg) rotateX(360deg); }
            }
        `}</style>
        </div>
    );
};
