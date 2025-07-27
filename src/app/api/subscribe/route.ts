import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
  }

  try {
    await connectToDB()

    const existing = await NewsletterSubscriber.findOne({ email })
    if (existing) {
      return NextResponse.json({ success: false, message: 'Already subscribed' }, { status: 409 })
    }

    await NewsletterSubscriber.create({ email })
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
