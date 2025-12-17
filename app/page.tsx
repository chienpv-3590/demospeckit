import { prisma } from '@/lib/prisma';
import { POST_STATUS, PostWithRelations, CategoryWithCount } from '@/types';
import BlogList from '@/components/BlogList';
import HighViewPosts from '@/components/HighViewPosts';
import CategoryList from '@/components/CategoryList';

async function getInitialPosts(): Promise<{ posts: PostWithRelations[]; total: number }> {
  const pageSize = 10;
  
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
      },
      take: pageSize,
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    }),
    prisma.post.count({
      where: {
        status: POST_STATUS.PUBLISHED,
      },
    }),
  ]);

  return { posts: posts as PostWithRelations[], total };
}

async function getHighViewPosts(): Promise<PostWithRelations[]> {
  const posts = await prisma.post.findMany({
    where: {
      status: POST_STATUS.PUBLISHED,
    },
    take: 5,
    orderBy: {
      viewCount: 'desc',
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  return posts as PostWithRelations[];
}

async function getCategories(): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: {
          posts: {
            where: {
              status: POST_STATUS.PUBLISHED,
            },
          },
        },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    color: category.color,
    postCount: category._count.posts,
  }));
}

export default async function HomePage() {
  const [{ posts, total }, highViewPosts, categories] = await Promise.all([
    getInitialPosts(),
    getHighViewPosts(),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: High View Posts - 3 cols */}
        <div className="lg:col-span-3 order-1 lg:order-1">
          <HighViewPosts posts={highViewPosts} />
        </div>

        {/* Center Column: Blog List - 6 cols */}
        <div className="lg:col-span-6 order-2 lg:order-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📝 <span>Bài viết mới nhất</span>
          </h2>
          <BlogList initialPosts={posts} initialTotal={total} />
        </div>

        {/* Right Column: Categories - 3 cols */}
        <div className="lg:col-span-3 order-3 lg:order-3">
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
}
