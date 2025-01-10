import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint pendant la phase de build
  },
  // Ajoutez d'autres options de configuration si nécessaire
};

export default nextConfig;
