import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import LaunchpadProject from '@/models/LaunchpadProject'

// GET all unapproved launchpad projects
export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const projects = await LaunchpadProject.find({ approved: false }).sort({ _id: -1 })

    return NextResponse.json({ success: true, projects })
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
