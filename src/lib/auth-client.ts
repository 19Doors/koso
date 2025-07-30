import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: "http://localhost:3000"
    baseURL: "https://koso-wheat.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()
