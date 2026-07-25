import type { Metadata } from "next";
import ResumeHero from "@/components/ResumeHero";
import ResumeProfile from "@/components/ResumeProfile";
import ResumeExpertise from "@/components/ResumeExpertise";
import ResumeExperience from "@/components/ResumeExperience";
import ResumeLeadership from "@/components/ResumeLeadership";
import ResumeAwards from "@/components/ResumeAwards";
import ResumeCredentials from "@/components/ResumeCredentials";
import ResumeFinalCta from "@/components/ResumeFinalCta";
import { profile } from "@/data/profile";
import { professionalSummary } from "@/data/resume";

export const metadata: Metadata = {
  title: `Resume | ${profile.name} - ${profile.primaryTitle}`,
  description: `Resume of ${profile.name}, ${profile.primaryTitle}. ${professionalSummary[0]}`,
};

export default function ResumePage() {
  return (
    <main className="flex-1 pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <ResumeHero />
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
