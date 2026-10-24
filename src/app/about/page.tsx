import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutPixelPhilosophy from "@/components/about/AboutPixelPhilosophy";
import AboutCareerJourney from "@/components/about/AboutCareerJourney";
import AboutApproach from "@/components/about/AboutApproach";
import AboutMentoring from "@/components/about/AboutMentoring";
import AboutFinalCta from "@/components/about/AboutFinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { aboutPageStructuredData } from "@/lib/structuredData";

const title = "About Yasser Nasr | Graphic & Multimedia Designer";
const description =
  "Learn about Yasser Nasr’s experience and approach as a Graphic & Multimedia Designer and Brand & Digital Designer working across Egypt and GCC markets.";
const url = `${productionSiteUrl}/about`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Yasser Nasr",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Yasser Nasr — Graphic & Multimedia Designer | Brand & Digital Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageStructuredData(description)} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <AboutHero />
          <AboutPrinciples />
          <AboutPixelPhilosophy />
          <AboutCareerJourney />
          <AboutApproach />
          <AboutMentoring />
          <AboutFinalCta />
        </div>
      </main>
    </>
  );
}
