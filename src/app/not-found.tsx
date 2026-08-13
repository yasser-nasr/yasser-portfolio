import Link from "next/link";

const destinationLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-1 items-center pt-36 pb-24 md:pt-44">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="font-display text-base uppercase tracking-[0.25em] text-ink-soft md:text-lg">
          Error / 404
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          The page you&rsquo;re looking for may have moved or no longer exists. Choose a page
          below to continue exploring the website.
        </p>

        <nav aria-label="Page not found destinations" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {destinationLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex rounded-full px-5 py-2.5 text-sm transition-colors ${
                    index === 0
                      ? "bg-ink font-medium text-surface hover:opacity-90"
                      : "border border-edge text-ink hover:bg-surface-card"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
