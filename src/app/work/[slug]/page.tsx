import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MenaLawReportersCaseStudy from "@/components/case-study/MenaLawReportersCaseStudy";
import PillarsPrCaseStudy from "@/components/case-study/PillarsPrCaseStudy";
import OrinCaseStudy from "@/components/case-study/OrinCaseStudy";
import RenovoFixCaseStudy from "@/components/case-study/RenovoFixCaseStudy";
import RilamCaseStudy from "@/components/case-study/RilamCaseStudy";
import XFactorCaseStudy from "@/components/case-study/XFactorCaseStudy";
import ThreeDExhibitionCaseStudy from "@/components/case-study/ThreeDExhibitionCaseStudy";
import OrientaCollagenCaseStudy from "@/components/case-study/OrientaCollagenCaseStudy";
import DolatoCaseStudy from "@/components/case-study/DolatoCaseStudy";
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
  const socialImage = project.seo.image ?? project.image;
  const socialImageAlt = project.seo.imageAlt ?? project.imageAlt;

  return {
    title: { absolute: project.seo.title },
    description: project.seo.description,
    alternates: { canonical: project.seo.canonical },
    robots: project.publishable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: project.seo.openGraphTitle,
      description: project.seo.openGraphDescription,
      url: project.seo.canonical,
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
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getPreviewableProject(slug);
  if (!project) notFound();

  const caseStudy = project.slug === "dolato-warm-winter-marvels"
    ? <DolatoCaseStudy project={project} />
    : project.slug === "3d-exhibition-experiential-design"
    ? <ThreeDExhibitionCaseStudy />
    : project.slug === "orienta-collagen-packaging-design"
      ? <OrientaCollagenCaseStudy project={project} />
    : project.slug === "mena-law-reporters"
      ? <MenaLawReportersCaseStudy project={project} />
    : project.slug === "orin"
    ? <OrinCaseStudy project={project} />
    : project.slug === "rilam-fashion-campaign-design"
      ? <RilamCaseStudy project={project} />
    : project.slug === "renovofix-brand-digital-design"
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
        categories: project.categories,
        industry: project.industry ?? project.location ?? "",
        year: project.year,
        statement: project.statement,
        image: project.image,
        imageAlt: project.imageAlt,
        tags: project.tags ?? [],
        publishable: project.publishable,
        structuredData: project.structuredData,
      }, project.seo?.image ?? project.image)} /> : null}
      {caseStudy}
    </>
  );
}
