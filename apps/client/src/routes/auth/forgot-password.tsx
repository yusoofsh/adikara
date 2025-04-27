import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { EmailInput } from "@/libs/components/auth/input"
import { Button } from "@/libs/components/interface/button"
import { useState } from "react"

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement forgot password logic (API call)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthCard
        title="Forgot your password?"
        description="Enter your email address and we'll send you a link to reset your password."
      >
        {sent ?
          <div className="space-y-4 text-center">
            <p className="text-sm">
              If an account exists for{" "}
              <span className="font-medium">{email}</span>, a password reset
              link has been sent.
            </p>
            <Link to="/auth/sign-in" className="text-sm underline">
              Return to sign in
            </Link>
          </div>
        : <form className="grid gap-4" onSubmit={handleSubmit}>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        }
      </AuthCard>
    </div>
  )
}
