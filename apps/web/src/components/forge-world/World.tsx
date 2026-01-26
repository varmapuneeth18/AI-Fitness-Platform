"use client"

import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    PresentationControls,
    Stars,
    Torus,
    ContactShadows
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Dumbbell, Utensils, Cpu, Activity, ArrowRight, ChevronRight, Binary } from 'lucide-react'

// --- 3D Station Core ---

function ForgeCore({ activeState, color }: { activeState: number, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const ringsRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
            meshRef.current.rotation.z += 0.002
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.x += 0.005
            ringsRef.current.rotation.y -= 0.01
        }
    })

    return (
        <group scale={2.5}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Massive Central Entity - NOW USING STANDARD MATERIAL FOR 100% VISIBILITY */}
                <mesh ref={meshRef}>
                    <octahedronGeometry args={[4, 0]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={2}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Rotating Rings for Volume */}
                <group ref={ringsRef}>
                    <Torus args={[6, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
                    </Torus>
                    <Torus args={[8, 0.05, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                        <meshStandardMaterial color="#fff" transparent opacity={0.3} />
                    </Torus>
                    <Torus args={[12, 0.02, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
                        <meshStandardMaterial color={color} transparent opacity={0.2} />
                    </Torus>
                </group>

                {/* Wireframe Safety Net - Guarantees visibility even if lights fail */}
                <mesh>
                    <icosahedronGeometry args={[5, 1]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
                </mesh>
            </Float>
        </group>
    )
}

// --- Main World Component ---

export default function ForgeWorld() {
    const [activeFeature, setActiveFeature] = useState(0)

    const features = [
        {
            title: "PROTOCOLS",
            subtitle: "Performance Telemetry",
            description: "Industrial-grade workout logging. Track every force vector, volume trajectory, and biological load in real-time.",
            icon: Dumbbell,
            color: "#f97316",
            tags: ["Force Vectors", "Volume Sync", "Real-Time Analysis"]
        },
        {
            title: "METABOLIC",
            subtitle: "Nutritional Architecture",
            description: "AI-driven metabolic modeling. Align your complex molecular fueling to your actual performance demand patterns.",
            icon: Utensils,
            color: "#ef4444",
            tags: ["Bio-Molecular", "Fueling", "Optimizer"]
        },
        {
            title: "COACH",
            subtitle: "Neural Optimization",
            description: "Direct-link neural advisor. Consult the Forge AI for elite strategy on biology, recovery, and peak output.",
            icon: Cpu,
            color: "#ffffff",
            tags: ["Neural Sync", "Strategy", "GPT-4o Engine"]
        }
    ]

    return (
        <div className="w-full h-screen bg-[#020202] relative overflow-hidden font-sans">
            {/* Background 3D Engine */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                    {/* Camera MOVED CLOSER for guaranteed framing */}
                    <PerspectiveCamera makeDefault position={[20, 12, 20]} fov={35} />
                    <color attach="background" args={['#000']} />
                    <Stars radius={150} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />

                    <Suspense fallback={null}>
                        {/* High-Intensity Studio Lighting */}
                        <ambientLight intensity={1.5} />
                        <pointLight position={[10, 10, 10]} intensity={80} color={features[activeFeature].color} />
                        <pointLight position={[-10, -5, -10]} intensity={40} color="#fff" />

                        <PresentationControls
                            global
                            snap
                            speed={1.5}
                            rotation={[0, 0.5, 0]}
                            polar={[-Math.PI / 10, Math.PI / 10]}
                            azimuth={[-Math.PI / 4, Math.PI / 4]}
                        >
                            <ForgeCore activeState={activeFeature} color={features[activeFeature].color} />
                        </PresentationControls>

                        <EffectComposer>
                            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.4} />
                        </EffectComposer>

                        {/* Ground Plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#000" roughness={0.1} metalness={0.8} />
                        </mesh>
                    </Suspense>
                </Canvas>
            </div>

            {/* HIGH-IMPACT HUD (2D LAYER) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-12 lg:p-20 pointer-events-none">

                {/* Top Branding Section */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-6 group">
                            <div className="bg-orange-600 p-4 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                                <Zap className="h-6 w-6 text-white fill-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-6xl font-black tracking-[-0.15em] uppercase italic text-white leading-none">FORGE</span>
                                <span className="text-[10px] font-black tracking-[0.8em] text-orange-600 uppercase ml-1">AI FITNESS ECOSYSTEM</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-12">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase italic">NETWORK_STABLE</span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">USER_NOT_INITIALIZED</span>
                        </div>
                        <Link href="/login">
                            <button className="bg-white text-black text-[12px] font-black uppercase tracking-[0.5em] px-16 py-6 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center gap-4">
                                INITIALIZE <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between pointer-events-auto h-full pb-12">

                    {/* Feature Navigation Sidebar */}
                    <div className="w-full lg:w-[450px] space-y-8 lg:space-y-12 mt-12 lg:mt-0">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-orange-600 font-bold tracking-[0.8em] text-[10px] uppercase italic">
                                <Activity className="h-4 w-4" /> CORE_FACILITIES_READY
                            </div>
                            <h1 className="text-[8vw] lg:text-[5vw] font-black uppercase italic tracking-[-0.1em] text-white leading-[0.85]">
                                EVOLVE YOUR <br /> <span className="text-orange-600">BIOLOGY.</span>
                            </h1>
                        </div>

                        {/* Feature Toggle Pill Navigation */}
                        <div className="grid grid-cols-1 gap-4">
                            {features.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveFeature(i)}
                                    className={`group relative p-6 lg:p-8 rounded-[2rem] border transition-all duration-500 text-left overflow-hidden ${activeFeature === i
                                            ? 'bg-white border-white scale-105 shadow-2xl'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {/* Abstract noise bg */}
                                    <div className={`absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-700 ${activeFeature === i ? 'scale-150 rotate-45' : 'scale-100 rotate-0'}`}>
                                        <f.icon className={`h-40 w-40 ${activeFeature === i ? 'text-black' : 'text-white'}`} />
                                    </div>

                                    <div className="relative z-10 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-black tracking-widest uppercase ${activeFeature === i ? 'text-orange-600' : 'text-orange-600/60'}`}>
                                                SYSTEM_0{i + 1}
                                            </span>
                                            {activeFeature === i && <motion.div layoutId="arrow" className="text-orange-600"><ChevronRight /></motion.div>}
                                        </div>
                                        <h3 className={`text-3xl lg:text-4xl font-black italic uppercase tracking-tighter ${activeFeature === i ? 'text-black' : 'text-white'}`}>
                                            {f.title}
                                        </h3>
                                        <p className={`text-[10px] lg:text-[12px] font-bold uppercase tracking-widest transition-opacity ${activeFeature === i ? 'text-black/60' : 'text-white/40 opacity-0 group-hover:opacity-100'}`}>
                                            {f.subtitle}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Feature Detail Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFeature}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="hidden xl:flex w-[400px] flex-col gap-10 p-10 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-xl"
                        >
                            <div className="space-y-6">
                                <div className="p-4 bg-orange-600/10 rounded-2xl w-fit">
                                    {React.createElement(features[activeFeature].icon, { className: "h-8 w-8 text-orange-600" })}
                                </div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                                    {features[activeFeature].title}
                                </h3>
                                <p className="text-[13px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                    {features[activeFeature].description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-black text-orange-600 tracking-[0.5em] uppercase">SYSTEM_METRICS</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {features[activeFeature].tags.map(tag => (
                                        <div key={tag} className="flex items-center gap-4 text-[11px] font-black uppercase text-white/50 tracking-widest border-b border-white/5 pb-3">
                                            <Binary className="h-3 w-3 text-orange-600/40" /> {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
