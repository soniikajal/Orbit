'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (status !== 'authenticated') return;

    // Wait until role is available
    if (!session?.user?.role) return;

    if (session.user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadMockData(); // ✅ Safe to load only after role is ready
  }, [session, status, router]);



  const loadMockData = async () => {
    try {
      const [userRes, contactRes, launchpadRes, eventRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/contact'),
        fetch('/api/admin/launchpad'),
        fetch('/api/admin/event-board')
      ])

      const userData = await userRes.json()
      const contactData = await contactRes.json()
      const launchpadData = await launchpadRes.json()
      const eventData = await eventRes.json()

      setUsers(userData.users || [])
      setSubmissions(contactData.success ? contactData.contacts : [])
      setLaunchpadSubmissions(launchpadData.success ? launchpadData.projects : [])
      setEventSubmissions(eventData.success ? eventData.events : [])

    } catch (err) {
      console.error('Failed to fetch data', err)
      setUsers([])
      setSubmissions([])
      setLaunchpadSubmissions([])
      setEventSubmissions([])
}

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
      } else {
        alert('Failed to update event status')
      }
    } catch (err) {
      console.error('Event approval error:', err)
      alert('Error approving/rejecting event')
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                Welcome back, {session.user?.name}! Manage users and monitor application activity.
              </p>
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
                    Launchpad Applications
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
                    Event Submissions
                  </button>
                </div>
              </div>
            </div>

            {/* Users Management Tab */}
            {activeTab === 'users_analytics' && (
              <>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
              {<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
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
<<<<<<< HEAD
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
=======
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
>>>>>>> bc9ab82a48953955814f1acc82418d67f448d1b1
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
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Pending Launchpad Applications
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {launchpadSubmissions.map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between">
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
                          Approve
                        </Button>
                        <Button onClick={() => handleApproval(project._id, false)} variant="danger" className="text-sm">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {launchpadSubmissions.length === 0 && (
                  <p className="text-gray-600 mt-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    No pending applications.
                  </p>
                )}
              </div>
            )}
            {/* Event Submissions Tab */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Pending Event Submissions
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {eventSubmissions.map((event) => (
                    <div key={event._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between">
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
                          Approve
                        </Button>
                        <Button onClick={() => handleEventApproval(event._id, false)} variant="danger" className="text-sm">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {eventSubmissions.length === 0 && (
                  <p className="text-gray-600 mt-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    No pending event submissions.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
