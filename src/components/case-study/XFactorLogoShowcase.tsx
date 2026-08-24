import Image from "@/components/case-study/CaseStudyImage";

const logoBase = "/projects/x-factor-interior-design/logo";

function Label({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 border-t px-5 py-4 text-[0.65rem] uppercase tracking-[0.18em] sm:px-6 ${inverse ? "border-white/20 text-[#F3F1EC]" : "border-black/10 text-[#625b52]"}`}>
      <span>{children}</span>
      <span aria-hidden="true">{index}</span>
    </div>
  );
}

export default function XFactorLogoShowcase() {
  return (
    <div className="space-y-5">
      <figure className="overflow-hidden rounded-xl border border-edge bg-[#F3F1EC]">
        <div className="grid min-h-[22rem] place-items-center px-8 py-16 sm:min-h-[30rem] sm:px-16">
          <Image
            src={`${logoBase}/x-factor-interior-design-vertical-logo.svg`}
            alt="Primary vertical logo for X Factor Interior Design, combining the X symbol with the full wordmark."
            width={1080}
            height={676}
            sizes="(min-width: 1280px) 560px, (min-width: 640px) 58vw, 76vw"
            className="h-auto w-full max-w-[35rem]"
          />
        </div>
        <Label index="01">Primary lockup</Label>
      </figure>

      <div className="grid gap-5 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-edge bg-[#D6D3CE] sm:col-span-2">
          <div className="grid min-h-48 place-items-center px-7 py-12 sm:min-h-64 sm:px-14">
            <Image
              src={`${logoBase}/x-factor-interior-design-horizontal-logo.svg`}
              alt="Horizontal X Factor Interior Design logo for wide-format brand applications."
              width={1080}
              height={201}
              sizes="(min-width: 1280px) 620px, (min-width: 640px) 62vw, 78vw"
              className="h-auto w-full max-w-[39rem]"
            />
          </div>
          <Label index="02">Horizontal configuration</Label>
        </figure>

        <figure className="overflow-hidden rounded-xl border border-edge bg-[#F3F1EC]">
          <div className="grid aspect-square place-items-center p-14 sm:p-16">
            <Image
              src={`${logoBase}/x-factor-interior-design-icon-logo.svg`}
              alt="Standalone X symbol used as the X Factor Interior Design brand icon."
              width={1080}
              height={1035}
              sizes="(min-width: 1280px) 230px, (min-width: 640px) 26vw, 52vw"
              className="h-auto w-full max-w-[15rem]"
            />
          </div>
          <Label index="03">Brand icon</Label>
        </figure>

        <figure className="overflow-hidden rounded-xl border border-edge bg-[#8A7A63]">
          <div className="grid aspect-square place-items-center px-8 py-14 sm:px-10">
            <div className="w-full rounded-sm bg-[#F3F1EC] px-6 py-8 shadow-[0_22px_60px_rgba(28,28,28,0.18)] sm:px-8">
              <Image
                src={`${logoBase}/x-factor-interior-design-wordmark-logo.svg`}
                alt="X Factor Interior Design wordmark applied to a warm-stone brand card."
                width={1080}
                height={140}
                sizes="(min-width: 1280px) 250px, (min-width: 640px) 27vw, 58vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <Label index="04" inverse>Wordmark application</Label>
        </figure>
      </div>
    </div>
  );
}
