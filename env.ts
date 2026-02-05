import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_BACKEND_API_URL: z.url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,

    FRONTEND_URL: process.env.FRONTEND_URL,
  },
});
