import "dotenv/config";
import { google } from "@ai-sdk/google";
import { RPCHandler } from "@orpc/server/fetch";
import { streamText } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const app = new Hono();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

const handler = new RPCHandler(appRouter);
app.use("/*", async (c, next) => {
	const context = await createContext({ context: c });
	const { matched, response } = await handler.handle(c.req.raw, {
		context: context,
	});
	if (matched) {
		return c.newResponse(response.body, response);
	}
	await next();
});

app.get("/", (c) => {
	return c.text("OK");
});

export default app;
