import { Hono } from "hono";
import { handle } from "hono/vercel";

import clerk from "./webhooks/clerk";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/webhooks/clerk", clerk);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
