export type ProjectSeo = {
  title: string;
  description: string;
  canonical: string;
  openGraphTitle: string;
  openGraphDescription: string;
};

export type Project = {
  title: string;
  companyName?: string;
  slug: string;
  subtitle?: string;
  category: string;
  role?: string;
  location?: string;
  website?: string;
  year?: string;
  statement: string;
  image: string | null;
  imageAlt: string;
  tags?: string[];
  scope?: string[];
  featured: boolean;
  publishable: boolean;
  seo?: ProjectSeo;
};

export const projects: Project[] = [
  {
    title: "X Factor Interior Design",
    slug: "x-factor-interior-design-branding-case-study",
    subtitle: "Brand & Digital Design · Graphic & Multimedia Design",
    category: "Brand & Digital Design · Graphic & Multimedia Design",
    role: "Brand & Digital Designer / Graphic & Multimedia Designer",
    location: "Dubai, UAE",
    statement:
      "A refined visual identity and communication system for a Dubai interior design studio, connecting quiet-luxury positioning with editorial collateral and social media.",
    image:
      "/projects/x-factor-interior-design/x-factor-interior-design-plain-brand-identity-cover.webp",
    imageAlt:
      "X Factor Interior Design vertical logo on a warm-stone brand identity cover.",
    tags: [
      "Branding",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Editorial Design",
      "Social Media Design",
    ],
    scope: [
      "Branding",
      "Logo",
      "Color System",
      "Typography System",
      "Brand Guidelines",
      "Company Profile",
      "Stationery",
      "Social Media Design",
    ],
    featured: true,
    publishable: true,
    seo: {
      title: "X Factor Interior Design Branding Case Study | Yasser Nasr",
      description:
        "A branding case study for X Factor Interior Design, connecting a refined logo and visual identity with guidelines, editorial collateral, stationery, and social media design.",
      canonical:
        "https://yassernasr.com/work/x-factor-interior-design-branding-case-study",
      openGraphTitle: "X Factor Interior Design: A Refined Brand Identity",
      openGraphDescription:
        "Explore the logo, identity system, guidelines, company profile, stationery, and social media design created for a Dubai interior design studio.",
    },
  },
  {
    title: "RenovoFix",
    companyName: "RenovoFix Property Maintenance",
    slug: "renovofix-brand-digital-design",
    subtitle: "Brand, Digital & Content System",
    category: "Brand & Digital Design",
    role: "Brand & Digital Designer, UI/UX Designer",
    location: "UAE",
    website: "https://renovofix.ae",
    statement:
      "A connected brand, social content, website, and multimedia system created for a UAE property maintenance company.",
    image: "/projects/renovofix/renovofix-case-study-cover.webp",
    imageAlt:
      "AI-assisted renovation visualization showing a modern residential interior for RenovoFix.",
    tags: ["Brand Identity", "Social Media", "UI/UX", "Motion & Video"],
    scope: [
      "Brand Identity",
      "Visual Systems",
      "Social Media",
      "Campaign Design",
      "Website Strategy",
      "UI/UX",
      "Website Design",
      "Motion & Video",
      "Content Strategy",
    ],
    featured: true,
    publishable: true,
    seo: {
      title: "RenovoFix Brand & Digital Design Case Study | Yasser Nasr",
      description:
        "A brand and digital design case study for RenovoFix, covering visual identity, social campaigns, website UI/UX, content systems, and multimedia for the UAE market.",
      canonical: "https://yassernasr.com/work/renovofix-brand-digital-design",
      openGraphTitle: "RenovoFix: A Connected Brand, Social and Digital System",
      openGraphDescription:
        "Explore the brand identity, social content, website experience, AI-assisted visualizations, and motion system created for RenovoFix Property Maintenance.",
    },
  },
  {
    title: "Project 01",
    slug: "placeholder-01",
    category: "Brand Identity",
    year: "2024",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update when the project image is approved.",
    featured: true,
    publishable: false,
  },
  {
    title: "Project 02",
    slug: "placeholder-02",
    category: "Digital Design",
    year: "2024",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update when the project image is approved.",
    featured: false,
    publishable: false,
  },
  {
    title: "Project 03",
    slug: "placeholder-03",
    category: "Campaign & Social",
    year: "2023",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update when the project image is approved.",
    featured: false,
    publishable: false,
  },
  {
    title: "Project 04",
    slug: "placeholder-04",
    category: "Motion & Presentation",
    year: "2023",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update when the project image is approved.",
    featured: true,
    publishable: false,
  },
];

export const publishedProjects = projects.filter((project) => project.publishable);

export function getPreviewableProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return undefined;
  return project.publishable || process.env.NODE_ENV === "development" ? project : undefined;
}
