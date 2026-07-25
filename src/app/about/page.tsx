import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutPrinciples from "@/components/AboutPrinciples";
import AboutPixelPhilosophy from "@/components/AboutPixelPhilosophy";
import AboutCareerJourney from "@/components/AboutCareerJourney";
import AboutApproach from "@/components/AboutApproach";
import AboutMentoring from "@/components/AboutMentoring";
import AboutFinalCta from "@/components/AboutFinalCta";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: `${profile.name} is a ${profile.primaryTitle}. ${profile.supportingExperience}`,
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <AboutHero />
        <AboutPrinciples />
        <AboutPixelPhilosophy />
        <AboutCareerJourney />
        <AboutApproach />
        <AboutMentoring />
        <AboutFinalCta />
      </div>
    </main>
  );
}
