import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages: { "pt-BR": absoluteUrl("/") } } }];
}
