import { createFileRoute, Link } from "@tanstack/react-router"
import { AuthCard } from "@/libs/components/auth/card"
import { EmailInput, PasswordInput } from "@/libs/components/auth/input"
import { SocialAuthButtons } from "@/libs/components/auth/social"
import { useState } from "react"
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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      convertImageToBase64(file).then(setPreview)
    }
  }

  const handleSignUp = async () => {
    await signUp.email(
      {
        name: `${firstName} ${lastName}`,
        email,
        password,
        image: preview || "",
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
  }

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
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="Max"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Robinson"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          autoComplete="new-password"
        />
        <PasswordInput
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          label="Confirm Password"
          autoComplete="new-password"
          id="confirmation"
        />
        <Button onClick={handleSignUp} disabled={loading} className="w-full">
          {loading ?
            <Loader2 size={16} className="animate-spin" />
          : "Create an account"}
        </Button>

        <SocialAuthButtons loading={loading} setLoading={setLoading} />
      </div>
    </AuthCard>
  )
}
