"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars, OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import { Zap, Activity } from 'lucide-react'

export default function ForgeWorld() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Simple HUD */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <Link href="/" className="flex items-center gap-5 pointer-events-auto">
                        <div className="bg-orange-600 p-3 rounded-full">
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </div>
                        <span className="text-4xl font-black tracking-tighter uppercase italic text-white">FORGE</span>
                    </Link>
                    <div className="pointer-events-auto">
                        <Link href="/login">
                            <button className="bg-white text-black text-[11px] font-black uppercase tracking-widest px-14 py-4 rounded-full">INITIALIZE</button>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-orange-600/60 tracking-widest leading-none">
                            <Activity className="h-4 w-4" /> BIO-SYNC: ACTIVE
                        </div>
                        <h2 className="text-[10vw] font-black uppercase italic text-white/5 leading-[0.8]">FORGE</h2>
                    </div>
                    <div className="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-4">RECOVERY_V7.0</div>
                </div>
            </div>

            {/* Nuclear 3D Recovery Scene */}
            <Canvas shadows gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={50} />
                <OrbitControls />

                <color attach="background" args={['#000']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    {/* Blasting the scene with light */}
                    <ambientLight intensity={2} />
                    <pointLight position={[10, 10, 10]} intensity={100} color="#f97316" />
                    <pointLight position={[-10, -10, -10]} intensity={50} color="#ffffff" />

                    {/* Three Massive Basic Objects to ensure visibility */}
                    <mesh position={[-10, 0, 0]}>
                        <boxGeometry args={[4, 4, 4]} />
                        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
                    </mesh>

                    <mesh position={[10, 0, 0]}>
                        <sphereGeometry args={[3, 32, 32]} />
                        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
                    </mesh>

                    <mesh position={[0, 0, -5]}>
                        <octahedronGeometry args={[5, 0]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
                    </mesh>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                        <planeGeometry args={[100, 100]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </Suspense>
            </Canvas>
        </div>
    )
}
