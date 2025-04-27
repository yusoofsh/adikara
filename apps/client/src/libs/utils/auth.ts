import { createAuthClient } from "better-auth/react"
import { passkeyClient } from "better-auth/client/plugins"

const auth = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL,
  basePath: "/auth",
  plugins: [passkeyClient()],
})

export const { signIn, signOut, signUp, useSession } = auth
