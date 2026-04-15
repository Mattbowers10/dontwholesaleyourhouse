import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project so Next doesn't wander up into
  // parent directories that may contain unrelated code or lockfiles.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
