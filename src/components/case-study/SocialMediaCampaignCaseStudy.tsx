import Image from "next/image";
import type { Project } from "@/data/projects";
import { socialCampaignAssets as assets } from "@/data/socialMediaCampaign";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import SocialMediaGrid from "./SocialMediaGrid";

type AssetKey = keyof typeof assets;

const campaigns: { name: string; direction: string; images: AssetKey[] }[] = [
  { name: "Sand Circus", direction: "Bilingual brand storytelling, talent, and cultural moments.", images: ["sand-circus-national-day", "sand-circus-talent-brand", "sand-circus-next-step"] },
  { name: "Memo Travel", direction: "Destination stories, coastal escapes, and travel packages.", images: ["memo-travel-honeymoon", "memo-travel-hurghada", "memo-travel-dahab", "memo-travel-dahab-coast", "memo-travel-sharm", "memo-travel-istanbul", "memo-travel-istanbul-evening", "memo-travel-saint-catherine", "memo-travel-snorkeling", "memo-travel-nuweiba", "memo-travel-sinai", "memo-travel-umrah-seven-days", "memo-travel-umrah-ten-days", "memo-travel-umrah-fifteen-days"] },
  { name: "SBH", direction: "A bilingual real estate services carousel, from introduction to consultation.", images: ["sbh-real-estate-services", "sbh-property-management", "sbh-leasing-services", "sbh-property-buying", "sbh-property-sales", "sbh-client-groups", "sbh-service-values", "sbh-consultation"] },
  { name: "LAPE", direction: "Environmental awareness and events through a connected green identity.", images: ["lape-climate-initiative", "lape-cop28-goals", "lape-climate-action", "lape-carbon-border-webinar"] },
  { name: "El Masrya", direction: "A consistent product presentation for cookware handles and accessories.", images: ["el-masrya-cookware-handle", "el-masrya-handle-200", "el-masrya-handle-203", "el-masrya-knob-302"] },
  { name: "Cultural Development Fund", direction: "Craft, culinary arts, and cultural financing.", images: ["cultural-development-fund-craft", "cultural-development-fund-culinary", "cultural-development-fund-financing"] },
];

const selected: { name: string; asset: AssetKey }[] = [
  { name: "Saudi National Day", asset: "saudi-national-day-belonging" },
  { name: "Saudi National Day", asset: "saudi-national-day-portrait" },
  { name: "Beyond", asset: "beyond-national-day" },
  { name: "Madina Women's Hospital", asset: "madina-womens-hospital" },
  { name: "Alsallal", asset: "alsallal-property-launch" },
  { name: "SkyTrack", asset: "skytrack-cargo-tracking" },
  { name: "Saudi Council of Engineers", asset: "saudi-council-of-engineers-arabic" },
  { name: "Saudi Council of Engineers", asset: "saudi-council-of-engineers" },
  { name: "Moeen / Design exercise", asset: "moeen-design-exercise" },
];

function post(asset: AssetKey, name: string) {
  const preview = { src: assets[asset].src, alt: assets[asset].alt, caption: name };
  if (asset === "sand-circus-talent-brand") {
    const english = assets["sand-circus-talent-brand-english"];
    return {
      id: asset,
      preview,
      slides: [
        { ...preview, caption: "Sand Circus / Talent x Brand / Arabic" },
        { src: english.src, alt: english.alt, caption: "Sand Circus / Talent x Brand / English" },
      ],
    };
  }
  return { id: asset, preview };
}

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
          <div className="mx-auto max-w-4xl space-y-16 md:space-y-24">
            {campaigns.map((campaign) => (
              <article key={campaign.name} aria-label={campaign.name}>
                <SocialMediaGrid
                  brandName={campaign.name}
                  username={campaign.name}
                  subtitle={campaign.direction}
                  logo={campaign.name === "LAPE" ? avatar.src : assets[campaign.images[0]].src}
                  logoAlt=""
                  logoClassName={campaign.name === "LAPE" ? "object-contain p-1" : "object-cover"}
                  items={campaign.images.map((asset) => post(asset, campaign.name))}
                  previewFit="contain"
                  mobileColumns={3}
                  showEngagementCount={false}
                />
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="selected-social" className="border-t border-edge py-16 md:py-24">
          <h2 id="selected-social" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Selected Social Designs</h2>
          <div className="mx-auto max-w-4xl">
            <SocialMediaGrid
              brandName="Yasser Nasr"
              username="Yasser Nasr"
              subtitle="Social designs across brands, plus a Moeen design exercise."
              logo="/brand/yasser-nasr-portrait.webp"
              logoAlt="Yasser Nasr"
              logoClassName="object-cover"
              items={selected.map(({ asset, name }) => post(asset, name))}
              previewFit="contain"
              mobileColumns={3}
              showEngagementCount={false}
            />
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
