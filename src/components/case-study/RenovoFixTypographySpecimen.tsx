import { renovofixGeSs, renovofixPoppins } from "@/fonts/renovofix/fonts";

export default function RenovoFixTypographySpecimen() {
  return (
    <figure className="mt-10 min-w-0">
      <div className="overflow-hidden rounded-xl bg-[#1E2A38] text-white">
        <div className="grid min-w-0 md:grid-cols-2">
          <section
            lang="en"
            aria-labelledby="renovofix-english-specimen"
            className={`${renovofixPoppins.className} min-w-0 p-6 sm:p-8 md:p-10 lg:p-12`}
          >
            <p id="renovofix-english-specimen" className="text-xs font-medium uppercase tracking-[0.18em] text-[#14B7A5] sm:text-sm">
              English / Poppins
            </p>
            <p className="mt-10 break-words text-[clamp(2rem,7vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white md:text-[clamp(2.25rem,4vw,3.5rem)]">
              PROFESSIONAL PROPERTY CARE
            </p>
            <p className="mt-8 text-xl font-medium leading-snug text-[#D6EEEE] sm:text-2xl">
              Reliable maintenance.<br />Clear communication.
            </p>
            <p className="mt-6 max-w-md text-base font-normal leading-7 text-white/75">
              Professional maintenance services designed around quality, clarity, and peace of mind.
            </p>
            <span className="mt-8 inline-flex min-h-11 items-center rounded-md bg-[#4366B0] px-5 py-2.5 text-sm font-medium text-white">
              Book a Service
            </span>
            <div className="mt-12 border-t border-white/15 pt-6">
              <p className="text-lg font-medium tracking-wide text-white sm:text-xl">Aa Bb Cc Dd Ee</p>
              <p className="mt-2 text-base font-normal tracking-[0.12em] text-white/60">0123456789</p>
            </div>
          </section>

          <section
            lang="ar"
            dir="rtl"
            aria-labelledby="renovofix-arabic-specimen"
            className={`${renovofixGeSs.className} min-w-0 border-t border-white/15 p-6 text-right sm:p-8 md:border-l md:border-t-0 md:p-10 lg:p-12`}
          >
            <p id="renovofix-arabic-specimen" className="text-sm font-medium tracking-wide text-[#14B7A5] sm:text-base">
              العربية / GE SS
            </p>
            <p className="mt-10 break-words text-[clamp(2.1rem,8vw,4rem)] font-bold leading-[1.25] text-white md:text-[clamp(2.35rem,4vw,3.5rem)]">
              صيانة احترافية للعقار
            </p>
            <p className="mt-8 text-2xl font-medium leading-[1.55] text-[#D6EEEE] sm:text-3xl">
              تنفيذ موثوق.<br />وتواصل واضح.
            </p>
            <p className="mt-6 max-w-md text-lg font-light leading-9 text-white/75 md:mr-0">
              خدمات صيانة احترافية ترتكز على الجودة والوضوح وراحة البال.
            </p>
            <span className="mt-8 inline-flex min-h-11 items-center rounded-md bg-[#4366B0] px-5 py-2.5 text-base font-medium text-white">
              احجز خدمة
            </span>
            <div className="mt-12 border-t border-white/15 pt-6">
              <p className="text-xl font-medium tracking-wide text-white sm:text-2xl">أ ب ت ث ج ح خ</p>
              <p className="mt-2 text-lg font-light tracking-[0.1em] text-white/60">١٢٣٤٥٦٧٨٩٠</p>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-4 text-sm leading-6 text-ink-faint">
        A bilingual hierarchy designed for clarity across digital and social communication.
      </figcaption>
    </figure>
  );
}
