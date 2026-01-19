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
import { Zap, Dumbbell, Utensils, Cpu, Activity, Move } from 'lucide-react'

// --- Components ---

function MachineCore({ hovered, color }: { hovered: boolean, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.z += 0.005
        }
    })

    return (
        <mesh ref={meshRef} scale={hovered ? 1.2 : 1}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={hovered ? 8 : 2}
                metalness={1}
                roughness={0.1}
            />
        </mesh>
    )
}

function MachineRings({ hovered, color }: { hovered: boolean, color: string }) {
    const groupRef = useRef<THREE.Group>(null!)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.005
            groupRef.current.rotation.y -= 0.01
        }
    })

    return (
        <group ref={groupRef}>
            <Torus args={[3.5, 0.04, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 15 : 2}
                    transparent
                    opacity={0.8}
                />
            </Torus>
            <Torus args={[4, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color="#fff" transparent opacity={0.2} />
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

                {/* 3D Icon Overlay */}
                <Html position={[0, 0, 0]} center distanceFactor={12}>
                    <div className={`transition-all duration-500 ${hovered ? 'scale-125 opacity-100 blur-none' : 'scale-100 opacity-20 blur-[1px]'}`}>
                        <Icon className="h-12 w-12 text-white" />
                    </div>
                </Html>

                {/* Information Panel */}
                <Html
                    position={[0, 5, 0]}
                    center
                    distanceFactor={12}
                    className="pointer-events-none select-none"
                    style={{
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: hovered ? 1 : 0,
                        transform: `scale(${hovered ? 1 : 0.8}) translateY(${hovered ? 0 : 30}px)`
                    }}
                >
                    <div className="w-[280px] p-8 rounded-[1.5rem] bg-black/80 border border-white/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-black text-orange-600 tracking-[0.4em] uppercase">{index}</span>
                            <div className={`w-2 h-2 rounded-full bg-orange-600 ${hovered ? 'animate-ping' : ''}`} />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">{title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed mb-6">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-white/30 border border-white/5 px-2.5 py-1 rounded-full bg-white/5">{tag}</span>
                            ))}
                        </div>
                    </div>
                </Html>

                {/* Local Glow */}
                <pointLight intensity={hovered ? 60 : 10} color={color} distance={15} />
            </Float>
        </group>
    )
}

function ForgeScene() {
    return (
        <group>
            {/* Triangular Layout for balanced orbit exploration */}
            <ForgeStation
                index="PROTOCOL_01"
                position={[-12, 0, 6]}
                color="#f97316"
                icon={Dumbbell}
                title="PROTOCOLS"
                description="High-fidelity workout logging and volume tracking architecture."
                tags={["Lifting", "Volume", "Telemetry"]}
            />
            <ForgeStation
                index="METABOLIC_02"
                position={[12, 0, 6]}
                color="#f97316"
                icon={Utensils}
                title="METABOLIC"
                description="AI-driven nutrition and fueling protocol synchronization."
                tags={["Macros", "Fueling", "Bio-Sync"]}
            />
            <ForgeStation
                index="GAMMA_03"
                position={[0, 0, -15]}
                color="#ffffff"
                icon={Cpu}
                title="COACH"
                description="Neural-linked performance coach for biology optimization."
                tags={["AI Chat", "Neural", "Strategy"]}
            />

            {/* Central Power Source */}
            <mesh position={[0, -2, 0]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={12} />
                <pointLight intensity={40} color="#f97316" distance={20} />
            </mesh>

            {/* Reflective Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#020202" roughness={0.3} metalness={0.8} />
            </mesh>

            <ContactShadows position={[0, -4.9, 0]} opacity={0.4} scale={40} blur={2} far={10} color="#000" />
        </group>
    )
}

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* 2D Overlay HUD */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-5 pointer-events-auto">
                            <div className="bg-orange-600 p-3 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="text-4xl font-black tracking-[-0.1em] uppercase italic text-white leading-none">FORGE</span>
                        </Link>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-white/30 transition-opacity">
                            <Activity className="h-3 w-3 text-orange-600 animate-pulse" /> BIO-SYNC: PERSISTENT
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
                    <div className="max-w-md space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Move className="h-4 w-4 text-orange-600/40" />
                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">ORBIT TO NAVIGATE // SELECT STATION</p>
                            </div>
                            <h2 className="text-[10vw] font-black uppercase italic tracking-[-0.1em] text-white/5 leading-[0.8] select-none">FORGE</h2>
                        </div>
                    </div>

                    <div className="text-[9px] font-black text-gray-900 uppercase tracking-[1.5em] mb-4">
                        STABLE_ENV_V6
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[22, 15, 22]} fov={40} />

                <color attach="background" args={['#000']} />
                <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    {/* Consistent Studio Lighting */}
                    <ambientLight intensity={0.6} />
                    <spotLight position={[30, 40, 30]} angle={0.25} penumbra={1} intensity={100} color="#f97316" castShadow />
                    <pointLight position={[-20, 10, -20]} intensity={40} color="#fff" />

                    <PresentationControls
                        global
                        snap
                        speed={1.5}
                        rotation={[0, 0.5, 0]}
                        polar={[-Math.PI / 12, Math.PI / 12]}
                        azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                        <ForgeScene />
                    </PresentationControls>

                    <EffectComposer>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
