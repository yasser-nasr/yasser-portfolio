import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export function CaseStudyBackLink() {
  return (
    <Link href="/work" className="inline-flex min-h-11 items-center text-sm text-ink-soft transition-colors hover:text-ink">
      ← Back to Work
    </Link>
  );
}

export function CaseStudyMeta({ location, market, role, scope }: {
  location: ReactNode;
  market: ReactNode;
  role: ReactNode;
  scope: readonly string[];
}) {
  const items = [
    ["Location", location],
    ["Market", market],
    ["Role", role],
    ["Scope", scope.join(", ")],
  ] as const;

  return (
    <dl className="mt-12 grid gap-7 border-t border-edge pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</dt>
          <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudySection({ id, title, children }: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-edge py-16 md:py-24">
      <Reveal className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        </div>
        <div className="min-w-0 space-y-5 text-base leading-8 text-ink-soft md:text-lg">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export function CaseStudyDotList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.75em] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyClosingCta({ title, body, primaryLabel = "Start a conversation" }: {
  title: string;
  body: string;
  primaryLabel?: string;
}) {
  return (
    <section className="border-t border-edge py-20 text-center md:py-28">
      <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">{body}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90">{primaryLabel}</Link>
        <Link href="/work" className="inline-flex min-h-11 items-center rounded-full border border-edge px-6 py-3 text-sm text-ink transition-colors hover:bg-surface-card">Back to Work</Link>
      </div>
    </section>
  );
}
