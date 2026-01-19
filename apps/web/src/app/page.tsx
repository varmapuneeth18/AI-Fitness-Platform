"use client"

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { Loader2, Zap } from 'lucide-react'

// Dynamically import the 3D component to avoid SSR issues
const ForgeWorld = dynamic(() => import('@/components/forge-world/World'), {
    ssr: false,
    loading: () => <LoadingState />
})

function LoadingState() {
    return (
        <div className="h-screen w-full bg-[#020202] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center gap-10"
            >
                <div className="relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-t-2 border-r-2 border-orange-600 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-8 w-8 text-orange-600 fill-orange-600 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-3 text-center">
                    <h2 className="text-2xl font-black uppercase italic tracking-[-0.05em] text-white">Initializing Forge</h2>
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                className="h-full bg-orange-600"
                            />
                        </div>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-700">Syncing Bio-Telemetry & 3D Environment</p>
                </div>
            </motion.div>

            {/* Background Decorative Text */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-[0.02] text-[15vw] font-black uppercase italic select-none pointer-events-none whitespace-nowrap">
                LIMITS ARE LOGIC LIMITS ARE LOGIC
            </div>
        </div>
    )
}

export default function LandingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <main className="h-screen w-full overflow-hidden bg-black selection:bg-orange-600/30">
            <Suspense fallback={<LoadingState />}>
                <ForgeWorld />
            </Suspense>

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="fixed bottom-12 right-12 z-[100] flex items-center gap-6 group pointer-events-none"
                >
                    <div className="flex gap-1.5 items-end h-4">
                        {[0.6, 0.4, 0.9, 0.3, 0.7].map((h, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                                transition={{ duration: 1.5 + i * 0.3, repeat: Infinity }}
                                className="w-0.5 bg-orange-600/20 group-hover:bg-orange-600 transition-colors"
                            />
                        ))}
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-800 transition-colors">
                            Forge Core v0.1.2
                        </p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-900">
                            Neural Sync: Persistent
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </main>
    )
}
