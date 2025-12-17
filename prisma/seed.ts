import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create author
  const author = await prisma.author.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://placehold.co/200x200/3B82F6/FFFFFF.png?text=JD',
      bio: `# About Me

I'm a passionate software developer with over 10 years of experience in web development. 

I specialize in:
- Full-stack JavaScript/TypeScript
- React and Next.js
- Node.js backends
- Database design and optimization

When I'm not coding, you can find me hiking, reading tech blogs, or contributing to open source projects.`,
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      socialLinks: JSON.stringify([
        { platform: 'GitHub', url: 'https://github.com/johndoe' },
        { platform: 'Twitter', url: 'https://twitter.com/johndoe' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' }
      ])
    }
  });

  console.log(`Created author: ${author.name}`);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Articles about web development, frameworks, and best practices',
        color: '#3B82F6'
      }
    }),
    prisma.category.create({
      data: {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Deep dives into JavaScript, TypeScript, and related technologies',
        color: '#F59E0B'
      }
    }),
    prisma.category.create({
      data: {
        name: 'DevOps',
        slug: 'devops',
        description: 'CI/CD, deployment strategies, and infrastructure topics',
        color: '#10B981'
      }
    })
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create sample posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      excerpt: 'Learn the basics of Next.js 14 and its new App Router architecture',
      content: `# Getting Started with Next.js 14

Next.js 14 introduces several exciting features that make building modern web applications easier than ever.

## What's New?

- **App Router**: A new paradigm for building layouts and pages
- **Server Components**: Render components on the server for better performance
- **Streaming**: Progressive rendering for faster page loads

## Installation

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Your First Component

\`\`\`tsx
export default function HomePage() {
  return <h1>Welcome to Next.js 14!</h1>
}
\`\`\`

This is just the beginning of what you can do with Next.js 14!`,
      coverImage: 'https://placehold.co/800x400/000000/FFFFFF.png?text=Next.js',
      status: 'published',
      publishedAt: new Date('2024-01-15'),
      viewCount: 1250,
      seoTitle: 'Getting Started with Next.js 14 - Complete Guide',
      seoDescription: 'Learn how to build modern web applications with Next.js 14',
      seoKeywords: 'nextjs,react,web development,tutorial',
      categoryId: categories[0].id,
      authorId: author.id
    },
    {
      title: 'Understanding TypeScript Generics',
      slug: 'understanding-typescript-generics',
      excerpt: 'Master TypeScript generics with practical examples and use cases',
      content: `# Understanding TypeScript Generics

Generics are one of the most powerful features in TypeScript, allowing you to write reusable, type-safe code.

## What are Generics?

Generics provide a way to create components that work with multiple types rather than a single type.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Real-World Example

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}
\`\`\`

Generics make your code more flexible and maintainable!`,
      coverImage: 'https://placehold.co/800x400/3178C6/FFFFFF.png?text=TypeScript',
      status: 'published',
      publishedAt: new Date('2024-02-10'),
      viewCount: 2100,
      seoTitle: 'TypeScript Generics Explained with Examples',
      seoDescription: 'A comprehensive guide to understanding and using TypeScript generics',
      seoKeywords: 'typescript,generics,type safety,programming',
      categoryId: categories[1].id,
      authorId: author.id
    },
    {
      title: 'Docker Compose for Development',
      slug: 'docker-compose-development',
      excerpt: 'Set up a local development environment using Docker Compose',
      content: `# Docker Compose for Development

Docker Compose simplifies managing multi-container applications in development.

## Basic docker-compose.yml

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
\`\`\`

## Running Your Stack

\`\`\`bash
docker-compose up -d
\`\`\`

This creates an isolated, reproducible development environment!`,
      coverImage: 'https://placehold.co/800x400/2496ED/FFFFFF.png?text=Docker',
      status: 'published',
      publishedAt: new Date('2024-03-05'),
      viewCount: 850,
      seoTitle: 'Docker Compose for Local Development',
      seoDescription: 'Learn how to use Docker Compose for your development workflow',
      seoKeywords: 'docker,docker-compose,devops,containers',
      categoryId: categories[2].id,
      authorId: author.id
    },
    {
      title: 'React Server Components Explained',
      slug: 'react-server-components-explained',
      excerpt: 'Deep dive into React Server Components and when to use them',
      content: `# React Server Components Explained

React Server Components are a new way to build React applications with better performance.

## Key Benefits

- **Reduced Bundle Size**: Server components don't ship to the client
- **Direct Database Access**: Query data directly from components
- **Automatic Code Splitting**: Better performance by default

## Example

\`\`\`tsx
// This is a Server Component
async function BlogPost({ id }) {
  const post = await db.post.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}
\`\`\`

Server Components are the future of React development!`,
      coverImage: 'https://placehold.co/800x400/61DAFB/000000.png?text=React',
      status: 'published',
      publishedAt: new Date('2024-03-20'),
      viewCount: 3200,
      seoTitle: 'React Server Components - Complete Guide',
      seoDescription: 'Everything you need to know about React Server Components',
      seoKeywords: 'react,server components,nextjs,performance',
      categoryId: categories[0].id,
      authorId: author.id
    },
    {
      title: 'Advanced JavaScript Patterns',
      slug: 'advanced-javascript-patterns',
      excerpt: 'Explore advanced design patterns in JavaScript',
      content: `# Advanced JavaScript Patterns

Let's explore some advanced patterns that will level up your JavaScript skills.

## Module Pattern

\`\`\`javascript
const calculator = (function() {
  let value = 0;
  
  return {
    add: (n) => value += n,
    getValue: () => value
  };
})();
\`\`\`

## Observer Pattern

\`\`\`javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    this.events[event]?.forEach(cb => cb(data));
  }
}
\`\`\`

These patterns help write more maintainable code!`,
      coverImage: 'https://placehold.co/800x400/F7DF1E/000000.png?text=JavaScript',
      status: 'published',
      publishedAt: new Date('2024-04-01'),
      viewCount: 1800,
      seoTitle: 'Advanced JavaScript Design Patterns',
      seoDescription: 'Master advanced JavaScript patterns for better code',
      seoKeywords: 'javascript,design patterns,programming',
      categoryId: categories[1].id,
      authorId: author.id
    }
  ];

  // Create posts in batches
  for (const postData of posts) {
    await prisma.post.create({ data: postData });
  }

  console.log(`Created ${posts.length} posts`);

  // Create more posts with variations (total 20)
  for (let i = 6; i <= 20; i++) {
    const categoryIndex = i % 3;
    await prisma.post.create({
      data: {
        title: `Sample Blog Post ${i}`,
        slug: `sample-blog-post-${i}`,
        excerpt: `This is a sample excerpt for blog post number ${i}`,
        content: `# Sample Blog Post ${i}

This is sample content for demonstration purposes.

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 2

\`\`\`javascript
console.log('Hello World!');
\`\`\`

More content here...`,
        coverImage: `https://placehold.co/800x400/8B5CF6/FFFFFF.png?text=Post+${i}`,
        status: 'published',
        publishedAt: new Date(2024, 0, i),
        viewCount: Math.floor(Math.random() * 2000) + 100,
        seoTitle: `Sample Blog Post ${i}`,
        seoDescription: `Description for sample blog post ${i}`,
        seoKeywords: 'sample,blog,post',
        categoryId: categories[categoryIndex].id,
        authorId: author.id
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
