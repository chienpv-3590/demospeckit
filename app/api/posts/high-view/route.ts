import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';

export async function GET() {
  try {
    // Fetch top 5 posts by view count
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

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error('Error fetching high-view posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch high-view posts' },
      { status: 500 }
    );
  }
}
