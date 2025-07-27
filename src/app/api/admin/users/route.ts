// api/admin/users/route.ts
import { connectToDB } from '@/lib/mongoose'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDB()

    const users = await User.find().sort({ lastLogin: -1 })

    const formatted = users.map(u => ({
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
