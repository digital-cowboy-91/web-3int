/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:any*",
  //       destination: "/",
  //     },
  //   ];
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "assets.3int.uk",
  //       port: "",
  //       pathname: "/3int/**",
  //     },
  //   ],
  // },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: 'frame-src "self" https://cms.3int.uk',
          },
        ],
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  // output: "standalone",
};

module.exports = nextConfig;
