import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { publishedWorkProjects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/about", "/capabilities", "/contact", "/resume"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
    })),
    ...publishedWorkProjects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
    })),
  ];
}
