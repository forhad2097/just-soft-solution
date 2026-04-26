import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { getServiceBySlug } from "@/lib/store";

type RouteParams = Promise<{ slug: string }>;

export default async function EditServicePage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceForm service={service} isNew={false} />;
}
