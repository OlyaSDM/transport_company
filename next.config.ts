import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  experimental: {
  },
  babel: {
    presets: [
      [
        'next/babel',
        {
          targets: '> 0.25%, not dead', 
          useBuiltIns: 'usage', 
          corejs: 3, 
        },
      ],
    ],
  },
};

export default nextConfig;
