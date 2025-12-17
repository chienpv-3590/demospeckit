# API Response Examples

This document provides example request/response payloads for the Personal Blog API.

## Posts Endpoints

### GET /api/posts

**Request:**
```
GET /api/posts?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Next.js 14",
      "slug": "getting-started-nextjs-14",
      "excerpt": "Learn about the new features in Next.js 14 and how to get started with the App Router, Server Components, and more.",
      "coverImage": "/images/posts/nextjs-14-cover.jpg",
      "publishedAt": "2025-12-10T08:00:00Z",
      "viewCount": 150,
      "category": {
        "id": "650e8400-e29b-41d4-a716-446655440001",
        "name": "Technology",
        "slug": "technology"
      },
      "author": {
        "name": "John Doe",
        "avatar": "/images/avatar.jpg"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Exploring Tokyo: A Travel Guide",
      "slug": "exploring-tokyo-travel-guide",
      "excerpt": "Discover the best places to visit, eat, and experience in Tokyo, Japan. From traditional temples to modern attractions.",
      "coverImage": "/images/posts/tokyo-cover.jpg",
      "publishedAt": "2025-12-08T15:30:00Z",
      "viewCount": 89,
      "category": {
        "id": "650e8400-e29b-41d4-a716-446655440002",
        "name": "Travel",
        "slug": "travel"
      },
      "author": {
        "name": "John Doe",
        "avatar": "/images/avatar.jpg"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### GET /api/posts/high-view

**Request:**
```
GET /api/posts/high-view?limit=5
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Next.js 14",
      "slug": "getting-started-nextjs-14",
      "excerpt": "Learn about the new features in Next.js 14...",
      "coverImage": "/images/posts/nextjs-14-cover.jpg",
      "publishedAt": "2025-12-10T08:00:00Z",
      "viewCount": 1520,
      "category": {
        "id": "650e8400-e29b-41d4-a716-446655440001",
        "name": "Technology",
        "slug": "technology"
      },
      "author": {
        "name": "John Doe",
        "avatar": "/images/avatar.jpg"
      }
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "title": "Mastering Tailwind CSS",
      "slug": "mastering-tailwind-css",
      "excerpt": "A comprehensive guide to utility-first CSS...",
      "coverImage": "/images/posts/tailwind-cover.jpg",
      "publishedAt": "2025-11-25T10:15:00Z",
      "viewCount": 1340,
      "category": {
        "id": "650e8400-e29b-41d4-a716-446655440001",
        "name": "Technology",
        "slug": "technology"
      },
      "author": {
        "name": "John Doe",
        "avatar": "/images/avatar.jpg"
      }
    }
  ]
}
```

---

### GET /api/posts/{slug}

**Request:**
```
GET /api/posts/getting-started-nextjs-14
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Getting Started with Next.js 14",
  "slug": "getting-started-nextjs-14",
  "excerpt": "Learn about the new features in Next.js 14 and how to get started with the App Router, Server Components, and more.",
  "content": "# Introduction\n\nNext.js 14 brings amazing new features that make building React applications faster and more efficient...\n\n## What's New\n\n- Server Actions\n- Improved caching\n- Partial Prerendering\n\n```typescript\nexport default async function Page() {\n  const data = await fetchData();\n  return <div>{data.title}</div>;\n}\n```\n\n## Conclusion\n\nNext.js 14 is a game-changer for React developers.",
  "coverImage": "/images/posts/nextjs-14-cover.jpg",
  "publishedAt": "2025-12-10T08:00:00Z",
  "viewCount": 150,
  "seoTitle": "Next.js 14 Tutorial - Complete Guide",
  "seoDescription": "A comprehensive guide to Next.js 14 features and best practices for building modern web applications.",
  "seoKeywords": ["nextjs", "react", "tutorial", "web development"],
  "category": {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "name": "Technology",
    "slug": "technology"
  },
  "author": {
    "name": "John Doe",
    "avatar": "/images/avatar.jpg"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Post not found",
  "code": "POST_NOT_FOUND",
  "details": {
    "slug": "non-existent-post"
  }
}
```

---

### POST /api/posts/{slug}/view

**Request:**
```
POST /api/posts/getting-started-nextjs-14/view
```

**Response (200 OK):**
```json
{
  "viewCount": 151
}
```

---

## Categories Endpoints

### GET /api/categories

**Request:**
```
GET /api/categories
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "Technology",
      "slug": "technology",
      "description": "Posts about tech trends, tutorials, and software development.",
      "color": "#3B82F6",
      "postCount": 23
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440002",
      "name": "Travel",
      "slug": "travel",
      "description": "Travel experiences, guides, and photography.",
      "color": "#10B981",
      "postCount": 15
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440003",
      "name": "Lifestyle",
      "slug": "lifestyle",
      "description": "Life tips, personal growth, and productivity.",
      "color": "#F59E0B",
      "postCount": 9
    }
  ]
}
```

---

### GET /api/categories/{slug}

**Request:**
```
GET /api/categories/technology
```

**Response (200 OK):**
```json
{
  "id": "650e8400-e29b-41d4-a716-446655440001",
  "name": "Technology",
  "slug": "technology",
  "description": "Posts about tech trends, tutorials, and software development.",
  "color": "#3B82F6",
  "postCount": 23,
  "posts": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Getting Started with Next.js 14",
      "slug": "getting-started-nextjs-14",
      "excerpt": "Learn about the new features in Next.js 14...",
      "coverImage": "/images/posts/nextjs-14-cover.jpg",
      "publishedAt": "2025-12-10T08:00:00Z",
      "viewCount": 150,
      "category": {
        "id": "650e8400-e29b-41d4-a716-446655440001",
        "name": "Technology",
        "slug": "technology"
      },
      "author": {
        "name": "John Doe",
        "avatar": "/images/avatar.jpg"
      }
    }
  ]
}
```

**Response (404 Not Found):**
```json
{
  "error": "Category not found",
  "code": "CATEGORY_NOT_FOUND",
  "details": {
    "slug": "non-existent-category"
  }
}
```

---

## Profile Endpoint

### GET /api/profile

**Request:**
```
GET /api/profile
```

**Response (200 OK):**
```json
{
  "id": "750e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "/images/avatar.jpg",
  "bio": "Full-stack developer passionate about **web technologies** and open source. I write about coding, travel, and life.\n\n- 10+ years experience\n- Love TypeScript and React\n- Coffee enthusiast ☕",
  "location": "San Francisco, CA",
  "website": "https://johndoe.com",
  "socialLinks": [
    {
      "platform": "twitter",
      "url": "https://twitter.com/johndoe"
    },
    {
      "platform": "github",
      "url": "https://github.com/johndoe"
    },
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/in/johndoe"
    }
  ],
  "postCount": 47
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid query parameters",
  "code": "INVALID_PARAMS",
  "details": {
    "page": "must be a positive integer",
    "limit": "must be between 1 and 50"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR",
  "details": {
    "message": "An unexpected error occurred"
  }
}
```
