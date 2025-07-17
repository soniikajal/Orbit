// Admin utility functions
export const ADMIN_EMAILS = [
  'kajal.soni.ug24@nsut.ac.in',
  'manik.bhushan.ug23@nsut.ac.in', 
  'parkhi.mudgal@nsut.ac.in',
  'aastha.pandey@nsut.ac.in',
  'kushagra.kataria.ug24@nsut.ac.in',
  'darshdeep.singh.ug24@nsut.ac.in',
  'bhavya.goel.ug24@nsut.ac.in',
  // Add more admin emails as needed
]

export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export const getUserRole = (email: string | null | undefined): 'admin' | 'user' => {
  return isAdmin(email) ? 'admin' : 'user'
}

// Mock data for admin dashboard - in a real app, this would come from a database
export const getMockUsers = () => [
  { id: '1', name: 'John Doe', email: 'john.doe@nsut.ac.in', role: 'user', lastLogin: '2025-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@nsut.ac.in', role: 'user', lastLogin: '2025-01-09' },
  { id: '3', name: 'Kajal Soni', email: 'kajal.soni.ug24@nsut.ac.in', role: 'admin', lastLogin: '2025-01-11' },
  { id: '4', name: 'Manik Bhushan', email: 'manik.bhushan@nsut.ac.in', role: 'admin', lastLogin: '2025-01-11' },
  { id: '5', name: 'Parkhi Mudgal', email: 'parkhi.mudgal@nsut.ac.in', role: 'admin', lastLogin: '2025-01-10' },
]

export const getMockSubmissions = () => [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@nsut.ac.in',
    type: 'askQuery' as const,
    message: 'How do I find the library on campus?',
    timestamp: '2025-01-11 10:30:00',
    status: 'pending' as const
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob.wilson@nsut.ac.in',
    type: 'reportBug' as const,
    message: 'The campus map is not loading properly on mobile devices. When I try to access it, the page just shows a blank screen.',
    timestamp: '2025-01-11 09:15:00',
    status: 'in-progress' as const
  },
  {
    id: '3',
    name: 'Carol Brown',
    email: 'carol.brown@nsut.ac.in',
    type: 'leaveFeedback' as const,
    message: 'Great application! Very helpful for navigating campus. The study hub section is particularly useful.',
    timestamp: '2025-01-10 16:45:00',
    status: 'resolved' as const
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david.lee@nsut.ac.in',
    type: 'askQuery' as const,
    message: 'Is there a way to get notifications for upcoming events?',
    timestamp: '2025-01-10 14:20:00',
    status: 'pending' as const
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@nsut.ac.in',
    type: 'reportBug' as const,
    message: 'The event board is not showing the correct dates for some events.',
    timestamp: '2025-01-10 11:30:00',
    status: 'in-progress' as const
  }
]
