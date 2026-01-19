"use client"

import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    Html,
    Environment,
    PresentationControls,
    Stars,
    Torus,
    ContactShadows
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Dumbbell, Utensils, Cpu, Activity, Move, ArrowRight } from 'lucide-react'

// --- Components ---

function MachineCore({ hovered, color }: { hovered: boolean, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.015
            meshRef.current.rotation.z += 0.005
        }
    })

    return (
        <mesh ref={meshRef} scale={hovered ? 1.5 : 1.2}>
            <octahedronGeometry args={[2.5, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={hovered ? 15 : 2}
                metalness={1}
                roughness={0}
            />
        </mesh>
    )
}

function MachineRings({ hovered, color }: { hovered: boolean, color: string }) {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.01
            groupRef.current.rotation.y -= 0.02
        }
    })

    return (
        <group ref={groupRef}>
            <Torus args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 20 : 5}
                    transparent
                    opacity={0.8}
                />
            </Torus>
            <Torus args={[3.6, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color="#fff" transparent opacity={0.3} />
            </Torus>
        </group>
    )
}

function ForgeStation({ position, color, icon: Icon, title, description, tags, index }: any) {
    const [hovered, setHovered] = useState(false)

    return (
        <group
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <MachineCore hovered={hovered} color={color} />
                <MachineRings hovered={hovered} color={color} />

                {/* 3D Icon center */}
                <Html position={[0, 0, 0]} center distanceFactor={12}>
                    <div className={`transition-all duration-500 pointer-events-none ${hovered ? 'scale-150 opacity-100' : 'scale-100 opacity-20'}`}>
                        <Icon className="h-14 w-14 text-white" />
                    </div>
                </Html>

                {/* FEATURE BRANDING PANEL */}
                <Html
                    position={[0, 6.5, 0]}
                    center
                    distanceFactor={12}
                    className="pointer-events-none select-none"
                    style={{
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: hovered ? 1 : 0.2,
                        transform: `scale(${hovered ? 1.1 : 0.9}) translateY(${hovered ? 0 : 20}px)`
                    }}
                >
                    <div className="w-[320px] p-8 rounded-[2rem] bg-black/80 border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-black text-orange-600 tracking-[0.4em] uppercase">{index}</span>
                        </div>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-3 leading-none">{title}</h3>
                        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5 rounded-full bg-white/5">{tag}</span>
                            ))}
                        </div>
                    </div>
                </Html>

                <pointLight intensity={hovered ? 100 : 30} color={color} distance={20} />
            </Float>
        </group>
    )
}

function ForgeScene() {
    return (
        <group>
            {/* The Forge Core Platform Features */}
            <ForgeStation
                index="CORE_01"
                position={[-15, 0, 5]}
                color="#f97316"
                icon={Dumbbell}
                title="PROTOCOLS"
                description="High-fidelity lifting telemetry. Track every force vector and volume trajectory in real-time."
                tags={["Performance", "Logging", "AI Analysis"]}
            />
            <ForgeStation
                index="BIO_02"
                position={[15, 0, 5]}
                color="#f97316"
                icon={Utensils}
                title="METABOLIC"
                description="Precision nutrition architecture. Align your biological fueling to your performance load."
                tags={["Bio-Sync", "Fueling", "Optimizer"]}
            />
            <ForgeStation
                index="SYNC_03"
                position={[0, 0, -15]}
                color="#ffffff"
                icon={Cpu}
                title="COACH"
                description="Neural-linked performance advisor. Consult the Forge AI for elite biological strategy."
                tags={["Neural Coaching", "Intelligence"]}
            />

            {/* Central Power Source */}
            <mesh position={[0, -2, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={15} />
                <pointLight intensity={100} color="#f97316" distance={30} />
            </mesh>

            {/* Industrial Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#020202" roughness={0.3} metalness={1} />
            </mesh>

            <ContactShadows position={[0, -5.9, 0]} opacity={0.5} scale={50} blur={2.5} far={10} color="#000" />
        </group>
    )
}

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* HUD Overlays - PROJECT BRANDING & UTILITY */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-5 pointer-events-auto">
                            <div className="bg-orange-600 p-3 rounded-full shadow-lg shadow-orange-600/30">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="text-4xl font-black tracking-[-0.12em] uppercase italic text-white leading-none">FORGE</span>
                        </Link>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-orange-600 tracking-[0.8em] uppercase leading-none italic opacity-80">
                                ELITE AI FITNESS ECOSYSTEM
                            </p>
                            <p className="text-[9px] font-bold text-gray-500 tracking-[0.4em] uppercase">BIO-TEK INFRASTRUCTURE // v8.0</p>
                        </div>
                    </div>

                    <div className="pointer-events-auto group">
                        <Link href="/login">
                            <button className="bg-white text-black text-[12px] font-black uppercase tracking-[0.5em] px-16 py-6 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center gap-4">
                                INITIALIZE <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-3">
                        <div className="flex items-center gap-5">
                            <div className="h-[2px] w-12 bg-orange-600/30" />
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.5em]">
                                ORBIT TO EXPLORE THE WORKSHOP
                            </p>
                        </div>
                        <h2 className="text-[12vw] font-black uppercase italic tracking-[-0.1em] text-white/5 leading-[0.8] select-none">
                            HUB
                        </h2>
                    </div>

                    <div className="text-right space-y-4">
                        <div className="flex items-center gap-6 justify-end text-[10px] font-black uppercase tracking-[0.5em] text-orange-600/50">
                            <Activity className="h-4 w-4" /> NEURAL_SYNC: PERSISTENT
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[25, 20, 25]} fov={35} />

                <color attach="background" args={['#000']} />
                <Stars radius={200} depth={50} count={8000} factor={6} saturation={0} fade speed={1.5} />

                <Suspense fallback={null}>
                    <ambientLight intensity={0.8} />
                    <spotLight position={[40, 50, 40]} angle={0.25} penumbra={1} intensity={150} color="#f97316" castShadow />
                    <pointLight position={[-30, 20, -30]} intensity={60} color="#fff" />

                    <PresentationControls
                        global
                        snap
                        speed={1.5}
                        rotation={[0, 0.5, 0]}
                        polar={[-Math.PI / 15, Math.PI / 15]}
                        azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                        <ForgeScene />
                    </PresentationControls>

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.2} radius={0.4} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
