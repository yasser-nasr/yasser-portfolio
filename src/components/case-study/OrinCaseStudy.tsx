import Image from "@/components/case-study/CaseStudyImage";
import Reveal from "@/components/Reveal";
import ZoomableCaseStudyImage from "@/components/case-study/ZoomableCaseStudyImage";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";

const base = "/projects/orin";
const homepage = `${base}/orin-uae-consultancy-website-homepage-desktop.webp`;
const services = `${base}/orin-business-services-website-desktop.webp`;
const aboutMobile = `${base}/orin-consultancy-about-page-mobile.webp`;
const contactMobile = `${base}/orin-business-consultancy-contact-page-mobile.webp`;
const linkedinCover = `${base}/orin-financial-business-consultancy-linkedin-cover.webp`;
const profilePicture = `${base}/orin-consultancy-linkedin-profile-logo.webp`;
const keyWebsiteScreens = [
  {
    src: `${base}/orin-business-financial-consultancy-services-hero-desktop.webp`,
    alt: "Orin UAE business and financial consultancy services website hero presenting business setup, financial clarity, and long-term support.",
    label: "Services / Business & Financial Support",
    width: 1483,
    height: 1048,
  },
  {
    src: `${base}/orin-uae-business-consultancy-contact-form-mobile.webp`,
    alt: "Orin UAE business consultancy mobile contact form for booking expert guidance and sending a service enquiry.",
    label: "Contact / Consultation",
    width: 968,
    height: 1660,
  },
  {
    src: `${base}/orin-why-orin-business-support-desktop.webp`,
    alt: "Why Orin website section explaining structured business support, financial visibility, compliance, and long-term sustainability.",
    label: "Why Orin / Long-Term Business Support",
    width: 1483,
    height: 1009,
  },
  {
    src: `${base}/orin-consultancy-process-desktop.webp`,
    alt: "Orin consultancy process showing consultation, planning, execution, financial setup, and ongoing UAE business support.",
    label: "Process / Consultancy Journey",
    width: 1483,
    height: 678,
  },
  {
    src: `${base}/orin-about-business-consultancy-mobile-screen.webp`,
    alt: "Orin business consultancy mobile About screen focused on simplifying UAE business setup and supporting long-term growth.",
    label: "About / Long-Term Growth",
    width: 968,
    height: 1846,
  },
  {
    src: `${base}/orin-business-consultancy-principles-mobile-screen.webp`,
    alt: "Orin mobile website principles covering transparency, ownership, clarity, and long-term partnership for UAE businesses.",
    label: "Principles / How We Work",
    width: 968,
    height: 2741,
  },
  {
    src: `${base}/orin-integrated-business-consultancy-services-desktop.webp`,
    alt: "Orin integrated UAE consultancy services for bookkeeping and compliance, financial consultancy, and business setup.",
    label: "Integrated Services / UAE Businesses",
    width: 1483,
    height: 704,
  },
  {
    src: `${base}/orin-uae-business-setup-services-desktop.webp`,
    alt: "Orin UAE business setup services covering trade licenses, activity selection, visa documentation, and bank account guidance.",
    label: "Business Setup / Right Structure",
    width: 1483,
    height: 663,
  },
] as const;

function ChapterHeading({ label, title, copy }: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="grid gap-7 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
      <p className="font-display text-sm uppercase tracking-[0.24em] text-ink-faint md:text-base">
        {label}
      </p>
      <div>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-ink md:text-5xl">
          {title}
        </h2>
        {copy ? <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">{copy}</p> : null}
      </div>
    </Reveal>
  );
}

function BrowserFrame({ src, alt, position = "50% 0%", preload = false, className = "" }: {
  src: string;
  alt: string;
  position?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#07160f] shadow-[0_34px_90px_-38px_rgba(0,0,0,0.85)] ${className}`}>
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#0d2117] px-4">
        <span className="h-2 w-2 rounded-full bg-[#e8dfc0]/45" />
        <span className="h-2 w-2 rounded-full bg-[#6f8f7a]/45" />
        <span className="h-2 w-2 rounded-full bg-[#4faf8f]/45" />
        <span className="ml-3 h-4 w-2/5 rounded-full border border-white/10 bg-black/15" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          preload={preload}
          sizes="(min-width: 1152px) 1050px, (min-width: 768px) 88vw, 100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt, position = "50% 0%", className = "" }: {
  src: string;
  alt: string;
  position?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[5px] border-[#14271d] bg-[#07160f] shadow-[0_32px_70px_-28px_rgba(0,0,0,0.9)] ${className}`}>
      <div aria-hidden="true" className="relative z-10 mx-auto h-5 w-20 rounded-b-xl bg-[#14271d]" />
      <div className="relative aspect-[9/18.5] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 768px) 280px, 44vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

function DetailCrop({ src, alt, label, width, height, className = "" }: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  className?: string;
}) {
  return <ZoomableCaseStudyImage {...{ src, alt, label, width, height, className: className || "w-full" }} />;
}

function ScrollablePage({ src, alt, width, height, label }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-edge bg-surface-card shadow-xl shadow-black/10">
        <div aria-hidden="true" className="flex h-10 items-center gap-2 border-b border-edge bg-surface-deep px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-faint/40" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-surface-card" />
        </div>
        <div className="h-[30rem] overflow-y-auto overscroll-contain bg-[#07160f] md:h-[44rem]" tabIndex={0} aria-label={`Scrollable ${label} screenshot`}>
          <Image src={src} alt={alt} width={width} height={height} unoptimized sizes="(min-width: 1152px) 1152px, 100vw" className="h-auto w-full" />
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-ink-faint">{label} · Scroll to explore</figcaption>
    </figure>
  );
}

export default function OrinCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />

        <Reveal className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a2115] px-4 pb-5 pt-7 shadow-[0_40px_100px_-45px_rgba(0,0,0,0.9)] sm:px-7 sm:pb-8 md:px-10 md:pb-12 md:pt-12">
            <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_16%_18%,#4faf8f33,transparent_27%),radial-gradient(circle_at_90%_80%,#e8dfc022,transparent_28%)]" />
            <div className="relative pr-0 md:pr-28 lg:pr-36">
              <BrowserFrame
                src={homepage}
                alt="Orin UAE business consultancy website homepage design showing the desktop hero, navigation, and core services."
                preload
              />
            </div>
            <div className="orin-hero-phone">
              <PhoneFrame
                src={contactMobile}
                alt="Orin UAE business consultancy mobile website contact experience with responsive navigation and consultation form."
                className="w-full"
              />
            </div>
            <style>{`
              .orin-hero-phone {
                position: relative;
                width: 66.6667%;
                max-width: 20rem;
                margin: -2rem auto 0;
              }

              @media (min-width: 768px) {
                .orin-hero-phone {
                  position: absolute;
                  right: 1.5rem;
                  bottom: 1.75rem;
                  width: 24%;
                  margin-top: 0;
                }
              }

              @media (min-width: 1024px) {
                .orin-hero-phone {
                  right: 2.25rem;
                  bottom: 2.5rem;
                }
              }
            `}</style>
        </Reveal>

        <header className="py-14 md:py-20">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">
              {project.subtitle}
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-ink md:text-7xl">
              {project.companyName ?? project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
              Website Design / LinkedIn Cover / Digital Section Visuals
            </p>
            <dl className="mt-10 grid gap-7 border-t border-edge pt-8 sm:grid-cols-3">
              {[
                ["Market", project.market ?? "UAE"],
                ["Location", project.location ?? "Dubai, UAE"],
                ["Role", project.role ?? "UI/UX Designer"],
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

        <section id="website-overview" className="border-t border-edge py-16 md:py-24">
          <ChapterHeading
            label="Website Overview"
            title="Website Overview"
            copy="A clear and structured website experience designed to bring Orin's business setup, financial consultancy, and compliance services into one connected digital system."
          />
          <Reveal className="mt-12 md:mt-16">
            <ScrollablePage
              src={homepage}
              alt="Orin UAE business and financial consultancy desktop website homepage showing services, process, calls to action, and footer."
              width={2966}
              height={8888}
              label="Homepage · Desktop"
            />
          </Reveal>
          {project.website ? (
            <Reveal className="mt-8 flex flex-col items-start gap-5 border-t border-edge pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-ink-soft">
                Explore the live Orin website and its complete business consultancy experience.
              </p>
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the live Orin website at orin.ae (opens in a new tab)"
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-edge px-5 py-2.5 text-sm text-ink transition-colors hover:bg-surface-card"
              >
                Visit orin.ae ↗
              </a>
            </Reveal>
          ) : null}
        </section>

        <section id="key-screens" className="border-t border-edge py-16 md:py-24">
          <ChapterHeading
            label="Website"
            title="Key Website Screens & Digital Visuals"
            copy="Custom visual concepts were developed to communicate structure, clarity, integration, and growth without relying on generic corporate imagery."
          />
          <div className="mt-4">
            <Reveal>
              <DetailCrop {...keyWebsiteScreens[0]} />
            </Reveal>

            <div className="grid items-start gap-x-6 lg:grid-cols-2">
              {[keyWebsiteScreens[2], keyWebsiteScreens[3]].map((screen) => (
                <Reveal key={screen.src}>
                  <DetailCrop {...screen} />
                </Reveal>
              ))}
            </div>

            <div className="grid items-start gap-x-8 lg:grid-cols-3">
              <Reveal className="lg:col-span-2">
                <DetailCrop {...keyWebsiteScreens[6]} />
              </Reveal>
              <Reveal>
                <div style={{ width: "min(88%, 26rem)", marginInline: "auto" }}>
                  <DetailCrop {...keyWebsiteScreens[1]} />
                </div>
              </Reveal>
            </div>

            <Reveal>
              <DetailCrop {...keyWebsiteScreens[7]} />
            </Reveal>

            <div className="grid items-start gap-x-12 sm:grid-cols-2">
              {[keyWebsiteScreens[4], keyWebsiteScreens[5]].map((screen) => (
                <Reveal key={screen.src}>
                  <div style={{ width: "min(88%, 26rem)", marginInline: "auto" }}>
                    <DetailCrop {...screen} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="linkedin" className="border-t border-edge py-16 md:py-24">
          <ChapterHeading
            label="LinkedIn"
            title="Extending the Digital Experience"
            copy="The same visual direction was adapted for LinkedIn to create a consistent and recognizable digital presence."
          />
          <Reveal className="mt-12 overflow-hidden rounded-2xl border border-edge bg-[#e9e5db] p-4 shadow-xl shadow-black/10 sm:p-7 md:mt-16 md:p-10">
            <div className="overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_-35px_rgba(20,40,30,0.45)]">
              <div className="relative aspect-[5.9/1] overflow-hidden bg-[#e8dfc0]">
                <Image src={linkedinCover} alt="Orin UAE financial and business consultancy LinkedIn cover reading Your business, in safe hands." fill unoptimized sizes="(min-width: 1152px) 1050px, 100vw" className="object-cover" />
              </div>
              <div className="relative px-5 pb-7 pt-12 sm:px-8 sm:pb-9 sm:pt-16">
                <div className="absolute -top-8 left-5 h-16 w-16 overflow-hidden rounded-lg border-4 border-white bg-white shadow-md sm:-top-12 sm:left-8 sm:h-24 sm:w-24">
                  <Image src={profilePicture} alt="Orin business consultancy logo used as the LinkedIn profile image." fill unoptimized sizes="96px" className="object-cover" />
                </div>
                <p className="text-xl font-semibold text-[#1c3e2c] sm:text-2xl">Orin</p>
                <p className="mt-1 text-sm text-[#2b2b2b]/65">Financial & Business Partner</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-5 overflow-hidden rounded-xl border border-edge bg-[#e8dfc0]">
            <Image src={linkedinCover} alt="Full Orin financial consultancy LinkedIn cover design in cream, dark green, and muted sage." width={4700} height={796} unoptimized sizes="(min-width: 1152px) 1152px, 100vw" className="h-auto w-full" />
          </Reveal>
        </section>

        <section id="responsive" className="border-t border-edge py-16 md:py-24">
          <ChapterHeading
            label="Responsive"
            title="Designed Across Screens"
            copy="Layouts, spacing, navigation, and content hierarchy were adapted to maintain clarity and usability across screen sizes."
          />
          <Reveal className="relative mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1e14] p-5 sm:p-8 md:mt-16 md:p-12">
            <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(#e8dfc00d_1px,transparent_1px),linear-gradient(90deg,#e8dfc00d_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(13rem,0.5fr)]">
              <div>
                <BrowserFrame src={services} alt="Orin UAE business services website on desktop with a responsive content hierarchy." position="50% 0%" />
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/50">Desktop / Service Architecture</p>
              </div>
              <div>
                <PhoneFrame src={aboutMobile} alt="Orin consultancy About page on mobile with responsive navigation, philosophy, and supporting visuals." className="mx-auto w-full max-w-[15rem]" />
                <p className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-white/50">Mobile / Reflowed Hierarchy</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="final-showcase" className="border-t border-edge py-16 md:py-24">
          <ChapterHeading label="Showcase" title="Final Showcase" />
          <Reveal className="relative mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07160f] p-5 sm:p-8 md:mt-16 md:p-12">
            <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(circle_at_80%_15%,#4faf8f33,transparent_30%),radial-gradient(circle_at_15%_90%,#e8dfc026,transparent_34%)]" />
            <div className="relative grid items-center gap-8 md:grid-cols-3 md:gap-10">
              <div className="space-y-6 md:col-span-2">
                <BrowserFrame src={homepage} alt="Orin UAE business consultancy desktop website homepage in the final digital design showcase." position="50% 0%" />
                <div className="w-full overflow-hidden rounded-lg border border-white/15 bg-[#e8dfc0] shadow-2xl">
                  <Image src={linkedinCover} alt="Orin financial and business consultancy LinkedIn cover integrated into the final project showcase." width={4700} height={796} unoptimized sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full" />
                </div>
              </div>
              <div className="mx-auto w-full" style={{ maxWidth: "20rem" }}>
                <PhoneFrame src={aboutMobile} alt="Orin UAE consultancy mobile About page in the final responsive website showcase." className="w-full" />
              </div>
            </div>
          </Reveal>
        </section>

        <CaseStudyClosingCta
          title="Looking for a clear digital experience for a complex service?"
          body="I design structured websites and visual systems that make businesses easier to understand and engage with."
          primaryLabel="Start a Conversation"
        />
      </article>
    </main>
  );
}
