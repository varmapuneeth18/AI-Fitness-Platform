"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

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
        <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4 selection:bg-orange-500/30">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.6] brightness-[0.25] opacity-50"
                >
                    <source src="https://cdn.pixabay.com/video/2023/01/27/148204-793717940_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md z-10 space-y-8"
            >
                <div className="text-center space-y-3">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl shadow-2xl shadow-orange-500/20 mb-2"
                    >
                        <Zap className="h-8 w-8 text-white fill-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-black tracking-tighter text-white uppercase italic"
                    >
                        Forge
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 text-gray-500 font-black tracking-[0.4em] text-[9px]"
                    >
                        <ShieldCheck className="h-3 w-3 text-orange-500/50" /> PRIVATE ACCESS ONLY
                    </motion.div>
                </div>

                <Card className="bg-white/[0.03] border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden border-t-white/10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                    <CardHeader className="pt-10 pb-4 px-10">
                        <CardTitle className="text-3xl font-black text-white text-center uppercase italic tracking-tight">
                            {isLogin ? "Identify" : "Initialize"}
                        </CardTitle>
                        <CardDescription className="text-center text-gray-500 font-medium text-xs mt-1">
                            {isLogin
                                ? "Resuming evolution protocol."
                                : "Creating your private bio-signature."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pb-10 pt-4">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-8 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest leading-relaxed"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form className="space-y-6" onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2 overflow-hidden"
                                    >
                                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 pl-3">Full Identity</Label>
                                        <div className="relative group">
                                            <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700 group-focus-within:text-orange-500 transition-colors" />
                                            <Input
                                                placeholder="John Doe"
                                                {...register("fullName")}
                                                className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/30 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 pl-3">Global Identifier</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="user@forge.io"
                                        {...register("email")}
                                        className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/30 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                    />
                                </div>
                                {errors.email && <p className="text-orange-500 text-[9px] font-black uppercase mt-2 pl-3 tracking-widest">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 pl-3">Access Key</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className="bg-black/60 border-white/5 rounded-2xl py-7 pl-14 text-white placeholder:text-gray-800 focus-visible:ring-orange-500/30 transition-all border-l-4 border-l-transparent focus-visible:border-l-orange-500 h-14"
                                    />
                                </div>
                                {errors.password && <p className="text-orange-500 text-[9px] font-black uppercase mt-2 pl-3 tracking-widest">{errors.password.message}</p>}
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.3em] py-8 rounded-2xl shadow-xl shadow-orange-600/20 transition-all group text-[10px]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? "Confirm Identity" : "Initialize Bio-Sig"}
                                            <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-6 pb-12 pt-4 px-10">
                        <div className="w-full flex items-center justify-center gap-6">
                            <div className="h-px flex-1 bg-white/5" />
                            <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">Mode Toggle</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError("")
                            }}
                            className="text-gray-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group"
                        >
                            {isLogin ? "Need a signature? Create here" : "Return to identification"}
                            <Zap className="h-3 w-3 text-orange-500 group-hover:scale-125 transition-transform" />
                        </button>
                    </CardFooter>
                </Card>

                <p className="text-center text-[9px] text-gray-800 font-black uppercase tracking-[0.6em] flex items-center justify-center gap-4">
                    <Dumbbell className="h-3 w-3" /> Built for the circle
                </p>
            </motion.div>
        </div>
    )
}
