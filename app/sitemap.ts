import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...["privacy", "terms", "cookies"].map((page) => ({
      url: `${siteUrl}/${page}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...tools.map((t) => ({
      url: `${siteUrl}/tools/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}