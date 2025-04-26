import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="mb-4 font-bold text-4xl">Welcome to Adikara</h1>
        <p className="mb-6 text-muted-foreground">
          Your unified personal dashboard and life operating system
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Dashboard
          </a>
          <a
            href="/login"
            className="rounded-md border px-4 py-2 hover:bg-secondary/10"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
