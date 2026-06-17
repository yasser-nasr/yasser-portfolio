import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-edge px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
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

        <div className="flex items-center gap-3">
          <Image
            src="/brand/mascot.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={29}
            className="opacity-70"
          />
          <p className="text-xs text-ink-soft">© {new Date().getFullYear()} Yasser Nasr</p>
        </div>
      </div>
    </footer>
  );
}
