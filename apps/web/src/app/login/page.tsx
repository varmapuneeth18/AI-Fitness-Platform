"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion"

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

    // Mouse tracking for the "Banger" glow effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 30, stiffness: 200 }
    const glowX = useSpring(mouseX, springConfig)
    const glowY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

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
        <div className="relative flex items-center justify-center min-h-screen bg-[#020202] overflow-hidden px-4 selection:bg-orange-600/30 font-sans">
            {/* Background Video with Intense Contrast */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2] opacity-40 scale-105"
                >
                    <source src="https://cdn.pixabay.com/video/2023/01/27/148204-793717940_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />

                {/* Dynamic Mouse Glow */}
                <motion.div
                    style={{ x: glowX, y: glowY }}
                    className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-orange-600/5 blur-[120px] rounded-full z-[1]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md z-10 space-y-12"
            >
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center p-5 bg-orange-600 rounded-full shadow-[0_0_60px_rgba(234,88,12,0.3)] mb-2"
                    >
                        <Zap className="h-6 w-6 text-white fill-white" />
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h1
                            initial={{ letterSpacing: "1em", opacity: 0 }}
                            animate={{ letterSpacing: "-0.08em", opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl font-black text-white uppercase italic"
                        >
                            FORGE
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1 }}
                            className="text-[9px] font-black tracking-[0.6em] text-white uppercase"
                        >
                            Proprietary Access Only
                        </motion.div>
                    </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-30" />

                    <div className="pt-12 pb-6 px-12 text-center">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                            {isLogin ? "Identify" : "Initialize"}
                        </h2>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-3">
                            {isLogin
                                ? "Resuming Performance Protocol"
                                : "Establishing Bio-signature"}
                        </p>
                    </div>

                    <div className="px-12 pb-12 pt-4">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="mb-8 p-6 rounded-3xl bg-orange-600/10 border border-orange-600/20 text-orange-600 text-[10px] font-black uppercase tracking-widest leading-relaxed text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form className="space-y-8" onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-3 overflow-hidden"
                                    >
                                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 pl-4">Full Identity</Label>
                                        <div className="relative group">
                                            <Input
                                                placeholder="John Doe"
                                                {...register("fullName")}
                                                className="bg-black/60 border-white/[0.05] rounded-[2rem] py-8 px-8 text-white placeholder:text-gray-800 focus-visible:ring-orange-600/40 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-600 h-16 text-sm"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 pl-4">Global Identifier</Label>
                                <div className="relative group">
                                    <Input
                                        type="email"
                                        placeholder="user@forge.io"
                                        {...register("email")}
                                        className="bg-black/60 border-white/[0.05] rounded-[2rem] py-8 px-8 text-white placeholder:text-gray-800 focus-visible:ring-orange-600/40 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-600 h-16 text-sm"
                                    />
                                </div>
                                {errors.email && <p className="text-orange-600 text-[9px] font-black uppercase mt-3 pl-4 tracking-widest">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 pl-4">Access Key</Label>
                                <div className="relative group">
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className="bg-black/60 border-white/[0.05] rounded-[2rem] py-8 px-8 text-white placeholder:text-gray-800 focus-visible:ring-orange-600/40 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-600 h-16 text-sm"
                                    />
                                </div>
                                {errors.password && <p className="text-orange-600 text-[9px] font-black uppercase mt-3 pl-4 tracking-widest">{errors.password.message}</p>}
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black font-black uppercase tracking-[0.4em] py-10 rounded-full shadow-2xl hover:bg-orange-600 hover:text-white transition-all group text-[11px]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? "VERIFY IDENTITY" : "INITIALIZE SIGNAL"}
                                            <ArrowRight className="ml-4 h-5 w-5 group-hover:translate-x-3 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </div>

                    <div className="flex flex-col space-y-8 pb-16 pt-4 px-12">
                        <div className="w-full flex items-center justify-center gap-6 opacity-10">
                            <div className="h-px flex-1 bg-white" />
                            <Zap className="h-3 w-3 text-white" />
                            <div className="h-px flex-1 bg-white" />
                        </div>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError("")
                            }}
                            className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 group"
                        >
                            {isLogin ? "No Signature? Create Profile" : "Existing Protocol? Identification"}
                        </button>
                    </div>
                </div>

                <p className="text-center text-[9px] text-gray-800 font-black uppercase tracking-[0.8em] flex items-center justify-center gap-6">
                    <ShieldCheck className="h-3 w-3" /> FORGE ALPHA 0.1
                </p>
            </motion.div>
        </div>
    )
}
