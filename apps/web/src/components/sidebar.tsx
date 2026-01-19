"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, LayoutDashboard, Utensils, Calendar, Settings, User, TrendingUp, Zap, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-orange-500",
        },
        {
            label: "Protocols",
            icon: Activity,
            href: "/dashboard/workouts",
            color: "text-orange-500",
        },
        {
            label: "Fuel Log",
            icon: Utensils,
            href: "/dashboard/nutrition",
            color: "text-orange-500",
        },
        {
            label: "Evolution",
            icon: TrendingUp,
            href: "/dashboard/progress",
            color: "text-orange-500",
        },
        {
            label: "Timeline",
            icon: Calendar,
            href: "/dashboard/schedule",
            color: "text-orange-500",
        },
        {
            label: "Identity",
            icon: User,
            href: "/dashboard/profile",
            color: "text-orange-500",
        },
        {
            label: "Parameters",
            icon: Settings,
            href: "/dashboard/settings",
            color: "text-orange-500",
        }
    ]

    return (
        <div className={cn("flex flex-col h-full bg-[#050505] border-r border-white/5 pt-10", className)}>
            <div className="px-8 mb-12">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
                        Forge
                    </span>
                </Link>
                <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">
                    <ShieldCheck className="h-2.5 w-2.5" /> Core Alpha
                </div>
            </div>

            <div className="flex-1 px-4 space-y-2">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "group flex items-center gap-4 px-5 py-4 w-full rounded-2xl transition-all duration-300 relative overflow-hidden",
                            pathname === route.href
                                ? "text-white bg-white/[0.03] border border-white/5"
                                : "text-gray-500 hover:text-white hover:bg-white/[0.01]"
                        )}
                    >
                        {pathname === route.href && (
                            <motion.div
                                layoutId="sidebar-active"
                                className="absolute left-0 w-1 h-6 bg-orange-500 rounded-full"
                            />
                        )}
                        <route.icon className={cn(
                            "h-5 w-5 transition-all duration-300",
                            pathname === route.href ? "text-orange-500" : "group-hover:text-orange-400 group-hover:scale-110"
                        )} />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            {route.label}
                        </span>
                    </Link>
                ))}
            </div>

            <div className="p-8">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        />
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-700">
                        <span>Sync Status</span>
                        <span className="text-orange-500">65%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
