import type { MetadataRoute } from "next";
import { INDEXABLE, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: absoluteUrl("/sitemap.xml"), host: absoluteUrl("/") };
}
