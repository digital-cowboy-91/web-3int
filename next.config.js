/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:id*",
        destination:
          process.env.NODE_ENV === "production"
            ? "http://cms:8055/assets/:id*"
            : "https://cms.3int.uk/assets/:id*",
      },
      // {
      //   source: "/e/:path*",
      //   destination: "/emails/:path*",
      // },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
