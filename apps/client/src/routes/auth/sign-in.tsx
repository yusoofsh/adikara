import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { EmailInput, PasswordInput } from "@/libs/components/auth/input"
import { SocialAuthButtons } from "@/libs/components/auth/social"
import { useState } from "react"
import { Button } from "@/libs/components/interface/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/libs/components/interface/card"
import { Input } from "@/libs/components/interface/input"
import { Label } from "@/libs/components/interface/label"
import { Checkbox } from "@/libs/components/interface/checkbox"
import { Loader2, Key } from "lucide-react"
import { signIn, cn } from "@/libs/utils"

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInComponent,
})

function SignInComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <AuthCard
      title="Sign In"
      description={
        <>
          Enter your email below to login to your account
          <div>
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </>
      }
    >
      <div className="grid gap-4">
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Link
            to="/auth/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </PasswordInput>

        <Button
          type="button"
          className="w-full"
          disabled={loading}
          onClick={async () => {
            await signIn.email(
              { email, password },
              {
                onRequest: () => setLoading(true),
                onResponse: () => setLoading(false),
              }
            )
          }}
        >
          {loading ?
            <Loader2 size={16} className="animate-spin" />
          : "Proceed to dashboard"}
        </Button>

        <SocialAuthButtons loading={loading} setLoading={setLoading} />
      </div>
    </AuthCard>
  )
}
