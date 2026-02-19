import type { NextConfig } from "next";
import { env } from "./env";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/:path*`,
      },
    ];
  },
};
export default nextConfig;
