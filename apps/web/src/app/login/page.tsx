"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

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
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().optional(),
})

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // Registration handler
    const onRegister = async (data: z.infer<typeof formSchema>) => {
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
            setError("Registration successful! Please sign in.")
        } catch (e: any) {
            setError(e.message)
        }
    }

    // Login handler
    const onLogin = async (data: z.infer<typeof formSchema>) => {
        // We use server action for signIn usually, but client side signIn works too
        // However, to use "signIn" from "next-auth/react" we need SessionProvider, which we haven't set up.
        // Or we can use server action.
        // Let's stick to simple client signIn provided by NextAuth client.
        // NOTE: We need to import signIn from next-auth/react carefully or use server actions if using App Router heavily.
        // In App Router, it's often better to use a server action that calls `signIn` from `@/auth`.

        // Actually, for simplicity in this file, let's try calling the NextAuth endpoint directly or use server action wrapper.
        // But standard `signIn` from `next-auth/react` is still supported in client components.

        // Let's implement a quick Server Action wrapper in a separate file if this fails, but `next-auth/react` signIn triggers the flow.
        // Wait, we haven't installed `next-auth` client provider.

        // Workaround: Call the signIn server action.
        // But we can't import server action in client component easily without defining it in a 'use server' file.

        // Let's submit to form? No.

        // Simpler: Just make a server action file actions.ts

        // For now, let's assume we implement the action.
        await performLogin(data)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
                    <CardDescription>
                        {isLogin ? "Welcome back to your fitness journey." : "Start your transformation today."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="John Doe" {...register("fullName")} />
                            </div>
                        )}

                        <Button type="submit" className="w-full">
                            {isLogin ? "Sign In" : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                    </div>
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

// Separate this if needed, defining inline for now as Client Component can't be async server action
import { performLogin } from "./actions"
