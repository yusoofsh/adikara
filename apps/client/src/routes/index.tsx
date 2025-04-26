import { createFileRoute, Link } from "@tanstack/react-router"
import { Sparkles } from "lucide-react"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="max-w-md text-center">
        <h1 className="mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text font-bold text-5xl text-transparent">
          Welcome to Adikara
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your unified personal dashboard and life operating system
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20"
          >
            <Sparkles size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
