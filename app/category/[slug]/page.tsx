import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { POST_STATUS, PostWithRelations } from '@/types';
import BlogList from '@/components/BlogList';
import CategoryList from '@/components/CategoryList';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
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

  return category;
}

async function getCategoryPosts(categoryId: string): Promise<{ posts: PostWithRelations[]; total: number }> {
  const pageSize = 10;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
        categoryId,
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
        categoryId,
      },
    }),
  ]);

  return { posts: posts as PostWithRelations[], total };
}

async function getAllCategories() {
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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - MyBlog`,
    description: category.description || `Browse posts in ${category.name} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const [{ posts, total }, allCategories] = await Promise.all([
    getCategoryPosts(category.id),
    getAllCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-4 mb-4">
          {category.color && (
            <div
              className="w-12 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 mt-2">{category.description}</p>
            )}
          </div>
        </div>
        <p className="text-gray-500">
          {category._count.posts} {category._count.posts === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts */}
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            <BlogList initialPosts={posts} initialTotal={total} categorySlug={slug} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">
                No posts found in this category yet.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors min-h-[48px]"
              >
                Browse All Posts
              </a>
            </div>
          )}
        </div>

        {/* Sidebar: Other Categories */}
        <div className="lg:col-span-1">
          <CategoryList categories={allCategories} />
        </div>
      </div>
    </div>
  );
}
