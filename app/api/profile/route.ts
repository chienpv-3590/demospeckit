import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { POST_STATUS } from '@/types';

export async function GET() {
  try {
    // Get the first author (single author blog)
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

    if (!author) {
      return NextResponse.json(
        { error: 'Author profile not found' },
        { status: 404 }
      );
    }

    // Parse social links
    let socialLinks = [];
    try {
      socialLinks = JSON.parse(author.socialLinks);
    } catch (e) {
      socialLinks = [];
    }

    const profile = {
      id: author.id,
      name: author.name,
      email: author.email,
      avatar: author.avatar,
      bio: author.bio,
      location: author.location,
      website: author.website,
      socialLinks,
      postCount: author._count.posts,
    };

    return NextResponse.json({ data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
