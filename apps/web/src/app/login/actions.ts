"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function performLogin(data: any) {
    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid credentials.")
                default:
                    throw new Error("Something went wrong.")
            }
        }
        throw error
    }
}
