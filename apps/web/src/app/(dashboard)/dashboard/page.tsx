"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Flame, Scale, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Zap, Target, ZapIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-10 space-y-10 bg-[#070707] min-h-screen text-white selection:bg-orange-500/30 font-sans">
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
                <Link href="/dashboard" className="flex items-center gap-3 mb-6 px-1">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic text-white">
                        Forge
                    </h2>
                </Link>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Status Report</h1>
                        <p className="text-gray-500 font-medium mt-2 tracking-wide uppercase text-xs">Biometric optimization is currently: <span className="text-orange-500">Nominal</span></p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Live</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <StatCard
                    title="Volume Protocol"
                    value="4"
                    unit="Sessions"
                    trend="+12%"
                    trendUp={true}
                    icon={<Activity className="h-5 w-5 text-orange-400" />}
                    description="Weekly Target"
                />
                <StatCard
                    title="Metabolic Load"
                    value="1,840"
                    unit="kcal"
                    trend="-5%"
                    trendUp={false}
                    icon={<Flame className="h-5 w-5 text-amber-500" />}
                    description="Daily Burn"
                />
                <StatCard
                    title="Current Mass"
                    value="82.4"
                    unit="kg"
                    trend="-0.8kg"
                    trendUp={false}
                    icon={<Scale className="h-5 w-5 text-zinc-400" />}
                    description="Trajectory: Down"
                />
                <StatCard
                    title="Neural Sync"
                    value="88"
                    unit="%"
                    trend="+2%"
                    trendUp={true}
                    icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
                    description="Efficiency"
                />
            </div>

            <div className="grid gap-8 lg:grid-cols-7 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <Card className="lg:col-span-4 bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2rem] overflow-hidden">
                    <CardHeader className="pb-2 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-white text-xl font-black uppercase italic tracking-tight">Force Vector</CardTitle>
                                <CardDescription className="text-gray-500 font-medium text-xs">Performance analysis by training day</CardDescription>
                            </div>
                            <div className="bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                                <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">Live Feed</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-end gap-3 px-8 pb-10 pt-10">
                        {[40, 65, 45, 95, 70, 85, 55].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-orange-600 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {(h * 120).toLocaleString()}
                                </div>
                                <div
                                    className="w-full bg-gradient-to-t from-orange-600/20 via-orange-500/60 to-orange-400 rounded-xl transition-all duration-500 group-hover:to-orange-300 group-hover:scale-x-105 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-white/[0.02] border-white/5 backdrop-blur-3xl rounded-[2rem] overflow-hidden">
                    <CardHeader className="pb-2 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-white text-xl font-black uppercase italic tracking-tight">Active Strategy</CardTitle>
                        <CardDescription className="text-gray-500 font-medium text-xs">Neural Coach designated priorities</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <DirectiveItem
                                title="Leg Hypertrophy"
                                time="Today @ 17:30"
                                status="CRITICAL"
                                icon={<Target className="h-4 w-4" />}
                            />
                            <DirectiveItem
                                title="Macro Refeed"
                                time="Tomorrow"
                                status="ADVISORY"
                                icon={<ZapIcon className="h-4 w-4" />}
                            />
                            <DirectiveItem
                                title="Sleep Window"
                                time="Daily @ 22:30"
                                status="OPTIMAL"
                                icon={<Calendar className="h-4 w-4" />}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ title, value, unit, trend, trendUp, icon, description }: any) {
    return (
        <Card className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all duration-500 rounded-[1.5rem] group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-[40px] rounded-full group-hover:bg-orange-500/10 transition-colors" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{title}</CardTitle>
                <div className="p-2 bg-black/40 rounded-xl border border-white/5 group-hover:border-orange-500/30 transition-colors">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-black text-white italic tracking-tighter">{value}</div>
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">{unit}</div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                    <span className={cn("text-[10px] font-black flex items-center px-1.5 py-0.5 rounded-md", trendUp ? "bg-orange-500/10 text-orange-400" : "bg-zinc-500/10 text-zinc-400")}>
                        {trendUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                        {trend}
                    </span>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function DirectiveItem({ title, time, status, icon }: any) {
    return (
        <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all duration-300">
            <div className="mt-1 p-3 bg-black/40 rounded-xl border border-white/5 text-orange-500 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                    <h4 className="font-black text-orange-500 uppercase tracking-widest text-[9px] italic">{status}</h4>
                    <div className="text-[9px] font-bold text-gray-600 flex items-center gap-1 uppercase">
                        <Calendar className="h-3 w-3" />
                        {time}
                    </div>
                </div>
                <div className="text-lg font-bold text-white tracking-tight">{title}</div>
            </div>
        </div>
    )
}
