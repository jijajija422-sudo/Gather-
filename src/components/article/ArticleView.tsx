"use client";

import { useZenMode } from "@/context/ZenModeContext";
import ReadingProgressBar from "@/components/layout/ReadingProgressBar";
import PullQuote from "@/components/article/PullQuote";
import DataBox from "@/components/article/DataBox";
import ImageGrid from "@/components/article/ImageGrid";
import { Eye, EyeOff, ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/posts";

interface ArticleViewProps {
  post: Post;
}

/**
 * Parse the raw post content string and render it with
 * custom components (PullQuote, DataBox, ImageGrid).
 */
function renderContent(content: string) {
  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;
  let paragraphBuffer: string[] = [];
  let key = 0;

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(" ").trim();
      if (text) {
        elements.push(
          <p key={key++}>{text}</p>
        );
      }
      paragraphBuffer = [];
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // PullQuote
    if (line.trim().startsWith("<PULLQUOTE>")) {
      flushParagraph();
      const quoteText = line
        .trim()
        .replace("<PULLQUOTE>", "")
        .replace("</PULLQUOTE>", "")
        .trim();
      elements.push(<PullQuote key={key++}>{quoteText}</PullQuote>);
      i++;
      continue;
    }

    // Heading
    if (line.trim().startsWith("<HEADING>")) {
      flushParagraph();
      const headingText = line
        .trim()
        .replace("<HEADING>", "")
        .replace("</HEADING>", "")
        .trim();
      elements.push(
        <h2 key={key++}>{headingText}</h2>
      );
      i++;
      continue;
    }

    // DataBox (multiline)
    if (line.trim().startsWith("<DATABOX")) {
      flushParagraph();
      const titleMatch = line.match(/title="([^"]*)"/);
      const title = titleMatch ? titleMatch[1] : undefined;
      const boxLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("</DATABOX>")) {
        boxLines.push(lines[i]);
        i++;
      }
      i++; // skip closing tag
      elements.push(
        <DataBox key={key++} title={title}>
          <ul className="space-y-2">
            {boxLines
              .filter((l) => l.trim().startsWith("•"))
              .map((l, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <span>{l.trim().replace(/^•\s*/, "")}</span>
                </li>
              ))}
          </ul>
        </DataBox>
      );
      continue;
    }

    // ImageGrid (multiline)
    if (line.trim().startsWith("<IMAGEGRID>")) {
      flushParagraph();
      const imgLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("</IMAGEGRID>")) {
        if (lines[i].trim()) imgLines.push(lines[i].trim());
        i++;
      }
      i++; // skip closing tag
      const images = imgLines.map((l) => {
        const [src, alt] = l.split("|");
        return { src: src.trim(), alt: alt?.trim() || "Image" };
      });
      elements.push(<ImageGrid key={key++} images={images} />);
      continue;
    }

    // Empty line = paragraph break
    if (line.trim() === "") {
      flushParagraph();
      i++;
      continue;
    }

    // Regular text line
    paragraphBuffer.push(line.trim());
    i++;
  }

  flushParagraph();
  return elements;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleView({ post }: ArticleViewProps) {
  const { zenMode, toggleZenMode } = useZenMode();

  return (
    <>
      <ReadingProgressBar />

      <article className="animate-fade-in" id="article-page">
        <div className="relative mx-auto w-full max-w-4xl px-6 pt-8">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_20px_70px_-35px_rgba(43,43,43,0.35)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        </div>

        <header className="mx-auto max-w-2xl px-6 pb-8 pt-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-light transition-colors duration-300 hover:text-sage-dark"
            id="back-link"
          >
            <ArrowLeft size={16} />
            <span>Back to all posts</span>
          </Link>

          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.24em] text-sage">
            {post.category}
          </span>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-light">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-ink-faint" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-ink-faint" />
              {post.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" />

            <button
              onClick={toggleZenMode}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink-light transition-all duration-300 hover:border-sage hover:bg-sage-muted hover:text-sage-dark"
              aria-label={zenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
              id="zen-mode-toggle"
            >
              {zenMode ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{zenMode ? "Exit Zen" : "Zen Mode"}</span>
            </button>
          </div>
        </header>

        <div className="article-body mx-auto max-w-2xl px-6 pb-20">
          {renderContent(post.content)}
        </div>
      </article>
    </>
  );
}
