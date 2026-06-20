export const markets = ["Egypt", "UAE", "Saudi Arabia", "Wider GCC"];

export type IndustryGroup = {
  category: string;
  items: string[];
};

export const industryGroups: IndustryGroup[] = [
  {
    category: "Property & Built Environment",
    items: ["Real Estate", "Home Services", "Development"],
  },
  {
    category: "Professional & Business Services",
    items: ["Finance", "Legal", "Technology"],
  },
  {
    category: "Knowledge & Education",
    items: ["Education"],
  },
];
