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
  typescript: {
    // ignoreBuildErrors: true,
  },
  // output: "standalone",
};

module.exports = nextConfig;
