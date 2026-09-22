import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

/** Single-page site: one entry. Add a row here for every new route. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: brand.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
