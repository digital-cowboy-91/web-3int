/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:id*",
        destination: process.env.CMS_HOST + "/assets/:id*",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
