"use client"

import { Zap, Dumbbell, Activity, TrendingUp, ShieldCheck, Cpu, ArrowRight, Play, CheckCircle2, ChevronDown, ListChecks, UtensilsCrossed, MessageSquareText, BarChart3, Clock } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function LandingPage() {
    const targetRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

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
            {/* Ultra Minimalist Header */}
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
                            {["Training", "Nutrition", "AI Coach"].map((item) => (
                                <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all duration-500">
                                    {item}
                                </Link>
                            ))}
                        </nav>
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] px-10 py-3.5 rounded-full hover:bg-orange-500 hover:text-white transition-all"
                            >
                                START
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section - The Functional Start */}
                <section ref={targetRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                    <motion.div style={{ x: glowX, y: glowY }} className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-orange-600/10 blur-[120px] rounded-full z-[2] mix-blend-screen" />

                    <motion.div style={{ scale: heroScale, opacity: bgOpacity }} className="absolute inset-0 z-0">
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]">
                            <source src="https://cdn.pixabay.com/video/2025/02/10/257556_large.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />
                    </motion.div>

                    <div className="container relative z-10 px-8 mx-auto max-w-7xl">
                        <motion.div style={{ opacity: heroOpacity }} className="flex flex-col items-center text-center space-y-10">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-gray-500 text-[9px] font-black uppercase tracking-[0.5em]">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" /> AI FITNESS INFRASTRUCTURE
                            </motion.div>

                            <div className="relative group select-none">
                                <motion.h1 className="text-[12vw] md:text-[14rem] font-black tracking-[-0.1em] leading-[0.75] uppercase italic text-white flex justify-center">
                                    {["F", "O", "R", "G", "E"].map((letter, i) => (
                                        <motion.span key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block transition-all hover:text-orange-600 hover:scale-110">
                                            {letter}
                                        </motion.span>
                                    ))}
                                </motion.h1>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="space-y-4">
                                <h2 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter text-orange-500">
                                    Workout. Log. Fuel. Optimize.
                                </h2>
                                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight group">
                                    The ultimate AI-driven performance engine to log <span className="text-white group-hover:text-orange-600 transition-colors">Workouts</span>, track <span className="text-white group-hover:text-orange-600 transition-colors">Nutrition</span>, and consult your private <span className="text-white group-hover:text-orange-600 transition-colors">AI Coach</span>.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
                                <Link href="/login">
                                    <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(249, 115, 22, 0.3)" }} className="bg-orange-600 text-white font-black uppercase tracking-[0.3em] px-16 py-7 rounded-2xl transition-all flex items-center justify-center group text-[11px]">
                                        ENTRY PROTOCOL <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-3 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link href="#training" className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 hover:text-white transition-colors">
                                    EXPLORE FEATURES
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-20 hover:opacity-100 transition-opacity">
                        <div className="w-px h-16 bg-gradient-to-b from-orange-600 to-transparent" />
                    </div>
                </section>

                {/* Feature Deep Dives - Now with functional descriptions */}
                <section id="training" className="bg-[#020202]">
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2021/06/07/76737-560201133_large.mp4"
                        title="TRAINING"
                        index="01"
                        icon={<Dumbbell className="h-10 w-10 text-orange-600" />}
                        subTitle="Precision Workout Logging"
                        description="Access a library of 500+ exercises. Log your sets, reps, and resistance with 0.1s latency. Our system tracks your volume trajectory automatically to ensure constant linear progression."
                        tags={["Exercise Bank", "Volume Tracking", "Force Scaling"]}
                        id="training"
                    />
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2024/01/18/197205-904265109_large.mp4"
                        title="FUEL"
                        index="02"
                        icon={<UtensilsCrossed className="h-10 w-10 text-orange-600" />}
                        subTitle="Intelligent Nutrition Engine"
                        description="Log meals in seconds and let the Forge identify your macro-distribution. Track calories and protein intake against your daily metabolic load for perfect recovery."
                        tags={["Calorie Logic", "Macro Sync", "Meal History"]}
                        reverse
                        id="nutrition"
                    />
                    <ImmersivePlate
                        video="https://cdn.pixabay.com/video/2022/07/15/124251-730508536_large.mp4"
                        title="ADVICE"
                        index="03"
                        icon={<MessageSquareText className="h-10 w-10 text-orange-600" />}
                        subTitle="Private AI Coach"
                        description="A neural-linked assistant that knows your data. Ask for routine adjustments, meal suggestions, or performance analysis. Your private coach is active 24/7."
                        tags={["Real-time Consultation", "Neural Analysis", "Tactical Support"]}
                        id="ai-coach"
                    />
                </section>

                {/* System Specs - Grid of explicit features */}
                <section className="py-32 bg-black border-y border-white/[0.05]">
                    <div className="container px-10 mx-auto max-w-7xl">
                        <div className="mb-20 space-y-4">
                            <span className="text-orange-600 font-black tracking-[0.5em] text-[10px] uppercase">CAPABILITIES</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-[-0.05em] text-white italic uppercase">SYSTEM SPECS</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
                            <SpecItem
                                icon={<ListChecks className="h-6 w-6" />}
                                title="Log Engine"
                                description="Infinite history for every lift. See your PR progress via high-contrast telemetry."
                            />
                            <SpecItem
                                icon={<BarChart3 className="h-6 w-6" />}
                                title="Bio-Metrics"
                                description="Comprehensive weight and metric tracking. Sync your evolution to your data."
                            />
                            <SpecItem
                                icon={<Clock className="h-6 w-6" />}
                                title="Schedule"
                                description="Automated workout calendar. Never miss a session in your prescribed protocol."
                            />
                            <SpecItem
                                icon={<ShieldCheck className="h-6 w-6" />}
                                title="Secure Data"
                                description="Your performance data is private. Built for the individual and the inner circle."
                            />
                        </div>
                    </div>
                </section>

                {/* The Final Call */}
                <section className="relative py-64 bg-[#020202] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-600/5 blur-[200px] rounded-full" />
                    </div>

                    <div className="container relative z-10 px-8 mx-auto text-center space-y-16">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <h2 className="text-[12vw] font-black tracking-[-0.1em] uppercase italic leading-none text-white select-none">
                                JOIN THE <span className="text-orange-600 group-hover:blur-none transition-all">FORGE</span>
                            </h2>
                            <p className="text-gray-600 font-bold uppercase tracking-[0.6em] text-[11px] mt-6">Log. Train. Conquer. Repeat.</p>
                        </motion.div>

                        <Link href="/login" className="inline-block">
                            <motion.button whileHover={{ scale: 1.1 }} className="bg-white text-black font-black uppercase tracking-[0.4em] px-20 py-10 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.1)] hover:bg-orange-600 hover:text-white transition-all text-xs">
                                INITIALIZE PROFILE
                            </motion.button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
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
                            <FooterCol title="SYSTEM" links={["Log Dashboard", "AI Engine", "Telemetry"]} />
                            <FooterCol title="COLLECTIVE" links={["Join", "Community", "Access"]} />
                            <FooterCol title="LEGAL" links={["Privacy", "Liability", "Manual"]} />
                        </div>
                    </div>
                    <div className="mt-20 pt-10 border-t border-white/[0.02] flex justify-between items-center">
                        <div className="text-[9px] font-black uppercase tracking-[0.8em] text-gray-900">PROPRIETARY PERFORMANCE SYSTEM.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function ImmersivePlate({ video, title, index, icon, subTitle, description, tags, reverse, id }: any) {
    return (
        <div id={id} className={cn("relative h-screen sticky top-0 flex items-center overflow-hidden border-b border-white/5", reverse ? "justify-end" : "justify-start")}>
            <div className="absolute inset-0 z-0 scale-110">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale-[0.9] brightness-[0.2]">
                    <source src={video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className={cn("container relative z-10 px-20 max-w-6xl w-full", reverse && "text-right")}>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">
                    <div className={cn("flex items-center gap-6 opacity-30 font-black tracking-[1em] text-[10px] uppercase", reverse && "flex-row-reverse")}>
                        {index} <div className="h-px flex-1 bg-white" />
                    </div>

                    <div className={cn("flex items-center gap-6", reverse && "flex-row-reverse")}>
                        <div className="p-4 bg-orange-600/20 border border-orange-600/30 rounded-3xl backdrop-blur-xl">
                            {icon}
                        </div>
                        <h2 className="text-[8vw] md:text-[8rem] font-black tracking-[-0.1em] uppercase italic text-white leading-[0.8]">
                            {title}
                        </h2>
                    </div>

                    <div className={cn("space-y-2", reverse && "ml-auto")}>
                        <h3 className="text-3xl font-black uppercase italic text-orange-500 tracking-tighter">{subTitle}</h3>
                        <p className={cn("text-lg text-gray-500 font-medium leading-relaxed max-w-xl", reverse && "ml-auto")}>
                            {description}
                        </p>
                    </div>

                    <div className={cn("pt-6 flex flex-wrap gap-8", reverse && "justify-end")}>
                        {tags.map((tag: string) => (
                            <div key={tag} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                                <div className="w-1 h-1 bg-orange-600 rounded-full" /> {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function SpecItem({ icon, title, description }: any) {
    return (
        <div className="group p-12 bg-black hover:bg-[#050505] transition-all duration-500 flex flex-col gap-6 border-white/[0.02]">
            <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl w-fit group-hover:bg-orange-600 group-hover:text-white transition-all text-gray-500 group-hover:scale-110">
                {icon}
            </div>
            <div className="space-y-3">
                <h4 className="text-xl font-black uppercase italic tracking-tight text-white">{title}</h4>
                <p className="text-[11px] text-gray-600 font-bold uppercase leading-relaxed tracking-wider">{description}</p>
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
