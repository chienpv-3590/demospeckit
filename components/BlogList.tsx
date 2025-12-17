'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { PostWithRelations } from '@/types';

interface BlogListProps {
  initialPosts: PostWithRelations[];
  initialTotal: number;
  categorySlug?: string;
}

export default function BlogList({ initialPosts, initialTotal, categorySlug }: BlogListProps) {
  const [posts, setPosts] = useState<PostWithRelations[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  const loadMore = async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);
    try {
      const url = categorySlug
        ? `/api/posts?page=${page + 1}&pageSize=${pageSize}&category=${categorySlug}`
        : `/api/posts?page=${page + 1}&pageSize=${pageSize}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      setPosts((prev) => [...prev, ...data.data]);
      setPage(data.page);
      setTotal(data.total);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      )}

      {page < totalPages && (
        <div className="text-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-h-[48px] min-w-[120px]"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        Showing {posts.length} of {total} posts
      </div>
    </div>
  );
}
