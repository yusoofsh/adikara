import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { SocialAuthButtons } from "@/libs/components/auth/social"
import { useAppForm } from "@/libs/components/interface/form"
import { Button } from "@/libs/components/interface/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/libs/components/interface/card"
import { Input } from "@/libs/components/interface/input"
import { Label } from "@/libs/components/interface/label"
import { Key, Loader2, X } from "lucide-react"
import { cn, signIn, signUp } from "@/libs/utils"
import { toast } from "sonner"
import { useState } from "react"

// Convert a File object to Base64 string
async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpComponent,
})

function SignUpComponent() {
  const [loading, setLoading] = useState(false)
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmation: "",
      imageFile: null,
      preview: null,
    },
    onSubmit: async ({ value }) => {
      setLoading(true)
      await signUp.email(
        {
          name: `${value.firstName} ${value.lastName}`,
          email: value.email,
          password: value.password,
          image: value.preview || "",
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
          onError: (ctx) => {
            toast.error(ctx.error.message)
          },
        }
      )
    },
  })

  // Image handling (optional, not rendered by default)
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     // You can use a custom field or React state to store the image
  //     convertImageToBase64(file).then(base64 => {/* set preview */})
  //   }
  // }

  return (
    <AuthCard
      title="Sign Up"
      description={
        <>
          Enter your information to create an account
          <div>
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </>
      }
    >
      <form
        className="grid gap-3"
        onSubmit={form.handleSubmit}
        autoComplete="on"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <form.AppField name="firstName">
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>First name</field.FormLabel>
                  <field.FormControl>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
          </div>
          <div className="grid gap-2">
            <form.AppField name="lastName">
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Last name</field.FormLabel>
                  <field.FormControl>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
          </div>
        </div>
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
              <field.FormLabel>Password</field.FormLabel>
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
        <form.AppField name="confirmation">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Confirm Password</field.FormLabel>
              <field.FormControl>
                <Input
                  id="confirmation"
                  type="password"
                  placeholder="confirm password"
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
        {/* Optional: Add image upload if needed */}
        {/* <Input type="file" onChange={handleImageChange} /> */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ?
            <Loader2 size={16} className="animate-spin" />
          : "Create an account"}
        </Button>
        <SocialAuthButtons loading={loading} setLoading={setLoading} />
      </form>
    </AuthCard>
  )
}
