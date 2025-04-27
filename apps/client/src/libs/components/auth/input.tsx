import { Input } from "../interface/input"
import { Label } from "../interface/label"
import type { ChangeEvent } from "react"

interface EmailInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  id?: string
  placeholder?: string
}

interface PasswordInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  id?: string
  placeholder?: string
  autoComplete?: string
  label?: string
  children?: React.ReactNode
}

export function EmailInput({ value, onChange, required = true, id = "email", placeholder = "m@example.com" }: EmailInputProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export function PasswordInput({ value, onChange, required = true, id = "password", placeholder = "password", autoComplete = "password", label = "Password", children }: PasswordInputProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor={id}>{label}</Label>
        {children}
      </div>
      <Input
        id={id}
        type="password"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
