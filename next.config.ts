import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    reactCompiler: true,
  },
}

export default nextConfig
