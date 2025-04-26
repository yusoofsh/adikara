import { protectedProcedure, publicProcedure } from "../lib/orpc"

export const appRouter = {
  "health": publicProcedure.handler(() => {
    return "OK"
  }),
  "private": protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    }
  }),
}
export type AppRouter = typeof appRouter
