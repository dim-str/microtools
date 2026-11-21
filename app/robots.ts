import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot", // ChatGPT
        allow: "/",
      },
      {
        userAgent: "ClaudeBot", // Claude
        allow: "/",
      },
      {
        userAgent: "PerplexityBot", // Perplexity
        allow: "/",
      },
      {
        userAgent: "Google-Extended", // Gemini
        allow: "/",
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}