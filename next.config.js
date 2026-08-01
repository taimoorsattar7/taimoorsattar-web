/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
      }
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/books/workflow-to-build-static-website',
        destination: '/p/build-standout-website',
        permanent: true,
      },
      {
        source: '/books/how-to-build-JAMstack-site',
        destination: '/p/build-standout-website',
        permanent: true,
      },
      {
        source: '/blogs/monolithic-and-microservice-architecture-for-website-development',
        destination: '/blogs/what-is-jamstack',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
