import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://tomodachi.mooo.com",
        port: "",
        // Updated pathname pattern
      },
      {
        protocol: "https",
        hostname: "tomodachi.mooo.com",
        port: "",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "imgsrv.crunchyroll.com",
        port: "",
        pathname: "/cdn-cgi/image/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;