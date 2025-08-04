import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Event from '@/models/Event'

// GET all approved events
export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const approvedEvents = await Event.find({ approved: true }).sort({ createdAt: -1 })
    
    const response = NextResponse.json({ success: true, events: approvedEvents })
    // Add no-cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('GET /api/admin/approved-events error:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch approved events' }, { status: 500 })
  }
}

// DELETE approved event
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Event ID required' }, { status: 400 })
    }

    const deletedEvent = await Event.findByIdAndDelete(id)
    
    if (!deletedEvent) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Event deleted successfully' })
  } catch (err) {
    console.error('DELETE /api/admin/approved-events error:', err)
    return NextResponse.json({ success: false, message: 'Failed to delete event' }, { status: 500 })
  }
}
