import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { SocialAuthButtons } from "@/libs/components/auth/social"
import { useAppForm } from "@/libs/components/interface/form"
import { Button } from "@/libs/components/interface/button"
import { Loader2 } from "lucide-react"
import { signIn } from "@/libs/utils"

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInComponent,
})

import { useState } from "react"
import { Input } from "@/libs/components/interface/input"

function SignInComponent() {
  const [loading, setLoading] = useState(false)
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      await signIn.email(
        { email: value.email, password: value.password },
        {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
        }
      )
    },
  })

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
      <form.AppForm>
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit}
          autoComplete="on"
        >
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
          <form.AppField name="password">
            {(field) => (
              <field.FormItem>
                <div className="flex items-center justify-between">
                  <field.FormLabel>Password</field.FormLabel>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <field.FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ?
              <Loader2 size={16} className="animate-spin" />
            : "Proceed to dashboard"}
          </Button>
          <SocialAuthButtons loading={loading} setLoading={setLoading} />
        </form>
      </form.AppForm>
    </AuthCard>
  )
}
