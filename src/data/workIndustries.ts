import type { Industry } from "@/data/markets";

// Collection tags describe the work actually shown, not every sector in the
// broader experience list. Keep these in sync when adding a project or client.
export const workIndustries: Record<string, readonly Industry[]> = {
  "motion-video": ["Travel & Tourism", "Home Services & Property Maintenance", "Legal Services & Public Relations", "Legal Media", "Interior Design", "Nonprofit & Community Services"],
  "presentations-pitch-decks-reports": ["Real Estate & Development", "Home Services & Property Maintenance", "Engineering, Construction & Industrial Services", "Finance & Business Services"],
  "print-editorial-design": ["Healthcare & Wellness", "Manufacturing & Consumer Products", "Engineering, Construction & Industrial Services", "Education & Training", "Environment & Sustainability", "Agriculture", "Research & Academic Communication", "Finance & Business Services"],
  "social-media-campaign-design": ["Travel & Tourism", "Real Estate & Development", "Environment & Sustainability", "Culture & Community Development", "Government & Public Sector", "Healthcare & Wellness", "Education & Training", "Logistics & Transportation", "Engineering, Construction & Industrial Services", "Manufacturing & Consumer Products", "Nonprofit & Community Services"],
  "alsallal-developments-brand-applications": ["Real Estate & Development"],
  "dolato-warm-winter-marvels": ["Food & Beverage"],
  "orienta-collagen-packaging-design": ["Healthcare & Wellness"],
  "3d-exhibition-experiential-design": ["Exhibitions & Live Events"],
  "rilam-fashion-campaign-design": ["Fashion & Retail"],
  orin: ["Finance & Business Services"],
  "pillars-pr-brand-communication-design": ["Legal Services & Public Relations"],
  "mena-law-reporters": ["Legal Media", "Education & Training"],
  "x-factor-interior-design-branding-case-study": ["Interior Design"],
  "renovofix-brand-digital-design": ["Home Services & Property Maintenance"],
  "a1-dates": ["Food & Beverage"],
};
