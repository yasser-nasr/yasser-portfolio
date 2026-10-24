import type { MetadataRoute } from "next";
import { productionSiteUrl } from "@/lib/site";
import { publishedWorkProjects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/motion-video", "/about", "/capabilities", "/contact", "/resume"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${productionSiteUrl}${route}`,
    })),
    ...publishedWorkProjects
      .filter((project) => !project.href || !staticRoutes.includes(project.href))
      .map((project) => ({
        url: new URL(project.href ?? `/work/${project.slug}`, productionSiteUrl).toString(),
      })),
  ];
}
