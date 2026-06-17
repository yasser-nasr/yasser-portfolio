import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";

export default function Positioning() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <HeadingReveal as="h2" className="text-3xl font-semibold leading-tight text-ink md:text-5xl">
          From the smallest detail to the complete system.
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 text-lg text-ink-soft">
            Identity, websites, campaigns, motion, presentations, and print are not
            separate deliverables — they are connected parts of one communication
            system. Every detail is built to support the same message, the same
            audience, and the same experience.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
