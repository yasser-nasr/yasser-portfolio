import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProofStrip from "@/components/home/ProofStrip";
import SelectedWork from "@/components/home/SelectedWork";
import Positioning from "@/components/home/Positioning";
import Capabilities from "@/components/home/Capabilities";
import MarketsIndustries from "@/components/home/MarketsIndustries";
import AboutPreview from "@/components/home/AboutPreview";
import PixelPhilosophy from "@/components/home/PixelPhilosophy";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/seo/JsonLd";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { homeStructuredData } from "@/lib/structuredData";

const title = "Yasser Nasr | Graphic & Multimedia Designer";
const description =
  "Graphic & Multimedia Designer and Brand & Digital Designer creating identities, websites, campaigns, motion, and visual communication across Egypt and GCC markets.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: productionSiteUrl },
  openGraph: {
    title,
    description,
    url: productionSiteUrl,
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

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <Hero />
        <ProofStrip />
        <SelectedWork />
        <Positioning />
        <Capabilities />
        <MarketsIndustries />
        <AboutPreview />
        <PixelPhilosophy />
        <FinalCta />
      </main>
    </>
  );
}
