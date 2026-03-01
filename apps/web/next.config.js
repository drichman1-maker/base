/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@slugger/ui', '@slugger/db', '@slugger/types'],
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
