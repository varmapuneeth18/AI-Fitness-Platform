"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Zap, Dumbbell, Mail, Lock, User as UserIcon, ArrowRight, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { performLogin } from "./actions"

const formSchema = z.object({
    email: z.string().email("Please enter a valid global identifier"),
    password: z.string().min(6, "Access key must be at least 6 characters"),
    fullName: z.string().optional(),
})

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onRegister = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError("")
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
            const res = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    full_name: data.fullName
                })
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.detail || "Initialization failed")
            }
            setIsLogin(true)
            setError("Bio-metrics established. Access granted. Please sign in.")
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onLogin = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError("")
        try {
            await performLogin(data)
        } catch (e: any) {
            setError(e.message)
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#050505] overflow-hidden px-4 selection:bg-orange-500/30">
            {/* Animated Flare Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />

            <div className="w-full max-w-md z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-[1.5rem] shadow-2xl shadow-orange-500/20 mb-2">
                        <Zap className="h-10 w-10 text-white fill-white" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                        Forge
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500 font-bold tracking-[0.3em] text-[10px]">
                        <ShieldCheck className="h-3 w-3" /> SECURE PROTOCOL ACCESS
                    </div>
                </div>

                <Card className="bg-white/[0.02] border-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border-t-white/10">
                    <CardHeader className="pt-10 pb-4 px-10">
                        <CardTitle className="text-3xl font-black text-white text-center uppercase italic tracking-tight">
                            {isLogin ? "Identify" : "Initialize"}
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500 font-medium">
                            {isLogin
                                ? "Resuming evolution protocol."
                                : "Creating your private bio-signature."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pb-10 pt-4">
                        {error && (
                            <div className="mb-8 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider animate-in fade-in zoom-in-95 leading-relaxed">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 pl-2">Full Identity</Label>
                                    <div className="relative group">
                                        <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                                        <Input
                                            placeholder="John Doe"
                                            {...register("fullName")}
                                            className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/50 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 pl-2">Global Identifier</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="user@forge.io"
                                        {...register("email")}
                                        className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/50 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                    />
                                </div>
                                {errors.email && <p className="text-orange-500 text-[9px] font-black uppercase mt-1.5 pl-2 tracking-widest">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 pl-2">Access Key</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/50 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                    />
                                </div>
                                {errors.password && <p className="text-orange-500 text-[9px] font-black uppercase mt-1.5 pl-2 tracking-widest">{errors.password.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.2em] py-8 rounded-2xl shadow-2xl shadow-orange-600/20 transition-all active:scale-[0.97] group text-xs"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? "Confirm Identity" : "Initialize Bio-Sig"}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-6 pb-12 pt-4 px-10">
                        <div className="w-full flex items-center justify-center gap-6">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em]">Protocol Toggle</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError("")
                            }}
                            className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group"
                        >
                            {isLogin ? "Need a signature? Create here" : "Return to identification"}
                            <Zap className="h-3 w-3 text-orange-500 group-hover:animate-pulse" />
                        </button>
                    </CardFooter>
                </Card>

                <p className="text-center text-[9px] text-gray-700 font-black uppercase tracking-[0.5em] flex items-center justify-center gap-3">
                    <Dumbbell className="h-3 w-3" /> Built for the inner circle
                </p>
            </div>
        </div>
    )
}
