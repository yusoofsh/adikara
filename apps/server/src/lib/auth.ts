import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db"
import * as schema from "../db/schema/auth"
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
  basePath: "/auth",
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [anonymous()],
})
