import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const contentSecurityPolicy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com; media-src 'self'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/index.php",
      destination: "https://yassernasr.com/",
      permanent: true,
    }, {
      source: "/:path*",
      has: [{ type: "host", value: "www.yassernasr.com" }],
      destination: "https://yassernasr.com/:path*",
      permanent: true,
    }, {
      source: "/work/dolato-winter-theme-competition-2023",
      destination: "/work/dolato-warm-winter-marvels",
      permanent: true,
    }, {
      source: "/work/alsallal-developments-brand-identity",
      destination: "/work/alsallal-developments-brand-applications",
      permanent: true,
    }];
  },
  async rewrites() {
    // Preserve the public media URLs used before consolidation under public/projects.
    return {
      beforeFiles: [
        {
          // Serve old indexed local-image links directly from disk.
          source: "/_next/image",
          has: [{
            type: "query",
            key: "url",
            value: "/(?<asset>(?:projects|projects-optimized|brand|icons)/[A-Za-z0-9_/-]+[.](?:webp|avif|png|jpg|jpeg|svg))",
          }],
          destination: "/:asset",
        },
        { source: "/projects-optimized/:path*", destination: "/projects/:path*" },
        { source: "/videos-optimized/:path*", destination: "/projects/:path*" },
      ],
    };
  },
  poweredByHeader: false,
  images: { unoptimized: true },
  async headers() {
    // Legacy-prefix rules apply to the compatibility aliases, not extra folders.
    return [
      {
        source: "/responsive/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/projects/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        source: "/projects-optimized/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        source: "/videos-optimized/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          ...(isProduction ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
