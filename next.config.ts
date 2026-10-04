import type { NextConfig } from "next";

// Static export for GitHub Pages. PAGES_BASE_PATH is supplied by
// actions/configure-pages in .github/workflows/deploy.yml (e.g. "/westbridge-accessibility");
// it is unset locally, so `npm run dev` serves from "/".
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
  // Exposed to the client so plain <img> paths can be prefixed (lib/assetPath.ts)
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH ?? "",
  },
  images: {
    unoptimized: true,
  },
  // pptxgenjs references Node built-ins ("node:https", "node:fs") that it only
  // uses when running in Node. Strip the "node:" prefix and stub them out for
  // the browser bundle.
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, "");
        })
      );
      config.resolve.fallback = { ...config.resolve.fallback, fs: false, https: false, http: false, path: false, os: false };
    }
    return config;
  },
};

export default nextConfig;
