"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, FileText } from "lucide-react"

export default function ProgressPage() {
    const { data: session } = useSession()
    const [report, setReport] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

    const generateReport = async () => {
        setLoading(true)
        const token = (session as any)?.accessToken

        try {
            const res = await fetch(`${apiUrl}/coach/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: "Generate my weekly progress summary report" })
            })

            if (res.ok) {
                const data = await res.json()
                setReport(data.reply)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <TrendingUp className="h-10 w-10 text-emerald-500" /> Evolution Metrics
                </h1>
                <p className="text-gray-500">AI-powered trajectory analysis based on your bio-data.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="bg-white/5 border-white/5 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                        <FileText className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Vector Analysis</h2>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">Generate a comprehensive summary of your performance, metabolic trends, and future projections.</p>
                    </div>
                    <Button
                        onClick={generateReport}
                        disabled={loading}
                        className="w-full max-w-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                        {loading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Processing Data...
                            </>
                        ) : "Generate Strategy Report"}
                    </Button>
                </Card>

                {report && (
                    <Card className="bg-white/5 border-emerald-500/20 backdrop-blur-sm overflow-hidden flex flex-col">
                        <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/10 py-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                <Bot className="h-4 w-4" /> Tactical Briefing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 flex-1">
                            <div className="prose prose-invert max-w-none">
                                <p className="whitespace-pre-wrap text-emerald-50/80 leading-relaxed italic">"{report}"</p>
                            </div>
                        </CardContent>
                        <div className="p-4 border-t border-white/5 bg-black/20 flex justify-end">
                            <Button variant="ghost" size="sm" onClick={() => setReport(null)} className="text-gray-500 hover:text-white">
                                Archive Report
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Volume Strength", value: "+12.4%", sub: "Last 30 days" },
                    { label: "Caloric Accuracy", value: "94%", sub: "Log consistency" },
                    { label: "Metabolic Age", value: "-2 yrs", sub: "Est. biological" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl">
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-3xl font-black text-white">{stat.value}</div>
                        <div className="text-[10px] text-emerald-500/60 font-medium mt-1 uppercase tracking-tighter">{stat.sub}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"
