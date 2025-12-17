import Link from 'next/link';
import Image from 'next/image';
import { PostWithRelations } from '@/types';

interface PostCardProps {
  post: PostWithRelations;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${compact ? 'flex flex-col' : ''}`}>
      {post.coverImage && (
        <div className={compact ? 'w-full h-32 flex-shrink-0 relative bg-gray-100' : 'w-full h-48 relative bg-gray-100'}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes={compact ? '300px' : '(max-width: 768px) 100vw, 33vw'}
            unoptimized
            loading="lazy"
          />
        </div>
      )}
      
      <div className={compact ? 'p-3 flex-1 min-w-0' : 'p-6 flex-1'}>
        <div className={`flex ${compact ? 'flex-col gap-1' : 'items-center gap-2'} mb-2`}>
          {post.category.color && (
            <span
              className="px-2 py-0.5 text-xs font-semibold rounded-full text-white w-fit"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
          )}
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <Link href={`/post/${post.slug}`} className="block group">
          <h3 className={`font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors ${compact ? 'text-sm line-clamp-2' : 'text-xl'}`}>
            {post.title}
          </h3>
        </Link>

        {!compact && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={compact ? 20 : 24}
                height={compact ? 20 : 24}
                className="rounded-full"
                unoptimized
              />
            )}
            <span className={compact ? 'text-xs' : ''}>{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={compact ? 'text-xs' : ''}>👁 {post.viewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
