export const productionSiteUrl = "https://yassernasr.com";
export const socialImageUrl = `${productionSiteUrl}/opengraph-image`;
const localSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    try {
      const url = new URL(configuredSiteUrl);
      const isLocalhost =
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname === "[::1]";

      if (process.env.NODE_ENV !== "production" || !isLocalhost) {
        return url.origin;
      }
    } catch {
      // Fall through to the environment-safe default below.
    }
  }

  return process.env.NODE_ENV === "production" ? productionSiteUrl : localSiteUrl;
}

export const siteUrl = resolveSiteUrl();
