import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import Contact from '@/models/Contact'

// POST: Submit new contact
export async function POST(req: Request) {
  await connectToDB()
  const { name, email, message, type } = await req.json()

  if (!email || !message || !type) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
  }

  const newContact = await Contact.create({ name, email, message, type })
  return NextResponse.json({ success: true, contact: newContact })
}

// GET: Fetch all contact submissions
export async function GET() {
  await connectToDB()
  const contacts = await Contact.find().sort({ timestamp: -1 })

  // ✅ Fix: Convert MongoDB _id to id for frontend compatibility
  const safeContacts = contacts.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    email: c.email,
    message: c.message,
    type: c.type,
    status: c.status,
    timestamp: c.timestamp,
  }))

  return NextResponse.json({ success: true, contacts: safeContacts })
}

// PATCH: Update status of submission
export async function PATCH(req: NextRequest) {
  await connectToDB()
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
