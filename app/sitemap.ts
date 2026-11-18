import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    ...["privacy", "terms", "cookies"].map((page) => ({
      url: `${BASE}/${page}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...tools.map((t) => ({
      url: `${BASE}/tools/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}