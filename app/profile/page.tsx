import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PostCard from '@/components/PostCard';

async function getAuthorProfile() {
  const author = await prisma.author.findFirst({
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

  if (!author) return null;

  // Parse social links
  let socialLinks = [];
  try {
    socialLinks = JSON.parse(author.socialLinks);
  } catch (e) {
    socialLinks = [];
  }

  return {
    ...author,
    socialLinks,
    postCount: author._count.posts,
  };
}

async function getAuthorPosts(authorId: string) {
  const posts = await prisma.post.findMany({
    where: {
      status: POST_STATUS.PUBLISHED,
      authorId,
    },
    take: 10,
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
  });

  return posts;
}

export const metadata: Metadata = {
  title: 'Profile - MyBlog',
  description: 'About the author and their latest posts',
};

export default async function ProfilePage() {
  const profile = await getAuthorProfile();

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">Author profile is not available.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors min-h-[48px]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const recentPosts = await getAuthorPosts(profile.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            {profile.avatar && (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={120}
                height={120}
                className="rounded-full"
                unoptimized
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              {profile.location && (
                <p className="text-gray-600 mb-2">📍 {profile.location}</p>
              )}
              <p className="text-gray-500">✍️ {profile.postCount} published posts</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
            <MarkdownRenderer content={profile.bio} />
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {profile.website && (
              <Link
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors min-h-[44px]"
              >
                🌐 Website
              </Link>
            )}
            {profile.socialLinks.map((link: { platform: string; url: string }, index: number) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors min-h-[44px]"
              >
                {link.platform}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Posts</h2>
          {recentPosts.length > 0 ? (
            <div className="space-y-6">
              {recentPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No posts yet.</p>
            </div>
          )}
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
    </div>
  );
}
