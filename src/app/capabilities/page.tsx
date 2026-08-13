import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import CapabilitiesDetailList from "@/components/CapabilitiesDetailList";
import CapabilitiesSystem from "@/components/CapabilitiesSystem";
import CapabilitiesContribution from "@/components/CapabilitiesContribution";
import CapabilitiesFinalCta from "@/components/CapabilitiesFinalCta";
import JsonLd from "@/components/JsonLd";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { breadcrumbStructuredData } from "@/lib/structuredData";

const title = "Brand, Digital & Multimedia Design Services";
const socialTitle = `${title} | Yasser Nasr`;
const description =
  "Explore Yasser Nasr’s capabilities across brand identity, visual systems, websites, campaign design, motion graphics, presentations, and multimedia.";
const url = `${productionSiteUrl}/capabilities`;

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

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData("Capabilities", "/capabilities")} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
          Capabilities / 01
        </p>

        <HeadingReveal as="h1" className="mt-6 text-4xl font-semibold text-ink md:text-5xl">
          Connected Capabilities
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            I work across brand, digital, campaigns, and multimedia—connecting
            every touchpoint into one clear and consistent visual experience.
          </p>
        </Reveal>

          <CapabilitiesDetailList className="mt-16" />
          <CapabilitiesSystem />
          <CapabilitiesContribution />
          <CapabilitiesFinalCta />
        </div>
      </main>
    </>
  );
}
