"use client";

import { useRef, useState } from "react";

export default function GlareCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const isPointerInside = useRef(false);
    const refElement = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        glare: {
            x: 50,
            y: 50,
            opacity: 0,
        },
        background: {
            x: 50,
            y: 50,
        },
        rotate: {
            x: 0,
            y: 0,
        },
    });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        const percentage = {
            x: (100 / rect.width) * position.x,
            y: (100 / rect.height) * position.y,
        };
        const delta = {
            x: percentage.x - 50,
            y: percentage.y - 50,
        };

        const { background, rotate, glare } = state;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.y / 3.5);
        rotate.y = delta.x / 3.5;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;
        glare.opacity = 0.25;

        setState({ ...state, background, rotate, glare });
    };

    const handlePointerEnter = () => {
        isPointerInside.current = true;
        setTimeout(() => {
            if (isPointerInside.current) {
                // enter
            }
        }, 0);
    };

    const handlePointerLeave = () => {
        isPointerInside.current = false;
        setState({
            ...state,
            glare: { ...state.glare, opacity: 0 },
            rotate: { x: 0, y: 0 },
        });
    };

    return (
        <div
            ref={refElement}
            className={`relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[600ms] ease-[var(--step)] will-change-transform ${className}`}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <div
                className="h-full w-full transition-transform duration-[600ms] ease-[var(--step)] will-change-transform [transform-style:preserve-3d]"
                style={{
                    transform: `rotateY(${state.rotate.y}deg) rotateX(${state.rotate.x}deg)`,
                }}
            >
                <div className="h-full w-full overflow-hidden rounded-[inherit]">
                    {children}
                </div>

                {/* Glare Layer */}
                <div
                    className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300 mix-blend-overlay"
                    style={{
                        opacity: state.glare.opacity,
                        background: `radial-gradient(farthest-corner at ${state.glare.x}% ${state.glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)`,
                    }}
                />
            </div>
        </div>
    );
}
