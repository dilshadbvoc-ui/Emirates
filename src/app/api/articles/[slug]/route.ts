import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { getAdminSession } from '@/lib/auth';

// GET /api/articles/[slug]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const article = await Article.findOne({ slug, published: true }).lean();
  if (!article) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ article });
}

// PUT /api/articles/[slug] — admin only
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const { slug } = await params;
  const body = await req.json();

  const article = await Article.findOneAndUpdate({ slug }, body, { new: true });
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ success: true, article });
}

// DELETE /api/articles/[slug] — admin only
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const { slug } = await params;
  await Article.findOneAndDelete({ slug });
  return NextResponse.json({ success: true });
}
