/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:id*",
        destination: "http://cms:8055/assets/:id*",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
