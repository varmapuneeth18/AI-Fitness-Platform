"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dumbbell, Play } from "lucide-react"

export default function WorkoutsPage() {
    const { data: session } = useSession()
    const [todaysWorkout, setTodaysWorkout] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isLogging, setIsLogging] = useState(false)

    // State for logs: { exercise_id: [{weight, reps}] }
    const [logs, setLogs] = useState<Record<number, { weight: number, reps: number }[]>>({})

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

    const fetchWorkout = async () => {
        const token = (session as any)?.accessToken
        if (!token) return

        try {
            const res = await fetch(`${apiUrl}/workouts/today`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setTodaysWorkout(data)
                // Initialize logs state
                if (data && data.exercises) {
                    const initialLogs: any = {}
                    data.exercises.forEach((ex: any) => {
                        // Start with 1 empty set
                        initialLogs[ex.id] = [{ weight: 0, reps: 0 }]
                    })
                    setLogs(initialLogs)
                }
            } else {
                setTodaysWorkout(null)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (session) fetchWorkout()
    }, [session, apiUrl])

    const startPlan = async () => {
        const token = (session as any)?.accessToken
        if (!token) return

        try {
            const res = await fetch(`${apiUrl}/workouts/plan`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ template_id: 1 })
            })
            if (res.ok) fetchWorkout()
            else alert("Failed to assign plan")
        } catch (e) {
            console.error(e)
        }
    }

    const updateLog = (exId: number, setIndex: number, field: 'weight' | 'reps', value: string) => {
        const newLogs = { ...logs }
        newLogs[exId][setIndex] = {
            ...newLogs[exId][setIndex],
            [field]: Number(value)
        }
        setLogs(newLogs)
    }

    const addSet = (exId: number) => {
        const newLogs = { ...logs }
        // Copy previous set values for convenience
        const lastSet = newLogs[exId][newLogs[exId].length - 1]
        newLogs[exId].push({ ...lastSet })
        setLogs(newLogs)
    }

    const finishWorkout = async () => {
        const token = (session as any)?.accessToken
        if (!token) return

        // Transform state to API schema
        const apiLogs = Object.keys(logs).map(exIdStr => {
            const exId = Number(exIdStr)
            return {
                exercise_id: exId,
                sets: logs[exId]
            }
        })

        try {
            const res = await fetch(`${apiUrl}/workouts/log`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_id: 0, // Backend handles new session creation
                    logs: apiLogs,
                    notes: "Logged via Active UI"
                })
            })

            if (res.ok) {
                alert("Great workout! Session saved.")
                setIsLogging(false)
            } else {
                alert("Error saving log")
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    )

    return (
        <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <Dumbbell className="h-10 w-10 text-blue-500" /> Executive Training
                </h1>
                <p className="text-gray-500">Your metabolic optimization protocol for today.</p>
            </div>

            {!todaysWorkout ? (
                <Card className="bg-white/5 border-white/5 backdrop-blur-sm p-12 text-center">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                            <Dumbbell className="h-10 w-10 text-blue-400" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">No Active Vector</h2>
                            <p className="text-gray-500 text-sm">You haven't initialized a training plan yet. Choose a strategy to begin your evolution.</p>
                        </div>
                        <Button
                            onClick={startPlan}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                        >
                            Initialize Full Body Protocol
                        </Button>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className={cn(
                            "bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500",
                            isLogging ? "ring-2 ring-blue-500/50" : ""
                        )}>
                            <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-white text-2xl font-bold">
                                        {isLogging ? "Active Telemetry" : todaysWorkout.session_name}
                                    </CardTitle>
                                    <CardDescription className="text-gray-500 italic">
                                        {isLogging ? "Recording real-time performance data" : "Form over ego. Focus on the metric."}
                                    </CardDescription>
                                </div>
                                {!isLogging && (
                                    <Button onClick={() => setIsLogging(true)} className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/10">
                                        <Play className="mr-2 h-4 w-4 fill-white" /> Activate
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="pt-8 space-y-8">
                                {!isLogging ? (
                                    <div className="grid gap-4">
                                        {todaysWorkout.exercises.map((ex: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{ex.name}</div>
                                                        <div className="text-xs text-gray-500">Target Range: 3 sets x 8-12 reps</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs font-mono text-blue-500/50">STRENGTH ZONE</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-12">
                                        {todaysWorkout.exercises.map((ex: any) => (
                                            <div key={ex.id} className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                    <h3 className="font-bold text-xl tracking-tight text-white">{ex.name}</h3>
                                                </div>
                                                <div className="grid gap-3">
                                                    {logs[ex.id]?.map((set, idx) => (
                                                        <div key={idx} className="flex gap-4 items-center bg-white/[0.02] p-4 rounded-xl border border-white/[0.03]">
                                                            <span className="text-xs font-bold text-gray-600 w-12 uppercase tracking-widest">Set {idx + 1}</span>
                                                            <div className="flex-1 flex gap-4">
                                                                <div className="flex-1 space-y-1">
                                                                    <label className="text-[10px] uppercase font-bold text-gray-500">Weight</label>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="number"
                                                                            className="w-full bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-white font-mono"
                                                                            placeholder="00"
                                                                            value={set.weight || ''}
                                                                            onChange={(e) => updateLog(ex.id, idx, 'weight', e.target.value)}
                                                                        />
                                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-bold uppercase">KG</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 space-y-1">
                                                                    <label className="text-[10px] uppercase font-bold text-gray-500">Reps</label>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="number"
                                                                            className="w-full bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-white font-mono"
                                                                            placeholder="00"
                                                                            value={set.reps || ''}
                                                                            onChange={(e) => updateLog(ex.id, idx, 'reps', e.target.value)}
                                                                        />
                                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-bold uppercase">REPS</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => addSet(ex.id)}
                                                    className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 px-0 font-bold text-xs uppercase tracking-widest"
                                                >
                                                    + Add Measurement Point
                                                </Button>
                                            </div>
                                        ))}

                                        <div className="pt-8 border-t border-white/5 flex gap-4">
                                            <Button
                                                onClick={finishWorkout}
                                                className="flex-1 bg-blue-600 hover:bg-blue-500 py-6 rounded-xl font-bold shadow-lg shadow-blue-500/20"
                                            >
                                                Commit to Database
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsLogging(false)}
                                                className="px-8 text-gray-500 hover:text-white"
                                            >
                                                Abort
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-white/5 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">AI Integration</CardTitle>
                                <CardDescription>Real-time coaching insights</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 border-l-2 border-l-blue-500">
                                    <p className="text-xs leading-relaxed text-gray-300">
                                        Based on your last session, I've adjusted your rest intervals. Aim for <span className="text-blue-400 font-bold">90 seconds</span> between compound movements today.
                                    </p>
                                </div>
                                <div className="p-4 bg-violet-500/5 rounded-2xl border border-violet-500/10 border-l-2 border-l-violet-500">
                                    <p className="text-xs leading-relaxed text-gray-300">
                                        Volume trend: <span className="text-violet-400 font-bold">+8.4%</span> since Tuesday. Mechanical tension is high.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

import { cn } from "@/lib/utils"
