import { ServiceForm } from "@/components/admin/service-form";
import type { Service } from "@/data/types";

const empty: Service = {
  slug: "",
  title: "",
  category: "Development",
  icon: "Sparkles",
  tagline: "",
  description: "",
  longDescription: "",
  benefits: [],
  process: [],
  technologies: [],
  faqs: [],
  status: "draft",
};

export default function NewServicePage() {
  return <ServiceForm service={empty} isNew />;
}
