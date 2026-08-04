import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import RenovoFixCaseStudy from "@/components/case-study/RenovoFixCaseStudy";
import { getPreviewableProject, publishedProjects } from "@/data/projects";
import { projectPageStructuredData } from "@/lib/structuredData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPreviewableProject(slug);
  if (!project?.seo) return {};

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: project.seo.canonical },
    robots: project.publishable ? undefined : { index: false, follow: false },
    openGraph: {
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      url: project.seo.canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getPreviewableProject(slug);
  if (!project) notFound();

  if (project.slug !== "renovofix-brand-digital-design") notFound();

  return (
    <>
      {project.publishable ? <JsonLd data={projectPageStructuredData({
        slug: project.slug,
        name: project.title,
        subtitle: project.subtitle ?? project.category,
        category: project.category,
        industry: project.location ?? "",
        year: project.year,
        statement: project.statement,
        image: project.image,
        imageAlt: project.imageAlt,
        tags: project.tags ?? [],
        publishable: project.publishable,
      }, project.image)} /> : null}
      <RenovoFixCaseStudy project={project} />
    </>
  );
}
