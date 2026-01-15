import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null

                // Call FastAPI Token Endpoint
                try {
                    const formData = new URLSearchParams()
                    formData.append("username", credentials.email as string)
                    formData.append("password", credentials.password as string)

                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"
                    const res = await fetch(`${apiUrl}/token`, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData,
                    })

                    const user = await res.json()

                    if (res.ok && user.access_token) {
                        // Return object to be saved in JWT
                        // Cast to any to avoid strict User type checks in this MVP phase
                        return {
                            id: credentials.email as string,
                            email: credentials.email as string,
                            accessToken: user.access_token
                        } as any
                    }
                    return null
                } catch (e) {
                    console.error(e)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken
            }
            return token
        },
        async session({ session, token }) {
            // Expose accessToken to client if needed, or secure usage
            (session as any).accessToken = token.accessToken
            return session
        },
    },
})
