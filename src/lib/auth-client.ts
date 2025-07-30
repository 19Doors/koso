import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: "http://localhost:3000"
    baseURL: "http://koso-wheat.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()
