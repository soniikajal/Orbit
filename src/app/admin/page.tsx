'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Button from '@/components/ui/Button'

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
  screenshot?: string
}

export default function AdminDashboard() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'users_analytics' | 'submissions' | 'launchpad' | 'events'>('users_analytics')
  const [users, setUsers] = useState<UserData[]>([])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [launchpadSubmissions, setLaunchpadSubmissions] = useState<any[]>([])
  const [eventSubmissions, setEventSubmissions] = useState<any[]>([])
  const [approvedProjects, setApprovedProjects] = useState<any[]>([])
  const [approvedEvents, setApprovedEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (status !== 'authenticated') return;

    // Wait until role is available
    if (!session?.user?.role) return;

    if (session.user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadAllData(); // ✅ Safe to load only after role is ready
  }, [session, status, router]);

  // Auto refresh effect
  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        loadAllData(true); // Silent refresh
      }, 30000); // Refresh every 30 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh]);



  const loadAllData = async (silent = false) => {
    if (!silent) setIsLoading(true)
    
    try {
      // Add cache-busting query parameter and no-cache headers
      const cacheBuster = Date.now()
      const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }

      const [userRes, contactRes, launchpadRes, eventRes, approvedProjectsRes, approvedEventsRes] = await Promise.all([
        fetch(`/api/admin/users?_=${cacheBuster}`, { headers }),
        fetch(`/api/contact?_=${cacheBuster}`, { headers }),
        fetch(`/api/admin/launchpad?_=${cacheBuster}`, { headers }),
        fetch(`/api/admin/event-board?_=${cacheBuster}`, { headers }),
        fetch(`/api/admin/approved-projects?_=${cacheBuster}`, { headers }),
        fetch(`/api/admin/approved-events?_=${cacheBuster}`, { headers })
      ])

      const userData = await userRes.json()
      const contactData = await contactRes.json()
      const launchpadData = await launchpadRes.json()
      const eventData = await eventRes.json()
      const approvedProjectsData = await approvedProjectsRes.json()
      const approvedEventsData = await approvedEventsRes.json()

      setUsers(userData.users || [])
      setSubmissions(contactData.success ? contactData.contacts : [])
      setLaunchpadSubmissions(launchpadData.success ? launchpadData.projects : [])
      setEventSubmissions(eventData.success ? eventData.events : [])
      setApprovedProjects(approvedProjectsData.success ? approvedProjectsData.projects : [])
      setApprovedEvents(approvedEventsData.success ? approvedEventsData.events : [])
      
      setLastRefresh(new Date())

    } catch (err) {
      console.error('Failed to fetch data', err)
      if (!silent) {
        setUsers([])
        setSubmissions([])
        setLaunchpadSubmissions([])
        setEventSubmissions([])
        setApprovedProjects([])
        setApprovedEvents([])
      }
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  const manualRefresh = () => {
    loadAllData()
  }


  const handleApproval = async (id: string, approve: boolean) => {
    try {
      const res = await fetch('/api/admin/launchpad', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approve })
      })
      const data = await res.json()
      if (data.success) {
        setLaunchpadSubmissions(prev =>
          prev.filter(project => project._id !== id)
        )
        // Refresh approved projects list
        loadAllData(true)
      } else {
        alert('Failed to update project status')
      }
    } catch (err) {
      console.error('Approval error:', err)
      alert('Error approving/rejecting project')
    }
  }

  const handleEventApproval = async (id: string, approve: boolean) => {
    try {
      const res = await fetch('/api/admin/event-board', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approve })
      })
      const data = await res.json()
      if (data.success) {
        setEventSubmissions(prev =>
          prev.filter(event => event._id !== id)
        )
        // Refresh approved events list
        loadAllData(true)
      } else {
        alert('Failed to update event status')
      }
    } catch (err) {
      console.error('Event approval error:', err)
      alert('Error approving/rejecting event')
    }
  }

  const handleDeleteApprovedProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this approved project? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/approved-projects?id=${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setApprovedProjects(prev => prev.filter(project => project._id !== id))
      } else {
        alert('Failed to delete project')
      }
    } catch (err) {
      console.error('Delete project error:', err)
      alert('Error deleting project')
    }
  }

  const handleDeleteApprovedEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this approved event? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/approved-events?id=${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setApprovedEvents(prev => prev.filter(event => event._id !== id))
      } else {
        alert('Failed to delete event')
      }
    } catch (err) {
      console.error('Delete event error:', err)
      alert('Error deleting event')
    }
  }

  const updateSubmissionStatus = async (id: string, status: 'pending' | 'resolved' | 'in-progress') => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      const data = await res.json()
      if (data.success) {
        setSubmissions(prev => prev.map(sub => 
          sub.id === id ? { ...sub, status } : sub
        ))
      } else {
        alert('Failed to update status')
      }
    } catch (err) {
      console.error('Update error:', err)
      alert('Error updating submission')
    }
  }

  // Handle user role changes
  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    const action = newRole === 'admin' ? 'promote' : 'demote'
    
    if (!confirm(`Are you sure you want to ${action} this user to ${newRole}?`)) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Update the user in the local state immediately
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId 
              ? { ...user, role: newRole }
              : user
          )
        )
      } else {
        alert(data.message || 'Failed to update user role')
      }
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Error updating user role')
    } finally {
      setIsLoading(false)
    }
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
    <div className="w-full min-h-screen bg-[#fffcf9]">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="py-6 sm:py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-[#f45b6a] to-[#ff7b7b] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Admin Dashboard
                  </h1>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Welcome back, {session.user?.name}! Manage users and monitor application activity.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        autoRefresh 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
                    </button>
                    <button
                      onClick={manualRefresh}
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/20 text-white rounded-md text-sm font-medium hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Refresh
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-white/80 text-sm">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-white rounded-lg p-2 shadow-sm overflow-x-auto">
                <div className="flex space-x-2 sm:space-x-4 min-w-max sm:min-w-0">
                  <button
                    onClick={() => setActiveTab('users_analytics')}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'users_analytics'
                        ? 'bg-[#f45b6a] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Users & Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'submissions'
                        ? 'bg-[#f45b6a] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Contact Submissions
                  </button>
                  <button
                    onClick={() => setActiveTab('launchpad')}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'launchpad'
                        ? 'bg-[#f45b6a] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Launchpad ({launchpadSubmissions.length} pending / {approvedProjects.length} approved)
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'events'
                        ? 'bg-[#f45b6a] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Events ({eventSubmissions.length} pending / {approvedEvents.length} approved)
                  </button>
                </div>
              </div>
            </div>

            {/* Users Management Tab */}
            {activeTab === 'users_analytics' && (
              <>
              {<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Application Analytics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Total Users
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {users.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Total Submissions
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {submissions.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Pending Issues
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {submissions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Resolved Issues
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              </div>}
              {<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Registered Users
                </h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full table-auto min-w-[600px]">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Name
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Email
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Role
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Last Login
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {user.name}
                            </td>
                            <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 break-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {user.email}
                            </td>
                            <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-[#f45b6a] text-white' 
                                  : 'bg-gray-200 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {user.lastLogin}
                            </td>
                            <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                              <button
                                onClick={() => handleRoleChange(user.id, user.role)}
                                disabled={isLoading || (user.email === session?.user?.email && user.role === 'admin')}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                                  user.role === 'admin' 
                                    ? 'bg-gray-500 text-white hover:bg-gray-600' 
                                    : 'bg-[#f4c430] text-black hover:bg-[#e6b82a]'
                                }`}
                                title={user.email === session?.user?.email && user.role === 'admin' ? 'Cannot demote yourself' : ''}
                              >
                                {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
              </>

            )}

            {/* Contact Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Contact Form Submissions
                </h2>
                {/* Filter Dropdown */}
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <label htmlFor="submission-filter" className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Filter by status:</label>
                  <select
                    id="submission-filter"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as any)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full sm:w-auto"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {submissions
                    .filter(sub => filterStatus === 'all' ? true : sub.status === filterStatus)
                    .map((submission) => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 break-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {submission.email}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
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
                      <p className="text-gray-700 mb-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {submission.message}
                      </p>
                      {submission.type === 'reportBug' && submission.screenshot && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Screenshot:
                          </p>
                          <a
                            href={`data:image/png;base64,${submission.screenshot}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`data:image/png;base64,${submission.screenshot}`}
                              alt="Bug Screenshot"
                              className="max-w-xs max-h-48 rounded-md border border-gray-300 shadow"
                            />
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Status:
                        </span>
                        <select
                          value={submission.status}
                          onChange={(e) => updateSubmissionStatus(submission.id, e.target.value as any)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto"
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
            {/* Launchpad Tab */}
            {activeTab === 'launchpad' && (
              <div className="space-y-8">
                {/* Pending Projects Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-yellow-400">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Pending Launchpad Applications
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {launchpadSubmissions.length} pending
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {launchpadSubmissions.map((project) => (
                      <div key={project._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-black mb-1">{project.projectName}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{project.category}</p>
                          <p className="text-xs sm:text-sm text-gray-700 mb-3">{project.description}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Skills:</b> {project.requiredSkills.join(', ')}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Looking for:</b> {project.lookingFor}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Team:</b> {project.teamMembers.join(', ')}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 break-all"><b>Contact:</b> {project.contactEmail}</p>
                          {project.additionalInfo && (
                            <p className="text-xs sm:text-sm text-gray-600"><b>More:</b> {project.additionalInfo}</p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                          <Button onClick={() => handleApproval(project._id, true)} variant="primary" className="text-sm">
                            ✅ Approve
                          </Button>
                          <Button onClick={() => handleApproval(project._id, false)} variant="danger" className="text-sm">
                            ❌ Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {launchpadSubmissions.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">📋</div>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No pending applications.
                      </p>
                    </div>
                  )}
                </div>

                {/* Section Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#fffcf9] text-gray-500">Approved Projects</span>
                  </div>
                </div>

                {/* Approved Projects Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-green-400">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Approved Launchpad Projects
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {approvedProjects.length} approved
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {approvedProjects.map((project) => (
                      <div key={project._id} className="border border-green-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between bg-green-50 hover:shadow-md transition-shadow duration-200">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-black">{project.projectName}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ Approved</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{project.category}</p>
                          <p className="text-xs sm:text-sm text-gray-700 mb-3">{project.description}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Skills:</b> {project.requiredSkills.join(', ')}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Looking for:</b> {project.lookingFor}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Team:</b> {project.teamMembers.join(', ')}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 break-all"><b>Contact:</b> {project.contactEmail}</p>
                          {project.additionalInfo && (
                            <p className="text-xs sm:text-sm text-gray-600"><b>More:</b> {project.additionalInfo}</p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                          <Button 
                            onClick={() => handleDeleteApprovedProject(project._id)} 
                            variant="danger" 
                            className="text-sm"
                          >
                            🗑️ Delete Project
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {approvedProjects.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">🎉</div>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No approved projects yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Event Submissions Tab */}
            {activeTab === 'events' && (
              <div className="space-y-8">
                {/* Pending Events Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-yellow-400">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Pending Event Submissions
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {eventSubmissions.length} pending
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {eventSubmissions.map((event) => (
                      <div key={event._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-black mb-1">{event.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{event.organizer}</p>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2">{event.description}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Venue:</b> {event.venue}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Date:</b> {event.date}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Time:</b> {event.time}</p>
                          <p className="text-xs sm:text-sm text-gray-600 break-all"><b>Contact:</b> {event.contactEmail}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                          <Button onClick={() => handleEventApproval(event._id, true)} variant="primary" className="text-sm">
                            ✅ Approve
                          </Button>
                          <Button onClick={() => handleEventApproval(event._id, false)} variant="danger" className="text-sm">
                            ❌ Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {eventSubmissions.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">📅</div>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No pending event submissions.
                      </p>
                    </div>
                  )}
                </div>

                {/* Section Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#fffcf9] text-gray-500">Approved Events</span>
                  </div>
                </div>

                {/* Approved Events Section */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-blue-400">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Approved Events
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {approvedEvents.length} approved
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {approvedEvents.map((event) => (
                      <div key={event._id} className="border border-blue-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between bg-blue-50 hover:shadow-md transition-shadow duration-200">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-black">{event.title}</h3>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">✅ Approved</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{event.organizer}</p>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2">{event.description}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Venue:</b> {event.venue}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Date:</b> {event.date}</p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1"><b>Time:</b> {event.time}</p>
                          <p className="text-xs sm:text-sm text-gray-600 break-all"><b>Contact:</b> {event.contactEmail}</p>
                          {event.additionalInfo && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-2"><b>Additional Info:</b> {event.additionalInfo}</p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                          <Button 
                            onClick={() => handleDeleteApprovedEvent(event._id)} 
                            variant="danger" 
                            className="text-sm"
                          >
                            🗑️ Delete Event
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {approvedEvents.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">🎊</div>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No approved events yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
