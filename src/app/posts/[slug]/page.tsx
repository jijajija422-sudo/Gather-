import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ArticleView from "@/components/article/ArticleView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatCategory(category: string | null | undefined) {
  const normalized = (category || "ESSAY").toUpperCase();
  return normalized === "NOTE" ? "Note" : "Essay";
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Gather`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const dbPost = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

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
