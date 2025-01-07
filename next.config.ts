import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'imgsrv.crunchyroll.com',
        port: '',
        pathname: '/cdn-cgi/image/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
