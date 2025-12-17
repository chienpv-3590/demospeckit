# MyBlog

A modern personal blog built with Next.js 14, TypeScript, Tailwind CSS, and SQLite.

## Features

- ✨ **Three-Column Homepage**: Blog list, trending posts, and categories
- 📝 **Markdown Support**: Full GitHub-flavored markdown with syntax highlighting
- 📱 **Mobile Responsive**: Touch-friendly design from 320px width
- 🎨 **Beautiful UI**: Tailwind CSS with custom color scheme
- 🔍 **SEO Optimized**: Meta tags and semantic HTML
- ⚡ **Fast**: Built on Next.js 14 App Router with Server Components
- 🗄️ **Type-Safe Database**: Prisma ORM with SQLite

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4
- **Database**: SQLite with Prisma ORM 5
- **Markdown**: react-markdown, remark-gfm, rehype-highlight
- **Testing**: Jest, React Testing Library, Playwright

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd myblog
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
# Create the database and run migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data

## Project Structure

```
myblog/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── category/          # Category pages
│   ├── post/              # Individual post pages
│   ├── profile/           # Author profile page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── BlogList.tsx
│   ├── CategoryList.tsx
│   ├── HighViewPosts.tsx
│   ├── MarkdownRenderer.tsx
│   ├── Navigation.tsx
│   └── PostCard.tsx
├── lib/                   # Utility functions
│   ├── markdown.ts
│   └── prisma.ts
├── types/                 # TypeScript types
│   └── index.ts
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   └── seed.ts
├── __tests__/            # Test files
├── public/               # Static assets
└── package.json
```

## Database Schema

### Author

- Profile information (name, email, avatar, bio)
- Social links (GitHub, Twitter, LinkedIn)
- Location and website

### Category

- Name, slug, description
- Color for visual distinction
- Related posts

### Post

- Title, slug, content (markdown)
- Excerpt and cover image
- Publication status (draft/published)
- View count
- SEO metadata
- Relationships to Author and Category

## Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- Render

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For support, please open an issue in the GitHub repository.
