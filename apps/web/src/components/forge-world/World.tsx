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
    Text,
    Torus,
    MeshTransmissionMaterial
} from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Dumbbell, Utensils, Cpu, Activity } from 'lucide-react'

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
        <mesh ref={meshRef} scale={hovered ? 1.8 : 1.5}>
            <octahedronGeometry args={[3.5, 0]} />
            <MeshDistortMaterial
                color={hovered ? color : "#333"}
                speed={2}
                distort={0.4}
                metalness={1}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={hovered ? 15 : 2}
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
            <Torus args={[5.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 30 : 5}
                    transparent
                    opacity={0.8}
                />
            </Torus>
            <Torus args={[5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color="#fff" transparent opacity={0.3} />
            </Torus>
            {/* Added tertiary scanning ring */}
            <Torus args={[6, 0.01, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
                <meshStandardMaterial color={color} transparent opacity={0.1} />
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
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* 3D Machine Model - MASSIVE SCALE */}
                <MachineCore hovered={hovered} color={color} />
                <MachineRings hovered={hovered} color={color} />

                {/* Inner Icon */}
                <Html position={[0, 0, 0]} center distanceFactor={15}>
                    <div className={`transition-all duration-700 ${hovered ? 'scale-[2] opacity-100 blur-none' : 'scale-100 opacity-10 blur-[2px]'}`}>
                        <Icon className="h-20 w-20 text-white" />
                    </div>
                </Html>

                {/* Glass Holographic Panel */}
                <Html
                    position={[0, 7, 0]}
                    center
                    distanceFactor={15}
                    className="pointer-events-none select-none"
                    style={{
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: hovered ? 1 : 0.15,
                        transform: `scale(${hovered ? 1.2 : 0.8}) translateY(${hovered ? 0 : 50}px)`
                    }}
                >
                    <div className="w-[400px] p-10 rounded-[3rem] bg-black/60 border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-50" />

                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[12px] font-black text-orange-600 tracking-[0.6em] uppercase italic">SYSTEM_{index}</span>
                            <div className={`w-3 h-3 rounded-full bg-orange-600 ${hovered ? 'animate-ping' : ''}`} />
                        </div>

                        <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-4">
                            {title}
                        </h3>

                        <p className="text-[13px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed mb-10">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag: string) => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>

                {/* Local Volumetric Light */}
                <pointLight position={[0, 0, 0]} intensity={hovered ? 50 : 5} color={color} distance={20} />
            </Float>
        </group>
    )
}

function ForgeParticles() {
    const points = useMemo(() => {
        const p = new Float32Array(500 * 3)
        for (let i = 0; i < 500; i++) {
            p[i * 3] = (Math.random() - 0.5) * 100
            p[i * 3 + 1] = (Math.random() - 0.5) * 50
            p[i * 3 + 2] = (Math.random() - 0.5) * 100
        }
        return p
    }, [])

    const ref = useRef<THREE.Points>(null!)
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.001
            ref.current.rotation.x += 0.0005
        }
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#f97316" transparent opacity={0.4} sizeAttenuation />
        </points>
    )
}

function InfiniteGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
            <planeGeometry args={[2000, 2000]} />
            <meshStandardMaterial
                color="#000"
                roughness={0}
                metalness={1}
                envMapIntensity={0.2}
            />
        </mesh>
    )
}

function ForgeScene() {
    return (
        <group>
            <ForgeStation
                index="ALPHA"
                position={[-10, 0, 2]}
                color="#f97316"
                icon={Dumbbell}
                title="PROTOCOLS"
                description="High-fidelity workout logging. Track force vectors and volume trajectories."
                tags={["Lifting", "Telemetry", "Volume"]}
            />
            <ForgeStation
                index="BETA"
                position={[10, 0, 2]}
                color="#f97316"
                icon={Utensils}
                title="METABOLIC"
                description="AI-driven nutrition architecture. Align your fueling to your performance load."
                tags={["Macros", "Fueling", "Sync"]}
            />
            <ForgeStation
                index="GAMMA"
                position={[0, 0, -10]}
                color="#ffffff"
                icon={Cpu}
                title="INTELLIGENCE"
                description="Neural-linked coach. Consult the Forge AI for biology optimization."
                tags={["AI Chat", "Neural", "Strategy"]}
            />

            {/* Central Power Core - MASSIVE */}
            <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[4, 64, 64]} />
                    <MeshDistortMaterial
                        color="#f97316"
                        distort={0.4}
                        speed={3}
                        metalness={1}
                        roughness={0}
                        emissive="#f97316"
                        emissiveIntensity={8}
                    />
                </mesh>
            </Float>

            <ForgeParticles />
            <InfiniteGround />
        </group>
    )
}

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Minimal HUD - Pushed to the very edges to focus on 3D */}
            <div className="absolute inset-0 z-10 pointer-events-none p-16 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <Link href="/" className="flex items-center gap-6 pointer-events-auto group">
                        <div className="bg-orange-600 p-4 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-transform">
                            <Zap className="h-6 w-6 text-white fill-white" />
                        </div>
                        <span className="text-5xl font-black tracking-[-0.15em] uppercase italic text-white leading-none">
                            FORGE
                        </span>
                    </Link>

                    <div className="pointer-events-auto">
                        <Link href="/login">
                            <button className="bg-white text-black text-[12px] font-black uppercase tracking-[0.5em] px-16 py-6 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                                INITIALIZE
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.8em] text-orange-600/60">
                            <Activity className="h-4 w-4" /> BIO-SYNC: ESTABLISHED // WORKSHOP_ACTIVE
                        </div>
                        <h2 className="text-[10vw] font-black uppercase italic tracking-[-0.1em] text-white/5 leading-[0.8] select-none">
                            FORGE
                        </h2>
                    </div>

                    <div className="text-[10px] font-black text-gray-800 uppercase tracking-[2em] mb-4">
                        CORE_01
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas
                shadows
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <PerspectiveCamera makeDefault position={[18, 10, 18]} fov={35} />

                <color attach="background" args={['#000']} />
                <Stars radius={200} depth={100} count={10000} factor={6} saturation={0} fade speed={2} />

                <Suspense fallback={null}>
                    <Environment preset="night" />

                    <ambientLight intensity={1} />
                    <spotLight position={[30, 30, 30]} angle={0.2} penumbra={1} intensity={15} color="#f97316" castShadow />

                    <PresentationControls
                        global
                        snap
                        speed={1.5}
                        rotation={[0, 0.4, 0]}
                        polar={[-Math.PI / 10, Math.PI / 10]}
                        azimuth={[-Math.PI / 2, Math.PI / 2]}
                    >
                        <ForgeScene />
                    </PresentationControls>

                    {/* POST PROCESSING - THE BANGER FACTOR */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.5}
                            mipmapBlur
                            intensity={2}
                            radius={0.4}
                        />
                        <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>

                {/* Scene wrapper moved inside Suspense for control over objects */}
            </Canvas>
        </div>
    )
}
