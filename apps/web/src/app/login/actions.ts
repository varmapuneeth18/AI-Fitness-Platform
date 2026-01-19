"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export async function performLogin(data: any) {
    try {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirectTo: "/dashboard",
        })
    } catch (error: any) {
        if (isRedirectError(error)) {
            throw error
        }
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid email or password. Please try again.")
                default:
                    throw new Error("Authentication failed. Please check your connection.")
            }
        }
        throw new Error(error.message || "An unexpected error occurred during sign in.")
    }
}
