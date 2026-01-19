"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, LayoutDashboard, Utensils, Calendar, Settings, User, TrendingUp } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500",
        },
        {
            label: "Workouts",
            icon: Activity,
            href: "/dashboard/workouts",
            color: "text-violet-500",
        },
        {
            label: "Nutrition",
            icon: Utensils,
            href: "/dashboard/nutrition",
            color: "text-pink-700",
        },
        {
            label: "Progress",
            icon: TrendingUp,
            href: "/dashboard/progress",
            color: "text-green-500", // Added a color for consistency
        },
        {
            label: "Schedule",
            icon: Calendar,
            href: "/dashboard/schedule",
            color: "text-orange-700",
        },
        {
            label: "Profile",
            icon: User,
            href: "/dashboard/profile",
            color: "text-emerald-500",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
            color: "text-gray-500",
        }
    ]

    return (
        <div className={cn("pb-12 space-y-4", className)}>
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-bold tracking-tight">
                    Forge Central
                </h2>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
