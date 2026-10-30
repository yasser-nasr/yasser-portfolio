import { projects, publishedProjects, type ProjectStructuredData } from "@/data/projects";
import type { ProjectCategory } from "@/data/workCategories";
import { optimizedMediaSrc } from "@/lib/optimized-media";
import { workIndustries } from "@/data/workIndustries";
import type { Industry } from "@/data/markets";

export type WorkProject = {
  slug: string;
  href?: string;
  linkLabel?: string;
  name: string;
  subtitle: string;
  category: string;
  categories: ProjectCategory[];
  industry: string;
  industries: readonly Industry[];
  year?: string;
  statement: string;
  image: string | null;
  imageAlt: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  imageAspectRatio?: string;
  tags: string[];
  publishable: boolean;
  structuredData?: ProjectStructuredData;
};

const motionVideoWorkProject: WorkProject = {
  slug: "motion-video",
  href: "/motion-video",
  linkLabel: "View Showcase",
  name: "Motion & Video",
  subtitle: "Short-form Content · Motion Graphics · Video Editing",
  category: "Motion & Video",
  categories: ["motion-video"],
  industry: "Selected brands and formats",
  industries: workIndustries["motion-video"],
  statement:
    "Selected work across reels, motion graphics, video editing, campaign content, and multimedia storytelling.",
  image: optimizedMediaSrc("/projects/videos-reels/yasser-nasr-motion-video-portfolio-cover.webp"),
  imageAlt:
    "Yasser Nasr motion and video portfolio cover featuring Memo Travel reels for Dahab, Umrah, and Sinai with a Takeya Kitchen campaign video frame.",
  imagePosition: "center",
  tags: ["Motion Graphics", "Reels", "Video Editing", "Multimedia"],
  publishable: true,
};

function toWorkProject(project: (typeof projects)[number]): WorkProject {
  return {
    slug: project.slug,
    name: project.workTitle ?? project.title,
    subtitle: project.subtitle ?? project.category,
    category: project.category,
    categories: project.categories,
    industry: project.industry ?? project.location ?? "",
    industries: workIndustries[project.slug] ?? [],
    year: project.year,
    statement: project.statement,
    image: project.image,
    imageAlt: project.imageAlt,
    imagePosition: project.imagePosition,
    imageFit: project.imageFit,
    imageBackground: project.imageBackground,
    imageAspectRatio: project.imageAspectRatio,
    tags: project.tags ?? [],
    publishable: project.publishable,
    structuredData: project.structuredData,
  };
}

export const publishedWorkProjects = [
  motionVideoWorkProject,
  ...publishedProjects.map(toWorkProject),
];
export const developmentWorkProjects = [
  motionVideoWorkProject,
  ...projects
    .filter((project) => project.publishable || Boolean(project.seo))
    .map(toWorkProject),
];
