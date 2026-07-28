/**
 * Calculate estimated reading time based on word count.
 * Uses an average reading speed of 238 words per minute.
 */
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 238;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Format the read time as a human-readable string.
 */
export function formatReadTime(text: string): string {
  const minutes = calculateReadTime(text);
  return `${minutes} min read`;
}
