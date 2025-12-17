# Implementation Plan: Personal Blog Layout with Three-Column Homepage

**Branch**: `001-blog-layout` | **Date**: 2025-12-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-blog-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a responsive personal blog with three-column homepage layout using Next.js 14 (App Router), TypeScript, and Tailwind CSS. The homepage displays high-view posts (left), blog listings (center), and categories (right), with dedicated category and profile pages. All content is rendered with GitHub-flavored markdown, fully responsive for mobile devices with touch-friendly controls.

## Technical Context

**Language/Version**: TypeScript 5.3+ with Node.js 18+  
**Primary Dependencies**: Next.js 14 (App Router), React 18, Tailwind CSS 3.4, react-markdown, remark-gfm, gray-matter  
**Storage**: PostgreSQL 15+ for blog posts, categories, and author profile; Prisma ORM for database access  
**Testing**: Jest + React Testing Library for unit tests, Playwright for E2E tests  
**Target Platform**: Web (SSR/SSG with Next.js), targeting modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: web (Next.js full-stack application with frontend and API routes)  
**Performance Goals**: <3s page load time, <1s navigation between pages, 90+ Lighthouse performance score  
**Constraints**: <200ms API response time (p95), mobile-first responsive design (320px-768px), SEO-optimized with meta tags  
**Scale/Scope**: Initial deployment for single author, 100+ blog posts, 10-20 categories, <10k monthly visitors

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Content-First Architecture ✅
- Feature enhances core reading experience with organized three-column layout (high-view posts, blog list, categories)
- Prioritizes content accessibility with markdown rendering
- SEO-optimized with Next.js metadata API

### Performance & User Experience ✅
- Next.js SSR/SSG ensures <3s page load time
- Tailwind CSS provides mobile-responsive design utilities
- Lazy loading images with Next.js Image component
- Smooth client-side navigation with App Router

### Security & Privacy ✅
- Input sanitization via DOMPurify for markdown rendering
- XSS protection through react-markdown safe defaults
- HTTPS enforced in production deployment
- No user authentication required for this feature (read-only blog)

### Content Management ✅
- GitHub-flavored markdown via react-markdown + remark-gfm
- Draft/Published status in database schema
- Categories for organization
- SEO metadata fields in database

### Maintainability & Testing ✅
- Clean component architecture with React Server Components
- Unit tests for utility functions and components
- E2E tests for user flows
- TypeScript for type safety

**GATE RESULT: PASS** - All constitution requirements satisfied. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-blog-layout/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage with 3-column layout
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx       # Category filter page
│   ├── profile/
│   │   └── page.tsx           # Author profile page
│   ├── post/
│   │   └── [slug]/
│   │       └── page.tsx       # Individual blog post page
│   ├── api/
│   │   ├── posts/
│   │   │   └── route.ts       # API: fetch posts
│   │   ├── categories/
│   │   │   └── route.ts       # API: fetch categories
│   │   └── profile/
│   │       └── route.ts       # API: fetch author profile
│   ├── layout.tsx             # Root layout with navigation
│   └── globals.css            # Tailwind CSS imports
├── components/                # React components
│   ├── HighViewPosts.tsx     # Left column: high-view posts
│   ├── BlogList.tsx          # Center column: blog post list
│   ├── CategoryList.tsx      # Right column: categories
│   ├── MarkdownRenderer.tsx  # Markdown rendering component
│   ├── PostCard.tsx          # Blog post preview card
│   └── Navigation.tsx        # Site navigation menu
├── lib/                      # Utilities and helpers
│   ├── prisma.ts            # Prisma client singleton
│   ├── markdown.ts          # Markdown processing utilities
│   └── api.ts               # API client functions
├── types/                    # TypeScript type definitions
│   └── index.ts             # Shared types (Post, Category, Author)
└── styles/                   # Additional styles if needed

prisma/
├── schema.prisma            # Database schema (Post, Category, Author)
└── seed.ts                  # Seed data for development

__tests__/
├── components/              # Component unit tests
├── lib/                     # Utility function tests
└── e2e/                     # Playwright E2E tests

public/
└── images/                  # Static images
```

**Structure Decision**: Next.js 14 App Router structure (web application). All pages use Server Components by default for optimal performance. API routes handle data fetching. Prisma ORM manages database access. Components are organized by feature (homepage columns, markdown rendering, navigation).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
