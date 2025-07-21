// app/api/event-board/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Event from '@/models/Event'

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);

    const month = parseInt(searchParams.get("month") || "");
    const year = parseInt(searchParams.get("year") || "");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const skip = (page - 1) * limit;

    const query: any = { approved: true };

    if (!isNaN(month) && !isNaN(year)) {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      query.date = { $gte: start.toISOString(), $lte: end.toISOString() };
    }

    const totalEvents = await Event.countDocuments(query);
    const events = await Event.find(query).sort({ date: 1 }).skip(skip).limit(limit);

    return NextResponse.json({
      success: true,
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
    });
  } catch (err) {
    console.error("GET /api/event-board error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch events" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const data = await req.json()

    const event = await Event.create({
      ...data,
      approved: false
    })

    return NextResponse.json({ success: true, event })
  } catch (err) {
    console.error('POST /api/event-board error:', err)
    return NextResponse.json({ success: false, message: 'Failed to submit event' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB()
    const { id, email } = await req.json()
    if (!id || !email) {
      return NextResponse.json({ success: false, message: 'Event ID and email required' }, { status: 400 })
    }

    const deleted = await Event.findOneAndDelete({ _id: id, contactEmail: email })
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Unauthorized or not found' }, { status: 403 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/event-board error:', err)
    return NextResponse.json({ success: false, message: 'Failed to delete event' }, { status: 500 })
  }
}
