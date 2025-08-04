// app/api/admin/event-board/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Event from '@/models/Event'
import { isAdmin } from '@/lib/admin'

export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const pendingEvents = await Event.find({ approved: false }).sort({ createdAt: -1 })
    
    const response = NextResponse.json({ success: true, events: pendingEvents })
    // Add no-cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('GET /api/admin/event-board error:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB()
    const { id, approve } = await req.json()
    if (!id) return NextResponse.json({ success: false, message: 'Event ID required' }, { status: 400 })

    await Event.findByIdAndUpdate(id, { approved: approve })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PATCH /api/admin/event-board error:', err)
    return NextResponse.json({ success: false, message: 'Failed to update event status' }, { status: 500 })
  }
}
