export const resumeHero = {
  eyebrow: "Resume",
  headline:
    "Senior Graphic Designer building brand, digital, and multimedia experiences across GCC markets.",
  supportingText:
    "6+ years of experience across brand identity, digital design, social media, websites, presentations, motion graphics, and visual communication for businesses across Egypt and the Gulf.",
  primaryCta: { label: "Download CV", href: "/brand/Yasser-Nasr-CV-2026.pdf" },
  secondaryCtas: [
    { label: "View Work", href: "/work" },
    { label: "Contact Me", href: "/contact" },
  ],
};

export type SnapshotStat = {
  title: string;
  description: string;
};

export const snapshotStats: SnapshotStat[] = [
  {
    title: "6+ Years",
    description:
      "Design experience across branding, digital, campaigns, motion, and visual communication.",
  },
  {
    title: "GCC Market",
    description:
      "Remote experience with businesses, agencies, and organizations across UAE and Saudi Arabia.",
  },
  {
    title: "Brand Systems",
    description:
      "Building visual identities, design systems, websites, campaigns, presentations, and digital assets.",
  },
  {
    title: "150+ Students",
    description:
      "Mentored students through graphic design programs, portfolio development, and practical design training.",
  },
];

export const resumeProfile = {
  heading: "Professional Profile",
  paragraphs: [
    "Senior Graphic Designer and Brand & Digital Designer with 6+ years of experience across branding, multimedia content, marketing visuals, websites, social media, motion graphics, presentation design, and visual communication.",
    "I work on building visual systems and digital experiences that help businesses communicate clearly across digital and print touchpoints. My experience includes working with agencies, startups, service businesses, and organizations across Egypt and GCC markets.",
    "My work combines creative execution, brand consistency, marketing understanding, and digital-first design thinking across industries including real estate, finance, legal services, technology, education, government initiatives, agriculture, and professional services.",
  ],
};

export type ExpertiseGroup = {
  heading: string;
  items: string[];
};

export const expertiseGroups: ExpertiseGroup[] = [
  {
    heading: "Brand & Visual Systems",
    items: [
      "Brand Identity",
      "Visual Systems",
      "Typography",
      "Layout Design",
      "Campaign Design",
      "Brand Guidelines",
    ],
  },
  {
    heading: "Digital & Web",
    items: [
      "Website Visual Direction",
      "Landing Pages",
      "Digital Design",
      "Social Media Design",
      "Responsive Layouts",
      "Figma",
    ],
  },
  {
    heading: "Multimedia & Motion",
    items: [
      "Motion Graphics",
      "Video Editing",
      "Multimedia Content",
      "3D Visualization",
      "AI Creative Tools",
      "Campaign Assets",
    ],
  },
  {
    heading: "Communication Design",
    items: [
      "Presentation Design",
      "Investor Decks",
      "Marketing Materials",
      "Corporate Communication",
      "Pitch Decks",
      "Print Materials",
    ],
  },
];

export type ExperienceEntry = {
  company: string;
  title: string;
  location: string;
  date: string;
  bullets: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "A1 Investments",
    title: "Marketing & Brand Manager",
    location: "Dubai, UAE, Remote",
    date: "Apr 2025 - Present",
    bullets: [
      "Lead brand and marketing creative across multiple businesses in real estate, finance, home services, renovation, and agriculture.",
      "Developed and launched visual identity systems, social media content, websites, landing pages, and marketing materials across digital and print platforms.",
      "Created presentations, investor decks, proposals, corporate communication materials, motion graphics, video content, 3D visuals, and campaign creatives.",
      "Manage creative content and social media communication, including account updates, campaign visuals, reels, and brand consistency across channels.",
    ],
  },
  {
    company: "Sand Circus / Beyond",
    title: "Creative Support",
    location: "Saudi Arabia, Remote",
    date: "Concurrent Engagement",
    bullets: [
      "Supported campaign creative and influencer content systems for regional campaigns and brand activations.",
      "Created social media visuals, multimedia assets, and 3D exhibition concepts for live events and campaigns.",
      "Contributed to creative projects for government, cultural, and business organizations across the GCC.",
    ],
  },
  {
    company: "Pillars Public Relations Agency",
    title: "Graphic Designer",
    location: "Abu Dhabi, UAE, Remote",
    date: "Oct 2023 - Jun 2025",
    bullets: [
      "Designed branding and marketing materials for Gulf-based law firms, corporate clients, and professional service organizations.",
      "Created visual systems across presentations, websites, newsletters, signage, and social media campaigns.",
      "Produced motion graphics, animation, and video content for digital campaigns and online platforms.",
      "Collaborated with marketing teams to maintain strong and consistent brand communication.",
    ],
  },
  {
    company: "Independent / Freelance",
    title: "Brand & Visual Designer",
    location: "Remote",
    date: "Aug 2016 - Present",
    bullets: [
      "Worked with clients across branding, social media, presentations, multimedia content, websites, and marketing campaigns.",
      "Developed visual identities, marketing materials, packaging, campaign assets, and content systems across multiple industries.",
      "Produced motion graphics and video editing work for digital campaigns and social media.",
      "Worked directly with clients to translate business goals into clear visual systems and marketing materials.",
    ],
  },
  {
    company: "SkillsDynamix",
    title: "Graphic Design Instructor",
    location: "Alexandria, Egypt, Hybrid",
    date: "Jul 2025 - Jan 2026",
    bullets: [
      "Delivered graphic design training programs covering Adobe Photoshop, Illustrator, InDesign, layout, color theory, branding, and visual communication.",
      "Guided learners through hands-on projects, portfolio development, and creative presentations.",
    ],
  },
  {
    company: "Arabian Academy",
    title: "Graphic Design Instructor",
    location: "Alexandria, Egypt, Hybrid",
    date: "Nov 2023 - Jan 2026",
    bullets: [
      "Designed course content and educational materials across multiple design programs.",
      "Taught graphic design fundamentals, Adobe Creative Suite tools, branding, and visual communication.",
      "Mentored 150+ students across multiple design programs and workshops.",
    ],
  },
  {
    company: "Petra Advertising Agency",
    title: "Graphic Designer",
    location: "Alexandria, Egypt",
    date: "Sep 2019 - Feb 2020",
    bullets: [
      "Developed creative materials for digital and print campaigns across branding, layouts, and illustrations.",
      "Collaborated with creative and marketing teams to refine and finalize campaign assets.",
      "Adapted designs based on feedback while maintaining visual consistency across deliverables.",
    ],
  },
  {
    company: "Arkan Cultural Center",
    title: "Graphic Design Instructor",
    location: "Alexandria, Egypt",
    date: "Sep 2017 - Sep 2018",
    bullets: [
      "Taught graphic design fundamentals and Adobe software through structured course materials.",
      "Guided students through practical design projects and creative development.",
    ],
  },
];

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
    organization: "American Chemical Society, Alexandria University Chapter",
    bullets: [
      "Led marketing initiatives and maintained brand consistency across digital, print, and event campaigns.",
    ],
  },
  {
    role: "Graphic Designer",
    organization: "Microsoft Student Partners, MSP Tech Club",
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
    title: "Visualize 2030, ADP x UNDP",
    subtitle: "Top 10, MENA Region, Visual Content Track",
  },
  {
    title: "SDGs Youth Vision Workshop",
    subtitle: "Contributing Designer, Bibliotheca Alexandrina",
  },
];

export const education = {
  degree: "Bachelor of Agricultural Engineering and Biosystems",
  institution: "Faculty of Agriculture, Alexandria University",
  dates: "Sep 2016 - May 2021",
};

export type Language = {
  language: string;
  level: string;
};

export const languages: Language[] = [
  { language: "Arabic", level: "Native" },
  { language: "English", level: "Professional" },
];

export const tools: string[] = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe After Effects",
  "Adobe Premiere Pro",
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
