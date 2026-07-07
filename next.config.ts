import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // static HTML/CSS/JS export → out/
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",  // https://trust-crop.github.io/trust-crop-web
  trailingSlash: true,        // /page → /page/index.html (works cleanly on gh-pages)
  images: {
    unoptimized: true,        // next/image optimisation requires a server
  },
};

export default nextConfig;
