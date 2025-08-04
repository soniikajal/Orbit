import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import LaunchpadProject from '@/models/LaunchpadProject'

// GET all approved projects
export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const approvedProjects = await LaunchpadProject.find({ approved: true }).sort({ _id: -1 })
    
    const response = NextResponse.json({ success: true, projects: approvedProjects })
    // Add no-cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('GET /api/admin/approved-projects error:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch approved projects' }, { status: 500 })
  }
}

// DELETE approved project
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'Project ID required' }, { status: 400 })
    }

    const deletedProject = await LaunchpadProject.findByIdAndDelete(id)
    
    if (!deletedProject) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' })
  } catch (err) {
    console.error('DELETE /api/admin/approved-projects error:', err)
    return NextResponse.json({ success: false, message: 'Failed to delete project' }, { status: 500 })
  }
}
