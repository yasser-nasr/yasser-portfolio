"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { connectLink, navLinks } from "@/data/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-edge bg-surface/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Yasser Nasr — home" className="shrink-0">
          <Image
            src="/brand/wordmark.svg"
            alt="Yasser Nasr"
            width={132}
            height={11}
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-ink ${
                pathname === link.href ? "text-ink" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span aria-disabled="true" className="text-sm text-ink-faint">
            Resume <span className="text-[10px] uppercase tracking-wide">(soon)</span>
          </span>
          <Link
            href={connectLink.href}
            className="rounded-full border border-edge px-4 py-2 text-sm text-ink transition-colors hover:bg-surface-card"
          >
            {connectLink.label}
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-edge p-2 text-ink md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {isMenuOpen ? (
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H17M3 10H17M3 14H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="border-t border-edge bg-surface/95 px-6 py-6 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-lg ${pathname === link.href ? "text-ink" : "text-ink-soft"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span aria-disabled="true" className="text-lg text-ink-faint">
                  Resume <span className="text-xs uppercase tracking-wide">(soon)</span>
                </span>
              </li>
              <li>
                <Link
                  href={connectLink.href}
                  className="inline-flex rounded-full border border-edge px-4 py-2 text-base text-ink"
                >
                  {connectLink.label}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
