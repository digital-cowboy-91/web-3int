/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:id*",
        destination: "https://cms.3int.uk/assets/:id*",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
