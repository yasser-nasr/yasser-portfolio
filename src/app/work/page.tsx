import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import JsonLd from "@/components/JsonLd";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { breadcrumbStructuredData } from "@/lib/structuredData";

const title = "Brand, Digital & Multimedia Design Work";
const socialTitle = `${title} | Yasser Nasr`;
const description =
  "Explore selected brand identity, digital design, website, campaign, motion, and multimedia work by Graphic & Multimedia Designer Yasser Nasr.";
const url = `${productionSiteUrl}/work`;

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

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbStructuredData("Work", "/work")} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-base uppercase tracking-[0.22em] text-ink-soft md:text-lg">
            Selected Work
          </p>
          <HeadingReveal as="h1" className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Projects built as connected visual systems.
          </HeadingReveal>
          <Reveal>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft">
              Selected work across brand identity, digital design, websites,
              campaigns, social content, and multimedia.
            </p>
          </Reveal>

          <WorkGrid className="mt-20 md:mt-28" />

          <section className="mt-24 border-t border-edge pt-14 md:mt-32 md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">
              Have a project in mind?
            </h2>
            <a
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90 md:mt-0"
            >
              Let&rsquo;s Work Together
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
