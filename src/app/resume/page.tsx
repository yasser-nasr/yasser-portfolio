import type { Metadata } from "next";
import ResumeHero from "@/components/ResumeHero";
import ResumeSnapshot from "@/components/ResumeSnapshot";
import ResumeProfile from "@/components/ResumeProfile";
import ResumeExpertise from "@/components/ResumeExpertise";
import ResumeExperience from "@/components/ResumeExperience";
import ResumeLeadership from "@/components/ResumeLeadership";
import ResumeAwards from "@/components/ResumeAwards";
import ResumeCredentials from "@/components/ResumeCredentials";
import ResumeFinalCta from "@/components/ResumeFinalCta";

export const metadata: Metadata = {
  title: "Resume | Yasser Nasr - Senior Graphic Designer",
  description:
    "Resume of Yasser Nasr, Senior Graphic Designer and Brand & Digital Designer with 6+ years of experience across brand identity, digital design, websites, social media, motion graphics, presentations, and GCC market projects.",
};

export default function ResumePage() {
  return (
    <main className="flex-1 pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <ResumeHero />
        <ResumeSnapshot />
        <ResumeProfile />
        <ResumeExpertise />
        <ResumeExperience />
        <ResumeLeadership />
        <ResumeAwards />
        <ResumeCredentials />
        <ResumeFinalCta />
      </div>
    </main>
  );
}
