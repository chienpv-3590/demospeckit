// Type exports from Prisma
export type { Author, Category, Post } from '@prisma/client';

// Custom types for API responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PostWithRelations {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  status: string;
  publishedAt: Date | null;
  viewCount: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string;
  categoryId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  };
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  postCount: number;
}

export interface AuthorProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string;
  location: string | null;
  website: string | null;
  socialLinks: Array<{ platform: string; url: string }>;
  postCount: number;
}

// Post status constants
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const;

export type PostStatus = typeof POST_STATUS[keyof typeof POST_STATUS];
