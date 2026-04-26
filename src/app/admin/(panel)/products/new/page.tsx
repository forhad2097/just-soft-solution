import { ProductForm } from "@/components/admin/product-form";
import type { Product } from "@/data/types";

const empty: Product = {
  slug: "",
  title: "",
  category: "ERP",
  icon: "Sparkles",
  tagline: "",
  description: "",
  longDescription: "",
  features: [],
  modules: [],
  benefits: [],
  technologies: [],
  faqs: [],
  status: "draft",
};

export default function NewProductPage() {
  return <ProductForm product={empty} isNew />;
}
