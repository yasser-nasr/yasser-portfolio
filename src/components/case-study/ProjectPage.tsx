import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { getPreviewableProject, type Project } from "@/data/projects";
import { workIndustries } from "@/data/workIndustries";
import { projectPageStructuredData } from "@/lib/structuredData";

// Route entry points import only their own case study. Keep the existing shared
// metadata/schema here without importing any gallery or project-specific client code.
export function requireProject(slug: string) {
  const project = getPreviewableProject(slug);
  if (!project) notFound();
  return project;
}

export function projectMetadata(slug: string): Metadata {
  const project = getPreviewableProject(slug);
  if (!project?.seo) return {};
  const socialImage = project.seo.image ?? project.image;
  const socialImageAlt = project.seo.imageAlt ?? project.imageAlt;

  return {
    title: { absolute: project.seo.title },
    description: project.seo.description,
    keywords: project.structuredData?.keywords,
    category: project.category,
    creator: "Yasser Nasr",
    authors: [{ name: "Yasser Nasr", url: "https://yassernasr.com" }],
    alternates: { canonical: project.seo.canonical },
    robots: project.publishable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      url: project.seo.canonical,
      siteName: "Yasser Nasr",
      locale: "en_US",
      type: "article",
      images: socialImage ? [{
        url: socialImage,
        alt: socialImageAlt,
        width: project.seo.imageWidth,
        height: project.seo.imageHeight,
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      images: socialImage ? [{ url: socialImage, alt: socialImageAlt }] : undefined,
    },
  };
}

export default function ProjectPage({ project, children }: { project: Project; children: ReactNode }) {
  return (
    <>
      {project.publishable ? <JsonLd data={projectPageStructuredData({
        slug: project.slug,
        name: project.title,
        subtitle: project.subtitle ?? project.category,
        category: project.category,
        categories: project.categories,
        industry: project.industry ?? project.location ?? "",
        industries: workIndustries[project.slug] ?? [],
        year: project.year,
        statement: project.statement,
        image: project.image,
        imageAlt: project.imageAlt,
        tags: project.tags ?? [],
        publishable: project.publishable,
        structuredData: project.structuredData,
      }, project.seo?.image ?? project.image)} /> : null}
      {children}
    </>
  );
}
