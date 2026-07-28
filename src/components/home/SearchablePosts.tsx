"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Mail, Send, Check } from "lucide-react";
import PostCard from "@/components/home/PostCard";

interface PostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
}

interface SearchablePostsProps {
  posts: PostItem[];
}

export default function SearchablePosts({ posts }: SearchablePostsProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "ESSAY" | "NOTE">("ALL");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribing(false);
    setSubscribed(true);
    setEmail("");
  };

  const filteredPosts = useMemo(() => {
    let result = posts;

    // 1. Filter by category
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (post) => post.category.toUpperCase() === selectedCategory
      );
    }

    // 2. Filter by search query
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      result = result.filter((post) => {
        const haystack = [post.title, post.excerpt].join(" ").toLowerCase();
        return haystack.includes(normalized);
      });
    }

    return result;
  }, [posts, query, selectedCategory]);

  const [featured, ...rest] = filteredPosts;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12" id="posts-grid">
      {/* Search & Filters Controls */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-ink/5 pb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-dark dark:text-sage-light">
            Latest stories
          </p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-ink">
            From the archive
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Category Pill Tabs */}
          <div className="inline-flex rounded-full bg-ink/5 dark:bg-white/5 p-1 border border-ink/10">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-white dark:bg-white/10 text-ink shadow-sm font-bold"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("ESSAY")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "ESSAY"
                  ? "bg-white dark:bg-white/10 text-ink shadow-sm font-bold"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              Essays
            </button>
            <button
              onClick={() => setSelectedCategory("NOTE")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "NOTE"
                  ? "bg-white dark:bg-white/10 text-ink shadow-sm font-bold"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              Notes
            </button>
          </div>

          {/* Search Input Bar */}
          <label className="flex w-full items-center gap-3 rounded-full border border-ink/10 bg-white/70 px-4 py-2.5 shadow-sm transition focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20 md:max-w-xs">
            <Search className="h-4 w-4 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search writing..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
            />
          </label>
        </div>
      </div>

      {/* Grid Meta Information */}
      <div className="mb-6 flex items-center justify-between text-xs text-ink-faint font-medium">
        <span>{filteredPosts.length} matching pieces</span>
        <div className="inline-flex items-center gap-1">
          <span>Read slowly</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-ink/15 bg-white/40 dark:bg-white/5 p-16 text-center text-ink-light">
          Nothing matched that search yet. Try another word or reset filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Post */}
          {featured && (
            <PostCard
              key={featured.slug}
              slug={featured.slug}
              title={featured.title}
              excerpt={featured.excerpt}
              date={featured.date}
              readTime={featured.readTime}
              category={featured.category}
              coverImage={featured.coverImage}
              featured
            />
          )}

          {/* Regular Posts Grid */}
          {rest.map((post, index) => {
            // Embed a beautiful custom newsletter card at index 1 to break grid monotony
            if (index === 1) {
              return (
                <div
                  key="newsletter-card"
                  className="rounded-[1.5rem] border border-sage/20 bg-sage/5 dark:bg-sage/10 p-6 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10 text-sage-dark dark:text-sage-light">
                      <Mail className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ink leading-snug">
                      The Gather Letter
                    </h3>
                    <p className="text-sm text-ink-light leading-relaxed">
                      A weekly bundle of notes on design, slow mornings, and creative solitude.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="mt-6 space-y-2">
                    {subscribed ? (
                      <div className="flex items-center gap-2 rounded-xl bg-sage/15 px-3 py-2 text-xs font-semibold text-sage-dark dark:text-sage-light">
                        <Check className="h-4 w-4" />
                        Thank you for subscribing!
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full rounded-xl border border-ink/10 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-ink outline-none transition focus:border-sage placeholder:text-ink-faint"
                        />
                        <button
                          type="submit"
                          disabled={subscribing}
                          className="rounded-xl bg-ink dark:bg-sage px-3 py-2 text-white dark:text-ink transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              );
            }

            return (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  coverImage={post.coverImage}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
