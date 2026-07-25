import { profile } from "@/data/profile";

export const professionalSummary = [
  "Graphic & Multimedia Designer and Brand & Digital Designer with 6+ years of experience creating brand identities, visual systems, digital campaigns, websites, landing pages, presentations, motion content, social media visuals, and marketing materials for agencies and businesses across Egypt and GCC markets.",
  "Experienced in translating business goals into clear, consistent, and scalable visual communication across digital and print platforms. Worked across real estate, financial services, legal and professional services, technology, education, government, development, agriculture, home services, and corporate sectors, collaborating with agencies, remote teams, startups, and growing businesses in Egypt, the UAE, Saudi Arabia, and the wider GCC region.",
];

export const resumeHero = {
  eyebrow: "Resume",
  headline: profile.primaryTitle,
  supportingText: professionalSummary[0],
  primaryCta: { label: "Download CV", href: profile.cvPath },
  secondaryCtas: [
    { label: "View Work", href: "/work" },
    { label: "Contact Me", href: "/contact" },
  ],
};

// Retained for the reusable ResumeSnapshot component, which is not rendered
// on the CV-aligned Resume page.
export type SnapshotStat = {
  title: string;
  description: string;
};

export const snapshotStats: SnapshotStat[] = [
  { title: "6+ Years", description: "Design experience across branding, digital, campaigns, motion, and visual communication." },
  { title: "GCC Market", description: "Remote experience with businesses, agencies, and organizations across UAE and Saudi Arabia." },
  { title: "Brand Systems", description: "Building visual identities, design systems, websites, campaigns, presentations, and digital assets." },
  { title: "150+ Students", description: "Mentored students through graphic design programs, portfolio development, and practical design training." },
];

export const resumeProfile = {
  heading: "Professional Summary",
  paragraphs: professionalSummary,
};

export type LeadershipItem = {
  role: string;
  organization: string;
  bullets: string[];
};

export const leadershipItems: LeadershipItem[] = [
  {
    role: "Graphics Team Leader",
    organization: "Sustainable Development Studies Programme, Bibliotheca Alexandrina",
    bullets: [
      "Led a team of 10+ designers across visual communication initiatives and awareness campaigns.",
      "Managed creative workflows, project coordination, mentorship, and visual content production.",
      "Collaborated with organizations including UNDP, GEF, Ministry of Environment, and multiple universities.",
    ],
  },
  {
    role: "Marketing Team Leader",
    organization: "American Chemical Society",
    bullets: [
      "Led marketing initiatives and maintained brand consistency across digital, print, and event campaigns.",
    ],
  },
  {
    role: "Graphic Designer",
    organization: "Microsoft Student Partners",
    bullets: [
      "Designed campaign visuals and event communication materials for student-led technology programs.",
    ],
  },
];

export type AwardItem = {
  title: string;
  subtitle: string;
};

export const awardItems: AwardItem[] = [
  {
    title: "Visualize 2030 (ADP x UNDP)",
    subtitle: "Top 10, MENA Region, Visual Content Track",
  },
  {
    title: "SDGs Youth Vision Workshop",
    subtitle: "Contributing Designer, Bibliotheca Alexandrina",
  },
];

export type Language = {
  language: string;
  level: string;
};

export const languages: Language[] = [
  { language: "Arabic", level: "Native" },
  { language: "English", level: "Professional" },
];

export const tools: string[] = [
  "Adobe Creative Suite",
  "Figma",
  "Blender",
  "AI Creative Tools",
];

export const resumeFinalCta = {
  heading: "Want to see the work behind the resume?",
  text:
    "Explore selected projects across brand identity, digital design, websites, campaigns, presentations, motion graphics, and multimedia content.",
  primaryCta: { label: "View Work", href: "/work" },
  secondaryCta: { label: "Contact Me", href: "/contact" },
};
