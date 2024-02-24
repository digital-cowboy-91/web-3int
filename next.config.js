/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production")
      return [
        {
          source: "/media/:id*",
          destination: "http://cms:8055/assets/:id*",
        },
      ];

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
