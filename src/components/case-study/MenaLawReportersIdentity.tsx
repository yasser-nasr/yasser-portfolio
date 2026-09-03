import Image from "@/components/case-study/CaseStudyImage";
import localFont from "next/font/local";

const base = "/projects/mena-law-reporters";

const zillaSlab = localFont({
  src: [
    {
      path: "../../../public/projects/mena-law-reporters/fonts/ZillaSlab-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/projects/mena-law-reporters/fonts/ZillaSlab-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/projects/mena-law-reporters/fonts/ZillaSlab-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/projects/mena-law-reporters/fonts/ZillaSlab-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/projects/mena-law-reporters/fonts/ZillaSlab-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

const cairo = localFont({
  src: "../../../public/projects/mena-law-reporters/fonts/Cairo-VariableFont_slnt,wght.ttf",
  display: "swap",
  weight: "200 1000",
});

const brandColors = [
  ["MENA Red", "#BE1E2D"],
  ["Black", "#000000"],
  ["White", "#FFFFFF"],
] as const;

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

function WorldIcon() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className="h-28 w-28 sm:h-36 sm:w-36" fill="none" stroke="currentColor" strokeWidth="4">
      <circle cx="80" cy="80" r="62" />
      <path d="M18 80h124M28 47h104M28 113h104M80 18c25 18 38 38 38 62s-13 44-38 62M80 18C55 36 42 56 42 80s13 44 38 62M80 18v124" />
    </svg>
  );
}

function JusticeScaleIcon() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className="h-28 w-28 sm:h-36 sm:w-36" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M80 24v104M49 137h62M61 128h38M32 50h96M80 35 32 50M80 35l48 15" />
      <path d="m32 50-20 45h40L32 50Zm96 0-20 45h40l-20-45Z" />
      <path d="M12 95c4 12 12 18 20 18s16-6 20-18M108 95c4 12 12 18 20 18s16-6 20-18" />
    </svg>
  );
}

export default function MenaLawReportersIdentity() {
  return (
    <>
      <section id="identity" className="border-t border-edge py-16 md:py-24">
        <Heading eyebrow="Identity">Logo &amp; Identity</Heading>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft">
          The identity brings the world and the justice scale into one symbol,
          connecting the platform&apos;s regional legal focus with its role as a
          source of news, education, and professional community communication.
        </p>

        <div className="mt-12 overflow-hidden rounded-xl border border-edge bg-[#f2f1ef] text-black md:mt-16">
          <div className="grid items-stretch md:grid-cols-[minmax(0,0.72fr)_auto_minmax(0,0.72fr)_auto_minmax(0,1.25fr)]">
            <div className="grid min-h-64 place-items-center p-8 text-black">
              <div className="flex w-full flex-col items-center text-center">
                <WorldIcon />
                <h3 className="mt-5 text-lg font-semibold">World form</h3>
                <p className="mt-2 max-w-48 text-sm text-black/60">Regional reach and connection</p>
              </div>
            </div>
            <div aria-hidden="true" className="hidden place-items-center text-3xl text-[#BE1E2D] md:grid">+</div>
            <div className="grid min-h-64 place-items-center border-t border-black/10 p-8 text-black md:border-l-0 md:border-t-0">
              <div className="flex w-full flex-col items-center text-center">
                <JusticeScaleIcon />
                <h3 className="mt-5 text-lg font-semibold">Justice scale</h3>
                <p className="mt-2 max-w-48 text-sm text-black/60">Law, balance, and authority</p>
              </div>
            </div>
            <div aria-hidden="true" className="hidden place-items-center text-3xl text-[#BE1E2D] md:grid">→</div>
            <div className="grid min-h-64 place-items-center border-t border-black/10 bg-white p-8 md:border-l md:border-t-0 sm:p-12">
              <Image
                src={`${base}/mena-law-reporters-logo.svg`}
                alt="MENA Law Reporters logo combining a world globe with balanced justice scales and an editorial wordmark."
                width={1740}
                height={576}
                sizes="(min-width: 1024px) 430px, 80vw"
                className="h-auto w-full max-w-[30rem]"
              />
            </div>
          </div>
          <p className="border-t border-black/10 px-6 py-4 text-sm leading-6 text-black/65">
            The globe provides the outer structure while the central justice
            scale turns the familiar legal symbol into a distinctive platform mark.
          </p>
        </div>
      </section>

      <section id="brand-system" className="border-t border-edge py-16 md:py-24">
        <Heading eyebrow="System">Brand System</Heading>
        <div className="mt-12 space-y-16">
          <div>
            <h3 className="text-xl font-semibold text-ink">Color</h3>
            <p className="mt-4 max-w-3xl leading-8 text-ink-soft">
              A focused red, black, and white palette creates strong editorial
              contrast while keeping legal information clear and recognizable.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {brandColors.map(([name, hex]) => (
                <div key={hex} className="overflow-hidden rounded-xl border border-edge bg-surface-card">
                  <div
                    className="aspect-[4/3] border-b border-black/10"
                    style={{ backgroundColor: hex }}
                    role="img"
                    aria-label={`${name} MENA Law Reporters brand color, ${hex}`}
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
            <p className="mt-4 max-w-3xl leading-8 text-ink-soft">
              Zilla Slab gives English communication an editorial, publication-led
              voice, while Cairo supports clear contemporary Arabic across news,
              education, and professional content.
            </p>
            <div className="mt-7 overflow-hidden rounded-xl border border-edge">
              <div className="grid md:grid-cols-2">
                <div className="bg-white p-7 text-black sm:p-10 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BE1E2D]">
                    English / Zilla Slab
                  </p>
                  <p className={`${zillaSlab.className} mt-10 text-5xl font-semibold leading-[0.95] sm:text-6xl`}>
                    Legal news.
                    <br />
                    Shared clearly.
                  </p>
                  <p className={`${zillaSlab.className} mt-10 text-2xl`}>
                    Aa Bb Cc Dd · 0123456789
                  </p>
                  <div className={`${zillaSlab.className} mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm`}>
                    <span className="font-light">Light</span>
                    <span className="font-normal">Regular</span>
                    <span className="font-medium">Medium</span>
                    <span className="font-semibold">Semibold</span>
                    <span className="font-bold">Bold</span>
                  </div>
                </div>
                <div className="border-t border-black/10 bg-[#BE1E2D] p-7 text-white sm:p-10 md:border-l md:border-t-0 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    Arabic / Cairo
                  </p>
                  <p
                    lang="ar"
                    dir="rtl"
                    className={`${cairo.className} mt-10 text-right text-5xl font-semibold leading-[1.35] sm:text-6xl`}
                  >
                    أخبار قانونية
                    <br />
                    برؤية واضحة
                  </p>
                  <p
                    lang="ar"
                    dir="rtl"
                    className={`${cairo.className} mt-8 text-right text-2xl text-white/80`}
                  >
                    أبجد هوز حطي كلمن · ١٢٣٤٥٦٧٨٩٠
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
