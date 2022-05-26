/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.nextui.org", "media.giphy.com"],
  },
}

module.exports = nextConfig
