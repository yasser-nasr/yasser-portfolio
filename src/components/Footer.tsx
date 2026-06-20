import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-edge py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
        <Link href="/" aria-label="Yasser Nasr — home">
          <Image src="/brand/wordmark.svg" alt="Yasser Nasr" width={132} height={11} />
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://www.linkedin.com/in/yasser-nasr/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Yasser Nasr on LinkedIn"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
