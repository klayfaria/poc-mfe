import type { NextConfig } from "next";
import { container } from "webpack";

const { ModuleFederationPlugin } = container;
const nextConfig: NextConfig = {
  webpack: (config, context) => {
    if (!context.isServer) {
      config.experiments = { ...config.experiments, topLevelAwait: true }
      config.output.publicPath = 'auto'
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "remoteApp",
          filename: "static/chunks/remoteEntry.js",
          shareScope: "default",

          exposes: {
            "./Home": "./src/app/page.tsx",
            "./Title": "./src/components/title.tsx",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
          },
        }),
      );
    }

    config.optimization.splitChunks = false
    return config;
  },
    async rewrites() {
    return [
      {
        source: '/static/chunks/:path*',
        destination: '/_next/static/chunks/:path*',
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/static/chunks/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },


};

export default nextConfig;
