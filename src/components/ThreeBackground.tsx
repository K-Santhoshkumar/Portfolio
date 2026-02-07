"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import { useState, useRef, Suspense } from "react";
import * as THREE from "three";

function FloatingParticles(props: React.ComponentPropsWithoutRef<"group">) {
    const ref = useRef<THREE.Points>(null!);

    const [sphere] = useState(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 25;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#0ea5e9" // Sky Blue
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}



function AnimatedShapes() {
    const meshRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.2;
        }
    })

    return (
        <group ref={meshRef}>
            {/* Floating Geometric Shapes */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[-2, 1, -2]}>
                    <icosahedronGeometry args={[0.4, 0]} />
                    <meshBasicMaterial color="#0ea5e9" wireframe />
                </mesh>
                <mesh position={[2, -1, -3]}>
                    <octahedronGeometry args={[0.6, 0]} />
                    <meshBasicMaterial color="#818cf8" wireframe />
                </mesh>
                <mesh position={[0, 2, -4]}>
                    <tetrahedronGeometry args={[0.5, 0]} />
                    <meshBasicMaterial color="#22d3ee" wireframe />
                </mesh>
            </Float>
        </group>
    )
}


export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true, alpha: false }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 15]} />
                <Suspense fallback={null}>
                    <FloatingParticles />
                    <AnimatedShapes />
                    <ambientLight intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
