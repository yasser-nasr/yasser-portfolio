import type { ProjectCategory } from "@/data/workCategories";

export type ProjectSeo = {
  title: string;
  description: string;
  canonical: string;
  openGraphTitle: string;
  openGraphDescription: string;
  image?: string;
  imageAlt?: string;
};

export type Project = {
  title: string;
  companyName?: string;
  slug: string;
  subtitle?: string;
  category: string;
  categories: ProjectCategory[];
  role?: string;
  location?: string;
  industry?: string;
  market?: string;
  website?: string;
  year?: string;
  statement: string;
  image: string | null;
  imageAlt: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  tags?: string[];
  scope?: string[];
  featured: boolean;
  publishable: boolean;
  seo?: ProjectSeo;
};

export const projects: Project[] = [
  {
    title: "3D Exhibition & Experiential Design",
    companyName: "RTA Dubai",
    slug: "3d-exhibition-experiential-design",
    subtitle: "Spatial Concepts for Live Events & Branded Experiences",
    category: "3D Exhibition & Experiential Design",
    categories: ["3d-experiential"],
    role: "Senior Graphic Designer / Brand & Digital Designer",
    location: "Dubai, UAE",
    industry: "Live Events & Branded Experiences",
    market: "UAE / GCC",
    statement:
      "Selected 3D exhibition and experiential design work translating brand identities, event briefs, and functional requirements into spatial concepts, stages, branded environments, and presentation-ready visualizations.",
    image:
      "/projects/3d-exhibition/rta/overview/rta-eid-al-etihad-exhibition-overview.webp",
    imageAlt:
      "Wide 3D overview of the RTA Eid Al Etihad exhibition showing branded walls, visitor areas, meeting counters, and display screens.",
    imagePosition: "center",
    tags: [
      "3D Exhibition Design",
      "Experiential Concepts",
      "Stage Design",
      "Spatial Visualization",
    ],
    scope: [
      "Exhibition Layout",
      "Spatial Planning",
      "Stage Design",
      "Branded Environments",
      "Entrance Installations",
      "3D Visualization",
    ],
    featured: false,
    publishable: true,
    seo: {
      title: "3D Exhibition & Experiential Design Case Study | Yasser Nasr",
      description:
        "A portfolio case study featuring 3D exhibition, stage, experiential, and branded environment design by Yasser Nasr for live events and GCC projects.",
      canonical:
        "https://yassernasr.com/work/3d-exhibition-experiential-design",
      openGraphTitle: "3D Exhibition & Experiential Design | Yasser Nasr",
      openGraphDescription:
        "Explore spatial concepts, stage design, branded environments, and 3D visualization created for live events and experiential projects.",
      image:
        "/projects/3d-exhibition/rta/overview/rta-eid-al-etihad-exhibition-overview.webp",
      imageAlt:
        "Wide 3D overview of the RTA Eid Al Etihad exhibition showing branded walls, visitor areas, meeting counters, and display screens.",
    },
  },
  {
    title: "Rilam",
    companyName: "Rilam",
    slug: "rilam-fashion-campaign-design",
    subtitle: "Fashion Campaigns & Digital Art Direction",
    category: "Women's Fashion / Abayas",
    categories: ["campaigns-social"],
    role: "Senior Graphic Designer / Brand & Digital Designer",
    location: "Saudi Arabia",
    industry: "Women's Fashion / Abayas",
    market: "Saudi Arabia",
    statement:
      "Two campaign systems for a Saudi abaya brand, combining art direction, image development, promotional design, and digital advertising across seasonal and commercial objectives.",
    image: "/projects/rilam/rilam-saudi-abaya-brand-logo.svg",
    imageAlt:
      "Rilam Saudi abaya brand logo featuring a stylized gazelle above Arabic and English wordmarks.",
    imagePosition: "center",
    imageFit: "contain",
    imageBackground: "#F4EEE3",
    tags: [
      "Campaign Design",
      "Art Direction",
      "Digital Design",
      "Image Manipulation",
    ],
    scope: [
      "Campaign Art Direction",
      "Digital Campaign Design",
      "Image Manipulation",
      "Social Advertising",
    ],
    featured: false,
    publishable: true,
    seo: {
      title: "Rilam Fashion Campaign Design Case Study | Yasser Nasr",
      description:
        "A campaign design case study for Saudi abaya brand Rilam, covering art direction, image manipulation, AI-assisted visual development, promotional advertising, and digital campaign applications.",
      canonical:
        "https://yassernasr.com/work/rilam-fashion-campaign-design",
      openGraphTitle: "Rilam: Fashion Campaigns & Digital Art Direction",
      openGraphDescription:
        "Explore two campaign directions created for Saudi abaya brand Rilam, combining fashion art direction, image development, promotional design, and digital advertising.",
      image: "/projects/rilam/cover/rilam-og.webp",
      imageAlt:
        "Rilam Saudi abaya brand logo centered on a warm neutral background.",
    },
  },
  {
    title: "Orin",
    companyName: "Orin",
    slug: "orin",
    subtitle: "Digital Website Experience",
    category: "Digital & Web",
    categories: ["web-uiux"],
    role: "UI/UX Designer",
    location: "Dubai, UAE",
    website: "https://orin.ae",
    industry: "Business & Financial Consultancy",
    market: "UAE",
    statement:
      "A clear and structured website experience designed to bring Orin's business setup, financial consultancy, and compliance services into one connected digital system.",
    image: "/projects/orin/orin-business-consultancy-logo.svg",
    imageAlt:
      "Orin UAE business and financial consultancy logo in dark green and warm cream.",
    imagePosition: "center",
    imageFit: "contain",
    imageBackground: "#F7F5EE",
    tags: [
      "Website UI/UX Design",
      "Responsive Web Design",
      "Digital Visual Communication",
      "LinkedIn Cover Design",
    ],
    scope: [
      "Website UI/UX Design",
      "Responsive Web Design",
      "Digital Visual Communication",
      "LinkedIn Cover Design",
    ],
    featured: false,
    publishable: true,
    seo: {
      title: "Orin Website Design Case Study | Yasser Nasr",
      description:
        "A digital design case study for Orin, a UAE business and financial consultancy, covering website UI/UX, responsive design, custom section visuals, and LinkedIn presence.",
      canonical: "https://yassernasr.com/work/orin",
      openGraphTitle: "Orin Website Design Case Study | Yasser Nasr",
      openGraphDescription:
        "A digital design case study for Orin, a UAE business and financial consultancy, covering website UI/UX, responsive design, custom section visuals, and LinkedIn presence.",
      image: "/projects/orin/cover/orin-og.webp",
      imageAlt:
        "Orin business and financial consultancy logo centered on a white background.",
    },
  },
  {
    title: "Pillars PR",
    companyName: "Pillars Public Relations",
    slug: "pillars-pr-brand-communication-design",
    subtitle: "Brand Identity & Communication System",
    category: "Legal Marketing & Public Relations",
    categories: ["brand", "campaigns-social", "motion-video", "presentations"],
    role: "Brand & Digital Designer / Graphic & Multimedia Designer",
    location: "Abu Dhabi, UAE",
    statement:
      "A connected identity and communication system for a specialist legal-sector marketing and public relations company serving the UAE and wider MENA region.",
    image:
      "/projects/pillars-pr/social-media/web/facebook/pillars-pr-ppr-monogram-logo.webp",
    imageAlt:
      "Pillars PR PPR monogram logo on the legal marketing and public relations brand cover.",
    tags: [
      "Brand Identity",
      "Corporate Documents",
      "Social Media",
      "Motion & Video",
    ],
    scope: [
      "Brand Identity",
      "Visual Systems",
      "Corporate Documents",
      "Social Media",
      "Motion & Video",
    ],
    featured: true,
    publishable: true,
    seo: {
      title: "Pillars PR Brand Identity & Communication Case Study | Yasser Nasr",
      description:
        "A brand identity and visual communication case study for Pillars PR, covering corporate design, social media, commercial communication, logo motion, and multimedia for the legal sector.",
      canonical:
        "https://yassernasr.com/work/pillars-pr-brand-communication-design",
      openGraphTitle: "Pillars PR: Brand Identity & Communication System",
      openGraphDescription:
        "Explore the identity, corporate communication, social media, and motion system created for an Abu Dhabi legal marketing and PR company.",
      image: "/projects/pillars-pr/cover/pillars-pr-og.webp",
      imageAlt:
        "Pillars Public Relations logo centered on a white background.",
    },
  },
  {
    title: "X Factor Interior Design",
    slug: "x-factor-interior-design-branding-case-study",
    subtitle: "Brand & Digital Design · Graphic & Multimedia Design",
    category: "Brand & Digital Design · Graphic & Multimedia Design",
    categories: ["brand", "campaigns-social", "motion-video", "presentations"],
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
      image:
        "/projects/x-factor-interior-design/cover/x-factor-og.webp",
      imageAlt:
        "X Factor Interior Design logo centered on a warm neutral background.",
    },
  },
  {
    title: "RenovoFix",
    companyName: "RenovoFix Property Maintenance",
    slug: "renovofix-brand-digital-design",
    subtitle: "Brand, Digital & Content System",
    category: "Brand & Digital Design",
    categories: ["brand", "campaigns-social", "web-uiux", "motion-video"],
    role: "Brand & Digital Designer, UI/UX Designer",
    location: "Dubai, UAE",
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
      image: "/projects/renovofix/cover/renovofix-og.webp",
      imageAlt:
        "RenovoFix Property Maintenance logo centered on a white background.",
    },
  },
  {
    title: "Project 01",
    slug: "placeholder-01",
    category: "Brand Identity",
    categories: [],
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
    categories: [],
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
    categories: [],
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
    categories: [],
    year: "2023",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update when the project image is approved.",
    featured: true,
    publishable: false,
  },
];

export const publishedProjects = projects.filter((project) => project.publishable);
export const featuredProjects = publishedProjects.filter((project) => project.featured);

export function getPreviewableProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return undefined;
  return project.publishable || process.env.NODE_ENV === "development" ? project : undefined;
}
