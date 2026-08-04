import type { Metadata } from "next";
import ResumeHero from "@/components/ResumeHero";
import ResumeProfile from "@/components/ResumeProfile";
import ResumeExpertise from "@/components/ResumeExpertise";
import ResumeExperience from "@/components/ResumeExperience";
import ResumeLeadership from "@/components/ResumeLeadership";
import ResumeAwards from "@/components/ResumeAwards";
import ResumeCredentials from "@/components/ResumeCredentials";
import ResumeFinalCta from "@/components/ResumeFinalCta";
import JsonLd from "@/components/JsonLd";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { breadcrumbStructuredData } from "@/lib/structuredData";

const title = "Resume | Brand & Digital Designer";
const socialTitle = `${title} | Yasser Nasr`;
const description =
  "Review Yasser Nasr’s experience in graphic, brand, digital, campaign, website, motion, and multimedia design across Egypt and GCC markets.";
const url = `${productionSiteUrl}/resume`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: socialTitle,
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
    title: socialTitle,
    description,
    images: [socialImageUrl],
  },
};

export default function ResumePage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData("Resume", "/resume")} />
      <main className="flex-1 pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <ResumeHero />
          <ResumeProfile />
          <ResumeExpertise />
          <ResumeExperience />
          <ResumeLeadership />
          <ResumeAwards />
          <ResumeCredentials />
          <ResumeFinalCta />
        </div>
      </main>
    </>
  );
}
