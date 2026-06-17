import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import CapabilitiesList from "@/components/CapabilitiesList";

export const metadata: Metadata = {
  title: "Capabilities | Yasser Nasr",
  description:
    "Brand identity & visual systems, digital design & websites, campaigns & social content, and motion, presentations & multimedia — capabilities of Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer.",
};

export default function CapabilitiesPage() {
  return (
    <main className="flex-1 px-6 pt-36 pb-24 md:pt-44">
      <div className="mx-auto max-w-4xl">
        <HeadingReveal as="h1" className="text-4xl font-semibold text-ink md:text-5xl">
          Capabilities
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            I help brands build clear and consistent visual communication
            across identity, digital platforms, campaigns, motion, print, and
            presentations.
          </p>
        </Reveal>

        <CapabilitiesList className="mt-16" />
      </div>
    </main>
  );
}
