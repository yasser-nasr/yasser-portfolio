import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work | Yasser Nasr",
  description:
    "Selected brand identity, digital design, campaign, and motion projects by Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer.",
};

export default function WorkPage() {
  return (
    <main className="flex-1 pt-36 pb-24 md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <HeadingReveal as="h1" className="text-4xl font-semibold text-ink md:text-5xl">
          Work
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            A selection of brand identity, digital design, campaign, and motion
            projects. Case studies below are placeholders until approved work is
            published.
          </p>
        </Reveal>

        <WorkGrid className="mt-16" cardHeadingLevel="h2" />
      </div>
    </main>
  );
}
