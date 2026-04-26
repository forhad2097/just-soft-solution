import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/store";

type RouteParams = Promise<{ slug: string }>;

export default async function EditProductPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductForm product={product} isNew={false} />;
}
