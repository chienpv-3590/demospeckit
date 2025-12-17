# Research: Personal Blog Layout with Three-Column Homepage

**Feature**: [spec.md](spec.md) | **Date**: 2025-12-16

This document consolidates research findings for implementing the personal blog layout using Next.js 14, Tailwind CSS, and PostgreSQL.

## Decision Log

### 1. Next.js 14 App Router vs Pages Router

**Decision**: Use Next.js 14 App Router

**Rationale**:
- Server Components by default reduce client-side JavaScript bundle size
- Improved data fetching patterns with async/await in Server Components
- Better SEO with built-in metadata API
- Streaming and Suspense support for progressive rendering
- File-system based routing aligns with our page structure (homepage, category pages, profile)

**Alternatives considered**:
- **Pages Router**: More mature, larger ecosystem, but misses modern React features
- **Remix**: Similar SSR capabilities but smaller ecosystem than Next.js
- **Plain React + Express**: More control but requires manual SSR setup

### 2. Markdown Rendering Library

**Decision**: react-markdown + remark-gfm + rehype-highlight

**Rationale**:
- `react-markdown` is React-native, renders to React components (no dangerouslySetInnerHTML)
- `remark-gfm` adds GitHub-flavored markdown (tables, task lists, strikethrough)
- `rehype-highlight` provides syntax highlighting for code blocks
- Built-in XSS protection through React's escaping
- Can use DOMPurify as additional sanitization layer
- Supports custom component rendering (e.g., Next.js Image for markdown images)

**Alternatives considered**:
- **marked**: Simple but requires manual React integration and sanitization
- **markdown-it**: Plugin-rich but not React-optimized
- **MDX**: Powerful but overkill for content-only blog posts

### 3. Database: PostgreSQL with Prisma ORM

**Decision**: PostgreSQL 15+ with Prisma ORM

**Rationale**:
- PostgreSQL provides robust relational database for blog posts, categories, authors
- Full-text search capability for future search features
- Prisma provides type-safe database client with TypeScript
- Prisma migrations manage schema changes
- Prisma Studio for database inspection during development
- Next.js Edge Runtime compatible (using Prisma Data Proxy if needed)

**Alternatives considered**:
- **MongoDB**: Flexible schema but loses relational integrity for categories
- **SQLite**: Simpler setup but limited concurrency for production
- **MySQL**: Similar capabilities but PostgreSQL has better JSON and full-text search

### 4. Styling: Tailwind CSS 3.4

**Decision**: Tailwind CSS 3.4 with JIT mode

**Rationale**:
- Utility-first approach speeds up responsive development
- Built-in responsive breakpoints (sm, md, lg, xl, 2xl) for mobile-first design
- JIT mode generates only used classes, reducing bundle size
- Native dark mode support for future enhancement
- Excellent TypeScript support with class-variance-authority
- Large ecosystem of UI component libraries (shadcn/ui, Headless UI)

**Alternatives considered**:
- **CSS Modules**: More control but slower development for responsive layouts
- **Styled Components**: Runtime CSS-in-JS adds performance overhead
- **Vanilla CSS**: Maximum control but verbose for responsive utilities

### 5. Responsive Design Strategy

**Decision**: Mobile-first with Tailwind breakpoints

**Rationale**:
- Stack columns vertically on mobile (default): blog list → high-view posts → categories
- Use CSS Grid with `grid-cols-1 md:grid-cols-3` for three-column layout on desktop
- Touch-friendly hit areas: minimum 44x44px (following iOS HIG)
- Font sizes: 16px base (readable without zoom on mobile)
- Sticky navigation on mobile using Tailwind `sticky top-0`

**Implementation pattern**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <BlogList className="order-1" />
  <HighViewPosts className="order-2" />
  <CategoryList className="order-3" />
</div>
```

### 6. Data Fetching Strategy

**Decision**: Server Components + API Routes for dynamic data

**Rationale**:
- Server Components fetch data on server (no client-side loading states for initial render)
- API routes (`/api/posts`, `/api/categories`) for client-side pagination/filtering
- Use Next.js `cache()` and `revalidate` options for ISR (Incremental Static Regeneration)
- Homepage: Static generation with revalidation every 60 seconds
- Category pages: Dynamic based on category slug
- Profile page: Static generation (rarely changes)

**Pattern**:
```tsx
// app/page.tsx (Server Component)
async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    next: { revalidate: 60 }
  })
  return res.json()
}
```

### 7. Image Optimization

**Decision**: Next.js Image component with placeholder blur

**Rationale**:
- Automatic image optimization (WebP/AVIF format conversion)
- Lazy loading by default (images load as user scrolls)
- Responsive images with `sizes` attribute
- Blur placeholder for better perceived performance
- Integrated with Prisma schema (store image dimensions)

### 8. Performance Optimization

**Decision**: Multiple strategies combined

**Strategies**:
1. **Code splitting**: App Router automatically splits routes
2. **Font optimization**: Use `next/font` for Google Fonts with preload
3. **Bundle analysis**: `@next/bundle-analyzer` to identify large dependencies
4. **Database indexes**: Index `viewCount`, `categoryId`, `status`, `publishedAt`
5. **Caching**: Prisma query caching + Next.js Data Cache
6. **Compression**: Enable gzip/brotli in production (Vercel handles automatically)

**Target metrics**:
- Lighthouse Performance: 90+
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.8s

### 9. SEO Optimization

**Decision**: Next.js Metadata API + JSON-LD structured data

**Rationale**:
- Use `generateMetadata()` in each page for dynamic meta tags
- Include Open Graph tags for social sharing
- Add JSON-LD structured data for BlogPosting schema
- Sitemap generation with `app/sitemap.ts`
- Robots.txt configuration

**Example**:
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

### 10. Testing Strategy

**Decision**: Jest + React Testing Library + Playwright

**Rationale**:
- **Jest + RTL**: Unit tests for components, utility functions
- **Playwright**: E2E tests for user flows (browse homepage, filter by category, view profile)
- **Prisma mock**: Use `jest-mock-extended` for Prisma client mocks in tests
- **Test coverage**: Target 80%+ for business logic

**Test priorities**:
1. Markdown rendering (XSS prevention)
2. Responsive layout breakpoints
3. Category filtering logic
4. Pagination/infinite scroll

## Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 14.x |
| Language | TypeScript | 5.3+ |
| Runtime | Node.js | 18+ |
| Styling | Tailwind CSS | 3.4 |
| Database | PostgreSQL | 15+ |
| ORM | Prisma | 5.x |
| Markdown | react-markdown + remark-gfm | Latest |
| Testing (Unit) | Jest + React Testing Library | Latest |
| Testing (E2E) | Playwright | Latest |
| Linting | ESLint + Prettier | Latest |

## Best Practices Applied

1. **TypeScript strict mode**: Catch errors at compile time
2. **Component composition**: Small, reusable components
3. **Server Components first**: Use Client Components only when needed (interactivity)
4. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
5. **Error boundaries**: Graceful error handling with Next.js error.tsx
6. **Loading states**: loading.tsx for Suspense boundaries
7. **Environment variables**: `.env.local` for database URLs, API keys
8. **Git workflow**: Feature branches, conventional commits

## Open Questions & Future Enhancements

- **View count tracking**: Implement using API route + database trigger or analytics service?
- **Pagination vs Infinite scroll**: Spec mentions both - default to pagination, add infinite scroll in future iteration
- **Comment system**: Not in this phase but mentioned in constitution - plan for future
- **Search functionality**: Full-text search with PostgreSQL or integrate Algolia/ElasticSearch?
- **Admin interface**: Separate admin dashboard or use CMS like Contentlayer?

## References

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [react-markdown Documentation](https://github.com/remarkjs/react-markdown)
- [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/WAI/WCAG21/quickref/)
