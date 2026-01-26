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
import { Zap, Dumbbell, Utensils, Cpu, Activity, ArrowRight, ChevronRight, Binary, ExternalLink } from 'lucide-react'

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

                {/* Wireframe Safety Net */}
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

    // Feature Data with ROUTES
    const features = [
        {
            title: "PROTOCOLS",
            subtitle: "Performance Telemetry",
            description: "Industrial-grade workout logging. Track every force vector, volume trajectory, and biological load in real-time.",
            icon: Dumbbell,
            color: "#f97316",
            tags: ["Force Vectors", "Volume Sync", "Real-Time Analysis"],
            route: "/dashboard/workouts"
        },
        {
            title: "METABOLIC",
            subtitle: "Nutritional Architecture",
            description: "AI-driven metabolic modeling. Align your complex molecular fueling to your actual performance demand patterns.",
            icon: Utensils,
            color: "#ef4444",
            tags: ["Bio-Molecular", "Fueling", "Optimizer"],
            route: "/dashboard/nutrition"
        },
        {
            title: "COACH",
            subtitle: "Neural Optimization",
            description: "Direct-link neural advisor. Consult the Forge AI for elite strategy on biology, recovery, and peak output.",
            icon: Cpu,
            color: "#ffffff",
            tags: ["Neural Sync", "Strategy", "GPT-4o Engine"],
            route: "/dashboard/coach"
        }
    ]

    return (
        <div className="w-full h-screen bg-[#020202] relative overflow-hidden font-sans">
            {/* Background 3D Engine */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                    <PerspectiveCamera makeDefault position={[20, 12, 20]} fov={35} />
                    <color attach="background" args={['#000']} />
                    <Stars radius={150} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />

                    <Suspense fallback={null}>
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

                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#000" roughness={0.1} metalness={0.8} />
                        </mesh>
                    </Suspense>
                </Canvas>
            </div>

            {/* HIGH-IMPACT HUD (2D LAYER) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 lg:p-12 pointer-events-none overflow-hidden">

                {/* Top Branding Section */}
                <div className="flex justify-between items-start pointer-events-auto z-50">
                    <div className="space-y-2">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="bg-orange-600 p-3 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-5xl lg:text-6xl font-black tracking-[-0.15em] uppercase italic text-white leading-none">FORGE</span>
                                <span className="text-[9px] font-black tracking-[0.8em] text-orange-600 uppercase ml-1 opacity-80">AI FITNESS ECOSYSTEM</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[9px] font-black tracking-[0.5em] text-gray-500 uppercase italic">NETWORK_STABLE</span>
                            <span className="text-[9px] font-bold text-white uppercase tracking-widest">USER_NOT_INITIALIZED</span>
                        </div>
                        <Link href="/login">
                            <button className="bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] px-10 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center gap-3">
                                INITIALIZE <ArrowRight className="h-3 w-3" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-between pointer-events-auto w-full max-w-[1600px] mx-auto pt-10">

                    {/* Feature Navigation Sidebar */}
                    <div className="w-full lg:w-[480px] space-y-8 flex flex-col justify-center h-full">
                        <div className="space-y-2 lg:mb-8">
                            <div className="flex items-center gap-3 text-orange-600 font-bold tracking-[0.6em] text-[9px] uppercase italic">
                                <Activity className="h-3 w-3" /> CORE_FACILITIES_READY
                            </div>
                            <h1 className="text-[12vw] lg:text-[5vw] font-black uppercase italic tracking-[-0.1em] text-white leading-[0.85] drop-shadow-2xl">
                                EVOLVE YOUR <br /> <span className="text-orange-600">BIOLOGY.</span>
                            </h1>
                        </div>

                        {/* Feature Toggle Pill Navigation */}
                        <div className="grid grid-cols-1 gap-3 w-full pr-0 lg:pr-12">
                            {features.map((f, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveFeature(i)}
                                    className={`group relative p-6 rounded-[1.5rem] border transition-all duration-300 text-left overflow-hidden w-full ${activeFeature === i
                                            ? 'bg-white border-white scale-100 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                                        }`}
                                >
                                    <div className={`absolute right-[-20px] top-[-20px] opacity-10 transition-transform duration-700 ${activeFeature === i ? 'scale-150 rotate-45' : 'scale-100 rotate-0'}`}>
                                        <f.icon className={`h-32 w-32 ${activeFeature === i ? 'text-black' : 'text-white'}`} />
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className={`text-[9px] font-black tracking-widest uppercase ${activeFeature === i ? 'text-orange-600' : 'text-orange-600/60'}`}>
                                                SYSTEM_0{i + 1}
                                            </span>
                                            <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${activeFeature === i ? 'text-black' : 'text-white'}`}>
                                                {f.title}
                                            </h3>
                                        </div>
                                        {activeFeature === i ? (
                                            <div className="bg-orange-600 rounded-full p-2 text-white"><ChevronRight className="h-4 w-4" /></div>
                                        ) : (
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50"><ChevronRight className="h-4 w-4" /></div>
                                        )}
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
                            className="hidden xl:flex w-[400px] flex-col gap-8 p-10 rounded-[2.5rem] bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl ml-auto relative z-50 mt-auto mb-auto"
                        >
                            <div className="space-y-4">
                                <div className="p-3 bg-orange-600/10 rounded-xl w-fit">
                                    {React.createElement(features[activeFeature].icon, { className: "h-6 w-6 text-orange-600" })}
                                </div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
                                    {features[activeFeature].title}
                                </h3>
                                <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                    {features[activeFeature].description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[9px] font-black text-orange-600 tracking-[0.5em] uppercase">METRICS</p>
                                <div className="space-y-2">
                                    {features[activeFeature].tags.map(tag => (
                                        <div key={tag} className="flex items-center gap-3 text-[10px] font-black uppercase text-white/60 tracking-widest border-b border-white/5 pb-2">
                                            <Binary className="h-3 w-3 text-orange-600/50" /> {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FUNCTIONAL NAVIGATION BUTTON */}
                            <Link href={features[activeFeature].route} className="block mt-4">
                                <button className="w-full bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 group">
                                    LAUNCH {features[activeFeature].title} <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
