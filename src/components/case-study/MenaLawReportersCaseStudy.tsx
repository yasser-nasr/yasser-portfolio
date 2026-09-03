import Image from "@/components/case-study/CaseStudyImage";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import MenaLawReportersFacebookPage from "./MenaLawReportersFacebookPage";
import MenaLawReportersIdentity from "./MenaLawReportersIdentity";
import SocialMediaGrid, {
  type SocialMediaGridItem,
  type SocialMediaSlide,
} from "./SocialMediaGrid";
import VideoPlayer from "./VideoPlayer";

const base = "/projects/mena-law-reporters";
const socialBase = `${base}/social-media`;
const profile = `${base}/mena-law-reporters-facebook-profile.webp`;

const decisions = [
  [
    "One Symbol for Law and Reach",
    "The justice scale was blended into a world form so the mark could communicate legal authority and regional connection as one idea.",
  ],
  [
    "Editorial Authority",
    "Zilla Slab gives English communication a publication-led character, while Cairo keeps Arabic content clear across practical digital formats.",
  ],
  [
    "Focused Visual Contrast",
    "Red establishes recognition and emphasis, while black and white keep dense legal, educational, and opportunity content structured.",
  ],
  [
    "Identity Built for Content",
    "The system was designed to remain consistent across legal updates, educational posts, career content, connected Facebook grids, and motion.",
  ],
] as const;

const responsibilities = [
  "Brand Identity",
  "Logo Concept & Design",
  "Color System",
  "Typography System",
  "Digital Content Design",
  "Social Media Design",
  "Motion & Video",
] as const;

const deliverables = [
  "Logo & Visual Identity",
  "Color Palette",
  "English & Arabic Typography",
  "Social Media Post System",
  "Editorial Carousels",
  "Facebook Cover & Profile",
  "Connected Facebook Grids",
  "COP28 Social Video",
] as const;

function slide(file: string, alt: string, caption: string): SocialMediaSlide {
  return { src: `${socialBase}/${file}`, alt, caption };
}

const linkedInProfileSlides: readonly SocialMediaSlide[] = [
  slide(
    "mena-law-reporters-linkedin-profile-guide-carousel-01.webp",
    "Cover of a MENA Law Reporters Arabic carousel about building a professional LinkedIn profile.",
    "A practical Arabic guide to building a professional LinkedIn profile.",
  ),
  ...Array.from({ length: 6 }, (_, index) =>
    slide(
      `mena-law-reporters-linkedin-profile-guide-carousel-${String(index + 2).padStart(2, "0")}.webp`,
      `Step ${index + 1} of the MENA Law Reporters Arabic LinkedIn profile guide.`,
      `LinkedIn profile guidance, step ${index + 1} of 6.`,
    ),
  ),
  slide(
    "mena-law-reporters-linkedin-profile-guide-carousel-08.webp",
    "Closing slide of the MENA Law Reporters LinkedIn profile guide with social channels and contact details.",
    "Closing panel connecting the guide to the platform's digital channels.",
  ),
];

const portraitItems: readonly SocialMediaGridItem[] = [
  {
    id: "whatsapp-channel",
    preview: slide(
      "mena-law-reporters-whatsapp-channel-reminder.webp",
      "Social media design for MENA Law Reporters promoting its legal updates WhatsApp channel.",
      "Channel communication directing legal audiences to news and updates on WhatsApp.",
    ),
  },
  {
    id: "saudi-legal-career-article",
    preview: slide(
      "mena-law-reporters-saudi-legal-career-article.webp",
      "MENA Law Reporters article post about finding success in the Saudi legal field.",
      "Editorial career content for legal professionals working in Saudi Arabia.",
    ),
  },
  {
    id: "legal-interview",
    preview: slide(
      "mena-law-reporters-legal-job-interview-post.webp",
      "MENA Law Reporters bilingual social post asking whether a job interview was completed successfully.",
      "Bilingual career content for legal professionals and trainees.",
    ),
  },
  {
    id: "uae-career-opportunity",
    preview: slide(
      "mena-law-reporters-uae-legal-job-opportunity.webp",
      "Arabic career opportunity post for MENA Law Reporters presenting a legal role in the UAE.",
      "A bilingual job-opportunity format for the regional legal community.",
    ),
  },
  {
    id: "professional-consultation",
    preview: slide(
      "mena-law-reporters-professional-consultation-post.webp",
      "Arabic professional-development post for MENA Law Reporters about consulting colleagues.",
      "Professional guidance encouraging collaboration between legal colleagues.",
    ),
  },
  {
    id: "planning-mistakes",
    preview: slide(
      "mena-law-reporters-professional-planning-mistakes-post.webp",
      "Arabic educational post for MENA Law Reporters about avoiding professional planning mistakes.",
      "Practical career guidance presented in a structured bilingual format.",
    ),
  },
  {
    id: "time-management",
    preview: slide(
      "mena-law-reporters-legal-time-management-post.webp",
      "Arabic MENA Law Reporters post about dedicating weekly time to developing legal skills.",
      "Professional-development content focused on ongoing legal learning.",
    ),
  },
  {
    id: "saudi-lawyer-role",
    preview: slide(
      "mena-law-reporters-saudi-lawyer-job-opportunity.webp",
      "Arabic MENA Law Reporters job post presenting a lawyer opportunity in Riyadh, Saudi Arabia.",
      "A regional legal job opportunity presented through the shared content system.",
    ),
  },
  {
    id: "career-opportunity",
    preview: slide(
      "mena-law-reporters-saudi-legal-job-opportunity.webp",
      "Career opportunity post for MENA Law Reporters presenting a legal role in Saudi Arabia.",
      "A structured career-opportunity post for the regional legal community.",
    ),
  },
  {
    id: "eid-al-adha",
    preview: slide(
      "mena-law-reporters-eid-al-adha-greeting.webp",
      "Eid Al-Adha greeting designed for MENA Law Reporters with Arabic calligraphy and a Makkah illustration.",
      "A seasonal community message adapted to the platform's visual language.",
    ),
  },
  {
    id: "webinar-announcement",
    preview: slide(
      "mena-law-reporters-dr-ahmed-rabie-webinar.webp",
      "MENA Law Reporters webinar announcement featuring Dr Ahmed Rabie and an online event date.",
      "An event announcement for the platform's professional legal audience.",
    ),
  },
  {
    id: "client-communication",
    preview: slide(
      "mena-law-reporters-lawyer-client-communication-article.webp",
      "Arabic article post for MENA Law Reporters about strengthening communication between lawyers and clients.",
      "Editorial content translating a legal professional-development topic into a recognizable post format.",
    ),
  },
  {
    id: "linkedin-profile-guide",
    preview: linkedInProfileSlides[0],
    slides: linkedInProfileSlides,
  },
];

const squareItems: readonly SocialMediaGridItem[] = [
  {
    id: "professional-training",
    preview: slide(
      "mena-law-reporters-professional-training-post.webp",
      "Social media design for MENA Law Reporters presenting the importance of professional training.",
      "Educational content focused on professional development in the legal field.",
    ),
  },
  {
    id: "student-competition",
    preview: slide(
      "mena-law-reporters-student-competition-call-for-submissions.webp",
      "Call-for-submissions post from MENA Law Reporters promoting a summer academy opportunity in Hamburg.",
      "An educational opportunity formatted for law students and trainees.",
    ),
  },
  {
    id: "legal-job-search",
    preview: slide(
      "mena-law-reporters-legal-job-search-post.webp",
      "MENA Law Reporters social post asking legal professionals about finding job opportunities in the field.",
      "Career awareness content for lawyers, students, and trainees.",
    ),
  },
  {
    id: "legal-update",
    preview: slide(
      "mena-law-reporters-saudi-data-protection-update.webp",
      "Legal update post for MENA Law Reporters about Saudi penalties for personal data protection non-compliance.",
      "A legal update organized for quick recognition and reading.",
    ),
  },
  {
    id: "career-growth",
    preview: slide(
      "mena-law-reporters-legal-career-growth-post.webp",
      "MENA Law Reporters social post about professional growth in the legal field.",
      "Professional-development content for the legal community.",
    ),
  },
  {
    id: "economics-submissions",
    preview: slide(
      "mena-law-reporters-economics-student-call-for-submissions.webp",
      "MENA Law Reporters call-for-submissions post promoting an economics challenge for students.",
      "A student opportunity communicated through the editorial post system.",
    ),
  },
  {
    id: "scholarship",
    preview: slide(
      "mena-law-reporters-human-rights-scholarship-post.webp",
      "Scholarship opportunity post for MENA Law Reporters promoting the Satyrathi Summer School 2025.",
      "Opportunity content for students and early-career legal audiences.",
    ),
  },
  {
    id: "training-opportunity",
    preview: slide(
      "mena-law-reporters-social-programmes-training-opportunity.webp",
      "Training opportunity post for MENA Law Reporters about evaluating social programmes at the American University in Cairo.",
      "A professional training opportunity presented within the editorial content system.",
    ),
  },
  {
    id: "internship-scholarship",
    preview: slide(
      "mena-law-reporters-human-rights-internship-scholarship.webp",
      "Scholarship and internship post for MENA Law Reporters promoting experience in human rights and peace work in Qatar.",
      "A regional professional opportunity for students and early-career audiences.",
    ),
  },
  {
    id: "transitional-justice-opportunity",
    preview: slide(
      "mena-law-reporters-transitional-justice-career-opportunity.webp",
      "Career opportunity post for MENA Law Reporters promoting a transitional justice initiative in Africa.",
      "An international legal-sector career opportunity.",
    ),
  },
  {
    id: "lawyer-quote",
    preview: slide(
      "mena-law-reporters-thomas-jefferson-lawyer-quote.webp",
      "MENA Law Reporters quote post featuring Thomas Jefferson on the responsibility of lawyers.",
      "A legal profession quote presented in the platform's editorial style.",
    ),
  },
  {
    id: "legal-news-awareness",
    preview: slide(
      "mena-law-reporters-legal-news-awareness-post.webp",
      "MENA Law Reporters social post encouraging legal professionals to stay informed and connected.",
      "An awareness post reinforcing the platform's legal news role.",
    ),
  },
  {
    id: "mena-legal-career",
    preview: slide(
      "mena-law-reporters-mena-legal-career-post.webp",
      "MENA Law Reporters social post asking whether viewers aspire to start a legal career in the MENA region.",
      "Career-focused community content for aspiring legal professionals.",
    ),
  },
];

function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
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

export default function MenaLawReportersCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <Reveal className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-edge bg-[#e8e6e3] shadow-2xl shadow-black/10">
          <Image
            src={`${base}/mena-law-reporters-facebook-cover.webp`}
            alt="Facebook cover design for MENA Law Reporters, a legal media platform serving the Middle East and North Africa."
            width={2553}
            height={1080}
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="h-auto w-full"
          />
        </Reveal>

        <header className="py-14 md:py-20">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
              {project.subtitle}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">
              MENA Law Reporters
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
              A brand identity and digital communication system for legal news,
              education, professional development, and opportunities across the
              MENA region.
            </p>
            <dl className="mt-10 grid gap-7 border-t border-edge pt-8 sm:grid-cols-3">
              {[
                ["Market", project.market ?? "Middle East & North Africa"],
                ["Location", project.location ?? "Abu Dhabi, UAE"],
                ["Role", project.role ?? "Senior Graphic Designer / Digital & Content Designer"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            {project.scope?.length ? (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Scope</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project scope">
                  {project.scope.map((item) => (
                    <li key={item} className="rounded-full border border-edge px-3.5 py-2 text-xs text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </header>

        <section id="context" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Context">Project Context</Heading>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-lg font-semibold text-ink">The Platform</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                MENA Law Reporters is a MENA-focused legal media platform bringing
                together legal news, educational content, career opportunities,
                and professional community communication.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">The Challenge</h3>
              <p className="mt-4 leading-8 text-ink-soft">
                The platform serves multiple legal audiences and content types,
                so the visual system needed to make legal information feel clear,
                credible, structured, and easy to recognize across digital channels.
              </p>
            </div>
          </div>
          <p className="mt-9 text-sm text-ink-faint">
            Legal news · Education · Career opportunities · Professional community
          </p>
        </section>

        <MenaLawReportersIdentity />

        <section id="social-content" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Digital Content">A flexible editorial social system</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            Portrait and square formats organize legal updates, learning,
            professional guidance, jobs, training, and scholarships through a
            consistent bilingual hierarchy.
          </p>
          <SocialMediaGrid
            brandName="MENA Law Reporters"
            username="mena_law_reporters"
            subtitle="Legal media, education & professional community"
            logo={profile}
            logoAlt="MENA Law Reporters profile logo with a globe and scales of justice."
            logoBackground="#ffffff"
            logoRingClassName="from-[#be1e2d] via-[#d7d2ce] to-[#1d1d1b]"
            logoClassName="object-contain p-1"
            accentColor="#be1e2d"
            items={portraitItems}
            showEngagementCount={false}
          />
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Square posts</p>
            <SocialMediaGrid
              brandName="MENA Law Reporters"
              username="mena_law_reporters"
              subtitle="Legal media, education & professional community"
              logo={profile}
              logoAlt="MENA Law Reporters profile logo with a globe and scales of justice."
              logoBackground="#ffffff"
              logoClassName="object-contain p-1"
              accentColor="#be1e2d"
              items={squareItems}
              previewAspect="square"
              showProfileHeader={false}
              showEngagementCount={false}
            />
          </div>
        </section>

        <section id="channel-design" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Channel Design">Facebook cover and profile system</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            The channel artwork carries the same legal editorial language into a
            clear, recognizable Facebook presence.
          </p>
          <MenaLawReportersFacebookPage />
        </section>

        <section id="motion" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Motion Content">COP28 highlights</Heading>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
            A short vertical video extends the content system into event coverage
            while retaining the platform&apos;s editorial framing.
          </p>
          <Reveal className="mt-12">
            <figure className="mx-auto max-w-[24rem]">
              <div className="aspect-[9/16] overflow-hidden rounded-xl border border-edge bg-black shadow-2xl shadow-black/20">
                <VideoPlayer
                  src={`${socialBase}/mena-law-reporters-cop28-highlights-video.mp4`}
                  poster={`${socialBase}/mena-law-reporters-cop28-highlights-video-cover.webp`}
                  label="MENA Law Reporters vertical video featuring highlights from COP28 UAE."
                />
              </div>
              <figcaption className="mt-3 text-sm leading-6 text-ink-faint">
                COP28 UAE highlights · Vertical social video
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section id="decisions" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Rationale">Key Design Decisions</Heading>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {decisions.map(([title, description], index) => (
              <article key={title} className="border-t border-edge pt-5">
                <p className="font-display text-sm text-ink-faint">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="outcome" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Result">Outcome</Heading>
          <p className="mt-8 max-w-4xl text-lg leading-8 text-ink-soft">
            The completed work established one connected identity and digital
            communication system across the logo, color, bilingual typography,
            social content, Facebook page assets, editorial carousels, connected
            grids, and motion. The system gives different legal content types a
            consistent and recognizable visual structure without relying on one
            fixed format.
          </p>
        </section>

        <section id="scope" className="border-t border-edge py-16 md:py-24">
          <Heading eyebrow="Contribution">Project Scope</Heading>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</h3>
              <p className="mt-5 leading-8 text-ink">
                Senior Graphic Designer
                <br />
                Brand &amp; Digital Designer
                <br />
                Digital / Content Designer
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Responsibilities</h3>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
                {responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-ink-faint">Deliverables</h3>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-ink-soft">
                {deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <CaseStudyClosingCta
          title="Building a specialist brand that needs a clear identity and content system?"
          body="I design connected brand and digital communication systems that help complex subjects stay clear, credible, and recognizable."
        />
      </article>
    </main>
  );
}
