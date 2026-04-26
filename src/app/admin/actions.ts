"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  makeSession,
  verifyCredentials,
} from "@/lib/auth";
import {
  upsertService,
  deleteService,
  upsertProduct,
  deleteProduct,
  slugify,
} from "@/lib/store";
import type { Service, Product } from "@/data/types";

function isProd() {
  return process.env.NODE_ENV === "production";
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!verifyCredentials(email, password)) {
    redirect(`/admin/login?error=invalid${next ? `&next=${encodeURIComponent(next)}` : ""}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, makeSession(email), {
    httpOnly: true,
    secure: isProd(),
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parsePairs(
  formData: FormData,
  prefix: string,
  fields: ["title" | "q", "description" | "a"],
): { [k: string]: string }[] {
  const titles = formData.getAll(`${prefix}_${fields[0]}[]`).map((v) => String(v).trim());
  const descs = formData.getAll(`${prefix}_${fields[1]}[]`).map((v) => String(v).trim());
  const len = Math.max(titles.length, descs.length);
  const out: { [k: string]: string }[] = [];
  for (let i = 0; i < len; i++) {
    const t = titles[i] ?? "";
    const d = descs[i] ?? "";
    if (t || d) out.push({ [fields[0]]: t, [fields[1]]: d });
  }
  return out;
}

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/products");
  revalidatePath("/products/[slug]", "page");
}

export async function saveServiceAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) redirect("/admin/services/new?error=title");

  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);

  const benefitsRaw = parsePairs(formData, "benefit", ["title", "description"]) as {
    title: string;
    description: string;
  }[];
  const processRaw = formData.getAll("process_step[]").map((v) => String(v).trim());
  const processTitles = formData.getAll("process_title[]").map((v) => String(v).trim());
  const processDesc = formData.getAll("process_description[]").map((v) => String(v).trim());
  const process = processRaw.map((step, i) => ({
    step: step || `0${i + 1}`,
    title: processTitles[i] ?? "",
    description: processDesc[i] ?? "",
  }));

  const faqs = parsePairs(formData, "faq", ["q", "a"]) as { q: string; a: string }[];

  const service: Service = {
    slug,
    title,
    category: String(formData.get("category") ?? "Development"),
    icon: String(formData.get("icon") ?? "Sparkles"),
    tagline: String(formData.get("tagline") ?? ""),
    description: String(formData.get("description") ?? ""),
    longDescription: String(formData.get("longDescription") ?? ""),
    benefits: benefitsRaw,
    process,
    technologies: parseList(formData.get("technologies")),
    faqs,
    metaTitle: String(formData.get("metaTitle") ?? "") || undefined,
    metaDescription: String(formData.get("metaDescription") ?? "") || undefined,
    status: (String(formData.get("status") ?? "published") as Service["status"]),
  };

  await upsertService(service);
  revalidateSite();
  redirect(`/admin/services?saved=${encodeURIComponent(service.slug)}`);
}

export async function deleteServiceAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (slug) {
    await deleteService(slug);
    revalidateSite();
  }
  redirect(`/admin/services?deleted=${encodeURIComponent(slug)}`);
}

export async function saveProductAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) redirect("/admin/products/new?error=title");

  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);

  const features = parsePairs(formData, "feature", ["title", "description"]) as {
    title: string;
    description: string;
  }[];
  const faqs = parsePairs(formData, "faq", ["q", "a"]) as { q: string; a: string }[];

  const product: Product = {
    slug,
    title,
    category: String(formData.get("category") ?? "ERP"),
    icon: String(formData.get("icon") ?? "Sparkles"),
    tagline: String(formData.get("tagline") ?? ""),
    description: String(formData.get("description") ?? ""),
    longDescription: String(formData.get("longDescription") ?? ""),
    features,
    modules: parseList(formData.get("modules")),
    benefits: parseList(formData.get("benefits")),
    technologies: parseList(formData.get("technologies")),
    faqs,
    metaTitle: String(formData.get("metaTitle") ?? "") || undefined,
    metaDescription: String(formData.get("metaDescription") ?? "") || undefined,
    status: (String(formData.get("status") ?? "published") as Product["status"]),
  };

  await upsertProduct(product);
  revalidateSite();
  redirect(`/admin/products?saved=${encodeURIComponent(product.slug)}`);
}

export async function deleteProductAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (slug) {
    await deleteProduct(slug);
    revalidateSite();
  }
  redirect(`/admin/products?deleted=${encodeURIComponent(slug)}`);
}
