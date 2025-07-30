import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import { connectToAltDB } from '@/lib/altMongoose'
import Contact from '@/models/Contact'

// POST: Submit new contact
export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const type = formData.get('type') as string
    const file = formData.get('screenshot') as File | null

    if (!email || !message || !type) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    if (type !== 'reportBug') {
      return NextResponse.json({ success: false, message: 'File upload only allowed for bug reports' }, { status: 400 })
    }

    if (!file || file.size > 50 * 1024) {
      return NextResponse.json({ success: false, message: 'Screenshot required and must be ≤ 50KB' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64Image = buffer.toString('base64')

    await connectToAltDB()

    const newContact = await Contact.create({
      name,
      email,
      message,
      type,
      screenshot: base64Image,
    })

    return NextResponse.json({ success: true, contact: newContact })
  }

  // Fallback to JSON for queries/feedback
  const { name, email, message, type } = await req.json()

  if (!email || !message || !type) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
  }

  await connectToDB()

  const newContact = await Contact.create({ name, email, message, type })

  return NextResponse.json({ success: true, contact: newContact })
}

// GET: Fetch all contact submissions
export async function GET() {
  await connectToAltDB()
  const contacts = await Contact.find().sort({ timestamp: -1 })

  const safeContacts = contacts.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    email: c.email,
    message: c.message,
    type: c.type,
    status: c.status,
    timestamp: c.timestamp,
    screenshot: c.screenshot || null,
  }))

  return NextResponse.json({ success: true, contacts: safeContacts })
}

// PATCH: Update status of submission
export async function PATCH(req: NextRequest) {
  await connectToAltDB()
  const { id, status } = await req.json()

  if (!id || !status) {
    return NextResponse.json({ success: false, message: 'Missing id or status' }, { status: 400 })
  }

  try {
    const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true })

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, updated })
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json({ success: false, message: 'Database update failed' }, { status: 500 })
  }
}
