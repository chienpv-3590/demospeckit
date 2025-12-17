import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';

export async function GET() {
  try {
    // Fetch all categories with post counts
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

    // Transform to include postCount
    const categoriesWithCount = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      postCount: category._count.posts,
    }));

    return NextResponse.json({ data: categoriesWithCount });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
