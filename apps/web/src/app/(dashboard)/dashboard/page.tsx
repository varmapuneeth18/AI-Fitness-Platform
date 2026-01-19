"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Flame, Scale, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Zap, Target, ZapIcon, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="p-6 md:p-12 space-y-12 bg-[#050505] min-h-screen text-white selection:bg-orange-500/30 font-sans">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-600 p-2.5 rounded-full">
                                <Zap className="h-4 w-4 text-white fill-white" />
                            </div>
                            <span className="text-3xl font-black tracking-[-0.08em] uppercase italic text-white leading-none">
                                FORGE
                            </span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black tracking-[-0.05em] uppercase italic leading-none text-white">STATUS</h1>
                        <p className="text-gray-600 font-bold tracking-[0.4em] uppercase text-[10px]">Optimizing: <span className="text-orange-600">Active Protocol</span></p>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-6 py-4 rounded-[1.5rem] bg-white/[0.03] border border-white/5 flex items-center gap-4 backdrop-blur-xl">
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Tactical Feed Active</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Metrics Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                <StatCard
                    title="Force Volume"
                    value="12.4"
                    unit="Tons"
                    trend="+18%"
                    trendUp={true}
                    icon={<Activity className="h-5 w-5 text-orange-400" />}
                    description="Weekly Cumulative"
                />
                <StatCard
                    title="Thermal Load"
                    value="2,450"
                    unit="kcal"
                    trend="-8%"
                    trendUp={false}
                    icon={<Flame className="h-5 w-5 text-amber-500" />}
                    description="Expenditure"
                />
                <StatCard
                    title="Current Mass"
                    value="81.2"
                    unit="kg"
                    trend="-1.2kg"
                    trendUp={false}
                    icon={<Scale className="h-5 w-5 text-zinc-400" />}
                    description="Delta: Negative"
                />
                <StatCard
                    title="Bio-Efficiency"
                    value="94"
                    unit="%"
                    trend="+5%"
                    trendUp={true}
                    icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
                    description="System Sync"
                />
            </motion.div>

            {/* Analysis Section */}
            <div className="grid gap-8 lg:grid-cols-7">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4"
                >
                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group">
                        <CardHeader className="pb-4 border-b border-white/5 bg-white/[0.01]">
                            <div className="flex justify-between items-center px-4">
                                <div>
                                    <CardTitle className="text-white text-2xl font-black uppercase italic tracking-tight">Evolution Map</CardTitle>
                                    <CardDescription className="text-gray-600 font-bold text-[10px] uppercase tracking-widest mt-1">Telemetry analysis by cycle phase</CardDescription>
                                </div>
                                <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
                                    <TrendingUp className="h-5 w-5 text-orange-500" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px] flex items-end gap-4 px-10 pb-12 pt-16">
                            {[35, 55, 40, 90, 65, 80, 50, 75, 45, 95].map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.8 }}
                                        className="w-full bg-gradient-to-t from-orange-600/20 via-orange-500/40 to-orange-400 rounded-full transition-all duration-500 group-hover/bar:brightness-125 group-hover/bar:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                                    />
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-orange-600 text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                        PHASE {i + 1}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 space-y-8"
                >
                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="pb-4 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-white text-2xl font-black uppercase italic tracking-tight px-4">Directives</CardTitle>
                            <CardDescription className="text-gray-600 font-bold text-[10px] uppercase tracking-widest px-4 mt-1">Neural designated priorities</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <DirectiveItem
                                title="Load Acceleration"
                                time="Next Session"
                                status="HIGH PRIORITY"
                                icon={<ZapIcon className="h-5 w-5" />}
                            />
                            <DirectiveItem
                                title="Metabolic Reset"
                                time="Cycle Day 12"
                                status="SCHEDULED"
                                icon={<Target className="h-5 w-5" />}
                            />
                            <DirectiveItem
                                title="Recovery Protocol"
                                time="Daily Window"
                                status="OPTIMIZING"
                                icon={<Calendar className="h-5 w-5" />}
                            />
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-amber-700 shadow-2xl shadow-orange-600/20 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <h3 className="text-white font-black uppercase italic tracking-tighter text-3xl relative z-10">Neural Coach</h3>
                        <p className="text-orange-100 font-medium text-sm mt-2 relative z-10">Access real-time tactical advice.</p>
                        <ArrowRight className="absolute bottom-8 right-8 h-8 w-8 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function StatCard({ title, value, unit, trend, trendUp, icon, description }: any) {
    return (
        <Card className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all duration-500 rounded-[2rem] group overflow-hidden relative border-t-white/10">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full group-hover:bg-orange-500/10 transition-all duration-700" />
            <CardHeader className="flex flex-row items-center justify-between pb-3 px-8 pt-8">
                <CardTitle className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{title}</CardTitle>
                <div className="p-3 bg-black/60 rounded-2xl border border-white/10 group-hover:border-orange-500/40 transition-colors">
                    {icon}
                </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <div className="flex items-baseline gap-3">
                    <div className="text-5xl font-black text-white italic tracking-tighter">{value}</div>
                    <div className="text-xs font-black text-gray-700 uppercase tracking-widest">{unit}</div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <span className={cn("text-[9px] font-black flex items-center px-2 py-1 rounded-lg tracking-widest", trendUp ? "bg-orange-500/10 text-orange-400" : "bg-white/5 text-gray-500")}>
                        {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {trend}
                    </span>
                    <p className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.2em]">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function DirectiveItem({ title, time, status, icon }: any) {
    return (
        <div className="flex items-center gap-6 group">
            <div className="p-4 bg-black/60 rounded-2.5xl border border-white/5 text-orange-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-500">
                {icon}
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-orange-500/70 uppercase tracking-[0.3em]">{status}</span>
                    <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{time}</span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">{title}</h4>
            </div>
        </div>
    )
}
