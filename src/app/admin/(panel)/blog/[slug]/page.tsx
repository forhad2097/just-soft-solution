import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { getPostBySlug } from "@/lib/store";

type RouteParams = Promise<{ slug: string }>;

export default async function EditPostPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <PostForm post={post} isNew={false} />;
}
