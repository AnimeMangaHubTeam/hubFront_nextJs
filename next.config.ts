import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'animemangahub.synology.me',
        port: '',
        pathname: '/api/uploads/**', // Updated pathname pattern
      },
      {
        protocol: 'https',
        hostname: 'imgsrv.crunchyroll.com',
        port: '',
        pathname: '/cdn-cgi/image/**',
      },
    ],
  },
};

export default nextConfig;