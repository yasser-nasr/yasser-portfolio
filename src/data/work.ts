export type WorkProject = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  year: string;
  statement: string;
};

// PLACEHOLDER projects — no real case studies are available yet (per
// CLAUDE.md: do not invent client names, metrics, or outcomes). Replace
// with approved case studies before launch.
export const workProjects: WorkProject[] = [
  {
    slug: "placeholder-01",
    name: "Placeholder Project 01",
    category: "Brand Identity",
    industry: "Real Estate",
    year: "2024",
    statement: "One-line value statement will go here once this case study is approved.",
  },
  {
    slug: "placeholder-02",
    name: "Placeholder Project 02",
    category: "Digital Design",
    industry: "Finance",
    year: "2024",
    statement: "One-line value statement will go here once this case study is approved.",
  },
  {
    slug: "placeholder-03",
    name: "Placeholder Project 03",
    category: "Campaign & Social",
    industry: "Technology",
    year: "2023",
    statement: "One-line value statement will go here once this case study is approved.",
  },
  {
    slug: "placeholder-04",
    name: "Placeholder Project 04",
    category: "Motion & Presentation",
    industry: "Education",
    year: "2023",
    statement: "One-line value statement will go here once this case study is approved.",
  },
];
