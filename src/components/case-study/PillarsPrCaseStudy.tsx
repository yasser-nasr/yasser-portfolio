import Image from "next/image";
import localFont from "next/font/local";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import PillarsFacebookPage from "./PillarsFacebookPage";
import SocialMediaGrid, {
  type SocialMediaGridItem,
  type SocialMediaSlide,
} from "./SocialMediaGrid";
import VideoPlayer from "./VideoPlayer";

const base = "/projects/pillars-pr";
const mediaBase = `${base}/social-media`;
const webMediaBase = `${mediaBase}/web`;

const faustina = localFont({
  src: "../../../public/projects/pillars-pr/fonts/Faustina-VariableFont_wght.ttf",
  display: "swap",
  weight: "300 800",
});

const notoNaskhArabic = localFont({
  src: "../../../public/projects/pillars-pr/fonts/NotoNaskhArabic-VariableFont_wght.ttf",
  display: "swap",
  weight: "400 700",
});

const brandColors = [
  ["White", "#FFFFFF"],
  ["Light Blue", "#AEC7DD"],
  ["Medium Blue", "#5E90BB"],
  ["Deep Blue", "#0D5899"],
  ["Black", "#000000"],
] as const;

const logoConceptIcons = [
  {
    src: "pillars-pr-logo-foundation-pillar-icon.svg",
    title: "Foundation",
    description: "One classical pillar establishes structure, stability, and legal authority.",
    alt: "Single classical pillar used as the foundation of the Pillars PR logo concept.",
    dark: false,
  },
  {
    src: "pillars-pr-logo-connected-pillars-icon.svg",
    title: "Connection",
    description: "Repeated pillars connect to form a continuous visual bridge.",
    alt: "Three connected classical pillars representing the bridge between law and communication.",
    dark: false,
  },
  {
    src: "pillars-pr-logo-ascending-growth-pillars-icon.svg",
    title: "Progress",
    description: "Ascending pillar heights express forward movement and measurable growth.",
    alt: "Three ascending classical pillars symbolizing growth in the Pillars PR identity.",
    dark: false,
  },
  {
    src: "pillars-pr-logo-detailed-white-pillars-icon.svg",
    title: "Detail",
    description: "Internal column lines introduce the architectural character used in the monogram.",
    alt: "Detailed white ascending pillar symbol showing the architectural lines of the Pillars PR monogram.",
    dark: true,
  },
] as const;
const decisions = [
  [
    "Specialist Over Generic",
    "The identity needed to communicate that Pillars understands the legal sector, not simply general marketing.",
  ],
  [
    "Structure as a Brand Device",
    "The pillar concept became a recognizable graphic system rather than relying only on generic legal symbols.",
  ],
  [
    "Authority Without Feeling Outdated",
    "Blue, structured layouts, and clear hierarchy established credibility while maintaining a contemporary character.",
  ],
  [
    "One Connected System",
    "The identity was designed to work consistently across corporate documents, commercial communication, social media, and motion.",
  ],
] as const;
const responsibilities = [
  "Brand Identity",
  "Logo Design",
  "Visual Direction",
  "Corporate Design",
  "Social Media",
  "Logo Motion",
  "Motion & Video",
] as const;
const deliverables = [
  "Logo System",
  "Visual Identity",
  "Company Profile",
  "Corporate Documents",
  "Pricing Presentation",
  "Social Media Designs",
  "Logo Animation",
  "Motion & Video",
] as const;

function socialSlide(
  src: string,
  alt: string,
  caption: string,
): SocialMediaSlide {
  return { src: `${webMediaBase}/${src}`, alt, caption };
}

function staticPost(
  id: string,
  filename: string,
  alt: string,
): SocialMediaGridItem {
  return {
    id,
    preview: {
      src: `${mediaBase}/static/${filename}`,
      alt,
      caption: alt,
    },
  };
}

const professionalWebsiteSlides = [
  socialSlide(
    "carousel/pillars-pr-professional-website-for-law-firms-carousel-01.webp",
    "Pillars PR professional website design carousel cover for lawyers and law firms.",
    "A professional website carousel introducing the value of a credible digital presence for legal professionals.",
  ),
  socialSlide(
    "carousel/pillars-pr-professional-website-for-law-firms-carousel-02.webp",
    "Pillars PR legal website design carousel about building professional credibility online.",
    "The series connects professional credibility with a clear, trustworthy website.",
  ),
  socialSlide(
    "carousel/pillars-pr-professional-website-for-law-firms-carousel-03.webp",
    "Pillars PR website design carousel slide for law firms and legal professionals.",
    "A structured layout carries the specialist legal-marketing message across the sequence.",
  ),
  socialSlide(
    "carousel/pillars-pr-professional-website-for-law-firms-carousel-04.webp",
    "Pillars PR carousel slide explaining the business value of a professional legal website.",
    "The visual hierarchy keeps the educational message direct and easy to follow.",
  ),
  socialSlide(
    "carousel/pillars-pr-professional-website-for-law-firms-carousel-05.webp",
    "Closing slide from the Pillars PR professional legal website carousel.",
    "The closing frame returns the campaign to the Pillars PR brand system.",
  ),
] as const;

const contentKingSlides = Array.from({ length: 7 }, (_, index) => {
  const slide = String(index + 1).padStart(2, "0");
  return socialSlide(
    `carousel/pillars-pr-content-marketing-for-law-firms-carousel-${slide}.webp`,
    `Pillars PR content marketing carousel for lawyers and law firms, slide ${index + 1} of 7.`,
    `Slide ${index + 1} from an educational carousel about content strategy for legal-sector communication.`,
  );
});

const attractClientsSlides = Array.from({ length: 5 }, (_, index) => {
  const slide = String(index + 1).padStart(2, "0");
  return socialSlide(
    `carousel/pillars-pr-attract-new-legal-clients-carousel-${slide}.webp`,
    `Pillars PR legal marketing carousel about attracting new law firm clients, slide ${index + 1} of 5.`,
    `Slide ${index + 1} from a Pillars PR carousel about attracting new clients through professional communication.`,
  );
});

const portraitStaticItems: readonly SocialMediaGridItem[] = [
  staticPost(
    "digital-legal-services",
    "pillars-pr-digital-legal-marketing-services.webp",
    "Pillars PR digital legal marketing services post for lawyers, law firms, and legal organizations.",
  ),
  staticPost(
    "reputation-management",
    "pillars-pr-reputation-management-for-lawyers.webp",
    "Pillars PR reputation management social media design for lawyers and legal professionals.",
  ),
  staticPost(
    "active-social-media",
    "pillars-pr-active-social-media-for-lawyers.webp",
    "Pillars PR campaign encouraging lawyers and law firms to build an active social media presence.",
  ),
  staticPost(
    "legal-reputation",
    "pillars-pr-legal-reputation-management.webp",
    "Pillars PR legal reputation management campaign design for professional credibility online.",
  ),
  staticPost(
    "digital-marketing-sign",
    "pillars-pr-lawyer-digital-marketing-sign.webp",
    "Pillars PR digital marketing campaign design helping legal professionals recognize opportunities for growth.",
  ),
  staticPost(
    "valuable-content",
    "pillars-pr-valuable-content-for-legal-clients.webp",
    "Pillars PR educational post about creating valuable content for legal clients and audiences.",
  ),
  staticPost(
    "attract-law-firm-clients",
    "pillars-pr-attract-clients-to-law-firms.webp",
    "Pillars PR social media campaign about attracting new clients to law firms.",
  ),
  staticPost(
    "professional-law-firm-website",
    "pillars-pr-professional-website-for-law-firms.webp",
    "Pillars PR website marketing post promoting professional websites for law firms.",
  ),
  staticPost(
    "online-advertising",
    "pillars-pr-online-advertising-for-lawyers.webp",
    "Pillars PR online advertising campaign design for lawyers and legal organizations.",
  ),
  staticPost(
    "start-digital-marketing",
    "pillars-pr-start-legal-digital-marketing.webp",
    "Pillars PR call-to-action campaign encouraging law firms to start digital marketing.",
  ),
  staticPost(
    "future-legal-marketing",
    "pillars-pr-future-of-legal-digital-marketing.webp",
    "Pillars PR thought-leadership post about the future of digital marketing in the legal field.",
  ),
  staticPost(
    "professional-legal-identity",
    "pillars-pr-professional-legal-brand-identity.webp",
    "Pillars PR legal brand identity campaign for lawyers and law firms.",
  ),
  staticPost(
    "digital-gateway",
    "pillars-pr-digital-gateway-for-legal-clients.webp",
    "Pillars PR campaign presenting digital presence as a gateway to new legal clients.",
  ),
  staticPost(
    "digital-presence",
    "pillars-pr-digital-presence-for-law-firms.webp",
    "Pillars PR digital presence campaign design for law firms and legal professionals.",
  ),
  staticPost(
    "first-page-search",
    "pillars-pr-law-firm-first-page-search-results.webp",
    "Pillars PR SEO campaign about helping law firms appear on the first page of search results.",
  ),
  staticPost(
    "first-page-seo",
    "pillars-pr-first-page-seo-for-lawyers.webp",
    "Pillars PR first-page SEO service campaign for lawyers and law firms.",
  ),
  staticPost(
    "legal-advice-content",
    "pillars-pr-legal-advice-content-marketing.webp",
    "Pillars PR legal advice content marketing design for professional social media communication.",
  ),
  staticPost(
    "lawyers-social-media",
    "pillars-pr-why-lawyers-need-social-media.webp",
    "Pillars PR educational post explaining why lawyers need social media marketing.",
  ),
  staticPost(
    "website-design-services",
    "pillars-pr-law-firm-website-design-services.webp",
    "Pillars PR professional website design services campaign for law firms.",
  ),
  staticPost(
    "legal-website-design",
    "pillars-pr-legal-sector-website-design.webp",
    "Pillars PR legal-sector website design campaign for lawyers and legal organizations.",
  ),
  staticPost(
    "choose-marketing-service",
    "pillars-pr-choose-legal-marketing-service.webp",
    "Pillars PR service-selection campaign for legal marketing and public relations clients.",
  ),
  staticPost(
    "legal-content-service",
    "pillars-pr-legal-content-marketing-service.webp",
    "Pillars PR legal content marketing service campaign for law firms and legal professionals.",
  ),
  staticPost(
    "personal-branding",
    "pillars-pr-personal-branding-for-lawyers.webp",
    "Pillars PR personal branding campaign design for lawyers and legal professionals.",
  ),
  staticPost(
    "first-destination",
    "pillars-pr-first-destination-for-legal-clients.webp",
    "Pillars PR digital visibility campaign about becoming the first destination for legal clients.",
  ),
  staticPost(
    "data-privacy",
    "pillars-pr-data-privacy-for-legal-marketing.webp",
    "Pillars PR data privacy awareness design for legal marketing and digital communication.",
  ),
  staticPost(
    "ai-legal-marketing",
    "pillars-pr-ai-for-legal-marketing.webp",
    "Pillars PR educational social post about artificial intelligence in legal marketing.",
  ),
  staticPost(
    "legal-marketing-services",
    "pillars-pr-legal-marketing-services.webp",
    "Pillars PR professional marketing and public relations services campaign for the legal sector.",
  ),
];

const squareStaticItems: readonly SocialMediaGridItem[] = [
  staticPost(
    "legal-social-media-marketing",
    "pillars-pr-social-media-marketing-for-legal-sector.webp",
    "Pillars PR social media marketing campaign for the legal sector.",
  ),
  staticPost(
    "brand-mission",
    "pillars-pr-legal-marketing-public-relations-mission.webp",
    "Pillars PR mission statement design for legal marketing and public relations.",
  ),
  staticPost(
    "saudi-founding-day",
    "pillars-pr-saudi-founding-day-legal-marketing.webp",
    "Pillars PR Saudi Founding Day social media design for the regional legal market.",
  ),
  staticPost(
    "attract-legal-clients",
    "pillars-pr-attract-legal-clients-social-media.webp",
    "Pillars PR social media campaign about attracting new legal clients.",
  ),
  staticPost(
    "legal-professionals",
    "pillars-pr-marketing-for-legal-professionals.webp",
    "Pillars PR marketing campaign created for lawyers and legal professionals.",
  ),
  staticPost(
    "social-media-services",
    "pillars-pr-social-media-services-for-law-firms.webp",
    "Pillars PR social media management services design for law firms.",
  ),
  staticPost(
    "content-creation-services",
    "pillars-pr-legal-content-creation-services.webp",
    "Pillars PR legal content creation services campaign for law firms and lawyers.",
  ),
  staticPost(
    "stand-out-digital",
    "pillars-pr-stand-out-digital-legal-marketing.webp",
    "Pillars PR digital marketing campaign helping legal businesses stand out online.",
  ),
  staticPost(
    "seo-services",
    "pillars-pr-seo-services-for-law-firms.webp",
    "Pillars PR SEO services campaign for law firms and legal professionals.",
  ),
  staticPost(
    "brand-launch-teaser",
    "pillars-pr-legal-marketing-brand-launch-teaser.webp",
    "Pillars PR brand launch teaser featuring classical pillars and legal imagery.",
  ),
  staticPost(
    "powerful-online-presence",
    "pillars-pr-powerful-online-presence-for-lawyers.webp",
    "Pillars PR campaign about building a powerful online presence for lawyers.",
  ),
  staticPost(
    "saudi-online-presence",
    "pillars-pr-saudi-law-firm-online-presence.webp",
    "Pillars PR Arabic campaign promoting a strong online presence for Saudi law firms.",
  ),
  staticPost(
    "saudi-content-visibility",
    "pillars-pr-saudi-legal-content-visibility.webp",
    "Pillars PR Arabic content marketing campaign for legal visibility in Saudi Arabia.",
  ),
  staticPost(
    "saudi-social-growth",
    "pillars-pr-saudi-lawyer-social-media-growth.webp",
    "Pillars PR Arabic social media growth campaign for Saudi lawyers.",
  ),
  staticPost(
    "saudi-legal-professional",
    "pillars-pr-saudi-legal-professional-online-presence.webp",
    "Pillars PR Arabic online presence campaign for Saudi legal professionals and influencers.",
  ),
];

const portraitSocialMediaItems: readonly SocialMediaGridItem[] = [
  ...portraitStaticItems,
  {
    id: "content-king",
    preview: contentKingSlides[0],
    slides: contentKingSlides,
  },
  {
    id: "attract-clients",
    preview: attractClientsSlides[0],
    slides: attractClientsSlides,
  },
];

const squareSocialMediaItems: readonly SocialMediaGridItem[] = [
  ...squareStaticItems,
  {
    id: "professional-website",
    preview: professionalWebsiteSlides[0],
    slides: professionalWebsiteSlides,
  },
];

const pricingArtwork = [
  [
    "web/price-plan/pillars-pr-legal-social-media-plans-comparison.webp",
    "Pillars PR social media management pricing comparison for Rising, Expert, and Premium service plans.",
  ],
  [
    "web/price-plan/pillars-pr-rising-legal-social-media-plan.webp",
    "Pillars PR Rising social media service plan presentation for legal-sector clients.",
  ],
  [
    "web/price-plan/pillars-pr-expert-legal-social-media-plan.webp",
    "Pillars PR Expert social media service plan presentation for legal-sector clients.",
  ],
  [
    "web/price-plan/pillars-pr-premium-legal-social-media-plan.webp",
    "Pillars PR Premium social media service plan presentation for legal-sector clients.",
  ],
] as const;

function Heading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

function Artwork({
  src,
  alt,
  ratio = "portrait",
  fit = "contain",
}: {
  src: string;
  alt: string;
  ratio?: "landscape" | "portrait" | "square" | "wide";
  fit?: "contain" | "cover";
}) {
  const ratios = {
    landscape: "aspect-[3/2]",
    portrait: "aspect-[4/5]",
    square: "aspect-square",
    wide: "aspect-[2/1]",
  } as const;
  return (
    <figure
      className={`relative min-w-0 overflow-hidden rounded-xl bg-[#071a33] ${ratios[ratio]}`}
    >
      <Image
        src={`${mediaBase}/${src}`}
        alt={alt}
        fill
        sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </figure>
  );
}

function MotionVisual({
  src,
  poster,
  label,
  ratio = "portrait",
}: {
  src: string;
  poster: string;
  label: string;
  ratio?: "landscape" | "portrait";
}) {
  return (
    <figure
      className={`min-w-0 ${ratio === "landscape" ? "sm:col-span-2" : ""}`}
    >
      <div
        className={`mx-auto w-full overflow-hidden rounded-xl bg-black ${
          ratio === "landscape"
            ? "aspect-video"
            : "aspect-[9/16] max-w-[22rem]"
        }`}
      >
        <VideoPlayer
          src={`${webMediaBase}/videos/${src}`}
          poster={`${mediaBase}/${poster}`}
          label={label}
        />
      </div>
      <figcaption
        className={`mt-3 text-sm leading-6 text-ink-faint ${
          ratio === "portrait" ? "mx-auto w-full max-w-[22rem]" : ""
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

export default function PillarsPrCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />
        <div className="relative mt-6 aspect-[2553/1080] overflow-hidden bg-white">
          <Image
            src={`${webMediaBase}/facebook/pillars-pr-building-legal-excellence-brand-cover.webp`}
            alt="Pillars PR brand identity cover featuring the Building Legal Excellence message, classical column graphics, and a blue legal-sector visual system."
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
            {project.subtitle}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">
            Pillars PR
          </h1>
          <div className="mt-8 max-w-3xl space-y-3 text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
            <p>
              Pillars PR is a marketing and public relations company
              specializing in communication for the legal sector across the MENA
              region.
            </p>
            <p>
              I developed a connected visual identity and communication system
              spanning the logo, corporate documents, commercial communication,
              social media, logo motion, and video.
            </p>
          </div>
          <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Market
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">
                UAE · Saudi Arabia · MENA
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Location
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">
                Abu Dhabi, UAE
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Role
              </dt>
              <dd className="mt-2 text-sm leading-6 text-ink">
                Brand &amp; Digital Designer
                <br />
                Graphic &amp; Multimedia Designer
              </dd>
            </div>
          </dl>
          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.16em] text-ink-faint">
              Scope
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                "Brand Identity",
                "Corporate Design",
                "Social Media",
                "Motion & Video",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section id="context" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="01 / Context">Project Context</Heading>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-lg font-semibold text-ink">Challenge</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                Pillars PR needed to establish credibility within the legal
                sector without feeling outdated or overly institutional, while
                also communicating the modern marketing and public-relations
                capabilities behind the company.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">Approach</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                I built a structured visual identity that connected legal
                authority with contemporary professional communication and
                extended the same system across corporate documents, commercial
                material, social media, and motion.
              </p>
            </div>
          </div>
          <p className="mt-9 text-sm text-ink-faint">
            Legal credibility · Modern communication · Clear structure ·
            Consistent execution
          </p>
        </section>
        <section
          id="brand-idea"
          className="border-t border-edge py-16 md:py-24"
        >
          <Heading eyebrow="02 / Positioning">
            Legal Expertise.
            <br />
            Modern Communication.
          </Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
            <p className="text-lg leading-8 text-ink-soft">
              Pillars PR was positioned as a specialist bridge between the legal
              sector and modern marketing and public relations.
            </p>
            <blockquote className="border-l-2 border-[#2469d8] pl-6 text-2xl font-semibold leading-9 text-ink">
              Building Legal Excellence
            </blockquote>
          </div>
        </section>
        <section id="identity" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="03 / Identity">Logo &amp; Identity</Heading>
          <div className="mt-10 space-y-12 text-[#0D5899]">
            <div>
              <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
                <div className="relative min-h-[22rem] md:min-h-[32rem]">
                  <Image
                    src={`${webMediaBase}/facebook/pillars-pr-ppr-monogram-logo.webp`}
                    alt="Pillars PR PPR monogram logo combining the initials with classical architectural pillar forms."
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-contain p-8 sm:p-12"
                  />
                </div>
                <div className="flex flex-col justify-center bg-[#AEC7DD] p-7 text-black sm:p-10 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black">
                    From name to monogram
                  </p>
                  <h3 className={`${faustina.className} mt-5 text-4xl font-semibold leading-tight sm:text-5xl`}>
                    Pillars.
                    <br />
                    Public.
                    <br />
                    Relations.
                  </h3>
                  <p className="mt-6 leading-7 text-black/85">
                    The initials P, P, and R are connected and modified into one
                    monogram. Their vertical stems and horizontal caps echo
                    classical pillars, giving the identity structure, stability,
                    and legal-sector authority.
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <div className="grid gap-8 border-t border-edge pt-10 md:grid-cols-2 md:gap-14">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                      Forward movement
                    </p>
                    <p className="mt-4 leading-7 text-ink-soft">
                      The ascending construction reads as steps forward,
                      expressing measurable growth and the positive impact of
                      strategic marketing communication.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                      A strategic bridge
                    </p>
                    <p className="mt-4 leading-7 text-ink-soft">
                      Connected forms visualize the brand&apos;s role between legal
                      expertise, marketing, and public relations—helping legal
                      professionals build a stronger market position.
                    </p>
                  </div>
                </div>
                <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  Visual development
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {logoConceptIcons.map((icon) => (
                    <article key={icon.src} className="flex min-w-0 flex-col">
                      <div
                        className={`relative aspect-square overflow-hidden rounded-xl ${
                          icon.dark ? "bg-[#0D5899]" : "bg-white"
                        }`}
                      >
                        <Image
                          src={`${base}/pillars-icons/${icon.src}`}
                          alt={icon.alt}
                          fill
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                          className="object-contain p-5"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-ink">
                        {icon.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">
                        {icon.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="brand-system"
          className="border-t border-edge py-16 md:py-24"
        >
          <Heading eyebrow="04 / System">Brand System</Heading>
          <div className="mt-12 space-y-16">
            <div>
              <h3 className="text-xl font-semibold text-ink">Color</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                A focused blue palette balances institutional trust, clarity,
                and professional authority across legal-sector communication.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {brandColors.map(([name, hex]) => (
                  <div
                    key={hex}
                    className="overflow-hidden rounded-xl border border-edge bg-surface-card"
                  >
                    <div
                      className="aspect-[4/3] border-b border-black/10"
                      style={{ backgroundColor: hex }}
                      role="img"
                      aria-label={`${name} Pillars PR brand color, ${hex}`}
                    />
                    <div className="flex items-center justify-between gap-3 p-4 text-sm text-ink">
                      <span>{name}</span>
                      <code>{hex}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-edge pt-14">
              <h3 className="text-xl font-semibold text-ink">Typography</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                Faustina provides the English identity with an editorial serif
                voice, while Noto Naskh Arabic supports clear, culturally
                appropriate Arabic communication.
              </p>
              <div className="mt-7 overflow-hidden rounded-xl border border-edge">
                <div className="grid md:grid-cols-2">
                  <div className="bg-[#FFFFFF] p-7 text-[#0D5899] sm:p-10 md:p-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D5899]">
                      English / Faustina
                    </p>
                    <p
                      className={`${faustina.className} mt-10 text-5xl font-semibold leading-[0.95] sm:text-6xl`}
                    >
                      Pillars
                      <br />
                      Public Relations
                    </p>
                    <p className={`${faustina.className} mt-10 text-2xl`}>
                      Aa Bb Cc Dd · 0123456789
                    </p>
                  </div>
                  <div className="border-t border-[#AEC7DD] bg-[#0D5899] p-7 text-white sm:p-10 md:border-l md:border-t-0 md:p-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      Arabic / Noto Naskh Arabic
                    </p>
                    <p
                      lang="ar"
                      dir="rtl"
                      className={`${notoNaskhArabic.className} mt-10 text-right text-5xl font-semibold leading-[1.35] sm:text-6xl`}
                    >
                      ركائز
                      <br />
                      العلاقات العامة
                    </p>
                    <p
                      lang="ar"
                      dir="rtl"
                      className={`${notoNaskhArabic.className} mt-8 text-right text-2xl text-[#AEC7DD]`}
                    >
                      أبجد هوز حطي كلمن · ١٢٣٤٥٦٧٨٩٠
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="corporate" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="05 / Corporate">Corporate Communication</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            The identity was extended into long-form corporate communication,
            creating a consistent system for presenting the company, its
            positioning, services, and capabilities.
          </p>
          <figure className="mt-10 overflow-hidden rounded-xl bg-[#0D5899]">
            <Image
              src={`${base}/pillars-pr-digital-company-profile-mobile-presentation.webp`}
              alt="Pillars PR digital company profile displayed across mobile mockups, presenting the legal marketing agency's mission, vision, services, expertise, and contact information."
              width={2400}
              height={1600}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </section>
        <section
          id="commercial"
          className="border-t border-edge py-16 md:py-24"
        >
          <Heading eyebrow="06 / Commercial">Commercial Communication</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            A consistent document system organized package structure, service
            hierarchy, and commercial information without making historical
            prices the focus.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingArtwork.map(([src, alt]) => (
              <Artwork key={src} src={src} alt={alt} />
            ))}
          </div>
        </section>
        <section id="social" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="07 / Social">Social Media System</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            The identity was extended into a repeatable social-media system
            designed to communicate legal, professional, educational, and
            brand-focused content consistently.
          </p>
          <SocialMediaGrid
            brandName="Pillars PR"
            username="pillarspr"
            subtitle="Legal marketing & public relations · Abu Dhabi"
        logo={`${webMediaBase}/facebook/pillars-pr-social-media-profile-picture.webp`}
        logoAlt="Pillars PR profile picture featuring the centered PPR monogram and full brand name."
        logoBackground="#FFFFFF"
        logoRingClassName="from-[#2469d8] via-[#75abff] to-white"
        logoClassName="scale-[0.88] object-cover"
            accentColor="#2469d8"
            items={portraitSocialMediaItems}
          />
          <div className="mt-6">
            <SocialMediaGrid
              brandName="Pillars PR"
              username="pillarspr"
              subtitle="Legal marketing & public relations · Abu Dhabi"
            logo={`${webMediaBase}/facebook/pillars-pr-social-media-profile-picture.webp`}
            logoAlt="Pillars PR profile picture featuring the centered PPR monogram and full brand name."
            logoBackground="#FFFFFF"
            logoRingClassName="from-[#2469d8] via-[#75abff] to-white"
            logoClassName="scale-[0.88] object-cover"
              accentColor="#2469d8"
              items={squareSocialMediaItems}
              previewAspect="square"
              showProfileHeader={false}
            />
          </div>
          <PillarsFacebookPage />
        </section>
        <section id="motion" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="08 / Motion">Motion &amp; Video</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            Logo animation and selected motion work extended the identity into
            time-based communication while preserving the same structured visual
            character.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <MotionVisual
              src="pillars-pr-logo-animation-intro.mp4"
              poster="web/videos/pillars-pr-ppr-logo-animation-intro-cover.webp"
              label="Pillars PR animated logo intro revealing the PPR monogram and brand identity."
              ratio="landscape"
            />
            <MotionVisual
              src="pillars-pr-online-presence-video.mp4"
              poster="web/videos/pillars-pr-online-presence-video-cover.webp"
              label="Pillars PR motion design about building a professional online presence for legal-sector clients."
            />
            <MotionVisual
              src="pillars-pr-uses-of-public-relations-video.mp4"
              poster="web/videos/pillars-pr-public-relations-video-cover.webp"
              label="Pillars PR educational video explaining the uses of public relations for legal professionals and organizations."
            />
          </div>
        </section>
        <section id="decisions" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="09 / Rationale">Key Design Decisions</Heading>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {decisions.map(([title, description], index) => (
              <article key={title} className="border-t border-edge pt-5">
                <p className="font-display text-sm text-ink-faint">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section id="outcome" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="10 / Result">Outcome</Heading>
          <div className="mt-8 max-w-4xl space-y-4 text-lg leading-8 text-ink-soft">
            <p>
              The result was a connected identity and communication system that
              gave Pillars PR a consistent presence across corporate documents,
              commercial material, social media, and motion.
            </p>
            <p>
              The visual system supported the company&apos;s specialist
              legal-market positioning while remaining flexible across different
              formats and audiences throughout the region.
            </p>
          </div>
        </section>
        <section id="scope" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="11 / Contribution">Project Scope</Heading>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Role
              </h3>
              <p className="mt-5 leading-8 text-ink">
                Brand &amp; Digital Designer
                <br />
                Graphic &amp; Multimedia Designer
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Responsibilities
              </h3>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
                {responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">
                Deliverables
              </h3>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <CaseStudyClosingCta
          title="Building a specialist brand that needs one clear communication system?"
          body="I create connected identity, content, and multimedia systems across the touchpoints where a brand needs to communicate."
        />
      </article>
    </main>
  );
}
