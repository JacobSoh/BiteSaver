import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4444',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
