import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/dashboard', 
  reactStrictMode: true,  // Optional: Helps with debugging
  swcMinify: true,        // Optional: Enables SWC-based minification
};

export default nextConfig;

