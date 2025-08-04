// api/admin/users/route.ts
import { connectToDB } from '@/lib/mongoose'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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

// PATCH: Update user role
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is authenticated and is admin
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin access required' }, { status: 403 })
    }

    const { userId, newRole } = await req.json()

    if (!userId || !newRole) {
      return NextResponse.json({ success: false, message: 'User ID and new role are required' }, { status: 400 })
    }

    if (!['admin', 'user'].includes(newRole)) {
      return NextResponse.json({ success: false, message: 'Invalid role. Must be "admin" or "user"' }, { status: 400 })
    }

    await connectToDB()

    // Find and update the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    // Prevent admins from demoting themselves (to avoid lockout)
    if (user.email === session.user.email && newRole === 'user') {
      return NextResponse.json({ 
        success: false, 
        message: 'You cannot demote yourself from admin role' 
      }, { status: 400 })
    }

    // Update the user role
    user.role = newRole
    await user.save()

    const response = NextResponse.json({ 
      success: true, 
      message: `User role updated to ${newRole}`,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '',
      }
    })

    // Add no-cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('Error updating user role:', err)
    return NextResponse.json({ success: false, message: 'Failed to update user role' }, { status: 500 })
  }
}
