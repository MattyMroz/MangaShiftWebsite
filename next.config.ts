import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.117.1', '192.168.18.145'],
} satisfies NextConfig;

export default nextConfig;
