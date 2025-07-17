import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import LaunchpadProject from '@/models/LaunchpadProject'

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB()
    const { id, approved } = await req.json()

    const updated = await LaunchpadProject.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: updated })
  } catch (err) {
    console.error('PATCH /api/launchpad/approve error:', err)
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 })
  }
}
