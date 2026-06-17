import type { Metadata } from "next";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Yasser Nasr",
  description:
    "Have a role, project, or idea in mind? Get in touch with Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-6 pt-36 pb-24 md:pt-44">
      <div className="mx-auto max-w-xl">
        <HeadingReveal as="h1" className="text-4xl font-semibold text-ink md:text-5xl">
          Contact
        </HeadingReveal>
        <Reveal>
          <p className="mt-6 text-lg text-ink-soft">
            Let&rsquo;s turn it into a clear, meaningful, and memorable visual
            experience.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ContactForm />
        </Reveal>

        <Reveal className="mt-12 border-t border-edge pt-8 text-sm text-ink-faint">
          Prefer email or LinkedIn? [Email address] · [LinkedIn URL] — not yet
          published here.
        </Reveal>
      </div>
    </main>
  );
}
