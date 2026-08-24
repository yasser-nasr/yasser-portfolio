import Image from "@/components/case-study/CaseStudyImage";

function HomeIcon() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 45 48 18l32 27" />
      <path d="M24 40v37h48V40" />
      <path d="M40 77V56h16v21" />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 13c-11 1-22 9-31 21l-3 5c-2 4 3 7 6 4l13-11c5-4 10-5 14-2 3 2 4 5 4 10v43c0 7 4 10 10 10s10-3 10-10V40c0-7 3-10 9-10h7c4 0 6-3 6-7v-5c0-4-2-6-6-6h-8c-4 0-6 2-7 6h-7c-1-3-4-5-8-5Z" />
      <path d="M47 42h20" />
    </svg>
  );
}

function PaintBrushIcon() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="h-20 w-20 sm:h-24 sm:w-24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 17h54v24H18z" />
      <path d="M72 23h9v12h-9" />
      <path d="M45 41v14" />
      <path d="M36 55h18v30H36z" />
      <path d="M22 25h36" />
      <path d="M22 33h28" />
    </svg>
  );
}

const elements = [
  { label: "Home", description: "Property and place", icon: <HomeIcon /> },
  { label: "Hammer", description: "Repair and maintenance", icon: <HammerIcon /> },
  { label: "Paint brush", description: "Creates the painted-edge effect in the home frame", icon: <PaintBrushIcon /> },
] as const;

export default function RenovoFixLogoBreakdown() {
  return (
    <figure className="mt-10 overflow-hidden rounded-xl bg-[#F5F7F9] text-[#1E2A38]">
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4366B0] sm:text-sm">Logo breakdown</p>
        <div className="relative mt-8 grid grid-cols-3 gap-3 sm:gap-6">
          {elements.map((element, index) => (
            <div key={element.label} className="relative flex min-w-0 flex-col items-center text-center">
              <div className="grid h-24 w-full place-items-center text-[#1E2A38] sm:h-28">{element.icon}</div>
              <div className="mt-4 flex min-h-12 w-full items-start justify-center">
                <p className="text-sm font-semibold leading-5 text-[#1E2A38] sm:text-lg sm:leading-6">{element.label}</p>
              </div>
              <p className="mt-1 max-w-44 text-xs leading-5 text-[#4C5563] sm:text-sm sm:leading-6">{element.description}</p>
              {index < elements.length - 1 ? <span aria-hidden="true" className="absolute -right-[calc(0.375rem+0.5em)] top-10 hidden text-2xl font-light text-[#14B7A5] sm:block">+</span> : null}
            </div>
          ))}
        </div>

        <div className="my-8 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-[#1E2A38]/15" />
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#14B7A5] text-lg text-[#14B7A5]">↓</span>
          <span className="h-px flex-1 bg-[#1E2A38]/15" />
        </div>

        <div className="rounded-lg bg-white px-6 py-10 sm:px-10 sm:py-12">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#4366B0]">Final horizontal logo</p>
          <Image
            src="/projects/renovofix/logo/renovofix-horizontal-logo.svg"
            alt="Final RenovoFix horizontal logo combining the home, hammer, and painted-frame ideas."
            width={720}
            height={215}
            sizes="(min-width: 768px) 580px, calc(100vw - 96px)"
            className="mx-auto h-auto w-full max-w-[36rem]"
          />
        </div>
      </div>
      <figcaption className="border-t border-[#1E2A38]/10 px-5 py-4 text-sm leading-6 text-[#4C5563] sm:px-8">
        The final mark brings property, technical maintenance, and renovation into one recognizable symbol.
      </figcaption>
    </figure>
  );
}
