"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Send, Bot, User } from "lucide-react"

export default function CoachPage() {
    const { data: session } = useSession()
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: "assistant", content: "Hello! I'm your AI Fitness Coach. How can I help you today?" }
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")
        setLoading(true)

        const token = (session as any)?.accessToken

        try {
            const res = await fetch(`${apiUrl}/coach/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMsg })
            })

            if (res.ok) {
                const data = await res.json()
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. The neural link seems unstable." }])
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: "assistant", content: "Network error. Re-establishing connection..." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 md:p-8 h-[calc(100vh-4rem)] flex flex-col bg-[#0a0a0a] text-white">
            <div className="mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                    <Bot className="h-10 w-10 text-blue-500" /> Tactical Intelligence
                </h1>
                <p className="text-gray-500 text-sm">Real-time coaching and strategy optimization.</p>
            </div>

            <Card className="flex-1 flex flex-col min-h-0 bg-white/5 border-white/5 backdrop-blur-sm shadow-2xl overflow-hidden rounded-3xl">
                <CardHeader className="border-b border-white/5 bg-white/[0.02] py-4">
                    <CardTitle className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-blue-400">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        Neural Link Active
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={cn(
                                    "p-2.5 rounded-xl border shrink-0",
                                    m.role === "user" ? "bg-blue-600 border-blue-500" : "bg-white/10 border-white/10"
                                )}>
                                    {m.role === "user" ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-blue-400" />}
                                </div>
                                <div className={cn(
                                    "p-4 rounded-2xl text-sm leading-relaxed shadow-lg",
                                    m.role === "user"
                                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-br-none"
                                        : "bg-white/[0.07] border border-white/10 text-gray-200 rounded-bl-none"
                                )}>
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 bg-white/[0.03] p-4 rounded-2xl rounded-bl-none border border-white/5">
                                <div className="flex gap-1">
                                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Processing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </CardContent>
                <CardFooter className="border-t border-white/5 p-6 bg-black/20">
                    <div className="flex w-full gap-3 relative group">
                        <Input
                            placeholder="Type instructions or questions..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            disabled={loading}
                            className="bg-white/5 border-white/10 focus-visible:ring-blue-500 rounded-2xl py-7 pl-6 pr-16 text-white placeholder:text-gray-600 transition-all"
                        />
                        <Button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 h-10 w-10 p-0 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

import { cn } from "@/lib/utils"
