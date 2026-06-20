// PLACEHOLDER projects — no real case studies are available yet (per
// CLAUDE.md: do not invent client names, metrics, industries, or outcomes).
// Every field below is neutral and temporary; replace titles, statements,
// and images once real project content is approved, and flip `publishable`
// to true at that point. Slugs intentionally match src/data/work.ts so
// "View Case Study" links resolve to the existing case-study route instead
// of duplicating it.
export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  statement: string;
  image: string | null;
  imageAlt: string;
  featured: boolean;
  publishable: boolean;
};

export const projects: Project[] = [
  {
    title: "Project 01",
    slug: "placeholder-01",
    category: "Brand Identity",
    year: "2024",
    statement: "One-line value statement will go here once this case study is approved.",
    image: null,
    imageAlt: "Temporary — update with a real description once the project image is approved.",
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
    imageAlt: "Temporary — update with a real description once the project image is approved.",
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
    imageAlt: "Temporary — update with a real description once the project image is approved.",
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
    imageAlt: "Temporary — update with a real description once the project image is approved.",
    featured: true,
    publishable: false,
  },
];
