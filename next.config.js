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
      {
        source: "/func/v1/:path*",
        destination:
          "https://us-central1-talk2me-383122.cloudfunctions.net/Talk2Me/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
