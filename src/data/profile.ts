import { siteUrl } from "@/lib/site";

export type ExpertiseGroup = {
  heading: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  title: string;
  location: string;
  date: string;
  bullets: string[];
};

export const coreExpertise: ExpertiseGroup[] = [
  {
    heading: "Brand & Graphic Design",
    items: ["Graphic Design", "Brand Identity", "Visual Systems", "Typography", "Layout Design", "Marketing Collateral"],
  },
  {
    heading: "Digital & Campaigns",
    items: ["Digital Design", "Social Media Design", "Campaign Design", "Website Design", "Landing Page Design", "UI/UX Principles", "Performance Marketing Creative"],
  },
  {
    heading: "Multimedia",
    items: ["Presentation Design", "Motion Graphics", "Video Editing", "Multimedia Content", "3D Visualization"],
  },
  {
    heading: "Tools",
    items: ["Adobe Creative Suite", "Figma", "Blender", "AI Creative Tools"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "A1 Investments", title: "Marketing & Brand Manager", location: "Dubai, UAE, Remote", date: "Apr 2025 - Present",
    bullets: [
      "Lead brand and creative development across businesses operating in real estate, finance, home services, and agriculture.",
      "Develop visual identity systems, brand assets, and marketing materials across digital and print platforms.",
      "Design websites, landing pages, presentations, and communication materials supporting growth, sales, and stakeholder engagement.",
      "Create social media visuals, digital campaigns, marketing collateral, and content assets across multiple customer and business touchpoints.",
      "Produce investor presentations, business proposals, pitch decks, and executive communication materials.",
      "Develop multimedia content including motion graphics, video content, 3D visuals, and campaign creatives.",
      "Contribute to brand positioning, storytelling, and product communication through design-led visual communication.",
      "Apply sector-specific knowledge to support agriculture-related brand positioning, product communication, and authentic visual storytelling.",
    ],
  },
  {
    company: "Sand Circus / Beyond", title: "Creative Support", location: "Saudi Arabia, Remote", date: "Concurrent Engagement",
    bullets: [
      "Supported regional campaigns, activations, and brand experiences across public and private sector initiatives.",
      "Developed social media visuals, presentation systems, multimedia assets, content frameworks, and experiential concepts.",
      "Produced 3D exhibition concepts and visual assets for live events, campaigns, and public engagement.",
      "Contributed to projects involving RTA Dubai, Riyadh Chamber, and Cultural Development Fund.",
    ],
  },
  {
    company: "Pillars Public Relations Agency", title: "Graphic Designer", location: "Abu Dhabi, UAE, Remote", date: "Oct 2023 - Jun 2025",
    bullets: [
      "Designed brand, marketing, and visual communication materials for Gulf-based law firms, corporate clients, and professional service organizations.",
      "Created visual assets across presentations, social media campaigns, marketing collateral, digital communication materials, and client brand touchpoints.",
      "Supported website projects by preparing visual assets, image direction, layout elements, and UI system components in collaboration with developers.",
      "Developed digital creative aligned with client brand guidelines, marketing objectives, and communication strategies.",
      "Produced motion graphics, animation, video content, and multimedia assets for social media, campaigns, websites, and online platforms.",
      "Supported 3D visuals, animations, and conceptual design assets for selected client and campaign projects.",
      "Collaborated with marketing and account teams to maintain brand consistency, meet deadlines, and deliver high-quality creative across multiple client brands.",
    ],
  },
  {
    company: "Independent / Freelance Designer", title: "Brand, Digital & Multimedia Design", location: "Self-employed", date: "Aug 2016 - Present",
    bullets: [
      "Partner with startups, SMEs, founders, and growing businesses to develop visual identities, websites, landing pages, campaigns, presentations, and marketing materials.",
      "Create brand identities, logos, visual systems, and design assets across digital and print touchpoints.",
      "Design social media content, campaign creatives, paid advertising assets, and digital communication materials for multiple industries.",
      "Develop websites, landing page visuals, UI layouts, and digital experiences that support business goals, user needs, and brand consistency.",
      "Produce multimedia content including presentation designs, motion assets, video content, and visual storytelling materials.",
      "Build scalable visual systems and brand assets that help clients communicate consistently across online and offline platforms.",
      "Work directly with clients and stakeholders to understand project goals, present design concepts, revise creative solutions, and deliver work aligned with brand guidelines, budgets, and project requirements.",
    ],
  },
  {
    company: "Petra Advertising Agency", title: "Graphic Designer", location: "Alexandria, Egypt", date: "Sep 2019 - Feb 2020",
    bullets: [
      "Developed campaign visuals, layouts, illustrations, branding materials, and marketing collateral across digital and print channels.",
      "Created visual concepts based on client briefs, brand direction, and campaign requirements.",
      "Collaborated with creative leads, writers, and marketing teams through concept development, feedback rounds, final execution, and quality checks.",
    ],
  },
];

export const teachingExperience: ExperienceEntry[] = [
  {
    company: "Arabian Academy", title: "Graphic Design Instructor", location: "Alexandria, Egypt, Hybrid", date: "Nov 2023 - Jan 2026",
    bullets: [
      "Developed educational content covering graphic design fundamentals, Adobe Creative Suite, branding, layout, typography, color theory, and visual communication.",
      "Mentored students on portfolio development, freelance practice, creative career direction, and project presentation.",
      "Mentored 150+ students across multiple design programs and workshops.",
    ],
  },
  {
    company: "SkillsDynamix", title: "Graphic Design Instructor", location: "Alexandria, Egypt, Hybrid", date: "Jul 2025 - Jan 2026",
    bullets: [
      "Developed and delivered graphic design training programs covering Adobe Photoshop, Adobe Illustrator, Adobe InDesign, branding, and digital design.",
      "Taught design fundamentals including layout, color theory, typography, branding, visual hierarchy, and visual communication.",
      "Guided learners through hands-on projects, critique sessions, portfolio development, and creative presentations.",
    ],
  },
  {
    company: "Arkan Cultural Center", title: "Graphic Design Instructor", location: "Alexandria, Egypt", date: "Sep 2017 - Sep 2018",
    bullets: [
      "Prepared course materials, lesson plans, assignments, and learning outlines for graphic design workshops.",
      "Taught graphic design fundamentals, Adobe software basics, layout, color theory, typography, and visual communication.",
      "Supported students in developing technical design skills, creative thinking, and practical project work.",
    ],
  },
];

export const profile = {
  name: "Yasser Nasr",
  primaryTitle: "Graphic & Multimedia Designer | Brand & Digital Designer",
  supportingExperience:
    "With 6+ years of experience, I build brand identities, visual systems, digital experiences, campaigns, presentations, motion content, and multimedia communication for businesses across Egypt and GCC markets.",
  email: "contact@yassernasr.com",
  phone: {
    display: "+20 100 047 0165",
    whatsappUrl: "https://wa.me/201000470165",
  },
  linkedIn: {
    display: "linkedin.com/in/yasser-nasr",
    url: "https://www.linkedin.com/in/yasser-nasr/",
  },
  portfolioUrl: siteUrl,
  experience,
  coreExpertise,
  cvPath: "/brand/yasser-nasr-graphic-multimedia-designer-cv-2026.pdf",
} as const;
