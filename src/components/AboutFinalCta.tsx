import Image from "next/image";
import Link from "next/link";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function AboutFinalCta() {
  return (
    <div className="relative mt-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-surface-card opacity-50 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="relative mx-auto max-w-2xl rounded-3xl border border-ink/10 bg-surface-card/30 p-10 text-center shadow-2xl backdrop-blur-md md:p-14">
        <Image
          src="/brand/mascot.svg"
          alt=""
          aria-hidden="true"
          width={28}
          height={41}
          className="mx-auto opacity-80"
        />

        <HeadingReveal
          as="h2"
          className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl"
        >
          Have a role, project, or idea in mind?
        </HeadingReveal>

        <Reveal>
          <p className="mt-5 text-lg text-ink-soft">
            Let&rsquo;s turn it into a clear, meaningful, and memorable visual
            experience.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Start a Conversation
            </Link>
            <a
              href="https://www.linkedin.com/in/yasser-nasr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card"
            >
              Connect on LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
