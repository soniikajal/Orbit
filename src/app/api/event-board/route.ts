// app/api/event-board/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Event from '@/models/Event'

interface EventDocument {
  _id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time?: string;
  organizer: string;
  contactEmail: string;
  additionalInfo?: string;
  approved: boolean;
}

interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  organizer: string;
  contactEmail: string;
  additionalInfo: string;
  approved: boolean;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);

    const month = parseInt(searchParams.get("month") || "");
    const year = parseInt(searchParams.get("year") || "");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "8"))); // Limit between 1-50

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
      .lean() as unknown as EventDocument[]; // Safe type assertion for lean query
    
    console.log('Events from database:', events); // Debug log
    console.log('Sample event fields:', events[0] ? Object.keys(events[0]) : 'No events found'); // Debug log

    // Ensure venue and time fields are properly formatted
    const formattedEvents: FormattedEvent[] = events.map(event => ({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      category: event.category,
      venue: event.venue || '',
      time: event.time || '',
      date: event.date,
      organizer: event.organizer,
      contactEmail: event.contactEmail,
      additionalInfo: event.additionalInfo || '',
      approved: event.approved
    }));

    return NextResponse.json({
      success: true,
      events: formattedEvents,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
    });
  } catch (err) {
    console.error("GET /api/event-board error:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ 
      success: false, 
      message: "Failed to fetch events", 
      error: errorMessage 
    }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const data = await req.json()
    
    console.log('Received event data for creation:', data); // Debug log
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'venue', 'date', 'organizer', 'contactEmail'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 });
    }

    // Validate date format
    const eventDate = new Date(data.date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid date format' 
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
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to submit event', error: errorMessage }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB()
    const { id, email } = await req.json()
    
    if (!id || !email) {
      return NextResponse.json({ 
        success: false, 
        message: 'Event ID and email required' 
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 });
    }

    const deleted = await Event.findOneAndDelete({ _id: id, contactEmail: email })
    if (!deleted) {
      return NextResponse.json({ 
        success: false, 
        message: 'Event not found or unauthorized access' 
      }, { status: 403 })
    }

    return NextResponse.json({ success: true, message: 'Event deleted successfully' })
  } catch (err) {
    console.error('DELETE /api/event-board error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete event', 
      error: errorMessage 
    }, { status: 500 })
  }
}
