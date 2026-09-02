import { projects, publishedProjects } from "@/data/projects";
import type { ProjectCategory } from "@/data/workCategories";

export type WorkProject = {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  categories: ProjectCategory[];
  industry: string;
  year?: string;
  statement: string;
  image: string | null;
  imageAlt: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  tags: string[];
  publishable: boolean;
};

function toWorkProject(project: (typeof projects)[number]): WorkProject {
  return {
    slug: project.slug,
    name: project.title,
    subtitle: project.subtitle ?? project.category,
    category: project.category,
    categories: project.categories,
    industry: project.industry ?? project.location ?? "",
    year: project.year,
    statement: project.statement,
    image: project.image,
    imageAlt: project.imageAlt,
    imagePosition: project.imagePosition,
    imageFit: project.imageFit,
    imageBackground: project.imageBackground,
    tags: project.tags ?? [],
    publishable: project.publishable,
  };
}

export const workProjects = projects.map(toWorkProject);
export const publishedWorkProjects = publishedProjects.map(toWorkProject);
export const developmentWorkProjects = projects
  .filter((project) => project.publishable || Boolean(project.seo))
  .map(toWorkProject);
