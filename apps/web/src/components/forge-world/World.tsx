"use client"

import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Html,
    Environment,
    ContactShadows,
    PresentationControls,
    Stars,
    Torus
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Dumbbell, Utensils, Cpu, Activity } from 'lucide-react'

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
        <mesh ref={meshRef} scale={hovered ? 1.4 : 1.2}>
            <octahedronGeometry args={[2.5, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={hovered ? 10 : 2}
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
            groupRef.current.rotation.x += 0.005
            groupRef.current.rotation.y -= 0.01
        }
    })

    return (
        <group ref={groupRef}>
            <Torus args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
            </Torus>
            <Torus args={[4.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
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

                <Html position={[0, 0, 0]} center distanceFactor={10}>
                    <div className={`transition-all duration-500 ${hovered ? 'scale-150 opacity-100' : 'scale-100 opacity-20'}`}>
                        <Icon className="h-16 w-16 text-white" />
                    </div>
                </Html>

                <Html
                    position={[0, 6, 0]}
                    center
                    distanceFactor={10}
                    className="pointer-events-none select-none"
                    style={{
                        transition: 'all 0.6s ease-out',
                        opacity: hovered ? 1 : 0,
                        transform: `scale(${hovered ? 1 : 0.8}) translateY(${hovered ? 0 : 20}px)`
                    }}
                >
                    <div className="w-[300px] p-8 rounded-[2rem] bg-black/80 border border-white/20 backdrop-blur-xl shadow-2xl">
                        <span className="text-[10px] font-black text-orange-600 tracking-widest uppercase mb-4 block">{index}</span>
                        <h3 className="text-3xl font-black uppercase italic text-white mb-2">{title}</h3>
                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] font-black uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full bg-white/5">{tag}</span>
                            ))}
                        </div>
                    </div>
                </Html>

                <pointLight position={[0, 0, 0]} intensity={hovered ? 100 : 20} color={color} distance={15} />
            </Float>
        </group>
    )
}

function ForgeScene() {
    return (
        <group>
            {/* Stations at very safe, visible coordinates */}
            <ForgeStation
                index="PROTOCOL_01"
                position={[-8, 0, 0]}
                color="#f97316"
                icon={Dumbbell}
                title="PROTOCOLS"
                description="High-fidelity workout logging and volume tracking."
                tags={["Lifting", "Telemetry"]}
            />
            <ForgeStation
                index="METABOLIC_02"
                position={[8, 0, 0]}
                color="#f97316"
                icon={Utensils}
                title="METABOLIC"
                description="AI-driven nutrition and fueling architecture."
                tags={["Macros", "Fueling"]}
            />
            <ForgeStation
                index="GAMMA_03"
                position={[0, 0, -10]}
                color="#ffffff"
                icon={Cpu}
                title="COACH"
                description="Neural-linked performance optimization."
                tags={["AI Chat", "Strategy"]}
            />

            {/* Central Glow Core */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={10} />
            </mesh>

            {/* Visible Ground for Reference */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" roughness={0.5} />
            </mesh>
        </group>
    )
}

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
            {/* HUD Overlays */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <Link href="/" className="flex items-center gap-5 pointer-events-auto">
                        <div className="bg-orange-600 p-3 rounded-full shadow-lg">
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </div>
                        <span className="text-4xl font-black tracking-tighter uppercase italic text-white leading-none">FORGE</span>
                    </Link>
                    <div className="pointer-events-auto">
                        <Link href="/login">
                            <button className="bg-white text-black text-[11px] font-black uppercase tracking-widest px-14 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-all">INITIALIZE</button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-orange-600/60 tracking-widest leading-none">
                            <Activity className="h-4 w-4" /> BIO-SYNC: ESTABLISHED
                        </div>
                        <h2 className="text-[10vw] font-black uppercase italic text-white/5 leading-[0.8] select-none">FORGE</h2>
                    </div>
                    <div className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-4 italic">CORE v5.0</div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas shadows gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[12, 8, 12]} fov={45} />

                <color attach="background" args={['#020202']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <ambientLight intensity={1.5} />
                    <spotLight position={[20, 20, 20]} angle={0.3} penumbra={1} intensity={50} color="#f97316" />
                    <pointLight position={[-20, 10, 20]} intensity={30} color="#fff" />

                    <PresentationControls
                        global
                        snap
                        speed={1}
                        rotation={[0, 0.5, 0]}
                        polar={[-Math.PI / 12, Math.PI / 12]}
                        azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                        <ForgeScene />
                    </PresentationControls>

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
