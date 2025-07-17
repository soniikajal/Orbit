import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import LaunchpadProject from '@/models/LaunchpadProject'

export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const [projects, total] = await Promise.all([
      LaunchpadProject.find({ approved: true }).sort({ _id: -1 }).skip(skip).limit(limit),
      LaunchpadProject.countDocuments({ approved: true })
    ])

    return NextResponse.json({ success: true, projects, total })
  } catch (err) {
    console.error('GET /api/launchpad error:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const data = await req.json()

    const date = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })

    const project = await LaunchpadProject.create({
      ...data,
      dateCreated: date,
      approved: false // wait for admin approval
    })

    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('POST /api/launchpad error:', err)
    return NextResponse.json({ success: false, message: 'Failed to submit project' }, { status: 500 })
  }
}
