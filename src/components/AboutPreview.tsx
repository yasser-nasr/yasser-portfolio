import Image from "next/image";
import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function AboutPreview() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[200px_1fr] md:gap-16">
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

        <div>
          <HeadingReveal as="h2" className="text-3xl font-semibold text-ink md:text-4xl">
            The Designer Behind the Pixels
          </HeadingReveal>
          <Reveal>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Yasser Nasr is a Senior Graphic Designer and Brand &amp; Digital Designer
              with 6+ years of experience across branding, multimedia, digital design,
              websites, campaigns, presentations, motion, and visual communication for
              businesses across Egypt and GCC markets.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm text-ink underline-offset-4 hover:underline"
            >
              About Me <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
