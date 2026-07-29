import { Sparkles, BookOpen, ArrowDown } from "lucide-react";
import { getPosts } from "@/lib/db";
import SearchablePosts from "@/components/home/SearchablePosts";

export const dynamic = "force-dynamic";

function formatCategory(category: string | null | undefined) {
  const normalized = (category || "ESSAY").toUpperCase();
  return normalized === "NOTE" ? "Note" : "Essay";
}

export default async function HomePage() {
  const allPosts = await getPosts({ publishedOnly: true });

  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "A quiet reflection waiting to be read.",
    date: new Date(post.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    readTime: post.readTime || "4 min read",
    category: formatCategory(post.category),
    coverImage: post.coverImage?.trim() || "/images/cover-featured.png",
  }));

  return (
    <div className="animate-fade-in space-y-16 pb-20">
      {/* Premium Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-12 md:pt-20" id="hero">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/70 p-8 shadow-[0_20px_80px_-30px_rgba(43,43,43,0.15)] backdrop-blur-md md:p-12">
          {/* Ambient Glows */}
          <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-sage/5 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark dark:text-sage-light">
                <Sparkles className="h-3 w-3" />
                Journal Space
              </div>
              <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                A calm place for thoughtful writing.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-ink-light">
                Gather is a quiet sanctuary for essays, notes, and collections of reflections meant to be read slowly, in a distracted world.
              </p>
            </div>

            {/* Currently Reading Display Card */}
            <div className="rounded-3xl border border-sage/25 bg-sage/5 p-6 shadow-sm backdrop-blur lg:max-w-xs transition-all hover:border-sage/40">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage-dark dark:text-sage-light mb-3">
                <BookOpen className="h-3.5 w-3.5" />
                Currently Reading
              </div>
              <p className="font-serif text-lg font-bold text-ink italic leading-snug">
                "The Art of Making Space"
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">
                Exploring the balance between constant connectivity and quiet solitude, page by page.
              </p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-sage/10 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-sage" />
              </div>
              <p className="mt-1.5 text-right text-[10px] font-semibold text-ink-faint">
                66% Complete
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Search & Archive Grid */}
      <SearchablePosts posts={posts} />

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6" id="about">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/10 bg-cream-dark/20 p-8 md:p-12">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sage/5 blur-2xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sage-dark dark:text-sage-light">
              About the journal
            </p>
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              unhurried. inviting. intentional.
            </h2>
            <p className="text-lg leading-relaxed text-ink-light">
              This space was built to slow down. Here, we collect essays on philosophy, notes on design, and technical summaries that deserve room to breathe. There are no algorithms, no clickbait headers, and no ads. Just clean layouts and pure writing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
