"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
    const { data: session } = useSession()
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <UserIcon className="h-10 w-10 text-blue-500" /> Identity Profile
                </h1>
                <p className="text-gray-500">Manage your bio-metrics and security parameters.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <Card className="lg:col-span-2 bg-white/5 border-white/5 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-white/[0.02] border-b border-white/5">
                        <CardTitle className="text-lg font-bold">Personal Bio-Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Global Identifier (Email)</Label>
                                <Input
                                    value={session?.user?.email || ""}
                                    disabled
                                    className="bg-white/[0.03] border-white/10 text-gray-400 font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</Label>
                                <Input
                                    placeholder="Your Name"
                                    disabled={!isEditing}
                                    className="bg-white/5 border-white/10 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2 text-center md:text-left">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Biological Age</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="25"
                                            disabled={!isEditing}
                                            className="bg-white/5 border-white/10 text-2xl font-black h-16 text-center md:text-left"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-600">YRS</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-center md:text-left">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Current Mass</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="70"
                                            disabled={!isEditing}
                                            className="bg-white/5 border-white/10 text-2xl font-black h-16 text-center md:text-left"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-600">KG</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex justify-end">
                            {isEditing ? (
                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-blue-600 hover:bg-blue-500 px-8 font-bold rounded-xl"
                                    >
                                        Save Transformation
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsEditing(false)}
                                        className="text-gray-500"
                                    >
                                        Revert
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                    className="border-white/10 hover:bg-white/5 rounded-xl px-8"
                                >
                                    Modify Bio-Data
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border-blue-500/20 p-6 rounded-3xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">Account Status</h3>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20">
                                {session?.user?.email?.[0].toUpperCase() || "A"}
                            </div>
                            <div>
                                <div className="text-white font-bold">Founder Member</div>
                                <div className="text-xs text-blue-500/60">Forge Access Verified</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white/5 border-white/5 p-6 rounded-3xl space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Neural Goals</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">Goal orchestration is managed via the <span className="text-blue-500">Tactical Intelligence</span> interface. Use the AI Coach to adjust your trajectory.</p>
                        <div className="pt-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[65%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-[10px] font-bold text-gray-600">DATA SYNC</span>
                                <span className="text-[10px] font-bold text-blue-500">65%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}


