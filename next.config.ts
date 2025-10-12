import { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export', 
  assetPrefix: isProd ? '/MiniTools/' : '',
  basePath: isProd ? '/MiniTools' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
