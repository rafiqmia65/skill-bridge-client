import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_API_URL: z.url(),
    FRONTEND_URL: z.url(),
  },

  //   Client Example
  client: {},

  runtimeEnv: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
});
