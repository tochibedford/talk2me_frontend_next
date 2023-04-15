/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    proxyTimeout: 120000,
  },
  async rewrites() {
    return [
      {
        source: "/pyApi/v1/:path*",
        destination: "https://talk2mebackend2-musicofbyte.b4a.run/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
