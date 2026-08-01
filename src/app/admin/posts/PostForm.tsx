"use client";

import { useState } from "react";
import { savePost } from "./actions";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Check, Loader2 } from "lucide-react";

export function PostForm({ post }: { post?: { id?: string, published?: boolean, category?: string, coverImage?: string, title?: string, excerpt?: string, content?: string } }) {
  const [published, setPublished] = useState(Boolean(post?.published));
  const [category, setCategory] = useState(post?.category || "ESSAY");
  const [loading, setLoading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImage || "");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCoverImageUrl(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        await savePost(formData);
      }}
      className="space-y-6"
    >
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="published" value={published.toString()} />
      <input type="hidden" name="category" value={category} />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/5 pb-5">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm font-medium text-ink-faint transition-colors hover:text-sage-dark dark:hover:text-sage-light"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full bg-ink/5 dark:bg-white/5 p-1 border border-ink/10">
            <button
              type="button"
              onClick={() => setPublished(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                !published
                  ? "bg-white dark:bg-white/10 text-ink shadow-sm"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setPublished(true)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                published
                  ? "bg-sage text-white dark:text-ink shadow-sm font-bold"
                  : "text-ink-faint hover:text-ink"
              }`}
            >
              Publish
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-ink dark:bg-sage px-5 py-2 text-sm font-medium text-white dark:text-ink shadow-sm transition-all hover:bg-ink/90 dark:hover:bg-sage-light hover:shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-5 rounded-3xl border border-ink/10 bg-white/80 dark:bg-white/5 p-6 shadow-sm backdrop-blur">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Title
          </label>
          <input
            name="title"
            defaultValue={post?.title}
            type="text"
            className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-lg font-serif outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20 placeholder:text-ink-faint/50"
            required
            placeholder="The Art of Slow Mornings..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt}
            rows={2}
            className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20 placeholder:text-ink-faint/50"
            placeholder="A brief summary of the article to capture readers' attention..."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Cover image
            </label>
            <div className="flex gap-2">
              <input
                name="coverImage"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                type="text"
                className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20 placeholder:text-ink-faint/50"
                placeholder="/images/cover-featured.png"
              />
              <label className="flex items-center gap-1.5 rounded-2xl border border-ink/10 bg-white dark:bg-white/5 px-4 py-3 text-xs font-medium text-ink cursor-pointer hover:border-sage/40 transition">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-sage" />
                ) : coverImageUrl ? (
                  <Check className="h-4 w-4 text-sage" />
                ) : (
                  <Upload className="h-4 w-4 text-ink-faint" />
                )}
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>


          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
            >
              <option value="ESSAY">Essay</option>
              <option value="NOTE">Note</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Content (Markdown)
          </label>
          <textarea
            name="content"
            defaultValue={post?.content}
            rows={20}
            className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-4 font-mono text-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20 placeholder:text-ink-faint/50 leading-relaxed"
            required
            placeholder="Write your thoughts here..."
          />
        </div>
      </div>
    </form>
  );
}
