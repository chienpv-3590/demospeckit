# Data Model: Personal Blog Layout with Three-Column Homepage

**Feature**: [spec.md](spec.md) | **Date**: 2025-12-16

This document defines the data entities and relationships for the personal blog application.

## Entity Definitions

### 1. Post (Blog Post)

Represents a blog article with markdown content.

**Attributes**:
- `id`: UUID - Unique identifier
- `title`: String (max 200 chars) - Post title
- `slug`: String (max 250 chars, unique) - URL-friendly identifier (e.g., "my-first-post")
- `content`: Text - Full blog post content in markdown format
- `excerpt`: String (max 300 chars) - Short preview/summary for listings
- `coverImage`: String (optional) - URL or path to cover image
- `status`: Enum['draft', 'published'] - Publication status
- `publishedAt`: DateTime (nullable) - Publication timestamp
- `viewCount`: Integer (default 0) - Number of times post has been viewed
- `categoryId`: UUID (foreign key) - Reference to Category
- `authorId`: UUID (foreign key) - Reference to Author
- `createdAt`: DateTime - Record creation timestamp
- `updatedAt`: DateTime - Last update timestamp
- `seoTitle`: String (max 60 chars, optional) - SEO-optimized title
- `seoDescription`: String (max 160 chars, optional) - SEO meta description
- `seoKeywords`: String[] (optional) - Array of keywords for SEO

**Relationships**:
- Belongs to one Category (many-to-one)
- Belongs to one Author (many-to-one)

**Validation Rules**:
- Title must not be empty
- Slug must be unique and URL-safe (lowercase, hyphens only)
- Content must not be empty for published posts
- publishedAt must be set when status is 'published'
- viewCount cannot be negative

**Indexes**:
- Primary: `id`
- Unique: `slug`
- Index: `categoryId` (for filtering by category)
- Index: `viewCount DESC` (for high-view posts query)
- Index: `publishedAt DESC` (for chronological listing)
- Index: `status` (for filtering drafts/published)

---

### 2. Category

Represents a content grouping/topic for blog posts.

**Attributes**:
- `id`: UUID - Unique identifier
- `name`: String (max 50 chars, unique) - Category name (e.g., "Technology", "Travel")
- `slug`: String (max 60 chars, unique) - URL-friendly identifier (e.g., "technology")
- `description`: Text (optional) - Category description in markdown
- `color`: String (optional, max 7 chars) - Hex color code for UI theming (e.g., "#3B82F6")
- `createdAt`: DateTime - Record creation timestamp
- `updatedAt`: DateTime - Last update timestamp

**Relationships**:
- Has many Posts (one-to-many)

**Computed Fields**:
- `postCount`: Integer - Number of published posts in this category (computed via aggregation)

**Validation Rules**:
- Name must not be empty
- Slug must be unique and URL-safe
- Color must be valid hex format if provided

**Indexes**:
- Primary: `id`
- Unique: `slug`
- Unique: `name`

---

### 3. Author (Blog Owner Profile)

Represents the blog author's profile information.

**Attributes**:
- `id`: UUID - Unique identifier
- `name`: String (max 100 chars) - Author's full name
- `email`: String (max 150 chars, unique) - Contact email
- `avatar`: String (optional) - URL or path to profile image
- `bio`: Text - Author biography in markdown format
- `location`: String (max 100 chars, optional) - Geographic location
- `website`: String (max 200 chars, optional) - Personal website URL
- `socialLinks`: JSON - Array of social media links
  ```json
  [
    {"platform": "twitter", "url": "https://twitter.com/username"},
    {"platform": "github", "url": "https://github.com/username"},
    {"platform": "linkedin", "url": "https://linkedin.com/in/username"}
  ]
  ```
- `createdAt`: DateTime - Record creation timestamp
- `updatedAt`: DateTime - Last update timestamp

**Relationships**:
- Has many Posts (one-to-many)

**Validation Rules**:
- Name must not be empty
- Email must be valid format
- socialLinks must follow schema: array of {platform: string, url: string}
- URLs must be valid format

**Indexes**:
- Primary: `id`
- Unique: `email`

---

## Relationships Diagram

```
Author (1) ----< (many) Post (many) >---- (1) Category

Author:
- id
- name
- email
- avatar
- bio
- socialLinks

Post:
- id
- title
- slug
- content
- excerpt
- coverImage
- status
- publishedAt
- viewCount
- categoryId (FK)
- authorId (FK)
- seoTitle
- seoDescription

Category:
- id
- name
- slug
- description
- color
```

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Author {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  avatar      String?
  bio         String
  location    String?
  website     String?
  socialLinks Json[]   // Array of {platform: string, url: string}
  posts       Post[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("authors")
}

model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  slug        String   @unique
  description String?
  color       String?
  posts       Post[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("categories")
}

model Post {
  id             String    @id @default(uuid())
  title          String
  slug           String    @unique
  content        String    @db.Text
  excerpt        String
  coverImage     String?
  status         PostStatus @default(draft)
  publishedAt    DateTime?
  viewCount      Int       @default(0)
  seoTitle       String?
  seoDescription String?
  seoKeywords    String[]
  
  categoryId     String
  category       Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  
  authorId       String
  author         Author    @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([categoryId])
  @@index([viewCount(sort: Desc)])
  @@index([publishedAt(sort: Desc)])
  @@index([status])
  @@map("posts")
}

enum PostStatus {
  draft
  published
}
```

## Sample Data (for seed.ts)

```typescript
// prisma/seed.ts

const author = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/images/avatar.jpg",
  bio: "Full-stack developer passionate about web technologies and open source.",
  location: "San Francisco, CA",
  website: "https://johndoe.com",
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/johndoe" },
    { platform: "github", url: "https://github.com/johndoe" },
  ],
};

const categories = [
  { name: "Technology", slug: "technology", description: "Posts about tech trends and tutorials", color: "#3B82F6" },
  { name: "Travel", slug: "travel", description: "Travel experiences and tips", color: "#10B981" },
  { name: "Lifestyle", slug: "lifestyle", description: "Life tips and personal stories", color: "#F59E0B" },
];

const posts = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    content: "# Introduction\n\nNext.js 14 brings amazing new features...",
    excerpt: "Learn about the new features in Next.js 14 and how to get started.",
    status: "published",
    publishedAt: new Date("2025-12-10"),
    viewCount: 150,
    categoryId: "technology",
    seoTitle: "Next.js 14 Tutorial - Complete Guide",
    seoDescription: "A comprehensive guide to Next.js 14 features and best practices.",
  },
  // ... more posts
];
```

## Query Patterns

### Get All Published Posts (Homepage Left Column)
```typescript
const posts = await prisma.post.findMany({
  where: { status: 'published' },
  orderBy: { publishedAt: 'desc' },
  take: 10,
  skip: (page - 1) * 10,
  include: {
    category: { select: { name: true, slug: true } },
    author: { select: { name: true, avatar: true } },
  },
});
```

### Get High-View Posts (Homepage Center Column)
```typescript
const highViewPosts = await prisma.post.findMany({
  where: { status: 'published' },
  orderBy: { viewCount: 'desc' },
  take: 5,
  include: {
    category: { select: { name: true, slug: true } },
  },
});
```

### Get All Categories with Post Count (Homepage Right Column)
```typescript
const categories = await prisma.category.findMany({
  include: {
    _count: {
      select: { posts: { where: { status: 'published' } } },
    },
  },
  orderBy: { name: 'asc' },
});
```

### Get Posts by Category (Category Page)
```typescript
const posts = await prisma.post.findMany({
  where: {
    status: 'published',
    category: { slug: categorySlug },
  },
  orderBy: { publishedAt: 'desc' },
  include: {
    category: true,
    author: { select: { name: true, avatar: true } },
  },
});
```

### Get Author Profile (Profile Page)
```typescript
const author = await prisma.author.findFirst({
  include: {
    _count: {
      select: { posts: { where: { status: 'published' } } },
    },
  },
});
```

### Increment View Count
```typescript
await prisma.post.update({
  where: { slug: postSlug },
  data: { viewCount: { increment: 1 } },
});
```

## State Transitions

### Post Status Workflow
```
[draft] --publish--> [published]
[published] --unpublish--> [draft]
```

**Rules**:
- When transitioning to `published`, `publishedAt` must be set to current timestamp
- When transitioning to `draft`, `publishedAt` can be preserved or nullified (design decision)
- Only `published` posts appear in public listings

## Data Integrity

1. **Cascading Deletes**:
   - Deleting a Category cascades to all Posts in that category
   - Deleting an Author cascades to all Posts by that author

2. **Referential Integrity**:
   - Every Post must have a valid `categoryId` and `authorId`
   - Enforced at database level with foreign key constraints

3. **Constraints**:
   - Post slugs must be unique globally
   - Category names and slugs must be unique
   - Author email must be unique
