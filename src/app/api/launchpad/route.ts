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
    const query = searchParams.get('search')?.toLowerCase() || ''

    const searchFilter = query
      ? {
          approved: true,
          $or: [
            { projectName: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { lookingFor: { $regex: query, $options: 'i' } },
            { requiredSkills: { $elemMatch: { $regex: query, $options: 'i' } } },
            { teamMembers: { $elemMatch: { $regex: query, $options: 'i' } } }
          ]
        }
      : { approved: true }

    const [projects, total] = await Promise.all([
      LaunchpadProject.find(searchFilter).sort({ _id: -1 }).skip(skip).limit(limit),
      LaunchpadProject.countDocuments(searchFilter)
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
      approved: false
    })

    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('POST /api/launchpad error:', err)
    return NextResponse.json({ success: false, message: 'Failed to submit project' }, { status: 500 })
  }
}
