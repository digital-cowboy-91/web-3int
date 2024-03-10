/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production")
      return [
        {
          source: "/*",
          destination: "/website/*",
        },
        {
          source: "/media/:id*",
          destination: "http://cms:8055/assets/:id*",
        },
      ];

    return [
      {
        source: "/",
        destination: "/website/",
      },
      {
        source: "/media/:id*",
        destination: "https://cms.3int.uk/assets/:id*",
      },
      {
        source: "/e/:path*",
        destination: "/emails/:path*",
      },
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/:path*",
        destination: "/website/:path*",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
