import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { productionSiteUrl, socialImageUrl } from "@/lib/site";
import { profile } from "@/data/profile";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const alpharush = localFont({
  src: "./fonts/Alpharush.ttf",
  variable: "--font-alpharush",
  display: "swap",
});

const title = `${profile.name} | Graphic & Multimedia Designer`;
const description =
  "Graphic & Multimedia Designer and Brand & Digital Designer creating identities, websites, campaigns, motion, and visual communication across Egypt and GCC markets.";

export const metadata: Metadata = {
  metadataBase: new URL(productionSiteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  manifest: `${productionSiteUrl}/manifest.webmanifest`,
  icons: {
    icon: [
      {
        url: `${productionSiteUrl}/icon.svg`,
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: `${productionSiteUrl}/icons/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: productionSiteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Yasser Nasr — Graphic & Multimedia Designer | Brand & Digital Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: socialImageUrl,
        alt: "Yasser Nasr — Graphic & Multimedia Designer | Brand & Digital Designer",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Runs before paint to set the theme attribute from a saved preference or
// system setting, avoiding a flash of the wrong theme. Kept tiny and inline
// rather than pulling in next-themes for a single attribute toggle.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${alpharush.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div aria-hidden="true" className="background-field" />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
