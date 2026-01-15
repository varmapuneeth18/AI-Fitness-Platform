import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, Zap, BarChart3, PieChart, Dumbbell, HeartPulse, ChevronRight } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 px-4 lg:px-12 h-20 flex items-center border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <Link className="flex items-center gap-2 group" href="/">
                    <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Antigravity Fitness
                    </span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-8 items-center">
                    <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#features">
                        Features
                    </Link>
                    <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#about">
                        Science
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" className="text-gray-400 hover:text-white">
                            Log In
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6">
                            Start for Free
                        </Button>
                    </Link>
                </nav>
                <div className="ml-auto md:hidden">
                    <Link href="/login">
                        <Button size="sm" className="bg-blue-600 text-white rounded-full">Explore</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
                    </div>

                    <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                                <Zap className="h-3 w-3" />
                                Next Generation Coaching
                            </div>
                            <div className="space-y-4 max-w-4xl">
                                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl/none">
                                    Your Body. <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400">
                                        AI Optimization.
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-[800px] text-gray-400 text-lg md:text-xl leading-relaxed">
                                    The only fitness platform that combines real-time data analysis, USDA-verified nutrition, and LLM-powered coaching for elite results.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login">
                                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-7 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95">
                                        Join Early Access
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="text-white border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-8 py-7 text-lg transition-all">
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 bg-[#0a0a0a]">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-bold md:text-4xl">Precision Tracking</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to master your health, integrated into one ecosystem.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard
                                icon={<Dumbbell className="h-6 w-6 text-blue-400" />}
                                title="Adaptive Workouts"
                                description="Our AI learns your strength curve and adjusts volume and intensity dynamically for every set."
                            />
                            <FeatureCard
                                icon={<PieChart className="h-6 w-6 text-violet-400" />}
                                title="Nutrition Intelligence"
                                description="Log meals in seconds with vision-AI and deep USDA database integration. Real-time macro balancing."
                            />
                            <FeatureCard
                                icon={<HeartPulse className="h-6 w-6 text-indigo-400" />}
                                title="Biometric Analysis"
                                description="Connect your wearables to see how sleep, recovery, and stress affect your progress."
                            />
                            <FeatureCard
                                icon={<Activity className="h-6 w-6 text-emerald-400" />}
                                title="Progression Maps"
                                description="Visualizing your journey with heatmaps and volume charts that prove your growth."
                            />
                            <FeatureCard
                                icon={<Zap className="h-6 w-6 text-amber-400" />}
                                title="Coach On-Demand"
                                description="24/7 access to your personal AI coach. Ask about form, supplementation, or plan adjustments."
                            />
                            <FeatureCard
                                icon={<BarChart3 className="h-6 w-6 text-rose-400" />}
                                title="Evidence Based"
                                description="Every plan is rooted in the latest sports science and nutritional research."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
                    <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-5xl text-center">
                        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 backdrop-blur-sm">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to reach your peak?</h2>
                            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                                Stop guessing and start optimizing. Join the next generation of fit tech today.
                            </p>
                            <Link href="/login">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-full px-12 py-6 text-xl">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-black">
                <div className="container px-4 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-gray-500 text-sm">
                        © 2026 Antigravity Fitness. Built by Deepmind Advanced Coders.
                    </div>
                    <div className="flex gap-8 text-gray-500 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-300">
            <div className="mb-6 h-12 w-12 rounded-2xl bg-black/50 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
