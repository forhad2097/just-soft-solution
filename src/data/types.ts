export interface Service {
  slug: string;
  title: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
  metaTitle?: string;
  metaDescription?: string;
  status: "published" | "draft";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  coverColor: string;
  publishedAt: string;
  readingMinutes: number;
  metaTitle?: string;
  metaDescription?: string;
  status: "published" | "draft";
}

export interface Product {
  slug: string;
  title: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: { title: string; description: string }[];
  modules: string[];
  benefits: string[];
  technologies: string[];
  pricing?: { tier: string; price: string; features: string[] }[];
  faqs: { q: string; a: string }[];
  metaTitle?: string;
  metaDescription?: string;
  status: "published" | "draft";
}
