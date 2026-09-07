import Image from "next/image";
import type { Project } from "@/data/projects";
import { socialCampaignAssets as assets } from "@/data/socialMediaCampaign";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import ZoomableCaseStudyImage from "./ZoomableCaseStudyImage";

type AssetKey = keyof typeof assets;

function Artwork({ asset, sizes = "(min-width: 1152px) 350px, (min-width: 640px) 31vw, 90vw" }: {
  asset: AssetKey;
  sizes?: string;
}) {
  const image = assets[asset];
  return <ZoomableCaseStudyImage {...image} label={image.alt} compact sizes={sizes} frameRadiusClassName="rounded-none" />;
}

function CampaignHeading({ name, direction, format = "Instagram / Selected posts" }: {
  name: string;
  direction: string;
  format?: string;
}) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-edge pb-6">
      <div className="min-w-0">
        <h3 className="text-2xl font-semibold text-ink md:text-3xl">{name}</h3>
        <p className="mt-2 max-w-2xl text-base leading-7 text-ink-soft">{direction}</p>
      </div>
      <span className="text-sm text-ink-faint">{format}</span>
    </header>
  );
}

const selected: { name: string; images: AssetKey[]; className: string }[] = [
  { name: "Cultural Development Fund", images: ["cultural-development-fund-craft", "cultural-development-fund-culinary"], className: "md:col-span-7" },
  { name: "Madina Women's Hospital", images: ["madina-womens-hospital"], className: "md:col-span-5 md:pt-24" },
  { name: "Alsallal", images: ["alsallal-property-launch"], className: "md:col-span-5" },
  { name: "El Masrya", images: ["el-masrya-cookware-handle"], className: "md:col-span-7 md:px-12 md:pt-24" },
  { name: "SkyTrack", images: ["skytrack-cargo-tracking"], className: "md:col-span-7 md:pr-12" },
  { name: "Saudi Council of Engineers", images: ["saudi-council-of-engineers"], className: "md:col-span-5 md:pt-24" },
];

export default function SocialMediaCampaignCaseStudy({ project }: { project: Project }) {
  const cover = assets["lape-facebook-cover"];
  const avatar = assets["lape-facebook-avatar"];

  return (
    <main id="main-content" className="min-w-0 flex-1 px-6 pb-8 pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <CaseStudyBackLink />
        <header className="pb-16 pt-7 md:pb-24">
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-ink-soft md:text-2xl">{project.subtitle}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft">A curated collection of social media design, campaign systems, and digital brand applications created across different clients and industries.</p>
          <Image src={project.image!} alt={project.imageAlt} width={1600} height={1000} sizes="(min-width: 1200px) 1152px, calc(100vw - 48px)" preload quality={100} className="mt-10 h-auto w-full rounded-xl" />
        </header>

        <section aria-labelledby="featured-campaigns" className="border-t border-edge py-16 md:py-24">
          <h2 id="featured-campaigns" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Featured Campaign Systems</h2>
          <div className="space-y-20 md:space-y-28">
            <article>
              <CampaignHeading name="Sand Circus" direction="Bilingual brand storytelling, talent, and cultural moments." />
              <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
                <Artwork asset="sand-circus-national-day" />
                <Artwork asset="sand-circus-talent-brand" />
                <Artwork asset="sand-circus-next-step" />
              </div>
            </article>

            <article>
              <CampaignHeading name="Memo Travel" direction="Destination-led travel stories, from coastal escapes to city breaks." />
              <div className="grid grid-cols-3 items-start gap-2 sm:gap-3">
                {(["memo-travel-honeymoon", "memo-travel-hurghada", "memo-travel-dahab", "memo-travel-istanbul", "memo-travel-snorkeling", "memo-travel-sinai"] as const).map((asset) => <Artwork key={asset} asset={asset} />)}
              </div>
            </article>

            <article>
              <CampaignHeading name="SBH" direction="A bilingual carousel introducing real estate services." format="Carousel / Selected slides" />
              <div className="grid items-start gap-6 md:grid-cols-2">
                <Artwork asset="sbh-real-estate-services" sizes="(min-width: 1152px) 560px, (min-width: 768px) 47vw, 90vw" />
                <div className="grid grid-cols-3 items-start gap-2 md:pt-16">
                  {(["sbh-property-management", "sbh-leasing-services", "sbh-property-sales"] as const).map((asset) => <Artwork key={asset} asset={asset} sizes="(min-width: 1152px) 180px, (min-width: 768px) 15vw, 29vw" />)}
                </div>
              </div>
            </article>

            <article>
              <CampaignHeading name="LAPE" direction="Environmental awareness through a connected green visual identity." />
              <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
                <Artwork asset="lape-climate-initiative" />
                <Artwork asset="lape-cop28-goals" />
                <Artwork asset="lape-climate-action" />
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="selected-social" className="border-t border-edge py-16 md:py-24">
          <h2 id="selected-social" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Selected Social Designs</h2>
          <div className="grid items-start gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-20">
            {selected.map((client) => (
              <div key={client.name} className={`min-w-0 ${client.className}`}>
                <p className="mb-4 text-sm font-medium text-ink-soft">{client.name}</p>
                <div className={`grid items-start gap-3 ${client.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {client.images.map((asset) => <Artwork key={asset} asset={asset} sizes={client.images.length > 1 ? "(min-width: 1152px) 320px, (min-width: 768px) 28vw, 44vw" : "(min-width: 1152px) 600px, (min-width: 768px) 50vw, 90vw"} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="profile-branding" className="border-t border-edge py-16 md:py-24">
          <h2 id="profile-branding" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Profile &amp; Channel Branding</h2>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-edge">
            <div className="border-b border-edge px-5 py-4 text-sm text-ink-soft sm:px-8">Facebook / LAPE</div>
            <Image {...cover} alt={cover.alt} sizes="(min-width: 1100px) 1024px, calc(100vw - 48px)" className="h-auto w-full" quality={100} />
            <div className="relative flex flex-col items-start gap-5 px-5 pb-7 sm:flex-row sm:items-end sm:px-8">
              <Image {...avatar} alt={avatar.alt} sizes="(min-width: 640px) 128px, 96px" className="relative -mt-8 h-24 w-24 shrink-0 rounded-full border-4 border-surface bg-white sm:-mt-12 sm:h-32 sm:w-32" />
              <div className="min-w-0 pt-4">
                <h3 className="text-xl font-semibold text-ink sm:text-2xl">Law Alliance for Protecting the Environment</h3>
                <p className="mt-2 text-sm text-ink-soft">LAPE</p>
              </div>
            </div>
            <div aria-hidden="true" className="flex gap-7 border-t border-edge px-5 py-4 text-sm text-ink-faint sm:px-8"><span className="text-ink">Posts</span><span>About</span><span>Photos</span></div>
          </div>
        </section>

        <CaseStudyClosingCta title="Let’s build your next campaign." body="Social content, campaign systems, and profile branding for your next chapter." />
      </div>
    </main>
  );
}
