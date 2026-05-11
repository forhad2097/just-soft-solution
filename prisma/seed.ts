// Prisma seed — populates an empty database with the starter content
// from src/data/services.ts, src/data/products.ts, src/data/posts.ts.
//
// Idempotent: re-running upserts rows by slug, so it's safe to seed again
// after deploying new defaults.
//
// Run:  npx prisma db seed
// Or:   npm run db:seed

import { Prisma, PrismaClient } from "@prisma/client";
import { services } from "../src/data/services";
import { products } from "../src/data/products";
import { posts } from "../src/data/posts";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        category: s.category,
        icon: s.icon,
        tagline: s.tagline,
        description: s.description,
        longDescription: s.longDescription,
        benefits: s.benefits,
        process: s.process,
        technologies: s.technologies,
        faqs: s.faqs,
        metaTitle: s.metaTitle ?? null,
        metaDescription: s.metaDescription ?? null,
        status: s.status,
      },
      create: {
        slug: s.slug,
        title: s.title,
        category: s.category,
        icon: s.icon,
        tagline: s.tagline,
        description: s.description,
        longDescription: s.longDescription,
        benefits: s.benefits,
        process: s.process,
        technologies: s.technologies,
        faqs: s.faqs,
        metaTitle: s.metaTitle ?? null,
        metaDescription: s.metaDescription ?? null,
        status: s.status,
      },
    });
  }
  console.log(`  ✓ ${services.length} services seeded`);

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        category: p.category,
        icon: p.icon,
        tagline: p.tagline,
        description: p.description,
        longDescription: p.longDescription,
        features: p.features,
        modules: p.modules,
        benefits: p.benefits,
        technologies: p.technologies,
        pricing: p.pricing ?? Prisma.JsonNull,
        faqs: p.faqs,
        metaTitle: p.metaTitle ?? null,
        metaDescription: p.metaDescription ?? null,
        status: p.status,
      },
      create: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        icon: p.icon,
        tagline: p.tagline,
        description: p.description,
        longDescription: p.longDescription,
        features: p.features,
        modules: p.modules,
        benefits: p.benefits,
        technologies: p.technologies,
        pricing: p.pricing ?? Prisma.JsonNull,
        faqs: p.faqs,
        metaTitle: p.metaTitle ?? null,
        metaDescription: p.metaDescription ?? null,
        status: p.status,
      },
    });
  }
  console.log(`  ✓ ${products.length} products seeded`);

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        coverColor: post.coverColor,
        publishedAt: new Date(post.publishedAt),
        readingMinutes: post.readingMinutes,
        metaTitle: post.metaTitle ?? null,
        metaDescription: post.metaDescription ?? null,
        status: post.status,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        coverColor: post.coverColor,
        publishedAt: new Date(post.publishedAt),
        readingMinutes: post.readingMinutes,
        metaTitle: post.metaTitle ?? null,
        metaDescription: post.metaDescription ?? null,
        status: post.status,
      },
    });
  }
  console.log(`  ✓ ${posts.length} blog posts seeded`);

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
