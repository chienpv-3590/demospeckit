'use client';

import PostCard from './PostCard';
import { PostWithRelations } from '@/types';

interface HighViewPostsProps {
  posts: PostWithRelations[];
}

export default function HighViewPosts({ posts }: HighViewPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No high-view posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          🔥 <span>Bài viết nổi bật</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">Bài viết có lượt xem cao nhất</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  );
}
