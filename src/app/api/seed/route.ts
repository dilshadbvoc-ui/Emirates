import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import Admin from '@/models/Admin';
import { articles } from '@/data/articles';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    // 1. Seed default admin if env variables exist and admin table is empty
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@emiratesvisa.ae';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Emirates@2026';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({
        email: adminEmail,
        passwordHash: hashedPassword,
      });
    }

    // 2. Seed articles
    for (const art of articles) {
      const existing = await Article.findOne({ slug: art.slug });
      if (!existing) {
        await Article.create({
          slug: art.slug,
          title: art.title,
          excerpt: art.excerpt,
          content: art.content || art.excerpt,
          category: art.category,
          categorySlug: art.categorySlug,
          author: art.author,
          date: art.date,
          published: true,
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
