import type { MetadataRoute } from "next";
import { GUIDES } from "@/guides";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1, alternates: { languages: { "pt-BR": absoluteUrl("/") } } },
    ...GUIDES.map((g) => ({ url: absoluteUrl(`/${g.slug}`), changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: { "pt-BR": absoluteUrl(`/${g.slug}`) } } })),
  ];
}
