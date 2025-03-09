import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    fetchCache: false, // Essaie de le désactiver
  },
};

export default nextConfig;
