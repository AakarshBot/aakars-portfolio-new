import type { NextConfig } from 'next'; // <-- This is the corrected line

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
