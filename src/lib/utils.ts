import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Just Soft Solution",
  shortName: "JSS",
  tagline: "We Turn Any Business Into Business Automation",
  description:
    "Just Soft Solution — custom software development, world-class manual & automation testing, API & security testing, and big data analysis. Operating across Bangladesh, UAE & USA.",
  url: "https://justsoftsolution.com",
  whatsappNumber: "8801842022052",
  whatsappDisplay: "+880 1842-022052",
  email: "info@justsoftsolution.com",
  offices: [
    {
      country: "Bangladesh",
      code: "bd",
      flag: "🇧🇩",
      address: "House # 923, Road # 12, Adabor, Dhaka 1207",
      phone: "+880 1842-022052",
      phoneRaw: "+8801842022052",
    },
    {
      country: "United Arab Emirates",
      code: "ae",
      flag: "🇦🇪",
      address: "Electra Street, next to Ritaj Restaurant, Abu Dhabi, UAE",
      phone: "+971 50 919 7037",
      phoneRaw: "+971509197037",
    },
    {
      country: "United States",
      code: "us",
      flag: "🇺🇸",
      address: "235 East 34 St, New York, NY 10016",
      phone: "+1 (718) 313-7002",
      phoneRaw: "+17183137002",
    },
  ],
  social: [
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "Facebook", href: "#", icon: "facebook" },
    { name: "GitHub", href: "#", icon: "github" },
    { name: "YouTube", href: "#", icon: "youtube" },
  ],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
