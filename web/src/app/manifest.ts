import type { MetadataRoute } from "next";
import { brand, seo } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b10",
    theme_color: "#120c16",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
