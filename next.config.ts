import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? "/tictactoe_stage" : "",
  assetPrefix: isProd ? "/tictactoe_stage" : "",
  trailingSlash: true
};

export default nextConfig;