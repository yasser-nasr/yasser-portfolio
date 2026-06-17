export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export const connectLink: NavLink = {
  label: "Let’s Connect",
  href: "/contact",
};
