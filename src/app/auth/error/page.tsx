'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'Sorry, only NSUT and NSIT email addresses are allowed to access this application.',
          detail: 'Please use your @nsut.ac.in or @nsit.ac.in email address to sign in.'
        }
      case 'Configuration':
        return {
          title: 'Configuration Error',
          message: 'There was a problem with the server configuration.',
          detail: 'Please contact the administrator.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during sign in.',
          detail: 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 text-red-500 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {errorInfo.title}
          </h1>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {errorInfo.message}
          </p>
          <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            {errorInfo.detail}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center px-4 py-3 bg-[#f4c430] text-black rounded-lg font-medium hover:bg-[#e6b52a] transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="w-full flex justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:nsutorbit@gmail.com" className="text-[#F45B69] hover:underline">
              nsutorbit@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
