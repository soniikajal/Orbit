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

    const query: any = { approved: true }; // Only show approved events

    if (!isNaN(month) && !isNaN(year)) {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      query.date = { $gte: start.toISOString(), $lte: end.toISOString() };
    }

    const totalEvents = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance and cleaner objects
    
    console.log('Events from database:', events); // Debug log
    console.log('Sample event fields:', events[0] ? Object.keys(events[0]) : 'No events found'); // Debug log

    // Ensure venue and time fields are properly formatted
    const formattedEvents = events.map(event => ({
      ...event,
      id: event._id.toString(),
      venue: event.venue || '',
      time: event.time || '',
      _id: undefined // Remove _id from response
    }));

    return NextResponse.json({
      success: true,
      events: formattedEvents,
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
    
    console.log('Received event data for creation:', data); // Debug log
    
    // Validate required fields
    if (!data.title || !data.description || !data.category || !data.venue || !data.date || !data.organizer || !data.contactEmail) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields: title, description, category, venue, date, organizer, contactEmail' 
      }, { status: 400 });
    }

    // Create event with explicit field mapping
    const eventData = {
      title: data.title,
      description: data.description,
      category: data.category,
      venue: data.venue, // Explicitly map venue
      date: data.date,
      time: data.time || '', // Default to empty string if not provided
      organizer: data.organizer,
      contactEmail: data.contactEmail,
      additionalInfo: data.additionalInfo || '',
      approved: false
    };

    const event = await Event.create(eventData);
    
    console.log('Created event in database:', event.toObject()); // Debug log

    return NextResponse.json({ success: true, event: event.toObject() })
  } catch (err) {
    console.error('POST /api/event-board error:', err)
    return NextResponse.json({ success: false, message: 'Failed to submit event', error: err.message }, { status: 500 })
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
