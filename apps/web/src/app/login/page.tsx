"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Zap, Dumbbell, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from "lucide-react"
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

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
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
                throw new Error(err.detail || "Registration failed")
            }
            setIsLogin(true)
            setError("Registration successful! Bio-metrics established. Please sign in.")
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
        <div className="relative flex items-center justify-center min-h-screen bg-[#050505] overflow-hidden px-4">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse delay-700" />

            <div className="w-full max-w-md z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl shadow-2xl shadow-blue-500/20 mb-4 animate-bounce-slow">
                        <Zap className="h-8 w-8 text-white fill-white" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Antigravity
                    </h1>
                    <p className="text-gray-500 font-medium tracking-wide">
                        {isLogin ? "PROTOCOL ACCESS" : "INITIALIZE EVOLUTION"}
                    </p>
                </div>

                <Card className="bg-white/[0.03] border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                    <CardHeader className="pt-8 pb-4 px-8">
                        <CardTitle className="text-2xl font-bold text-white text-center">
                            {isLogin ? "Welcome Back" : "Identity Creation"}
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500">
                            {isLogin
                                ? "Enter your credentials to resume optimization."
                                : "Define your bio-parameters to begin."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-8 pt-4">
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium animate-in fade-in zoom-in-95">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</Label>
                                    <div className="relative group">
                                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                        <Input
                                            placeholder="John Doe"
                                            {...register("fullName")}
                                            className="bg-black/40 border-white/10 rounded-xl py-6 pl-12 text-white placeholder:text-gray-700 focus-visible:ring-blue-500 transition-all border-l-4 border-l-transparent focus-visible:border-l-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Global Identifier</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="user@antigravity.io"
                                        {...register("email")}
                                        className="bg-black/40 border-white/10 rounded-xl py-6 pl-12 text-white placeholder:text-gray-700 focus-visible:ring-blue-500 transition-all border-l-4 border-l-transparent focus-visible:border-l-blue-500"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 pl-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Restricted Access Key</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className="bg-black/40 border-white/10 rounded-xl py-6 pl-12 text-white placeholder:text-gray-700 focus-visible:ring-blue-500 transition-all border-l-4 border-l-transparent focus-visible:border-l-blue-500"
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 pl-1">{errors.password.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-7 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] group"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? "AUTHORIZE ENTRY" : "CONFIRM INITIALIZATION"}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pb-8">
                        <div className="w-full flex items-center justify-center gap-4 px-8">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Switch Mode</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError("")
                            }}
                            className="text-gray-500 hover:text-white hover:bg-white/5 rounded-xl py-6 underline-offset-4"
                        >
                            {isLogin ? "Need a profile? Initialize here" : "Return to secure access"}
                        </Button>
                    </CardFooter>
                </Card>

                <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Dumbbell className="h-3 w-3" /> Encrypted Human Optimization Platform
                </p>
            </div>
        </div>
    )
}

// Separate this if needed, defining inline for now as Client Component can't be async server action
import { performLogin } from "./actions"
