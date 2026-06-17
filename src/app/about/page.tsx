import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import ProofStrip from "@/components/ProofStrip";
import { coreValues } from "@/data/values";

export const metadata: Metadata = {
  title: "About | Yasser Nasr",
  description:
    "Yasser Nasr is a Senior Graphic Designer and Brand & Digital Designer with 6+ years of experience across branding, multimedia, digital design, websites, campaigns, presentations, motion, and visual communication for businesses across Egypt and GCC markets.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-36 md:pt-44">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <HeadingReveal as="h1" className="text-4xl font-semibold text-ink md:text-5xl">
          The Designer Behind the Pixels
        </HeadingReveal>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <Reveal className="mx-auto w-32 md:w-full">
            <div className="overflow-hidden rounded-2xl border border-edge bg-surface-card p-4">
              <Image
                src="/brand/mascot.svg"
                alt="Yasser Nasr"
                width={120}
                height={175}
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <Reveal>
            <p className="text-lg text-ink-soft">
              Yasser Nasr is a Senior Graphic Designer and Brand &amp; Digital
              Designer with 6+ years of experience across branding, multimedia,
              digital design, websites, campaigns, presentations, motion, and
              visual communication for businesses across Egypt and GCC markets.
            </p>
            <p className="mt-4 text-lg text-ink-soft">
              I help brands build clear and consistent visual communication
              across identity, digital platforms, campaigns, motion, print, and
              presentations.
            </p>
          </Reveal>
        </div>

        <div className="mt-24">
          <HeadingReveal as="h2" className="text-2xl font-semibold text-ink md:text-3xl">
            Core Values
          </HeadingReveal>
          <Reveal className="mt-10 grid gap-8 sm:grid-cols-2">
            {coreValues.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{value.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-24 border-t border-edge pt-10 text-center">
          <p className="text-lg text-ink-soft">
            Have a role, project, or idea in mind?{" "}
            <Link href="/contact" className="text-ink underline-offset-4 hover:underline">
              Let&rsquo;s start a conversation →
            </Link>
          </p>
        </Reveal>
      </div>

      <ProofStrip />
    </main>
  );
}
