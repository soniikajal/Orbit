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

    const response = NextResponse.json({ success: true, users: formatted })
    
    // Add no-cache headers to ensure fresh data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('Error fetching users:', err)
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 })
  }
}
