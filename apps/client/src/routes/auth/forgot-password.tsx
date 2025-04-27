import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { useAppForm } from "@/libs/components/interface/form"
import { Input } from "@/libs/components/interface/input"
import { Button } from "@/libs/components/interface/button"
import { useState } from "react"

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const form = useAppForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setLoading(true)
      // TODO: Implement forgot password logic (API call)
      setTimeout(() => {
        setSent(true)
        setLoading(false)
      }, 1200)
    },
  })

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
              <span className="font-medium">{form.state.values.email}</span>, a
              password reset link has been sent.
            </p>
            <Link to="/auth/sign-in" className="text-sm underline">
              Return to sign in
            </Link>
          </div>
        : <form className="grid gap-4" onSubmit={form.handleSubmit}>
            <form.AppField name="email">
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Email</field.FormLabel>
                  <field.FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="mail@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !form.state.values.email}
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        }
      </AuthCard>
    </div>
  )
}
