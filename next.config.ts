import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
}

export default nextConfig
