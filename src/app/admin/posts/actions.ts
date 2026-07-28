"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formatReadTime } from "@/lib/readTime";

export async function savePost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return;

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string | null)?.trim() || "";
  const excerpt = (formData.get("excerpt") as string | null)?.trim() || "";
  const content = (formData.get("content") as string | null)?.trim() || "";
  const coverImage = (formData.get("coverImage") as string | null)?.trim() || "";
  const category = (formData.get("category") as string | null)?.trim() || "ESSAY";
  const published = formData.get("published") === "true";

  if (!title || !content) return;

  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  let slug = baseSlug;
  let count = 1;
  while (true) {
    const duplicate = await prisma.post.findFirst({
      where: {
        slug,
        id: id ? { not: id } : undefined,
      },
    });
    if (!duplicate) break;
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const readTime = formatReadTime(content);

  if (id) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing || (existing.authorId !== session.user.id && session.user.role !== "ADMIN")) {
      return;
    }

    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category: category.toUpperCase(),
        published,
        readTime,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category: category.toUpperCase(),
        published,
        readTime,
        authorId: session.user.id,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return;

  // Only the post's author or an admin can delete
  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    return;
  }

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/");
  revalidatePath("/admin");
}
