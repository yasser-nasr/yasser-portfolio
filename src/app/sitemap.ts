import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/lib/site";
import { publishedWorkProjects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/capabilities", "/contact", "/resume"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${productionSiteUrl}${route}`,
    })),
    ...publishedWorkProjects.map((project) => ({
      url: `${productionSiteUrl}/work/${project.slug}`,
    })),
  ];
}
