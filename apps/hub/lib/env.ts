import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GITHUB_APP_ID: z.string().min(1),
    GITHUB_APP_INSTALLATION_ID: z.coerce.number().int().positive(),
    GITHUB_APP_PRIVATE_KEY: z.string().min(1),
    GITHUB_APP_WEBHOOK_SECRET: z.string().min(1),
    ANTHROPIC_API_KEY: z.string().min(1),
    REDIS_URL: z.string().url().optional(),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === "build",
});
