import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      status: POST_STATUS.PUBLISHED,
    },
    include: {
      category: true,
      author: true,
    },
  });

  return post;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords || '',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/category/${post.category.slug}`}
              className="px-4 py-2 text-sm font-semibold rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: post.category.color || '#3B82F6' }}
            >
              {post.category.name}
            </Link>
            <span className="text-gray-500">{formattedDate}</span>
            <span className="text-gray-500">👁 {post.viewCount.toLocaleString()} views</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
                unoptimized
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              {post.author.location && (
                <p className="text-sm text-gray-500">{post.author.location}</p>
              )}
            </div>
          </div>

          {post.coverImage && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Author Bio */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start gap-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={80}
                height={80}
                className="rounded-full"
                unoptimized
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author.name}</h3>
              <div className="prose prose-sm max-w-none">
                <MarkdownRenderer content={post.author.bio} />
              </div>
              <div className="flex gap-4 mt-4">
                {post.author.website && (
                  <Link
                    href={post.author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-blue-600 transition-colors min-h-[44px]"
                  >
                    🌐 Website
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="text-primary hover:text-blue-600 transition-colors min-h-[44px]"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors min-h-[48px]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
