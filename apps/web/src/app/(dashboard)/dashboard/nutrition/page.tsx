"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import ImageUpload from "@/components/image-upload"

export default function NutritionPage() {
    const { data: session } = useSession()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [logs, setLogs] = useState<any[]>([])

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

    useEffect(() => {
        if (query.length > 2) {
            fetch(`${apiUrl}/nutrition/search?q=${query}`)
                .then(res => res.json())
                .then(data => setResults(data))
        } else {
            setResults([])
        }
    }, [query, apiUrl])

    const handleImageAnalysis = (data: any) => {
        // In a real app we would present a confirmation dialog. 
        // Here we just set the results to the detected item so user can click "+"
        if (data.detected_items && data.detected_items.length > 0) {
            setResults(data.detected_items)
            alert(data.message)
        }
    }

    const fetchLogs = async () => {
        // Need auth token
        const token = (session as any)?.accessToken
        if (!token) return

        try {
            const res = await fetch(`${apiUrl}/nutrition/log`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setLogs(data)
            }
        } catch (e) { }
    }

    useEffect(() => {
        if (session) fetchLogs()
    }, [session, apiUrl])

    const addToLog = async (item: any) => { // Modified to accept item object directly if needed, or ID
        // If item has no ID (from Vision), we might need to create it first or handle it differently.
        // For MVP Vision Mock, let's assume we just treat it as a search result that might not exist in DB yet.
        // This is tricky. Let's simplfy: The mock returns an item structure.
        // We will try to find a matching ID or just fail for now?
        // Better: The mock should probably return an item that "mock exists" or we create it on the fly.

        // FOR MVP Mock: We will just alert "Logged!" if ID missing, or proceed if ID likely exists.
        // Actually, let's just make the mock return a minimal "search result" looking thing.
        // The mock above didn't return an ID. 
        // Let's modify the mock in backend to return an ID (say 1, Chicken Breast) for simplicity of demo.

        if (!item.id) {
            // If purely from vision without ID (mock), we can't log to DB easily with current schema (needs food_item_id).
            // We will find "Chicken Breast" in our list which is seeded.
            // Let's assume the user searches for "Chicken" after seeing the suggestion.
            setQuery(item.name)
            return
        }

        const foodId = item.id
        // ... existing addToLog logic ...
        const token = (session as any)?.accessToken
        if (!token) {
            alert("Not authenticated")
            return
        }

        try {
            const res = await fetch(`${apiUrl}/nutrition/log`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    food_item_id: foodId,
                    quantity_g: 100,
                    meal_type: "Snack"
                })
            })
            if (res.ok) {
                const newLog = await res.json()
                setLogs([...logs, newLog])
                setQuery("")
                setResults([])
            } else {
                alert("Failed to log")
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="p-4 md:p-8 space-y-8 bg-[#0a0a0a] min-h-screen text-white">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight">Nutrition Analysis</h1>
                <p className="text-gray-500">Log your intake via search or vision-AI scan.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card className="bg-white/5 border-white/5 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="flex justify-between items-center text-white">
                                <span className="flex items-center gap-2">
                                    <Search className="h-5 w-5 text-blue-400" />
                                    Intelligence Search
                                </span>
                                <ImageUpload onAnalysis={handleImageAnalysis} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                <Input
                                    placeholder="Scan or type food name (e.g. Chicken, Avocado)..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="pl-10 bg-black/40 border-white/10 focus-visible:ring-blue-500 rounded-xl py-6"
                                />
                            </div>

                            {results.length > 0 && (
                                <div className="mt-6 space-y-2 border border-white/5 rounded-2xl p-2 max-h-80 overflow-y-auto bg-black/20">
                                    {results.map((item: any, idx: number) => (
                                        <div key={item.id || idx} className="flex justify-between items-center p-4 hover:bg-white/5 rounded-xl transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.calories_per_100g} kcal / 100g · P: {item.protein_per_100g}g</div>
                                                </div>
                                            </div>
                                            {item.id && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => addToLog(item)}
                                                    className="bg-blue-600 hover:bg-blue-500 rounded-lg h-9 w-9 p-0"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-white/5 border-white/5 backdrop-blur-sm">
                        <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Activity className="h-5 w-5 text-emerald-400" />
                                Daily Intake Journal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {logs.length === 0 ? (
                                <div className="text-center py-12 space-y-3">
                                    <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                        <Utensils className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <p className="text-gray-500">Your journal is empty. Fuel your growth.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {logs.map((log: any) => (
                                        <div key={log.id} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                <div className="font-medium">{log.food_item.name}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm font-bold text-white">{Math.round(log.calories)} <span className="text-gray-500 font-normal">kcal</span></div>
                                                <div className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">{log.meal_type}</div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                                        <div>
                                            <div className="text-gray-500 text-sm">Total Consumed</div>
                                            <div className="text-3xl font-bold text-white">
                                                {logs.reduce((acc, curr) => acc + curr.calories, 0).toFixed(0)} <span className="text-sm text-gray-500 font-normal">kcal</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-400 text-sm font-bold flex items-center justify-end">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                Burn: 450 kcal
                                            </div>
                                            <div className="text-gray-500 text-xs">Net Energy: {(logs.reduce((acc, curr) => acc + curr.calories, 0) - 450).toFixed(0)} kcal</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
