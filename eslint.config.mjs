import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This tells Vercel to ignore ESLint errors and just build the website!
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
