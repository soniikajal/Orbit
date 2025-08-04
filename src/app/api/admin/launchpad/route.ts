import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import LaunchpadProject from '@/models/LaunchpadProject'

// GET all unapproved launchpad projects
export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const projects = await LaunchpadProject.find({ approved: false }).sort({ _id: -1 })

    const response = NextResponse.json({ success: true, projects })
    // Add no-cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('GET /api/admin/launchpad error:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch projects' }, { status: 500 })
  }
}

// PATCH approve/reject
export async function PATCH(req: NextRequest) {
  try {
    await connectToDB()
    const { id, approve } = await req.json()

    const updated = await LaunchpadProject.findByIdAndUpdate(
      id,
      { approved: approve },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: updated })
  } catch (err) {
    console.error('PATCH /api/admin/launchpad error:', err)
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 })
  }
}
