import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Deployed on Vercel, which runs Next.js natively — the pages are statically
   * prerendered but the image optimiser stays available, which matters here:
   * the Project S atmosphere frames are ~2.3MB of PNG and are served resized
   * and re-encoded per device rather than raw.
   *
   * Do not add `output: "export"` unless you are moving to a host that needs a
   * plain folder. It disables the optimiser (forcing `images.unoptimized`) and
   * rules out route handlers, middleware and ISR.
   */
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
