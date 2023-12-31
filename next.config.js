/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  redirects: async () => {
    return [
      {
        source: "/products",
        destination: "/products/1",
        permanent: true,
      },
      {
        source: "/categories",
        destination: "/categories/t-shirts/1",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
    ],
  },
};

module.exports = nextConfig;
