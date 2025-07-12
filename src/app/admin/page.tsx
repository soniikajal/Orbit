'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { getMockUsers, getMockSubmissions } from '@/lib/admin'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  type: 'askQuery' | 'leaveFeedback' | 'reportBug'
  message: string
  timestamp: string
  status: 'pending' | 'resolved' | 'in-progress'
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'users' | 'submissions' | 'analytics'>('users')
  const [users, setUsers] = useState<UserData[]>([])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])

  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Check if user is admin
    if (session.user?.role !== 'admin') {
      router.push('/dashboard') // Redirect to regular dashboard
      return
    }

    // Load mock data (in real app, this would come from API)
    loadMockData()
  }, [session, status, router])

  const loadMockData = () => {
    // Load mock data from admin utility
    const mockUsers = getMockUsers()
    const mockSubmissions = getMockSubmissions()

    setUsers(mockUsers)
    setSubmissions(mockSubmissions)
  }

  const updateSubmissionStatus = (id: string, status: 'pending' | 'resolved' | 'in-progress') => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    ))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f4c430] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin') {
    return null // Will redirect
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="max-w-6xl mx-auto">
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-[#f45b6a] to-[#ff7b7b] rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-white/90 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                Welcome back, {session.user?.name}! Manage users and monitor application activity.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'users'
                      ? 'bg-[#f45b6a] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Users Management
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'submissions'
                      ? 'bg-[#f45b6a] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact Submissions
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'analytics'
                      ? 'bg-[#f45b6a] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Users Management Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Registered Users
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Last Login
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {user.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {user.email}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-[#f45b6a] text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {user.lastLogin}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Contact Form Submissions
                </h2>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.name}
                          </h3>
                          <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.email}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            submission.type === 'askQuery' ? 'bg-blue-100 text-blue-800' :
                            submission.type === 'leaveFeedback' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {submission.type === 'askQuery' ? 'Query' :
                             submission.type === 'leaveFeedback' ? 'Feedback' : 'Bug Report'}
                          </span>
                          <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {submission.message}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Status:
                        </span>
                        <select
                          value={submission.status}
                          onChange={(e) => updateSubmissionStatus(submission.id, e.target.value as any)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Application Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Total Users
                    </h3>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {users.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Total Submissions
                    </h3>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {submissions.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Pending Issues
                    </h3>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {submissions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Resolved Issues
                    </h3>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {submissions.filter(s => s.status === 'resolved').length}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {submissions.slice(0, 5).map((submission) => (
                      <div key={submission.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          submission.status === 'pending' ? 'bg-yellow-500' :
                          submission.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span className="font-medium">{submission.name}</span> submitted a {submission.type}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
