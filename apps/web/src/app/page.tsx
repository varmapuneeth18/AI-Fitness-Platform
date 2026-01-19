"use client"

import { Zap, Dumbbell, Activity, TrendingUp, ShieldCheck, Cpu, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-100 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="container px-6 h-20 mx-auto max-w-7xl flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform">
                            <Zap className="h-5 w-5 text-white fill-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase italic">
                            Forge
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                            Access
                        </Link>
                        <Link href="/login">
                            <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
                                Initialize
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="relative h-[95vh] flex items-center overflow-hidden">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/Users/puneeth/.gemini/antigravity/brain/68708884-2acf-439b-88f4-08f541d73aff/forge_hero_bg_1768799802280.png"
                            alt="Forge Hero"
                            fill
                            className="object-cover opacity-60 grayscale-[0.2]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
                    </div>

                    <div className="container relative z-10 px-6 mx-auto max-w-7xl">
                        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <ShieldCheck className="h-3 w-3" /> Private Circle Only
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
                                Forged in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                                    Intelligence
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 max-w-xl font-medium leading-relaxed">
                                A high-performance bio-monitoring system built for you and your circle. Track, analyze, and optimize your evolution with elite precision.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login" className="flex-1 sm:flex-none">
                                    <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-orange-600/20 flex items-center justify-center group">
                                        Enter The Forge <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <Link href="#features" className="flex-1 sm:flex-none">
                                    <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all backdrop-blur-sm">
                                        View Protocol
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-32 bg-[#050505] border-t border-white/5">
                    <div className="container px-6 mx-auto max-w-7xl">
                        <div className="text-center mb-24 space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-orange-500">The System</h2>
                            <p className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Engineered for Results</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Cpu className="h-8 w-8" />}
                                title="Neural Coaching"
                                description="AI-driven tactical analysis that adjusts to your real-time performance data. No fluff. Just logic."
                            />
                            <FeatureCard
                                icon={<Activity className="h-8 w-8" />}
                                title="Bio-Metrics"
                                description="Comprehensive logging of every metabolic vector. Precision tracking for your transformation."
                            />
                            <FeatureCard
                                icon={<TrendingUp className="h-8 w-8" />}
                                title="Evolution Maps"
                                description="Visual trajectory analysis. See where your hard work is taking you with absolute clarity."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-40 bg-gradient-to-b from-[#050505] to-orange-900/10 border-y border-white/5 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-600/10 blur-[150px] rounded-full" />
                    <div className="container relative z-10 px-6 mx-auto max-w-xl text-center space-y-10">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            Ready to <br /> <span className="text-orange-500">Optimize</span>?
                        </h2>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Join the private group and start building your legacy today. A custom tool for a select circle.
                        </p>
                        <Link href="/login" className="inline-block">
                            <button className="bg-white text-black font-black uppercase tracking-widest px-12 py-6 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl active:scale-95">
                                Initialize Account
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 bg-black">
                <div className="container px-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            © 2026 Forge. Established for the Inner Circle.
                        </span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
                        <Link href="#" className="hover:text-orange-500 transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-orange-500 transition-colors">Protocol</Link>
                        <Link href="#" className="hover:text-orange-500 transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
            <div className="relative z-10 space-y-6">
                <div className="inline-flex p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-orange-500 shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 group-hover:-translate-y-1">
                    {icon}
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-400 transition-colors">{description}</p>
                </div>
            </div>
        </div>
    )
}
