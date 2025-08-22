import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
      return [
        {
            source: '/app/wow',
            destination: '/app/wow/home',
            permanent: true
        }
      ]
  },
};

export default nextConfig;
