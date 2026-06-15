import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { getAdminSession } from '@/lib/auth';

// GET /api/articles — public
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  
  const filter: Record<string, unknown> = { published: true };
  if (category && category !== 'all') {
    filter.categorySlug = category;
  }

  const articles = await Article.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ articles });
}

// POST /api/articles — admin only
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const { slug, title, excerpt, content, category, categorySlug, author, date, published } = body;

  if (!slug || !title || !excerpt) {
    return NextResponse.json({ error: 'slug, title, and excerpt are required' }, { status: 400 });
  }

  const exists = await Article.findOne({ slug });
  if (exists) {
    return NextResponse.json({ error: 'Article with this slug already exists' }, { status: 409 });
  }

  const article = await Article.create({
    slug, title, excerpt, content, category, categorySlug, author,
    date: date || new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' }),
    published: published ?? true,
  });

  return NextResponse.json({ success: true, article }, { status: 201 });
}
