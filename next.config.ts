import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [
      "tomodachi.mooo.com",
      "tomodachi.synology.me",
      "imgsrv.crunchyroll.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tomodachi.mooo.com",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "tomodachi.mooo.com",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "tomodachi.synology.me",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "imgsrv.crunchyroll.com",
        pathname: "/cdn-cgi/image/**",
      }
    ],
    unoptimized: true // Add this to disable image optimization if needed
  },
  eslint: {
    ignoreDuringBuilds: true,// Add this to disable eslint during builds
  }
};

export default nextConfig;