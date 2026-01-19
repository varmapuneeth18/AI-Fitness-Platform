"use client"

import { Zap, Dumbbell, Activity, TrendingUp, ShieldCheck, Cpu, ArrowRight, Play, CheckCircle2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function LandingPage() {
    const targetRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse tracking for the "Banger" glow effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const glowX = useSpring(mouseX, springConfig)
    const glowY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })

    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0])

    return (
        <div className="flex flex-col min-h-screen bg-[#020202] text-white selection:bg-orange-500/30 overflow-x-hidden font-sans cursor-default">
            {/* Navigation - Ultra Minimalist Glass */}
            <header className="fixed top-0 w-full z-[100] mix-blend-difference">
                <div className="container px-10 h-24 mx-auto max-w-7xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-orange-600 p-2.5 rounded-full"
                        >
                            <Zap className="h-4 w-4 text-white fill-white" />
                        </motion.div>
                        <span className="text-2xl font-black tracking-[-0.08em] uppercase italic text-white">
                            FORGE
                        </span>
                    </Link>

                    <div className="flex items-center gap-12">
                        <nav className="hidden lg:flex items-center gap-10">
                            {["Protocol", "Bio-Logic", "Network"].map((item) => (
                                <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all duration-500">
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] px-10 py-3.5 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                START
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section - The "Banger" Start */}
                <section ref={targetRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                    {/* Dynamic Mouse Glow */}
                    <motion.div
                        style={{ x: glowX, y: glowY }}
                        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-orange-600/10 blur-[120px] rounded-full z-[2] mix-blend-screen"
                    />

                    {/* Immersive Video Layer */}
                    <motion.div style={{ scale: heroScale, opacity: bgOpacity }} className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]"
                        >
                            <source src="https://cdn.pixabay.com/video/2025/02/10/257556_large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />

                        {/* Interactive Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
                    </motion.div>

                    <div className="container relative z-10 px-8 mx-auto max-w-7xl">
                        <motion.div
                            style={{ opacity: heroOpacity }}
                            className="flex flex-col items-center text-center space-y-12"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-gray-500 text-[9px] font-black uppercase tracking-[0.5em]"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" /> Global Alpha Release
                            </motion.div>

                            <div className="relative group cursor-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                <motion.h1
                                    className="text-[12vw] md:text-[16rem] font-black tracking-[-0.1em] leading-[0.75] uppercase italic text-white flex select-none"
                                >
                                    {["F", "O", "R", "G", "E"].map((letter, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ y: 100, opacity: 0, rotateX: 90 }}
                                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotateY: 20,
                                                color: "#f97316",
                                                textShadow: "0 0 50px rgba(249,115,22,0.8)"
                                            }}
                                            className="inline-block"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </motion.h1>

                                {/* Background Decorative Text */}
                                <div className="absolute -inset-10 -z-10 opacity-[0.03] select-none pointer-events-none">
                                    <div className="text-[20rem] font-black tracking-tighter uppercase italic leading-none whitespace-nowrap">
                                        EFFORT IS LOGIC EFFORT IS LOGIC
                                    </div>
                                </div>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight"
                            >
                                The definitive bio-monitoring engine for high-performance individuals. Precision engineered for the collective.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8"
                            >
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249, 115, 22, 0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-orange-600 text-white font-black uppercase tracking-[0.3em] px-16 py-7 rounded-2xl transition-all flex items-center justify-center group text-[11px]"
                                    >
                                        ENTER THE FORGE <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-3 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link href="#protocol" className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 hover:text-white transition-colors">
                                    VIEW PROTOCOL
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-orange-600 to-transparent relative overflow-hidden">
                            <motion.div
                                animate={{ y: [0, 96] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-full h-1/2 bg-white"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Immersive Feature Plates - High End Commercial Layout */}
                <section id="protocol" className="bg-[#020202]">
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2021/06/07/76737-560201133_large.mp4"
                        title="FORCE"
                        index="01"
                        description="Quantifiable trajectory analysis. Every repetition is logged, every vector is analyzed, and every session is optimized for peak power output."
                        color="from-orange-600/20"
                    />
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2024/01/18/197205-904265109_large.mp4"
                        title="FUEL"
                        index="02"
                        description="Metabolic intelligence. Align your biology with your training protocol using real-time calorie and macro-nutrient orchestration."
                        color="from-amber-600/20"
                        reverse
                    />
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2022/07/15/124251-730508536_large.mp4"
                        title="FOCUS"
                        index="03"
                        description="Neural recovery cycles. Optimize the space between efforts to ensure maximum adaptation and mental peak performance."
                        color="from-zinc-600/20"
                    />
                </section>

                {/* The "Banger" CTA */}
                <section className="relative py-64 bg-black overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-600/5 blur-[200px] rounded-full" />
                    </div>

                    <div className="container relative z-10 px-8 mx-auto text-center space-y-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-[15vw] font-black tracking-[-0.12em] uppercase italic leading-none text-white select-none">
                                JOIN THE <span className="text-orange-600 blur-[2px] transition-all hover:blur-none">FORGE</span>
                            </h2>
                            <p className="text-gray-600 font-bold uppercase tracking-[0.6em] text-[11px]">No Exceptions. No Excuses. Only Logic.</p>
                        </motion.div>

                        <Link href="/login" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="bg-white text-black font-black uppercase tracking-[0.4em] px-24 py-10 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.1)] hover:bg-orange-600 hover:text-white transition-all text-xs"
                            >
                                INITIALIZE IDENTITY
                            </motion.button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Elite Minimalist Footer */}
            <footer className="py-24 border-t border-white/5 bg-[#020202]">
                <div className="container px-10 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <Zap className="h-6 w-6 text-orange-600 fill-orange-600" />
                                <span className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">FORGE</span>
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-800">
                                FORGING ELITE PERFORMANCE SYSTEMS Since 2026.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
                            <FooterCol title="SYSTEM" links={["Protocol", "Architecture", "Updates"]} />
                            <FooterCol title="NETWORK" links={["Community", "Collective", "Access"]} />
                            <FooterCol title="LEGAL" links={["Privacy", "Liability", "Manual"]} />
                        </div>
                    </div>

                    <div className="mt-32 pt-12 border-t border-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-[9px] font-black uppercase tracking-[0.8em] text-gray-900">
                            PROPRIETARY DATA ENCRYPTION ENABLED.
                        </div>
                        <div className="flex gap-4 opacity-10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-px w-10 bg-white" />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function ImmersivePlate({ video, title, index, description, color, reverse }: any) {
    return (
        <div className={cn("relative h-screen sticky top-0 flex items-center overflow-hidden border-b border-white/5", reverse ? "justify-end" : "justify-start")}>
            <div className="absolute inset-0 z-0 scale-110">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.8] brightness-[0.2]"
                >
                    <source src={video} type="video/mp4" />
                </video>
                <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-1000", color)} />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className={cn("container relative z-10 px-20 max-w-6xl w-full", reverse && "text-right")}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-6 opacity-40 font-black tracking-[1em] text-[10px] uppercase">
                        {index} <div className="h-px flex-1 bg-white" />
                    </div>
                    <h2 className="text-[12vw] font-black tracking-[-0.08em] uppercase italic text-white leading-[0.8] select-none">
                        {title}
                    </h2>
                    <p className={cn("text-xl text-gray-500 font-medium leading-relaxed max-w-xl", reverse && "ml-auto")}>
                        {description}
                    </p>
                    <div className={cn("pt-6 flex gap-10", reverse && "justify-end")}>
                        {["Telemetry", "Optimization", "Result"].map((tag) => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600/60">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function FooterCol({ title, links }: any) {
    return (
        <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-700">{title}</h4>
            <div className="flex flex-col gap-4">
                {links.map((link: string) => (
                    <Link key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all">
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    )
}

function cn(...inputs: any) {
    return inputs.filter(Boolean).join(" ");
}
