// api/admin/users/route.ts
import { connectToDB } from '@/lib/mongoose'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDB()

    // Use raw MongoDB query to bypass Mongoose filtering
    const rawUsers = await User.collection.find({}).toArray()

    console.log('Fetched users:', rawUsers.length)

    const formatted = rawUsers.map(u => ({
      id: u._id.toString(),
      name: u.name || '',
      email: u.email,
      role: u.role || 'user',
      lastLogin: u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '',
    }))

    return NextResponse.json({ success: true, users: formatted })
  } catch (err) {
    console.error('Error fetching users:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 })
  }
}
