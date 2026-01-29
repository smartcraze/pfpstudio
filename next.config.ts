import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
  serverExternalPackages: ["mongodb", "mongoose"],
  // webpack: (config) => {
  //   config.externals = [...(config.externals || []), "bcrypt"];
  //   return config;
  // },
};

export default nextConfig;
