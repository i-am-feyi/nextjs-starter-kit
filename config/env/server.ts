import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    CLERK_WEBHOOK_SECRET: z.string().min(5),
  },
  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    process.exit(1);
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client"
    );
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
