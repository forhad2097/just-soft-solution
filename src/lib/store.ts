import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { services as seedServices } from "@/data/services";
import { products as seedProducts } from "@/data/products";
import { posts as seedPosts } from "@/data/posts";
import type { Service, Product, BlogPost } from "@/data/types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

interface Store {
  services: Service[];
  products: Product[];
  posts: BlogPost[];
  updatedAt: string;
}

let cache: Store | null = null;

async function ensureStore(): Promise<Store> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    // Migrate stores written before posts existed
    cache = {
      services: parsed.services ?? structuredClone(seedServices),
      products: parsed.products ?? structuredClone(seedProducts),
      posts: parsed.posts ?? structuredClone(seedPosts),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
    if (!parsed.posts) await persist();
    return cache;
  } catch {
    cache = {
      services: structuredClone(seedServices),
      products: structuredClone(seedProducts),
      posts: structuredClone(seedPosts),
      updatedAt: new Date().toISOString(),
    };
    await persist();
    return cache;
  }
}

async function persist() {
  if (!cache) return;
  cache.updatedAt = new Date().toISOString();
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(cache, null, 2), "utf8");
}

export async function getAllServices(): Promise<Service[]> {
  const s = await ensureStore();
  return s.services;
}
export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const s = await ensureStore();
  return s.services.find((x) => x.slug === slug);
}
export async function upsertService(service: Service): Promise<Service> {
  const s = await ensureStore();
  const idx = s.services.findIndex((x) => x.slug === service.slug);
  if (idx >= 0) s.services[idx] = service;
  else s.services.unshift(service);
  await persist();
  return service;
}
export async function deleteService(slug: string): Promise<void> {
  const s = await ensureStore();
  s.services = s.services.filter((x) => x.slug !== slug);
  await persist();
}

export async function getAllProducts(): Promise<Product[]> {
  const s = await ensureStore();
  return s.products;
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const s = await ensureStore();
  return s.products.find((x) => x.slug === slug);
}
export async function upsertProduct(product: Product): Promise<Product> {
  const s = await ensureStore();
  const idx = s.products.findIndex((x) => x.slug === product.slug);
  if (idx >= 0) s.products[idx] = product;
  else s.products.unshift(product);
  await persist();
  return product;
}
export async function deleteProduct(slug: string): Promise<void> {
  const s = await ensureStore();
  s.products = s.products.filter((x) => x.slug !== slug);
  await persist();
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const s = await ensureStore();
  return [...s.posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const s = await ensureStore();
  return s.posts.find((x) => x.slug === slug);
}
export async function upsertPost(post: BlogPost): Promise<BlogPost> {
  const s = await ensureStore();
  const idx = s.posts.findIndex((x) => x.slug === post.slug);
  if (idx >= 0) s.posts[idx] = post;
  else s.posts.unshift(post);
  await persist();
  return post;
}
export async function deletePost(slug: string): Promise<void> {
  const s = await ensureStore();
  s.posts = s.posts.filter((x) => x.slug !== slug);
  await persist();
}

export async function getStats() {
  const s = await ensureStore();
  return {
    totalServices: s.services.length,
    publishedServices: s.services.filter((x) => x.status === "published").length,
    draftServices: s.services.filter((x) => x.status === "draft").length,
    totalProducts: s.products.length,
    publishedProducts: s.products.filter((x) => x.status === "published").length,
    draftProducts: s.products.filter((x) => x.status === "draft").length,
    totalPosts: s.posts.length,
    publishedPosts: s.posts.filter((x) => x.status === "published").length,
    draftPosts: s.posts.filter((x) => x.status === "draft").length,
    updatedAt: s.updatedAt,
  };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
