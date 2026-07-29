import { PostForm } from "../../PostForm";
import { getPostById } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }


  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="animate-fade-in">
      <PostForm post={post} />
    </div>
  );
}
