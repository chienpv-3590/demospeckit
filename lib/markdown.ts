import matter from 'gray-matter';

/**
 * Parse markdown content with front matter
 * @param content - Raw markdown content with optional front matter
 * @returns Parsed data and content
 */
export function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content);
  return {
    data,
    content: markdownContent,
  };
}

/**
 * Sanitize markdown content to prevent XSS
 * Note: react-markdown with rehype-sanitize plugin should be used in components
 * This is a basic sanitization for backend processing
 * @param content - Markdown content to sanitize
 * @returns Sanitized content
 */
export function sanitizeMarkdown(content: string): string {
  // Remove potentially dangerous HTML tags
  const dangerousTags = /<(script|iframe|object|embed|link|style)[^>]*>.*?<\/\1>/gis;
  let sanitized = content.replace(dangerousTags, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  return sanitized;
}

/**
 * Extract excerpt from markdown content
 * @param content - Full markdown content
 * @param maxLength - Maximum length of excerpt (default: 200)
 * @returns Excerpt text
 */
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown syntax for excerpt
  let text = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  // Truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}

/**
 * Estimate reading time for markdown content
 * @param content - Markdown content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function estimateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = content.replace(/[#*`\[\]()]/g, '');
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate slug from title
 * @param title - Post title
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Parse keywords string to array
 * @param keywords - Comma-separated keywords string
 * @returns Array of keywords
 */
export function parseKeywords(keywords: string): string[] {
  if (!keywords) return [];
  return keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

/**
 * Format keywords array to string
 * @param keywords - Array of keywords
 * @returns Comma-separated keywords string
 */
export function formatKeywords(keywords: string[]): string {
  return keywords.filter(k => k.trim().length > 0).join(',');
}
