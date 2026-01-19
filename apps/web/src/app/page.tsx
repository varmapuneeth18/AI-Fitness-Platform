"use client"

import { Zap, Dumbbell, Activity, TrendingUp, ShieldCheck, Cpu, ArrowRight, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function LandingPage() {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden font-sans">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="container px-8 h-20 mx-auto max-w-7xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl"
                        >
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </motion.div>
                        <span className="text-2xl font-black tracking-tighter uppercase italic">
                            Forge
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-10">
                        {["Protocol", "Bio-Monitoring", "Collective"].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-orange-500 transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                            Access
                        </Link>
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-2xl shadow-white/5"
                            >
                                Initialize
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-[0.4]"
                        >
                            <source src="https://cdn.pixabay.com/video/2025/02/10/257556_large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
                    </motion.div>

                    <div className="container relative z-10 px-8 mx-auto max-w-7xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                                <ShieldCheck className="h-3.5 w-3.5" /> High-Performance Collective
                            </div>
                            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic">
                                Forged in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600">
                                    Motion
                                </span>
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
                                A cinematic bio-monitoring engine built for the inner circle. Orchestrate your evolution with absolute precision.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)" }}
                                        className="bg-orange-600 text-white font-black uppercase tracking-[0.2em] px-14 py-6 rounded-2xl shadow-2xl transition-all flex items-center justify-center group text-sm"
                                    >
                                        Join The Force <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link href="#protocol">
                                    <button className="bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] px-14 py-6 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all text-sm">
                                        View Protocol
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">Initiate Scroll</span>
                        <div className="w-px h-16 bg-gradient-to-b from-orange-500 to-transparent animate-bounce" />
                    </motion.div>
                </section>

                {/* Feature Blocks (Commercial Style) */}
                <section id="protocol" className="bg-black py-20">
                    <FeatureBlock
                        video="https://cdn.pixabay.com/video/2021/06/07/76737-560201133_large.mp4"
                        title="Force Vectors"
                        subtitle="WORKOUTS"
                        description="Track every rep with cinematic clarity. Our system monitors strength trajectories and volume progression to ensure your evolution never stalls."
                        reverse={false}
                    />
                    <FeatureBlock
                        video="https://cdn.pixabay.com/video/2024/01/18/197205-904265109_large.mp4"
                        title="Fuel Logic"
                        subtitle="NUTRITION"
                        description="Dynamic metabolic adjustment. Align your caloric intake with your real-world output. Personalized nutrition for peak human performance."
                        reverse={true}
                    />
                    <FeatureBlock
                        video="https://cdn.pixabay.com/video/2022/07/15/124251-730508536_large.mp4"
                        title="Neural Clarity"
                        subtitle="WELLNESS"
                        description="High-definition recovery protocols. Connect your mindset with your physical output for a unified performance cycle."
                        reverse={false}
                    />
                </section>

                {/* CTA Section (Commercial High-Contrast) */}
                <section className="relative py-48 bg-[#050505] overflow-hidden border-t border-white/5">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-600/5 blur-[180px] rounded-full" />
                    </div>
                    <div className="container relative z-10 px-8 mx-auto max-w-4xl text-center space-y-12">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none"
                        >
                            Established for <br />
                            <span className="text-orange-500">The Inner Circle</span>
                        </motion.h2>
                        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            No marketing fluff. No corporate oversight. Just a high-performance tool built for friends to dominate their goals.
                        </p>
                        <Link href="/login" className="inline-block pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-white text-black font-black uppercase tracking-[0.2em] px-16 py-8 rounded-2xl shadow-2xl hover:bg-orange-500 hover:text-white transition-all text-base"
                            >
                                Enter The Forge
                            </motion.button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="py-16 border-t border-white/5 bg-black">
                <div className="container px-8 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-3">
                                <Zap className="h-6 w-6 text-orange-500 fill-orange-500" />
                                <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Forge</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 text-center md:text-left">
                                Private Human Optimization Protocol
                            </p>
                        </div>
                        <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
                            <Link href="#" className="hover:text-orange-500 transition-colors">Protocol</Link>
                            <Link href="#" className="hover:text-orange-500 transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-orange-500 transition-colors">Manual</Link>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-800">
                            © 2026 FORGE. ALL DATA ENCRYPTED.
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-1 w-8 bg-white/5 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureBlock({ video, title, subtitle, description, reverse }: any) {
    return (
        <div className={cn("flex flex-col lg:flex-row items-center", reverse && "lg:flex-row-reverse")}>
            <div className="w-full lg:w-1/2 h-[600px] relative overflow-hidden group">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                >
                    <source src={video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </div>
            <div className="w-full lg:w-1/2 p-20 lg:p-32 space-y-8 bg-[#030303]">
                <motion.div
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="text-orange-500 font-black tracking-[0.5em] text-[10px] uppercase">
                        {subtitle}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                        {description}
                    </p>
                    <div className="pt-4 flex flex-col gap-4">
                        {["End-to-end telemetry", "Neural optimization", "Privacy first"].map((feat) => (
                            <div key={feat} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
                                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                {feat}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function cn(...inputs: any) {
    return inputs.filter(Boolean).join(" ");
}
