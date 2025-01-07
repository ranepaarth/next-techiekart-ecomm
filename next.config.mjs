/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // match webhook API route
        source: "/api/webhook",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.CLIENT },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, stripe-signature",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "fakestoreapi.com",
      },
      {
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
