import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { posts } from "../src/data/posts";

console.log("ENV URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create an Admin User — hash password fresh with current bcryptjs version
  const passwordHash = await bcrypt.hash("admin123", 10);
  
  // Verify the hash works before inserting
  const verifyResult = await bcrypt.compare("admin123", passwordHash);
  console.log(`Password hash verification: ${verifyResult ? "PASS" : "FAIL"}`);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@gather.com" },
    update: { passwordHash }, // Always update hash to fix stale hashes
    create: {
      email: "admin@gather.com",
      name: "Gather Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Created admin user: ${admin.email}`);

  // Seed the posts
  for (const post of posts) {
    const existing = await prisma.post.findUnique({
      where: { slug: post.slug },
    });

    if (!existing) {
      await prisma.post.create({
        data: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          category: post.category.toUpperCase() === "ESSAYS" ? "ESSAY" : "NOTE",
          published: true,
          readTime: post.readTime,
          createdAt: new Date(post.date),
          authorId: admin.id,
        },
      });
      console.log(`Created post: ${post.title}`);
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
