import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    process.exit(1);
  },
  // Called when client variables are accessed on the server.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      "❌ Attempted to access a client-side environment variable on the server"
    );
  },
});
