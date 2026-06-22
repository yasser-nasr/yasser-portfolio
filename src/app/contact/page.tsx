import type { Metadata } from "next";
import Image from "next/image";
import HeadingReveal from "@/components/HeadingReveal";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Yasser Nasr",
  description:
    "Have a role, project, or idea in mind? Get in touch with Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer.",
};

const contactMethods = [
  { label: "WhatsApp", value: "+20 100 047 0165", href: "https://wa.me/201000470165" },
  { label: "Email", value: "contact@yassernasr.com", href: "mailto:contact@yassernasr.com" },
  { label: "LinkedIn", value: "linkedin.com/in/yasser-nasr", href: "https://www.linkedin.com/in/yasser-nasr/" },
];

export default function ContactPage() {
  return (
    <main className="relative flex-1 overflow-hidden pt-36 pb-24 md:pt-44">
      {/* Local depth layer: faint radial light + pixel grid, distinct from the hero's */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.8,
            backgroundImage:
              "radial-gradient(ellipse 55% 45% at 85% 8%, var(--bg-card) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 4% 96%, var(--bg-deep) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mascot.svg"
              alt=""
              aria-hidden="true"
              width={18}
              height={26}
              className="opacity-70"
            />
            <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
              Contact
            </p>
          </div>

          <HeadingReveal
            as="h1"
            className="mt-6 text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl"
          >
            Let&rsquo;s turn your next idea into a clear visual experience.
          </HeadingReveal>

          <Reveal>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              Whether it&rsquo;s a role, project, collaboration, or creative
              conversation, feel free to reach out.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <ul className="space-y-3">
              {contactMethods.map((method) => {
                const isExternal = method.href.startsWith("http");
                return (
                  <li key={method.label}>
                    <a
                      href={method.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-edge px-5 py-4 text-ink transition-colors hover:border-ink/30 hover:bg-surface-card/60"
                    >
                      <span className="text-sm text-ink-soft">{method.label}</span>
                      <span className="flex min-w-0 items-center gap-2 font-medium">
                        <span className="break-words">{method.value}</span>
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 scale-0 rounded-sm bg-ink-soft transition-transform duration-200 group-hover:scale-100"
                        />
                        <span
                          aria-hidden="true"
                          className="inline-block shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  );
}
