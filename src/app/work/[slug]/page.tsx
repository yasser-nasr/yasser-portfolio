import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PillarsPrCaseStudy from "@/components/case-study/PillarsPrCaseStudy";
import RenovoFixCaseStudy from "@/components/case-study/RenovoFixCaseStudy";
import XFactorCaseStudy from "@/components/case-study/XFactorCaseStudy";
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
    title: { absolute: project.seo.title },
    description: project.seo.description,
    alternates: { canonical: project.seo.canonical },
    robots: project.publishable ? undefined : { index: false, follow: false },
    openGraph: {
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      url: project.seo.canonical,
      type: "article",
      images: project.image ? [{
        url: project.image,
        alt: project.imageAlt,
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getPreviewableProject(slug);
  if (!project) notFound();

  const caseStudy = project.slug === "renovofix-brand-digital-design"
    ? <RenovoFixCaseStudy project={project} />
    : project.slug === "x-factor-interior-design-branding-case-study"
      ? <XFactorCaseStudy project={project} />
      : project.slug === "pillars-pr-brand-communication-design"
        ? <PillarsPrCaseStudy project={project} />
        : null;

  if (!caseStudy) notFound();

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
      {caseStudy}
    </>
  );
}
