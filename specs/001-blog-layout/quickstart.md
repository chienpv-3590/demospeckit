# Quickstart Guide: Personal Blog Layout

**Feature**: [spec.md](spec.md) | **Date**: 2025-12-16

This guide helps developers set up the development environment and start building the personal blog with three-column homepage layout.

## Prerequisites

- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL**: 15.x or higher ([Download](https://www.postgresql.org/download/))
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

## Project Setup

### 1. Clone Repository and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd myblog

# Checkout feature branch
git checkout 001-blog-layout

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# .env.local

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/myblog?schema=public"

# Next.js
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Important**: Replace `username` and `password` with your PostgreSQL credentials.

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx prisma db seed
```

This creates the database schema and populates it with:
- 1 author profile
- 3 categories (Technology, Travel, Lifestyle)
- 20 sample blog posts

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### 5. Verify Installation

Open your browser and check:
- ✅ Homepage displays three columns (blog list, high-view posts, categories)
- ✅ Markdown content renders correctly
- ✅ Responsive layout works on mobile (use DevTools)
- ✅ Category filtering works
- ✅ Profile page displays author info

## Project Structure Overview

```
myblog/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx          # Homepage (3-column layout)
│   │   ├── category/[slug]/  # Category filter page
│   │   ├── profile/          # Author profile page
│   │   └── api/              # API routes
│   ├── components/           # React components
│   │   ├── BlogList.tsx
│   │   ├── HighViewPosts.tsx
│   │   ├── CategoryList.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── lib/                  # Utilities
│   │   ├── prisma.ts
│   │   └── markdown.ts
│   └── types/                # TypeScript types
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── __tests__/                # Tests
└── public/                   # Static assets
```

## Development Workflow

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Create new migration
npx prisma migrate dev --name <migration-name>

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

## Common Development Tasks

### Adding a New Blog Post

1. Open Prisma Studio: `npx prisma studio`
2. Navigate to the `Post` table
3. Click "Add record"
4. Fill in fields:
   - `title`, `slug`, `content` (markdown), `excerpt`
   - Select `category` and `author`
   - Set `status` to `published`
   - Set `publishedAt` to current date
5. Save and refresh the homepage

### Creating a New Category

1. Open Prisma Studio: `npx prisma studio`
2. Navigate to the `Category` table
3. Add category with `name`, `slug`, `description`, `color`

### Modifying the Homepage Layout

Edit `src/app/page.tsx`:

```tsx
export default async function HomePage() {
  const posts = await getPosts();
  const highViewPosts = await getHighViewPosts();
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BlogList posts={posts} />
      <HighViewPosts posts={highViewPosts} />
      <CategoryList categories={categories} />
    </div>
  );
}
```

### Customizing Tailwind Styles

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

## Troubleshooting

### Database Connection Error

**Issue**: `Error: Can't reach database server`

**Solution**:
1. Verify PostgreSQL is running: `pg_isready`
2. Check `DATABASE_URL` in `.env.local`
3. Ensure PostgreSQL accepts connections on port 5432

### Markdown Not Rendering

**Issue**: Markdown displays as plain text

**Solution**:
1. Check that `react-markdown` and `remark-gfm` are installed
2. Verify `MarkdownRenderer` component is imported correctly
3. Check browser console for errors

### Responsive Layout Issues

**Issue**: Three columns don't stack on mobile

**Solution**:
1. Verify Tailwind CSS is properly configured
2. Check that classes use mobile-first syntax: `grid-cols-1 md:grid-cols-3`
3. Test in browser DevTools with device emulation

### Port 3000 Already in Use

**Issue**: `Error: Port 3000 is already in use`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or run on different port
npm run dev -- -p 3001
```

## API Testing

Use the provided OpenAPI spec to test API endpoints:

```bash
# Install API testing tool
npm install -g @stoplight/prism-cli

# Start mock API server (for testing without database)
prism mock specs/001-blog-layout/contracts/api.yaml
```

Or use `curl`:

```bash
# Get posts
curl http://localhost:3000/api/posts

# Get high-view posts
curl http://localhost:3000/api/posts/high-view

# Get categories
curl http://localhost:3000/api/categories

# Get profile
curl http://localhost:3000/api/profile
```

## Next Steps

1. **Read the documentation**:
   - [plan.md](plan.md) - Technical implementation plan
   - [data-model.md](data-model.md) - Database schema
   - [contracts/api.yaml](contracts/api.yaml) - API specification

2. **Explore the codebase**:
   - Start with `src/app/page.tsx` (homepage)
   - Review components in `src/components/`
   - Check Prisma schema in `prisma/schema.prisma`

3. **Run tests**:
   - Execute unit tests: `npm run test`
   - Run E2E tests: `npm run test:e2e`

4. **Make your first change**:
   - Modify a component style
   - Add a new test case
   - Create a new blog post

## Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [react-markdown Documentation](https://github.com/remarkjs/react-markdown)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Getting Help

- Check the [spec.md](spec.md) for requirements
- Review [research.md](research.md) for technology decisions
- Open an issue on GitHub for bugs
- Ask questions in team Slack channel

---

**Happy coding! 🚀**
