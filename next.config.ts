import type { NextConfig } from "next";
import { container } from "webpack";

const { ModuleFederationPlugin } = container;

const nextConfig: NextConfig = {
  webpack: (config, context) => {
    if (!context.isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "remoteApp",
          // filename: "_next/static/chunks/remoteEntry.js",
          // filename: "static/chunks/remoteEntry.js",
          filename: "static/chunks/remoteEntry.js",

          runtime: "runtime",
          exposes: {
            "./Home": "./src/app/page.tsx",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
            },
          },
        }),
      );
    }
    return config;
  },
};

export default nextConfig;
