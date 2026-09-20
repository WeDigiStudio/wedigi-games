import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Deployed on Vercel, which runs Next.js natively — so no `output: "export"`.
   * That setting existed only to emit a plain folder for a manual Netlify
   * upload, and it cost us the image optimiser (the atmosphere frames are
   * ~2.3MB of PNG served raw).
   *
   * Leaving it off means images are converted to AVIF/WebP and resized per
   * device automatically. The pages are still statically prerendered.
   *
   * To go back to a host that needs a static folder, restore:
   *   output: "export",
   *   images: { unoptimized: true },
   */
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
