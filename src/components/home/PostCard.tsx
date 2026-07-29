import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  featured?: boolean;
}

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  coverImage,
  featured = false,
}: PostCardProps) {
  const isUrl = coverImage && (coverImage.trim().startsWith("/") || coverImage.trim().startsWith("http"));
  const imageSrc = isUrl ? coverImage.trim() : "/images/cover-featured.png";

  return (
    <Link
      href={`/posts/${slug}`}
      className={`group block overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 dark:bg-white/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-25px_rgba(43,43,43,0.25)] hover:border-sage/40 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      id={`post-card-${slug}`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          priority={featured}
        />
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-zinc-950/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur-sm border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          {category}
        </span>
      </div>


      <div className={`p-6 ${featured ? "md:p-10" : ""}`}>
        <h2
          className={`font-serif font-bold leading-tight text-ink transition-colors duration-300 group-hover:text-sage-dark dark:group-hover:text-sage-light ${
            featured ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-3 leading-relaxed text-ink-light ${
            featured ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between border-t border-ink/5 pt-4 gap-3">
          <div className="flex items-center gap-3 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 opacity-60" />
              <time dateTime={date}>{formatDate(date)}</time>
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-faint/30" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 opacity-60" />
              <span>{readTime}</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-sage-dark dark:text-sage-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
