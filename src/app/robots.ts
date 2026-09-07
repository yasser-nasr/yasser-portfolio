import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${productionSiteUrl}/sitemap.xml`,
  };
}
