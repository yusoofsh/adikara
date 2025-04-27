import { Button } from "@/libs/components/interface/button"
import { Key, Loader2 } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

import { signIn } from "@/libs/utils"

export function getDefaultOnPasskey(setLoading: (b: boolean) => void) {
  return async () => {
    await signIn.passkey(
      {},
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
      }
    )
  }
}

export function getDefaultOnGoogle(setLoading: (b: boolean) => void) {
  return async () => {
    await signIn.social(
      { provider: "google", callbackURL: "/dashboard" },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
      }
    )
  }
}

export function getDefaultOnApple(setLoading: (b: boolean) => void) {
  return async () => {
    await signIn.social(
      { provider: "apple", callbackURL: "/dashboard" },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
      }
    )
  }
}

interface SocialAuthButtonsProps {
  loading: boolean
  onPasskey?: () => Promise<void>
  onGoogle?: () => Promise<void>
  onApple?: () => Promise<void>
  setLoading?: (b: boolean) => void
  className?: string
}

export function SocialAuthButtons({
  loading,
  onPasskey,
  onGoogle,
  onApple,
  setLoading,
  className = "",
}: SocialAuthButtonsProps) {
  // If setLoading is provided, use default handlers unless overridden
  const passkeyHandler = onPasskey || (setLoading ? getDefaultOnPasskey(setLoading) : undefined)
  const googleHandler = onGoogle || (setLoading ? getDefaultOnGoogle(setLoading) : undefined)
  const appleHandler = onApple || (setLoading ? getDefaultOnApple(setLoading) : undefined)

  return (
    <div className={`flex w-full flex-col gap-3 ${className}`}>
      {passkeyHandler && (
        <Button
          variant="secondary"
          className="w-full"
          disabled={loading}
          onClick={passkeyHandler}
        >
          <Key className="mr-2 h-4 w-4" />
          {loading ?
            <Loader2 size={16} className="animate-spin" />
          : "Sign in with Passkey"}
        </Button>
      )}
      <Button
        variant="outline"
        className="w-full gap-2"
        disabled={loading}
        onClick={googleHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.98em"
          height="1em"
          viewBox="0 0 256 262"
          role="img"
          aria-labelledby="google-logo-title"
        >
          <title id="google-logo-title">Google logo</title>
          <path
            fill="#4285F4"
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          />
          <path
            fill="#34A853"
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          />
          <path
            fill="#FBBC05"
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
          />
          <path
            fill="#EB4335"
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          />
        </svg>
        {loading ?
          <Loader2 size={16} className="animate-spin" />
        : "Continue with Google"}
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2"
        disabled={loading}
        onClick={appleHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          role="img"
          aria-labelledby="apple-logo-title"
        >
          <title id="apple-logo-title">Apple logo</title>
          <path
            fill="currentColor"
            d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
          />
        </svg>
        {loading ?
          <Loader2 size={16} className="animate-spin" />
        : "Continue with Apple"}
      </Button>
    </div>
  )
}
