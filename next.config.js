/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/website/",
      },
      {
        source: "/media/:id*",
        destination:
          process.env.NODE_ENV === "production"
            ? "http://cms:8055/assets/:id*"
            : "https://cms.3int.uk/assets/:id*",
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
