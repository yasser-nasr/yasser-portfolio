import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import PresentationDeckViewer, { type PresentationSlide } from "./PresentationDeckViewer";

const base = "/projects/presentations/alsallal-pitch-deck/slides";
const slideDetails = [
  { page: "01", title: "Cover", alt: "Alsallal Developments investor pitch deck cover presenting the message Your Trusted Local Development Partner.", width: 6000, height: 3375 },
  { page: "02", title: "Our Team", alt: "Alsallal Developments team structure slide showing leadership and delivery roles in an organizational diagram.", width: 6640, height: 3735 },
  { page: "03", title: "Strength Through Partnership", alt: "Partnership slide presenting the Alsallal Developments network and strategic collaborators.", width: 6640, height: 3735 },
  { page: "04", title: "The Big Opportunity", alt: "Investor pitch slide contrasting Dubai's development opportunity with land sourcing and delivery challenges.", width: 4027, height: 2265 },
  { page: "05", title: "Our Solution", alt: "Three-step real estate development framework covering sourcing, launch, tender, execution, and procurement.", width: 4027, height: 2265 },
  { page: "06", title: "Step 1: Plot Sourcing", alt: "Process slide explaining plot sourcing and feasibility study activities for real estate development.", width: 4427, height: 2490 },
  { page: "07", title: "Step 2: Design and Launch", alt: "Process slide covering the design and launch package alongside sales strategy and launch planning.", width: 4427, height: 2490 },
  { page: "08", title: "Step 3: Tender and Execution", alt: "Process slide outlining tender, execution, procurement, and project management activities.", width: 4427, height: 2490 },
  { page: "09", title: "Why We Win", alt: "Competitive advantage slide presenting Alsallal Developments' structured, data-driven, transparent delivery model.", width: 6640, height: 3735 },
  { page: "10", title: "Case Study Teaser", alt: "Case study teaser slide mapping analysis, feasibility, design workflow, cost control, and value creation.", width: 6640, height: 3735 },
  { page: "11", title: "What We're Raising", alt: "Investor funding slide presenting a pledged property option and cash injection structure.", width: 6640, height: 3735 },
  { page: "13", title: "The Next Step", alt: "Closing call-to-action slide inviting the audience to review the case study with Alsallal Developments.", width: 6640, height: 3735 },
  { page: "14", title: "Thank You", alt: "Final Alsallal Developments thank-you slide with the corporate logo on a muted purple background.", width: 5334, height: 3000 },
] as const;

const slides: PresentationSlide[] = slideDetails.map((slide) => ({
  src: `${base}/alsallal-developments-pitch-deck-source-page-${slide.page}.webp`,
  title: slide.title,
  alt: slide.alt,
  width: slide.width,
  height: slide.height,
}));

const happyTenantBase = "/projects/presentations/happy-tenant-user-guide/slides";
const happyTenantSlides: PresentationSlide[] = [
  {
    src: `${happyTenantBase}/sbh-happy-tenant-maintenance-request-user-guide-page-01.webp`,
    title: "Introduction and process overview",
    alt: "SBH Happy Tenant user guide introduction with a five-step overview for submitting a property maintenance request.",
    width: 1500,
    height: 2667,
  },
  {
    src: `${happyTenantBase}/sbh-happy-tenant-maintenance-request-user-guide-page-02.webp`,
    title: "Application access and Help Desk",
    alt: "Happy Tenant Plus guide page showing the app icon, login screen, credentials step, and Help Desk navigation on mobile phones.",
    width: 1500,
    height: 2667,
  },
  {
    src: `${happyTenantBase}/sbh-happy-tenant-maintenance-request-user-guide-page-03.webp`,
    title: "Category selection and request submission",
    alt: "Happy Tenant Plus guide page explaining maintenance category selection, request form completion, submission, and SBH support details.",
    width: 1500,
    height: 2667,
  },
];

const apartmentRefurbishmentBase = "/projects/presentations/apartment-refurbishment-timeline-payment-schedule/slides";
const apartmentRefurbishmentSlides: PresentationSlide[] = [
  {
    src: `${apartmentRefurbishmentBase}/sbh-apartment-refurbishment-timeline-payment-schedule-page-01.webp`,
    title: "Apartment refurbishment overview",
    alt: "SBH apartment refurbishment timeline and payment schedule cover for Al Mass Tower Apartment 2002 in Dubai.",
    width: 827,
    height: 1170,
  },
  {
    src: `${apartmentRefurbishmentBase}/sbh-apartment-refurbishment-timeline-payment-schedule-page-02.webp`,
    title: "Six-week journey and payment milestones",
    alt: "Apartment refurbishment schedule showing a six-week project journey, payment milestones, payment process, and project cost summary.",
    width: 1654,
    height: 2339,
  },
  {
    src: `${apartmentRefurbishmentBase}/sbh-apartment-refurbishment-timeline-payment-schedule-page-03.webp`,
    title: "Project phases and responsibilities",
    alt: "Apartment refurbishment table detailing project phases, timelines, work activities, responsible parties, and advance payment timing.",
    width: 1654,
    height: 2339,
  },
];

const boardSummaryBase = "/projects/presentations/board-summary-epc-vs-pmc-dubai-project/slides";
const boardSummarySlides: PresentationSlide[] = [
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-01.webp`,
    title: "Development delivery and funding strategy",
    alt: "A1 Investments board presentation cover for a Dubai development delivery and funding strategy comparing EPC with an owner-led model.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-02.webp`,
    title: "Project snapshot",
    alt: "Dubai residential development project snapshot summarizing land acquisition, unit strategy, equity sponsorship, return target, and secondary market positioning.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-03.webp`,
    title: "Key strategic decision",
    alt: "Board decision slide comparing a full engineering, procurement, and construction model with using a project management consultant.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-04.webp`,
    title: "What full EPC delivers",
    alt: "Board summary slide outlining the delivery structure, pricing, transparency, and owner involvement associated with a full EPC contract.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-05.webp`,
    title: "Why full EPC is not optimal",
    alt: "Strategic assessment slide explaining EPC margin, cost, return, and contractor-risk implications for the Dubai residential project.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-07.webp`,
    title: "Role of the PMC",
    alt: "Project management consultant role slide covering owner representation, programme and cost management, reporting, and governance.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-09.webp`,
    title: "When EPC would be reconsidered",
    alt: "Board slide listing project conditions that could support reconsidering an EPC delivery model in the future.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-10.webp`,
    title: "Board recommendation",
    alt: "Board recommendation slide supporting a project management consultant and owner-controlled delivery model for the current development.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${boardSummaryBase}/a1-investments-dubai-epc-vs-pmc-board-summary-slide-11.webp`,
    title: "Thank you",
    alt: "Closing slide for the A1 Investments Dubai project board presentation.",
    width: 5334,
    height: 3000,
  },
];

const sbhCompanyProfileBase = "/projects/presentations/sbh-company-profile/slides";
const sbhCompanyProfileSlides: PresentationSlide[] = [
  {
    src: `${sbhCompanyProfileBase}/sbh-property-management-real-estate-company-profile-slide-01.webp`,
    title: "Company profile cover",
    alt: "SBH company profile cover for property management and real estate brokerage, featuring the Dubai skyline in a blue visual system.",
    width: 1920,
    height: 1080,
  },
  {
    src: `${sbhCompanyProfileBase}/sbh-property-management-real-estate-company-profile-slide-02.webp`,
    title: "About SBH",
    alt: "SBH company profile introduction presenting regulatory compliance, managed property types, and the owner profile served by the company.",
    width: 2667,
    height: 1500,
  },
  {
    src: `${sbhCompanyProfileBase}/sbh-property-management-real-estate-company-profile-slide-03.webp`,
    title: "Core services",
    alt: "SBH core services slide outlining property management and real estate brokerage capabilities.",
    width: 3574,
    height: 2010,
  },
  {
    src: `${sbhCompanyProfileBase}/sbh-property-management-real-estate-company-profile-slide-04.webp`,
    title: "Why choose SBH",
    alt: "SBH company profile slide highlighting a portfolio of more than 40 properties and the company's experience, market expertise, service model, and client approach.",
    width: 2667,
    height: 1500,
  },
  {
    src: `${sbhCompanyProfileBase}/sbh-property-management-real-estate-company-profile-slide-05.webp`,
    title: "Management process and commitment",
    alt: "SBH company profile slide presenting the property management process from assessment through reporting and the company's service commitment.",
    width: 2667,
    height: 1500,
  },
];

const meydanMemorandumBase = "/projects/presentations/meydan-avenue-investment-memorandum/slides";
const meydanMemorandumSlides: PresentationSlide[] = [
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-01.webp`,
    title: "Investment memorandum cover",
    alt: "Alsallal Developments investment memorandum cover for a Meydan Avenue real estate opportunity in Dubai.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-02.webp`,
    title: "Summary and strategy",
    alt: "Section divider introducing the summary and strategy for the Meydan Avenue investment memorandum.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-03.webp`,
    title: "Meydan Avenue site overview",
    alt: "Meydan Avenue site overview combining plot details, approximate land value, development strategy, timescale, and a Dubai location map.",
    width: 2347,
    height: 1320,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-04.webp`,
    title: "The area at a glance",
    alt: "Section divider introducing the Meydan Avenue location and surrounding area analysis.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-05.webp`,
    title: "Location connectivity",
    alt: "Meydan Avenue location slide showing travel distances to Meydan Racecourse, North London Collegiate School, Downtown Dubai, Meydan One Mall, Dubai International Airport, and Dubai Marina.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-06.webp`,
    title: "Comparable market performance",
    alt: "Investment memorandum slide comparing residential developments and their reported price appreciation in the Meydan Avenue market.",
    width: 3974,
    height: 2250,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-07.webp`,
    title: "Development market outlook",
    alt: "Meydan Avenue market outlook summarizing rental demand, infrastructure access, nearby destinations, and the potential for capital appreciation.",
    width: 2667,
    height: 1500,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-08.webp`,
    title: "Case study",
    alt: "Section divider introducing the real estate case study in the Meydan Avenue investment memorandum.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-09.webp`,
    title: "Case study property performance",
    alt: "Property case study slide combining building photography with occupancy, apartment specification, amenity, and retail-space observations.",
    width: 3760,
    height: 2115,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-10.webp`,
    title: "Investment strategy",
    alt: "Section divider introducing the proposed Meydan Avenue real estate investment strategy.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-11.webp`,
    title: "Off-plan sales strategy",
    alt: "Off-plan sales investment strategy slide presenting total return, investment, project cost, profit, margin, cash multiple, and payback indicators.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-12.webp`,
    title: "Financial modeling parameters",
    alt: "Financial modeling parameters slide presenting the proposed payment plan alongside unit, area, and pricing assumptions.",
    width: 2667,
    height: 1500,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-13.webp`,
    title: "Investment disclaimer",
    alt: "Section divider introducing the investment memorandum disclaimer and supporting disclosures.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-14.webp`,
    title: "Investment terms and disclosures",
    alt: "Detailed investment memorandum disclosure page covering the offer terms, risk considerations, legal conditions, and investor responsibilities.",
    width: 5334,
    height: 3000,
  },
  {
    src: `${meydanMemorandumBase}/alsallal-developments-meydan-avenue-investment-memorandum-slide-15.webp`,
    title: "Thank you",
    alt: "Closing slide for the Alsallal Developments Meydan Avenue investment memorandum.",
    width: 5334,
    height: 3000,
  },
];

export default function PresentationsCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 pt-32 md:pt-40">
      <article className="mx-auto w-full min-w-0 max-w-6xl px-6">
        <CaseStudyBackLink />

        <header className="py-14 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.22em] text-ink-faint md:text-base">Presentation Design / Pitch Decks / Reports</p>
          <h1 className="mt-5 max-w-5xl break-words text-4xl font-semibold leading-tight text-ink md:text-7xl">Presentations, Pitch Decks &amp; Reports</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">A growing collection of narrative-led presentation and information design, spanning investment memoranda, company profiles, board-level decision support, practical user guidance, and project planning for real estate audiences.</p>
          <dl className="mt-10 grid gap-6 border-t border-edge pt-7 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Formats</dt><dd className="mt-2 text-sm leading-6 text-ink">Pitch decks, memoranda, company profiles, and reports</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Market</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.market}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.16em] text-ink-faint">Role</dt><dd className="mt-2 text-sm leading-6 text-ink">{project.role}</dd></div>
          </dl>
        </header>

        <section aria-labelledby="alsallal-deck-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Featured Deck 01</p>
            <h2 id="alsallal-deck-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Alsallal Developments Investor Pitch</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A concise investment narrative that moves from market opportunity and delivery challenges to a three-step development framework, competitive advantages, funding needs, and clear next steps.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer slides={slides} ariaLabel="Alsallal Developments investor pitch deck" />
          </div>
        </section>

        <section aria-labelledby="happy-tenant-guide-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">User Guide 02</p>
            <h2 id="happy-tenant-guide-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Happy Tenant Maintenance Request Guide</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A three-page mobile application guide created for SBH tenants. The vertical format combines concise instructions with annotated interface screens to explain installation, login, Help Desk access, category selection, and maintenance request submission.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer
              slides={happyTenantSlides}
              ariaLabel="SBH Happy Tenant maintenance request user guide"
            />
          </div>
        </section>

        <section aria-labelledby="apartment-refurbishment-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Project Schedule 03</p>
            <h2 id="apartment-refurbishment-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Apartment Refurbishment: Timeline &amp; Payment Schedule</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A three-page project document for an apartment refurbishment at Al Mass Tower in Dubai. The layout turns a six-week delivery plan, payment milestones, cost summaries, work phases, and team responsibilities into a clear client-facing reference.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer
              slides={apartmentRefurbishmentSlides}
              ariaLabel="SBH apartment refurbishment timeline and payment schedule"
            />
          </div>
        </section>

        <section aria-labelledby="board-summary-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Board Presentation 04</p>
            <h2 id="board-summary-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">EPC vs PMC: Dubai Project Board Summary</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A nine-slide executive presentation for A1 Investments comparing a full EPC contract with a project management consultant and owner-led delivery model. The sequence moves from the project snapshot through cost and risk implications to the final board recommendation.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer
              slides={boardSummarySlides}
              ariaLabel="A1 Investments EPC versus PMC Dubai project board summary"
            />
          </div>
        </section>

        <section aria-labelledby="sbh-company-profile-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Company Profile 05</p>
            <h2 id="sbh-company-profile-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">SBH Company Profile</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A five-slide company profile for SBH, presenting its property management and real estate brokerage services in Dubai. The profile combines a restrained corporate visual system with a clear overview of compliance, service capabilities, operating strengths, management process, and client commitment.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer
              slides={sbhCompanyProfileSlides}
              ariaLabel="SBH property management and real estate brokerage company profile"
            />
          </div>
        </section>

        <section aria-labelledby="meydan-memorandum-heading" className="border-t border-edge py-16 md:py-24">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Investment Memorandum 06</p>
            <h2 id="meydan-memorandum-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-ink md:text-5xl">Meydan Avenue Investment Memorandum</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft md:text-lg">A 15-slide investment memorandum for Alsallal Developments, organizing a Meydan Avenue opportunity into site context, market evidence, comparable development performance, a property case study, the proposed off-plan strategy, financial assumptions, and supporting disclosures.</p>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PresentationDeckViewer
              slides={meydanMemorandumSlides}
              ariaLabel="Alsallal Developments Meydan Avenue investment memorandum"
            />
          </div>
        </section>

        <section aria-labelledby="design-approach-heading" className="border-t border-edge py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
            <Reveal>
              <p className="font-display text-sm uppercase tracking-[0.2em] text-ink-faint">Design Approach</p>
              <h2 id="design-approach-heading" className="mt-4 text-3xl font-semibold text-ink md:text-5xl">Built to guide the room</h2>
            </Reveal>
            <Reveal className="space-y-5 text-base leading-8 text-ink-soft md:text-lg">
              <p>Each project uses a format suited to its audience. Pitch decks, investment memoranda, board summaries, and company profiles control pacing through one message per slide, while guides and schedules connect instructions, dates, costs, and responsibilities to the relevant visual reference.</p>
              <p>Clear hierarchy, focused copy, and consistent visual systems make investment evidence, company information, executive decisions, and project planning easy to follow.</p>
            </Reveal>
          </div>
        </section>

        <CaseStudyClosingCta
          title="Need a presentation that makes complex information clear?"
          body="I design pitch decks, reports, and executive presentations with a strong narrative, clear information hierarchy, and a visual system built for the audience."
        />
      </article>
    </main>
  );
}
