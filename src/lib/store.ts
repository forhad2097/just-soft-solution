import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Service, Product, BlogPost } from "@/data/types";

// ---------- Helpers ---------------------------------------------------------

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Prisma's JSON type comes back as `JsonValue` — we cast it to our typed shape.
// All JSON columns in our schema correspond 1:1 with the TypeScript types.
function rowToService(row: Awaited<ReturnType<typeof prisma.service.findFirst>>): Service | undefined {
  if (!row) return undefined;
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    icon: row.icon,
    tagline: row.tagline,
    description: row.description,
    longDescription: row.longDescription,
    benefits: row.benefits as Service["benefits"],
    process: row.process as Service["process"],
    technologies: row.technologies as Service["technologies"],
    faqs: row.faqs as Service["faqs"],
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
    status: row.status as Service["status"],
  };
}

function rowToProduct(row: Awaited<ReturnType<typeof prisma.product.findFirst>>): Product | undefined {
  if (!row) return undefined;
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    icon: row.icon,
    tagline: row.tagline,
    description: row.description,
    longDescription: row.longDescription,
    features: row.features as Product["features"],
    modules: row.modules as Product["modules"],
    benefits: row.benefits as Product["benefits"],
    technologies: row.technologies as Product["technologies"],
    pricing: (row.pricing as Product["pricing"]) ?? undefined,
    faqs: row.faqs as Product["faqs"],
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
    status: row.status as Product["status"],
  };
}

function rowToPost(row: Awaited<ReturnType<typeof prisma.blogPost.findFirst>>): BlogPost | undefined {
  if (!row) return undefined;
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags as BlogPost["tags"],
    author: row.author,
    coverColor: row.coverColor,
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    readingMinutes: row.readingMinutes,
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
    status: row.status as BlogPost["status"],
  };
}

// ---------- Services --------------------------------------------------------

export async function getAllServices(): Promise<Service[]> {
  const rows = await prisma.service.findMany({ orderBy: { updatedAt: "desc" } });
  return rows.map((r) => rowToService(r)!).filter(Boolean);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const row = await prisma.service.findUnique({ where: { slug } });
  return rowToService(row);
}

export async function upsertService(service: Service): Promise<Service> {
  const data = {
    title: service.title,
    category: service.category,
    icon: service.icon,
    tagline: service.tagline,
    description: service.description,
    longDescription: service.longDescription,
    benefits: service.benefits as unknown as Prisma.InputJsonValue,
    process: service.process as unknown as Prisma.InputJsonValue,
    technologies: service.technologies as unknown as Prisma.InputJsonValue,
    faqs: service.faqs as unknown as Prisma.InputJsonValue,
    metaTitle: service.metaTitle ?? null,
    metaDescription: service.metaDescription ?? null,
    status: service.status,
  };
  const saved = await prisma.service.upsert({
    where: { slug: service.slug },
    create: { slug: service.slug, ...data },
    update: data,
  });
  return rowToService(saved)!;
}

export async function deleteService(slug: string): Promise<void> {
  await prisma.service.delete({ where: { slug } }).catch(() => {});
}

// ---------- Products --------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });
  return rows.map((r) => rowToProduct(r)!).filter(Boolean);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return rowToProduct(row);
}

export async function upsertProduct(product: Product): Promise<Product> {
  const data = {
    title: product.title,
    category: product.category,
    icon: product.icon,
    tagline: product.tagline,
    description: product.description,
    longDescription: product.longDescription,
    features: product.features as unknown as Prisma.InputJsonValue,
    modules: product.modules as unknown as Prisma.InputJsonValue,
    benefits: product.benefits as unknown as Prisma.InputJsonValue,
    technologies: product.technologies as unknown as Prisma.InputJsonValue,
    pricing: product.pricing
      ? (product.pricing as unknown as Prisma.InputJsonValue)
      : Prisma.JsonNull,
    faqs: product.faqs as unknown as Prisma.InputJsonValue,
    metaTitle: product.metaTitle ?? null,
    metaDescription: product.metaDescription ?? null,
    status: product.status,
  };
  const saved = await prisma.product.upsert({
    where: { slug: product.slug },
    create: { slug: product.slug, ...data },
    update: data,
  });
  return rowToProduct(saved)!;
}

export async function deleteProduct(slug: string): Promise<void> {
  await prisma.product.delete({ where: { slug } }).catch(() => {});
}

// ---------- Blog posts ------------------------------------------------------

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map((r) => rowToPost(r)!).filter(Boolean);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  return rowToPost(row);
}

export async function upsertPost(post: BlogPost): Promise<BlogPost> {
  const data = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags as unknown as Prisma.InputJsonValue,
    author: post.author,
    coverColor: post.coverColor,
    publishedAt: new Date(post.publishedAt),
    readingMinutes: post.readingMinutes,
    metaTitle: post.metaTitle ?? null,
    metaDescription: post.metaDescription ?? null,
    status: post.status,
  };
  const saved = await prisma.blogPost.upsert({
    where: { slug: post.slug },
    create: { slug: post.slug, ...data },
    update: data,
  });
  return rowToPost(saved)!;
}

export async function deletePost(slug: string): Promise<void> {
  await prisma.blogPost.delete({ where: { slug } }).catch(() => {});
}

// ---------- Stats -----------------------------------------------------------

export async function getStats() {
  const [
    totalServices, publishedServices, draftServices,
    totalProducts, publishedProducts, draftProducts,
    totalPosts, publishedPosts, draftPosts,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { status: "published" } }),
    prisma.service.count({ where: { status: "draft" } }),
    prisma.product.count(),
    prisma.product.count({ where: { status: "published" } }),
    prisma.product.count({ where: { status: "draft" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "published" } }),
    prisma.blogPost.count({ where: { status: "draft" } }),
  ]);

  const latest = await prisma.service.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  return {
    totalServices,
    publishedServices,
    draftServices,
    totalProducts,
    publishedProducts,
    draftProducts,
    totalPosts,
    publishedPosts,
    draftPosts,
    updatedAt: latest?.updatedAt.toISOString() ?? new Date().toISOString(),
  };
}

// ---------- Safe wrappers (build-time tolerant) -----------------------------
// At build time the database may be unreachable. These wrappers swallow that
// failure and return empty results so static generation can still complete.
// Real callers (admin actions, detail-page lookups) should use the unwrapped
// versions above so real errors surface as 500s instead of silent empty pages.

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[store] DB call failed, returning fallback:", (err as Error).message);
    }
    return fallback;
  }
}

export const safeGetAllServices = () => safe(getAllServices, [] as Service[]);
export const safeGetAllProducts = () => safe(getAllProducts, [] as Product[]);
export const safeGetAllPosts = () => safe(getAllPosts, [] as BlogPost[]);

// Re-export Prisma for places that need raw access.
export { Prisma };
