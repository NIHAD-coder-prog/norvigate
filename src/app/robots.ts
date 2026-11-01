import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // the launch data is sample data, so crawlers are asked to stay out until NORVIGATE_ALLOW_INDEXING=true.
  if (!ALLOW_INDEXING) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
