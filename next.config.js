/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:id*",
        destination: "https://cms.3int.colaia.dev/assets/:id*",
      },
      {
        source: "/e/:id",
        destination: "/api/emails/:id",
      },
      {
        source: "/d/:id",
        destination: "/api/download/:id",
      },
      {
        source: "/d/:id/:oiid",
        destination: "/api/download/:id/:oiid",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
