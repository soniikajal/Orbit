'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/common/Header'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading
    
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

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

  if (!session) {
    return null // Will redirect to signin
  }

  return (
    <div className="w-full bg-[#fffcf9] min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h1 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome to Your Dashboard
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#f4c430] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Your Profile
                  </h2>
                  <p className="text-gray-700 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Name: {session.user?.name}
                  </p>
                  <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email: {session.user?.email}
                  </p>
                </div>
                
                <div className="bg-[#f45b6a] rounded-lg p-6 text-white">
                  <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Quick Access
                  </h2>
                  <ul className="space-y-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <li>• Campus Navigation</li>
                    <li>• Event Board</li>
                    <li>• Study Resources</li>
                    <li>• Connect with Seniors</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors duration-200">
                  <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Campus Map
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Navigate the campus
                  </p>
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors duration-200">
                  <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Events
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Upcoming events
                  </p>
                </button>
                
                <button className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition-colors duration-200">
                  <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Resources
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Study materials
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
