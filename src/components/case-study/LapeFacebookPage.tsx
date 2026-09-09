import Image from "next/image";
import { socialCampaignAssets as assets } from "@/data/socialMediaCampaign";
import SocialMediaGrid from "./SocialMediaGrid";

const posts = [
  assets["lape-climate-initiative"],
  assets["lape-cop28-goals"],
  assets["lape-climate-action"],
  assets["lape-carbon-border-webinar"],
] as const;

const instagramItems = posts.map((post, index) => ({
  id: `lape-instagram-${index + 1}`,
  profileName: "LAPE",
  profileSubtitle: "Environmental communication content",
  preview: {
    src: post.src,
    alt: post.alt,
    caption: "LAPE environmental communication content",
  },
}));

export default function LapeFacebookPage() {
  const cover = assets["lape-facebook-cover"];
  const avatar = assets["lape-facebook-avatar"];

  return (
    <div className="mt-16 w-full space-y-10">
    <div className="overflow-hidden rounded-[1.5rem] border border-edge bg-surface-deep text-ink shadow-2xl shadow-black/10">
      <div className="relative aspect-[1600/677] bg-surface-card">
        <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
      </div>
      <div className="border-b border-edge bg-surface-card px-5 pb-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-end gap-5">
            <div className="relative -mt-12 h-32 w-32 shrink-0 overflow-hidden rounded-full bg-white ring-4 ring-surface-card sm:-mt-20 sm:h-40 sm:w-40">
              <Image src={avatar.src} alt={avatar.alt} fill sizes="160px" className="object-cover" />
            </div>
            <div className="pb-3 pt-8 sm:pt-6">
              <h3 className="text-2xl font-bold leading-tight text-ink sm:text-3xl">Law Alliance for Protecting the Environment</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">LAPE · Environmental law and climate action</p>
            </div>
          </div>
          <div className="flex gap-2 pb-2">
            <span className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-surface">Follow</span>
            <span className="rounded-full bg-surface-deep px-4 py-2 text-sm font-semibold text-ink">Message</span>
          </div>
        </div>
        <nav aria-label="LAPE Facebook page preview navigation" className="mt-5 flex gap-5 border-t border-edge pt-3 text-sm font-semibold text-ink-soft">
          <span className="text-ink">Posts</span><span>About</span><span>Photos</span><span>Videos</span>
        </nav>
      </div>
    </div>
    <SocialMediaGrid
      brandName="LAPE"
      username="LAPE"
      subtitle="Environmental communication content"
      logo={avatar.src}
      logoAlt={avatar.alt}
      items={instagramItems}
      previewAspect="square"
      showProfileImage={false}
      followButtonClassName="rounded-full bg-ink text-surface transition-opacity hover:opacity-80"
      verificationClassName="text-ink-soft"
      previewFit="contain"
      mobileColumns={3}
      showEngagementCount={false}
    />
    </div>
  );
}
