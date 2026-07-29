"use server";

import { getPostById, getPostBySlug, createPost, updatePost, deletePost as dbDeletePost } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formatReadTime } from "@/lib/readTime";
import crypto from "crypto";

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
    const duplicate = await getPostBySlug(slug);
    if (!duplicate || (id && duplicate.id === id)) break;
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const readTime = formatReadTime(content);

  if (id) {
    const existing = await getPostById(id);
    if (!existing || (existing.authorId !== session.user.id && session.user.role !== "ADMIN")) {
      return;
    }

    await updatePost(id, {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category: category.toUpperCase(),
      published,
      readTime,
    });
  } else {
    const newId = crypto.randomUUID();
    await createPost({
      id: newId,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category: category.toUpperCase(),
      published,
      readTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: session.user.id,
      author: {
        name: session.user.name || "Author",
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

  const post = await getPostById(postId);
  if (!post) return;

  // Only the post's author or an admin can delete
  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    return;
  }

  await dbDeletePost(postId);

  revalidatePath("/");
  revalidatePath("/admin");
}

