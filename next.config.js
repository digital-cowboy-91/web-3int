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
      {
        source: "/checkout/c/pay/:path*",
        destination: "https://checkout.stripe.com/c/pay/:path*",
      },
    ];
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
