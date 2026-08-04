import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import SelectedWork from "@/components/SelectedWork";
import Positioning from "@/components/Positioning";
import Capabilities from "@/components/Capabilities";
import MarketsIndustries from "@/components/MarketsIndustries";
import AboutPreview from "@/components/AboutPreview";
import PixelPhilosophy from "@/components/PixelPhilosophy";
import FinalCta from "@/components/FinalCta";
import JsonLd from "@/components/JsonLd";
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
      <main className="flex flex-1 flex-col">
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
