import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { getAdminSession } from '@/lib/auth';

// GET /api/leads — admin only
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads });
}

// POST /api/leads — public (contact form / calculator)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, phone, service, message, source, calculatorSummary } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      service,
      message,
      source: source ?? 'contact',
      calculatorSummary,
    });

    return NextResponse.json({ success: true, id: lead._id }, { status: 201 });
  } catch (err) {
    console.error('Lead creation error:', err);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
