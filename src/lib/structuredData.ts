import { profile } from "@/data/profile";
import type { WorkProject } from "@/data/work";
import { productionSiteUrl } from "@/lib/site";

const schemaContext = "https://schema.org";
const websiteDescription =
  "Graphic & Multimedia Designer and Brand & Digital Designer creating identities, websites, campaigns, motion, and visual communication across Egypt and GCC markets.";

export const structuredDataIds = {
  website: `${productionSiteUrl}/#website`,
  person: `${productionSiteUrl}/#person`,
  homePage: `${productionSiteUrl}/#webpage`,
  aboutPage: `${productionSiteUrl}/about#webpage`,
  contactPage: `${productionSiteUrl}/contact#webpage`,
} as const;

const websiteEntity = {
  "@type": "WebSite",
  "@id": structuredDataIds.website,
  name: profile.name,
  url: productionSiteUrl,
  description: websiteDescription,
};

const personEntity = {
  "@type": "Person",
  "@id": structuredDataIds.person,
  name: profile.name,
  url: productionSiteUrl,
  jobTitle: profile.primaryTitle,
  description: profile.supportingExperience,
  image: `${productionSiteUrl}/brand/yasser-nasr-portrait.webp`,
  sameAs: [profile.linkedIn.url],
  email: `mailto:${profile.email}`,
};

const personReference = { "@id": structuredDataIds.person };
const websiteReference = { "@id": structuredDataIds.website };

type BreadcrumbItem = {
  name: string;
  url: string;
};

function breadcrumbEntity(items: BreadcrumbItem[], pageUrl: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function homeStructuredData() {
  return {
    "@context": schemaContext,
    "@graph": [
      websiteEntity,
      personEntity,
      {
        "@type": "WebPage",
        "@id": structuredDataIds.homePage,
        name: "Yasser Nasr | Graphic & Multimedia Designer",
        url: productionSiteUrl,
        description: websiteDescription,
        isPartOf: websiteReference,
        about: personReference,
      },
    ],
  };
}

export function breadcrumbStructuredData(pageName: string, path: string) {
  const pageUrl = `${productionSiteUrl}${path}`;

  return {
    "@context": schemaContext,
    ...breadcrumbEntity(
      [
        { name: "Home", url: productionSiteUrl },
        { name: pageName, url: pageUrl },
      ],
      pageUrl,
    ),
  };
}

export function aboutPageStructuredData(description: string) {
  const url = `${productionSiteUrl}/about`;
  const breadcrumb = breadcrumbEntity(
    [
      { name: "Home", url: productionSiteUrl },
      { name: "About", url },
    ],
    url,
  );

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": structuredDataIds.aboutPage,
        name: "About Yasser Nasr",
        url,
        description,
        isPartOf: websiteReference,
        mainEntity: personEntity,
        breadcrumb: { "@id": breadcrumb["@id"] },
      },
      breadcrumb,
    ],
  };
}

export function contactPageStructuredData(description: string) {
  const url = `${productionSiteUrl}/contact`;
  const breadcrumb = breadcrumbEntity(
    [
      { name: "Home", url: productionSiteUrl },
      { name: "Contact", url },
    ],
    url,
  );

  return {
    "@context": schemaContext,
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": structuredDataIds.contactPage,
        name: "Contact Yasser Nasr",
        url,
        description,
        isPartOf: websiteReference,
        mainEntity: personReference,
        breadcrumb: { "@id": breadcrumb["@id"] },
      },
      breadcrumb,
    ],
  };
}

export function projectPageStructuredData(project: WorkProject, image: string | null) {
  const url = `${productionSiteUrl}/work/${project.slug}`;
  const breadcrumb = breadcrumbEntity(
    [
      { name: "Home", url: productionSiteUrl },
      { name: "Work", url: `${productionSiteUrl}/work` },
      { name: project.name, url },
    ],
    url,
  );
  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    name: project.name,
    ...(project.structuredData
      ? {
          headline: project.structuredData.headline,
          description: project.structuredData.description,
          keywords: project.structuredData.keywords,
        }
      : { description: project.statement }),
    url,
    creator: personReference,
    genre: project.category,
    about: project.industry,
    ...(image ? { image: new URL(image, `${productionSiteUrl}/`).toString() } : {}),
  };

  return {
    "@context": schemaContext,
    "@graph": [creativeWork, breadcrumb],
  };
}
