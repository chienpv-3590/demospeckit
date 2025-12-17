import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const skip = (page - 1) * pageSize;

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Fetch posts for this category
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: POST_STATUS.PUBLISHED,
          categoryId: category.id,
        },
        skip,
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
          categoryId: category.id,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      category,
      data: posts,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category posts' },
      { status: 500 }
    );
  }
}
