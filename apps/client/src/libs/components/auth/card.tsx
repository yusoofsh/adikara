import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../interface/card"
import type { ReactNode } from "react"

interface AuthCardProps {
  title: string
  description: ReactNode
  children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="mx-auto w-[420px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
