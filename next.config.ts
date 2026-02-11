import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // catch prefix/all path
        destination: "https://skill-bridge-server-two.vercel.app/api/:path*",
      },
    ];
  },
};
export default nextConfig;
