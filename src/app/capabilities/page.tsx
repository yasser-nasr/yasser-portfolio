import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import CapabilitiesDetailList from "@/components/CapabilitiesDetailList";
import CapabilitiesSystem from "@/components/CapabilitiesSystem";
import CapabilitiesContribution from "@/components/CapabilitiesContribution";
import CapabilitiesFinalCta from "@/components/CapabilitiesFinalCta";

export const metadata: Metadata = {
  title: "Capabilities | Yasser Nasr",
  description:
    "Brand identity & visual systems, digital design & websites, campaigns & social content, and motion, presentations & multimedia — capabilities of Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer.",
};

export default function CapabilitiesPage() {
  return (
    <main className="flex-1 pt-36 pb-24 md:pt-44">
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
  );
}
