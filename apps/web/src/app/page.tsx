"use client"

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

// Dynamically import the 3D component to avoid SSR issues with Canvas
const ForgeWorld = dynamic(() => import('@/components/forge-world/World'), {
    ssr: false,
    loading: () => (
        <div className="h-screen w-full bg-[#020202] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">
                    Syncing Forge Engine...
                </div>
            </div>
        </div>
    )
})

export default function LandingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <main className="h-screen w-full overflow-hidden bg-black">
            <Suspense fallback={null}>
                <ForgeWorld />
            </Suspense>

            {/* Minimal Background Music indicator or other environmental 2D details can go here */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-10 right-10 z-[100] flex items-center gap-4 group"
            >
                <div className="flex gap-1 items-end h-3">
                    {[0.6, 0.4, 0.8, 0.3].map((h, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                            transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                            className="w-0.5 bg-orange-600/30 group-hover:bg-orange-600 transition-colors"
                        />
                    ))}
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-800 group-hover:text-gray-500 transition-colors">
                    Ambient Environment Active
                </span>
            </motion.div>
        </main>
    )
}
