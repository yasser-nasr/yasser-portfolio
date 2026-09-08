import Image from "next/image";
import type { Project } from "@/data/projects";
import { socialCampaignAssets as assets } from "@/data/socialMediaCampaign";
import { CaseStudyBackLink, CaseStudyClosingCta } from "./CaseStudyLayout";
import SocialMediaGrid from "./SocialMediaGrid";
import SnapchatStoryViewer from "./SnapchatStoryViewer";
import LapeFacebookPage from "./LapeFacebookPage";

type AssetKey = keyof typeof assets;

const sbhCarouselAssets: readonly AssetKey[] = [
  "sbh-real-estate-services",
  "sbh-property-management",
  "sbh-leasing-services",
  "sbh-property-buying",
  "sbh-property-sales",
  "sbh-client-groups",
  "sbh-service-values",
  "sbh-consultation",
];

const campaigns: { name: string; direction: string; images: AssetKey[] }[] = [
  { name: "Sand Circus", direction: "Bilingual brand storytelling, talent, and cultural moments.", images: ["saudi-national-day-belonging", "sand-circus-talent-brand", "sand-circus-next-step", "sand-circus-national-day"] },
  { name: "Memo Travel", direction: "Destination stories, coastal escapes, and travel packages.", images: ["memo-travel-honeymoon", "memo-travel-hurghada", "memo-travel-dahab", "memo-travel-dahab-coast", "memo-travel-sharm", "memo-travel-istanbul", "memo-travel-istanbul-evening", "memo-travel-saint-catherine", "memo-travel-snorkeling", "memo-travel-nuweiba", "memo-travel-sinai", "memo-travel-umrah-seven-days", "memo-travel-umrah-ten-days", "memo-travel-umrah-fifteen-days"] },
  { name: "El Masrya", direction: "A consistent product presentation for cookware handles and accessories.", images: ["el-masrya-cookware-handle", "el-masrya-handle-200", "el-masrya-handle-203", "el-masrya-knob-302"] },
  { name: "Cultural Development Fund", direction: "Craft, culinary arts, and cultural financing.", images: ["cultural-development-fund-craft", "cultural-development-fund-culinary", "cultural-development-fund-financing"] },
];

const selected: { name: string; asset: AssetKey }[] = [
  { name: "Beyond", asset: "beyond-national-day" },
  { name: "Madina Women's Hospital", asset: "madina-womens-hospital" },
  { name: "SBH / Real Estate Services", asset: "sbh-real-estate-services" },
  { name: "Alsallal", asset: "alsallal-property-launch" },
  { name: "SkyTrack", asset: "skytrack-cargo-tracking" },
  { name: "Moeen", asset: "moeen-design-exercise" },
];

function post(asset: AssetKey, name: string) {
  const preview = { src: assets[asset].src, alt: assets[asset].alt, caption: name };
  if (asset === "sbh-real-estate-services") {
    return {
      id: asset,
      profileName: name,
      preview,
      slides: sbhCarouselAssets.map((slideAsset, index) => ({
        src: assets[slideAsset].src,
        alt: assets[slideAsset].alt,
        caption: `SBH / Real Estate Services / Slide ${index + 1}`,
      })),
    };
  }
  if (asset === "saudi-national-day-belonging") {
    const portrait = assets["saudi-national-day-portrait"];
    return {
      id: asset,
      profileName: name,
      preview,
      slides: [
        { ...preview, caption: "Sand Circus / Saudi National Day / A Story of Belonging" },
        { src: portrait.src, alt: portrait.alt, caption: "Sand Circus / Saudi National Day / Portrait" },
      ],
    };
  }
  if (asset === "sand-circus-talent-brand") {
    const english = assets["sand-circus-talent-brand-english"];
    return {
      id: asset,
      profileName: name,
      preview,
      slides: [
        { ...preview, caption: "Sand Circus / Talent x Brand / Arabic" },
        { src: english.src, alt: english.alt, caption: "Sand Circus / Talent x Brand / English" },
      ],
    };
  }
  return { id: asset, profileName: name, preview };
}

export default function SocialMediaCampaignCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main-content" className="min-w-0 flex-1 pb-8 pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <CaseStudyBackLink />
        <header className="pb-16 pt-7 md:pb-24">
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-ink-soft md:text-2xl">{project.subtitle}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft">A curated collection of social media design, campaign systems, and digital brand applications created across different clients and industries.</p>
          <Image src={project.image!} alt={project.imageAlt} width={1600} height={1000} sizes="(min-width: 1200px) 1152px, calc(100vw - 48px)" preload quality={100} className="mt-10 h-auto w-full rounded-xl" />
        </header>

        <section aria-labelledby="featured-campaigns" className="border-t border-edge py-16 md:py-24">
          <h2 id="featured-campaigns" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Featured Campaign Systems</h2>
          <div className="w-full space-y-16 md:space-y-24">
            {campaigns.map((campaign) => (
              <article key={campaign.name} aria-label={campaign.name}>
                <SocialMediaGrid
                  brandName={campaign.name}
                  username={campaign.name}
                  subtitle={campaign.direction}
                  logo={assets[campaign.images[0]].src}
                  logoAlt=""
                  logoClassName="object-cover"
                  items={campaign.images.map((asset) => post(asset, campaign.name))}
                  showProfileImage={false}
                  followButtonClassName="rounded-full bg-ink text-surface transition-opacity hover:opacity-80"
                  verificationClassName="text-ink-soft"
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
          <div className="w-full">
            <SocialMediaGrid
              brandName="Selected Social Designs"
              username="Selected Social Designs"
              subtitle="Social designs across brands"
              logo="/brand/yasser-nasr-portrait.webp"
              logoAlt=""
              logoClassName="object-cover"
              items={selected.map(({ asset, name }) => post(asset, name))}
              showProfileImage={false}
              followButtonClassName="rounded-full bg-ink text-surface transition-opacity hover:opacity-80"
              verificationClassName="text-ink-soft"
              previewFit="contain"
              mobileColumns={3}
              showEngagementCount={false}
            />
          </div>
        </section>

        <section aria-labelledby="snapchat-stories" className="border-t border-edge py-16 md:py-24">
          <div className="w-full">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">Snapchat</p>
            <h2 id="snapchat-stories" className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Saudi Council of Engineers Stories</h2>
            <SnapchatStoryViewer
              stories={[
                assets["saudi-council-of-engineers-arabic"],
                assets["saudi-council-of-engineers"],
              ]}
            />
          </div>
        </section>

        <section aria-labelledby="profile-branding" className="border-t border-edge py-16 md:py-24">
          <h2 id="profile-branding" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Profile &amp; Channel Branding</h2>
          <LapeFacebookPage />
        </section>

        <CaseStudyClosingCta title="Let’s build your next campaign." body="Social content, campaign systems, and profile branding for your next chapter." />
      </div>
    </main>
  );
}
