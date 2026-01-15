import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Flame, Scale, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
            <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 mb-8 px-4">
                    <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-1.5 rounded-lg">
                        <Zap className="h-4 w-4 text-white fill-white" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Antigravity
                    </h2>
                </Link>
                <h1 className="text-4xl font-extrabold tracking-tight">Executive Summary</h1>
                <p className="text-gray-500">Welcome back. Your physique optimization is on track.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Weekly Training"
                    value="4"
                    unit="Sessions"
                    trend="+12%"
                    trendUp={true}
                    icon={<Activity className="h-5 w-5 text-blue-400" />}
                    description="On track for target"
                />
                <StatCard
                    title="Caloric Load"
                    value="1,840"
                    unit="kcal"
                    trend="-5%"
                    trendUp={false}
                    icon={<Flame className="h-5 w-5 text-orange-400" />}
                    description="76.6% of daily goal"
                />
                <StatCard
                    title="Body Mass"
                    value="82.4"
                    unit="kg"
                    trend="-0.8kg"
                    trendUp={false}
                    icon={<Scale className="h-5 w-5 text-emerald-400" />}
                    description="New personal low"
                />
                <StatCard
                    title="Anabolic Window"
                    value="88"
                    unit="%"
                    trend="+2%"
                    trendUp={true}
                    icon={<TrendingUp className="h-5 w-5 text-violet-400" />}
                    description="Metabolic efficiency"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 bg-white/5 border-white/5 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Performance Volume</CardTitle>
                        <CardDescription className="text-gray-500">Total weight lifted across all sessions this week</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-end gap-2 px-6">
                        {/* Placeholder for a chart */}
                        {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-500/80 rounded-t-lg transition-all hover:to-blue-400" style={{ height: `${h}%` }} />
                        ))}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 bg-white/5 border-white/5 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Strategic Directive</CardTitle>
                        <CardDescription className="text-gray-500">Your AI-generated priorities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <DirectiveItem
                                title="Lower Body Hypertrophy"
                                time="Today @ 5:30 PM"
                                status="Priority Alpha"
                                color="blue"
                            />
                            <DirectiveItem
                                title="Refeed Protocol"
                                time="Tomorrow"
                                status="Strategic Adjustment"
                                color="violet"
                            />
                            <DirectiveItem
                                title="Sleep Hygiene Check"
                                time="Daily"
                                status="Recovery Optimization"
                                color="emerald"
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
        <Card className="bg-white/5 border-white/5 hover:bg-white/[0.07] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
                <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-1">
                    <div className="text-3xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-500">{unit}</div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-xs font-medium flex items-center", trendUp ? "text-emerald-400" : "text-rose-400")}>
                        {trendUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                        {trend}
                    </span>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function DirectiveItem({ title, time, status, color }: any) {
    const colors: any = {
        blue: "from-blue-500 to-indigo-600",
        violet: "from-violet-500 to-purple-600",
        emerald: "from-emerald-500 to-teal-600"
    }
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-colors">
            <div className={cn("h-10 w-1 pt-0 rounded-full bg-gradient-to-b", colors[color] || colors.blue)} />
            <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wider text-xs">{status}</h4>
                <div className="text-lg font-semibold mt-1">{title}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {time}
                </div>
            </div>
        </div>
    )
}
