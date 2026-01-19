"use client"

import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    OrbitControls,
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Html,
    Environment,
    ContactShadows,
    PresentationControls
} from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'
import { Zap, Dumbbell, Utensils, Cpu, MessageSquare, ArrowRight, Activity, Target } from 'lucide-react'

// --- Components ---

function ForgeStation({ position, color, icon: Icon, title, description, tags }: any) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01 * (hovered ? 2 : 1)
        }
    })

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* The "Anchor" Object */}
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => console.log(`Clicked ${title}`)}
                >
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    <MeshWobbleMaterial
                        color={hovered ? "#f97316" : "#222"}
                        factor={hovered ? 0.6 : 0.2}
                        speed={2}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>

                {/* AR-Style 2D Panel */}
                <Html
                    position={[0, 2.5, 0]}
                    center
                    distanceFactor={10}
                    className="pointer-events-none select-none"
                    style={{ transition: 'all 0.5s', opacity: hovered ? 1 : 0.4, transform: `scale(${hovered ? 1.1 : 1})` }}
                >
                    <div className="w-[300px] p-6 rounded-3xl bg-black/80 border border-white/10 backdrop-blur-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-600 rounded-xl">
                                <Icon className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">{title}</h3>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-orange-500/60 bg-orange-500/5 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>

                {/* Floor Projection */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                    <planeGeometry args={[4, 4]} />
                    <meshBasicMaterial color={color} transparent opacity={hovered ? 0.1 : 0.02} />
                </mesh>
            </Float>
        </group>
    )
}

function ConnectionPaths() {
    // Visualizing the "Network" between stations
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
                <gridHelper args={[50, 50, "#111", "#050505"]} />
            </mesh>
        </group>
    )
}

function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
            {/* 2D Overlay HUD */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-10">
                <div className="flex justify-between items-start w-full">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-600 p-2.5 rounded-full">
                                <Zap className="h-4 w-4 text-white fill-white" />
                            </div>
                            <span className="text-3xl font-black tracking-[-0.08em] uppercase italic text-white leading-none pointer-events-auto cursor-pointer">
                                FORGE
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
                            <Activity className="h-3 w-3" /> SYNC: STABLE // BIO-LINK ACTIVE
                        </div>
                    </div>

                    <div className="flex gap-4 pointer-events-auto">
                        <Link href="/login">
                            <button className="bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-2xl">
                                INITIALIZE
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-end w-full">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-5xl font-black uppercase italic tracking-[-0.05em] text-white">INTERACTIVE HUB</h2>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">DRAG TO NAVIGATE // CLICK HOTSPOTS</p>
                        </div>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Protocol Stats</span>
                                <div className="h-1 w-32 bg-white/5 overflow-hidden">
                                    <div className="h-full w-2/3 bg-orange-600" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">AI Sync</span>
                                <div className="h-1 w-32 bg-white/5 overflow-hidden">
                                    <div className="h-full w-full bg-orange-600 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[9px] font-black text-gray-900 uppercase tracking-[1em] select-none">
                        © 2026 FORGE ARCHIVE
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas shadows className="cursor-grab active:cursor-grabbing">
                <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={40} />

                <color attach="background" args={['#020202']} />
                <fog attach="fog" args={['#020202', 15, 25]} />

                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#f97316" castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#333" />

                <PresentationControls
                    global
                    snap
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 2, Math.PI / 2]}
                >
                    <group>
                        <ForgeStation
                            position={[-5, 0, -5]}
                            color="#f97316"
                            icon={Dumbbell}
                            title="PROTOCOLS"
                            description="Log every rep. Every vector of force is monitored by the Forge Engine. High-intensity workout tracking with infinite history."
                            tags={["500+ Exercises", "Log Telemetry", "Progression"]}
                        />
                        <ForgeStation
                            position={[5, 0, -2]}
                            color="#f97316"
                            icon={Utensils}
                            title="METABOLIC"
                            description="Fuelling logic established. Log nutrition metrics and let the Forge sync your macros to your output volume."
                            tags={["Macro Logic", "Meal History", "Bio-Sync"]}
                        />
                        <ForgeStation
                            position={[0, 0, 5]}
                            color="#fff"
                            icon={Cpu}
                            title="COACH"
                            description="Your neural-linked assistant. Consult the Forge AI for routine adjustments and real-world nutrition advice."
                            tags={["AI Chat", "Neural Insights", "24/7 Support"]}
                        />

                        {/* Central Hub Object */}
                        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                            <mesh position={[0, 2, 0]}>
                                <sphereGeometry args={[0.5, 32, 32]} />
                                <MeshDistortMaterial
                                    color="#f97316"
                                    distort={0.4}
                                    speed={4}
                                    metalness={1}
                                    roughness={0}
                                    emissive="#f97316"
                                    emissiveIntensity={2}
                                />
                            </mesh>
                        </Float>

                        <ConnectionPaths />
                    </group>
                </PresentationControls>

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000" />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}

export default ForgeWorld;
