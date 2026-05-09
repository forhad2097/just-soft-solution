import { PostForm } from "@/components/admin/post-form";
import type { BlogPost } from "@/data/types";

const empty: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Engineering",
  tags: [],
  author: "Just Soft Solution Team",
  coverColor: "from-cyan-500 to-blue-600",
  publishedAt: new Date().toISOString().slice(0, 10),
  readingMinutes: 1,
  status: "draft",
};

export default function NewPostPage() {
  return <PostForm post={empty} isNew />;
}
