export const workCategoryOptions = [
  { key: "brand", label: "Brand Identity" },
  { key: "campaigns-social", label: "Campaigns & Social" },
  { key: "web-uiux", label: "Web & UI/UX" },
  { key: "motion-video", label: "Motion & Video" },
  { key: "3d-experiential", label: "3D & Experiential" },
  { key: "presentations", label: "Presentations" },
  { key: "packaging", label: "Packaging" },
] as const;

export type ProjectCategory = (typeof workCategoryOptions)[number]["key"];
