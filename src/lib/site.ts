// No production domain has been provided yet. Set NEXT_PUBLIC_SITE_URL once
// the site is deployed so sitemap.xml/robots.txt and Open Graph URLs resolve
// correctly; this fallback only matters for local builds in the meantime.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
