import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/db";
import ArticleView from "@/components/article/ArticleView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatCategory(category: string | null | undefined) {
  const normalized = (category || "ESSAY").toUpperCase();
  return normalized === "NOTE" ? "Note" : "Essay";
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.warn("Skipping static params generation due to build-time DB absence.");
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Gather`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const dbPost = await getPostBySlug(slug);

  if (!dbPost) {
    notFound();
  }

  const post = {
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    date: new Date(dbPost.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: dbPost.readTime || "4 min read",
    category: formatCategory(dbPost.category),
    coverImage: dbPost.coverImage?.trim() || "/images/cover-featured.png",
    content: dbPost.content,
  };

  return <ArticleView post={post} />;
}

