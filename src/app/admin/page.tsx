import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getPosts, getUserCount } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";
import {
  PenSquare,
  FileText,
  Plus,
  Users,
  BarChart3,
  Eye,
} from "lucide-react";
import DeletePostButton from "./DeletePostButton";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const isAdmin = session.user.role === "ADMIN";

  // Fetch posts based on role
  const posts = await getPosts(
    isAdmin ? undefined : { authorId: session.user.id }
  );

  // Stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = totalPosts - publishedPosts;
  const authorCount = isAdmin ? await getUserCount() : null;


  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/5 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
            Welcome back, {session.user.name?.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-ink-light">
            Here&apos;s the latest status of your publication.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-full bg-ink dark:bg-sage px-5 py-2.5 text-sm font-medium text-white dark:text-ink shadow-sm transition-all hover:bg-ink/90 dark:hover:bg-sage-light hover:shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
          {isAdmin && (
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:bg-white/5 px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-all hover:border-sage/40 hover:shadow-md cursor-pointer"
            >
              <Users className="h-4 w-4" />
              Authors
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Total Posts"
          value={totalPosts}
          accent
        />
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Published"
          value={publishedPosts}
        />
        <StatCard
          icon={<PenSquare className="h-5 w-5" />}
          label="Drafts"
          value={draftPosts}
        />
        {authorCount !== null && (
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Authors"
            value={authorCount}
          />
        )}
      </div>

      {/* Posts Table */}
      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white/80 dark:bg-white/5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
            <BarChart3 className="h-5 w-5 text-sage" />
            {isAdmin ? "All Stories" : "Your Stories"}
          </h2>
          <span className="text-xs text-ink-faint font-medium">
            {totalPosts} {totalPosts === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-ink-faint/30" />
            <p className="text-ink-light font-medium">No posts in your space yet.</p>
            <Link
              href="/admin/posts/new"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sage-dark dark:text-sage hover:underline"
            >
              <Plus className="h-4 w-4" /> Write your first post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-ink/5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group flex items-center justify-between px-6 py-5 transition-all hover:bg-sage/5 dark:hover:bg-white/5"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-serif text-lg font-medium text-ink truncate max-w-md">
                      {post.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                        post.published
                          ? "bg-sage/10 text-sage-dark dark:bg-sage/20 dark:text-sage-light"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-ink-faint">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {isAdmin && (
                      <>
                        <span className="h-0.5 w-0.5 rounded-full bg-ink-faint/45" />
                        <span className="font-medium text-ink-light">{post.author.name}</span>
                      </>
                    )}
                    <span className="h-0.5 w-0.5 rounded-full bg-ink-faint/45" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {post.published && (
                    <Link
                      href={`/posts/${post.slug}`}
                      className="rounded-full p-2.5 text-ink-faint hover:text-sage-dark dark:hover:text-sage-light hover:bg-sage/10 dark:hover:bg-white/10 transition-colors"
                      title="View Live"
                    >
                      <Eye className="h-4.5 w-4.5" />
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="rounded-full p-2.5 text-ink-faint hover:text-sage-dark dark:hover:text-sage-light hover:bg-sage/10 dark:hover:bg-white/10 transition-colors"
                    title="Edit Story"
                  >
                    <PenSquare className="h-4.5 w-4.5" />
                  </Link>
                  <DeletePostButton postId={post.id} postTitle={post.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
        accent
          ? "border-sage/20 bg-sage/5 dark:bg-sage/10"
          : "border-ink/10 bg-white/80 dark:bg-white/5"
      }`}
    >
      <div
        className={`mb-4 inline-flex rounded-xl p-2.5 ${
          accent ? "bg-sage/15 text-sage-dark dark:text-sage-light" : "bg-ink/5 dark:bg-white/5 text-ink-light"
        }`}
      >
        {icon}
      </div>
      <p className="text-3xl font-bold text-ink tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-faint">{label}</p>
    </div>
  );
}
