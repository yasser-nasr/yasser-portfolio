import Image from "next/image";
import Link from "next/link";
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

const elMasryaCarouselAssets: readonly AssetKey[] = [
  "el-masrya-cookware-handle",
  "el-masrya-handle-200",
  "el-masrya-handle-203",
  "el-masrya-knob-302",
];

const memoUmrahCarouselAssets: readonly AssetKey[] = [
  "memo-travel-umrah-seven-days",
  "memo-travel-umrah-ten-days",
  "memo-travel-umrah-fifteen-days",
];

const campaigns: { name: string; direction: string; images: AssetKey[]; previewAspect?: "portrait" | "square" }[] = [
  { name: "Sand Circus", direction: "Bilingual brand storytelling, talent, and cultural moments.", images: ["saudi-national-day-belonging", "sand-circus-talent-brand", "sand-circus-next-step", "sand-circus-national-day"] },
  { name: "Memo Travel", direction: "Travel packages, coastal escapes, and destination offers.", images: ["memo-travel-honeymoon", "memo-travel-hurghada", "memo-travel-dahab", "memo-travel-dahab-coast", "memo-travel-sharm", "memo-travel-umrah-seven-days"] },
  { name: "Memo Travel", direction: "Square destination stories and travel experiences.", images: ["memo-travel-istanbul", "memo-travel-istanbul-evening", "memo-travel-saint-catherine", "memo-travel-snorkeling", "memo-travel-nuweiba", "memo-travel-sinai"], previewAspect: "square" },
  { name: "Cultural Development Fund", direction: "Craft, culinary arts, and cultural financing.", images: ["cultural-development-fund-craft", "cultural-development-fund-culinary", "cultural-development-fund-financing"] },
];

const selected: { name: string; asset: AssetKey }[] = [
  { name: "Beyond", asset: "beyond-national-day" },
  { name: "SBH", asset: "sbh-real-estate-services" },
  { name: "Alsallal", asset: "alsallal-property-launch" },
  { name: "SkyTrack", asset: "skytrack-cargo-tracking" },
  { name: "Moeen", asset: "moeen-design-exercise" },
];

const madinaAndElMasrya: { name: string; asset: AssetKey }[] = [
  { name: "Madina Women's Hospital", asset: "madina-womens-hospital" },
  { name: "El Masrya", asset: "el-masrya-cookware-handle" },
];

const relatedBrandWork = [
  {
    name: "PPR",
    description: "Legal marketing and public relations content.",
    image: "/projects/pillars-pr/social-media/static/pillars-pr-active-social-media-for-lawyers.webp",
    href: "/work/pillars-pr-brand-communication-design",
  },
  {
    name: "MENA Law Reporters",
    description: "Bilingual legal media and professional content.",
    image: "/projects/mena-law-reporters/social-media/mena-law-reporters-legal-news-awareness-post.webp",
    href: "/work/mena-law-reporters",
  },
  {
    name: "X Factor Interior Design",
    description: "Luxury interior design and property content.",
    image: "/projects/x-factor-interior-design/social-media/x-factor-interior-design-dubai-bespoke-interiors.webp",
    href: "/work/x-factor-interior-design-branding-case-study",
  },
  {
    name: "RenovoFix",
    description: "Property maintenance and home-services content.",
    image: "/projects/renovofix/social-media/renovofix-responsive-maintenance-social-post.webp",
    href: "/work/renovofix-brand-digital-design",
  },
] as const;

const profileSubtitles: Record<string, string> = {
  "Sand Circus": "Brand storytelling and cultural content",
  "Memo Travel": "Travel and destination content",
  "Cultural Development Fund": "Cultural financing content",
  Beyond: "Saudi National Day design",
  SBH: "Real estate services",
  Alsallal: "Real estate development",
  SkyTrack: "Logistics and cargo tracking",
  Moeen: "Community support content",
  "Madina Women's Hospital": "Healthcare communication",
  "El Masrya": "Cookware product design",
};

function post(asset: AssetKey, name: string) {
  const preview = { src: assets[asset].src, alt: assets[asset].alt, caption: name };
  const profileSubtitle = profileSubtitles[name] ?? "Social media design";
  if (asset === "memo-travel-umrah-seven-days") {
    return {
      id: asset,
      profileName: name,
      profileSubtitle,
      preview,
      slides: memoUmrahCarouselAssets.map((slideAsset, index) => ({
        src: assets[slideAsset].src,
        alt: assets[slideAsset].alt,
        caption: `Memo Travel / Umrah Packages / Slide ${index + 1}`,
      })),
    };
  }
  if (asset === "el-masrya-cookware-handle") {
    return {
      id: asset,
      profileName: name,
      profileSubtitle,
      preview,
      slides: elMasryaCarouselAssets.map((slideAsset, index) => ({
        src: assets[slideAsset].src,
        alt: assets[slideAsset].alt,
        caption: `El Masrya / Product Design / Slide ${index + 1}`,
      })),
    };
  }
  if (asset === "sbh-real-estate-services") {
    return {
      id: asset,
      profileName: name,
      profileSubtitle,
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
      profileSubtitle,
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
      profileSubtitle,
      preview,
      slides: [
        { ...preview, caption: "Sand Circus / Talent x Brand / Arabic" },
        { src: english.src, alt: english.alt, caption: "Sand Circus / Talent x Brand / English" },
      ],
    };
  }
  return { id: asset, profileName: name, profileSubtitle, preview };
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
              <article key={`${campaign.name}-${campaign.previewAspect ?? "portrait"}`} aria-label={campaign.name}>
                <SocialMediaGrid
                  brandName={campaign.name}
                  username={campaign.name}
                  subtitle={campaign.direction}
                  logo={assets[campaign.images[0]].src}
                  logoAlt=""
                  logoClassName="object-cover"
                  items={campaign.images.map((asset) => post(asset, campaign.name))}
                  previewAspect={campaign.previewAspect}
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

        <section aria-labelledby="madina-el-masrya" className="border-t border-edge py-16 md:py-24">
          <h2 id="madina-el-masrya" className="mb-12 text-3xl font-semibold text-ink md:mb-16 md:text-4xl">Madina &amp; El Masrya</h2>
          <SocialMediaGrid
            brandName="Madina & El Masrya"
            username="Madina & El Masrya"
            subtitle="Healthcare and product design"
            logo="/brand/yasser-nasr-portrait.webp"
            logoAlt=""
            items={madinaAndElMasrya.map(({ asset, name }) => post(asset, name))}
            previewAspect="square"
            previewFit="cover"
            showProfileImage={false}
            followButtonClassName="rounded-full bg-ink text-surface transition-opacity hover:opacity-80"
            verificationClassName="text-ink-soft"
            mobileColumns={2}
            showEngagementCount={false}
          />
        </section>

        <section aria-labelledby="more-brand-work" className="border-t border-edge py-16 md:py-24">
          <div className="mb-12 md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">More designs</p>
            <h2 id="more-brand-work" className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Social Media Across More Brands</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedBrandWork.map((brand) => (
              <article key={brand.name} className="group overflow-hidden rounded-xl border border-edge bg-surface-card">
                <Link href={brand.href} aria-label={`View ${brand.name} full case study`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-surface">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} social media design`}
                      fill
                      sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-ink">{brand.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-ink-soft">{brand.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      View full case study
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
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
