import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only serves our own static assets under /public — no untrusted/remote
    // SVGs — so the XSS risk this flag guards against doesn't apply here.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
