"use client"

import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    MeshTransmissionMaterial,
    Html,
    Environment,
    ContactShadows,
    PresentationControls,
    Stars,
    Stage,
    Text,
    Torus
} from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Dumbbell, Utensils, Cpu, MessageSquare, ArrowRight, Activity, Target, Shield } from 'lucide-react'

// --- Components ---

function MachineCore({ hovered, color }: { hovered: boolean, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.02
            meshRef.current.rotation.z += 0.01
        }
    })

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[1.2, 0]} />
            <MeshDistortMaterial
                color={hovered ? color : "#222"}
                speed={2}
                distort={0.4}
                metalness={1}
                roughness={0.1}
                emissive={hovered ? color : "#111"}
                emissiveIntensity={hovered ? 2 : 0.5}
            />
        </mesh>
    )
}

function MachineRings({ hovered }: { hovered: boolean }) {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.01
            groupRef.current.rotation.y -= 0.015
        }
    })

    return (
        <group ref={groupRef}>
            <Torus args={[2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={hovered ? "#f97316" : "#444"} emissive={hovered ? "#f97316" : "#000"} emissiveIntensity={2} />
            </Torus>
            <Torus args={[1.8, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color={hovered ? "#fff" : "#222"} transparent opacity={0.5} />
            </Torus>
        </group>
    )
}

function ForgeStation({ position, color, icon: Icon, title, description, tags, index }: any) {
    const [hovered, setHovered] = useState(false)
    const groupRef = useRef<THREE.Group>(null!)

    return (
        <group
            position={position}
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* 3D Machine Model */}
                <MachineCore hovered={hovered} color={color} />
                <MachineRings hovered={hovered} />

                {/* Inner Icon */}
                <Html position={[0, 0, 0]} center distanceFactor={10}>
                    <div className={`transition-all duration-500 ${hovered ? 'scale-125 opacity-100' : 'scale-100 opacity-20'}`}>
                        <Icon className="h-12 w-12 text-white" />
                    </div>
                </Html>

                {/* Glass Holographic Panel */}
                <Html
                    position={[0, 4, 0]}
                    center
                    distanceFactor={10}
                    className="pointer-events-none select-none"
                    style={{
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: hovered ? 1 : 0.2,
                        transform: `scale(${hovered ? 1.05 : 0.8}) translateY(${hovered ? 0 : 20}px)`
                    }}
                >
                    <div className="w-[320px] p-8 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-50" />

                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black text-orange-600 tracking-[0.5em] uppercase">SYSTEM {index}</span>
                            <div className={`w-2 h-2 rounded-full bg-orange-600 ${hovered ? 'animate-ping' : ''}`} />
                        </div>

                        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-3">
                            {title}
                        </h3>

                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/5 px-3 py-1.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>

                {/* Ground Glow */}
                <pointLight position={[0, -2, 0]} intensity={hovered ? 15 : 2} color={color} distance={10} />
            </Float>
        </group>
    )
}

function ForgeScene() {
    return (
        <group>
            {/* Stations in a triangular formation for better orbit exploration */}
            <ForgeStation
                index="01"
                position={[-8, 0, 4]}
                color="#f97316"
                icon={Dumbbell}
                title="PROTOCOLS"
                description="High-fidelity workout logging. Track force vectors, volume trajectories, and progression indices in real-time."
                tags={["Lifting", "Telemetry", "Volume"]}
            />
            <ForgeStation
                index="02"
                position={[8, 0, 4]}
                color="#f97316"
                icon={Utensils}
                title="METABOLIC"
                description="AI-driven nutrition architecture. Align your bio-fueling protocol with your metabolic performance load."
                tags={["Macros", "Fueling", "Sync"]}
            />
            <ForgeStation
                index="03"
                position={[0, 0, -8]}
                color="#ffffff"
                icon={Cpu}
                title="INTELLIGENCE"
                description="Neural-linked performance coach. Consult the Forge AI for tactical routine adjustments and biology optimization."
                tags={["AI Chat", "Neural", "Strategy"]}
            />

            {/* Central Power Core */}
            <Float speed={5} rotationIntensity={4} floatIntensity={1}>
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
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

            {/* Cinematic Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
            </mesh>
        </group>
    )
}

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
            {/* 2D Overlay HUD - High Tech Elite Aesthetic */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-5 pointer-events-auto">
                            <div className="bg-orange-600 p-3 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="text-4xl font-black tracking-[-0.1em] uppercase italic text-white leading-none">
                                FORGE
                            </span>
                        </Link>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-white/30">
                            <Activity className="h-3 w-3 text-orange-600" /> SYSTEM ARCHIVE // SYNC 100%
                        </div>
                    </div>

                    <div className="pointer-events-auto">
                        <Link href="/login">
                            <button className="bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] px-14 py-5 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                INITIALIZE
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="max-w-md space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-7xl font-black uppercase italic tracking-[-0.08em] text-white leading-none">FORGE HUB</h2>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-12 bg-orange-600" />
                                <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.4em]">ORBIT TO NAVIGATE // SELECT STATION</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 border-l border-white/5 pl-8">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Protocol Load</span>
                                <div className="h-1 w-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        animate={{ width: ["20%", "80%", "60%"] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="h-full bg-orange-600"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Neural Link</span>
                                <div className="h-1 w-full bg-white/5 overflow-hidden">
                                    <div className="h-full w-full bg-orange-600 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[9px] font-black text-gray-900 uppercase tracking-[1.5em] vertical-rl rotate-180 mb-2">
                        STABLE_BUILD_2026_01
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas shadows gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[18, 12, 18]} fov={35} />

                <color attach="background" args={['#020202']} />
                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <ForgeScene />
                    </Stage>
                </Suspense>

                <PresentationControls
                    global
                    snap
                    speed={1.5}
                    rotation={[0, 0.5, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Math.PI / 2, Math.PI / 2]}
                >
                    {/* The controls wrap the scene but Stage centers it */}
                </PresentationControls>

                <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={40} blur={2.5} far={10} color="#000000" />
            </Canvas>
        </div>
    )
}
