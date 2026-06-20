export type CapabilityDetail = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export const capabilitiesDetail: CapabilityDetail[] = [
  {
    number: "01",
    title: "Brand Identity & Visual Systems",
    description:
      "Visual identity, brand systems, art direction, guidelines, and consistent applications across digital and print touchpoints.",
    tags: ["Identity", "Visual Language", "Guidelines", "Applications"],
  },
  {
    number: "02",
    title: "Digital Design & Websites",
    description:
      "Websites, landing pages, UI direction, responsive systems, and digital brand experiences built around clarity and usability.",
    tags: ["Websites", "Landing Pages", "UI Direction", "Responsive Design"],
  },
  {
    number: "03",
    title: "Campaigns & Social Content",
    description:
      "Campaign concepts, social media systems, marketing visuals, and adaptable content designed for clear audience communication.",
    tags: ["Campaign Concepts", "Social Systems", "Marketing Visuals", "Content Design"],
  },
  {
    number: "04",
    title: "Motion, Presentations & Multimedia",
    description:
      "Motion graphics, video content, pitch decks, corporate presentations, and multimedia storytelling that bring ideas to life.",
    tags: ["Motion Graphics", "Video Content", "Presentations", "Multimedia"],
  },
];
