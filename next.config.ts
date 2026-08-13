import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Trailing slashes keep hub URLs (/reviews/) and canonicals in agreement.
  trailingSlash: true,
};

export default nextConfig;
