import { createFileRoute, redirect, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
  // Redirect /auth to sign-in
  beforeLoad: ({ location: { pathname } }) =>
    pathname === "/auth" ? redirect({ to: "/auth/sign-in" }) : undefined,
})

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Outlet />
    </div>
  )
}
