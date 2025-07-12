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
    <div className="auth-error-container">
      <div className="auth-error-content">
        <div className="auth-error-header">
          <div className="auth-error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="auth-error-title">
            {errorInfo.title}
          </h1>
          <p className="auth-error-message">
            {errorInfo.message}
          </p>
          <p className="auth-error-detail">
            {errorInfo.detail}
          </p>
        </div>
        
        <div className="auth-error-card">
          <div className="auth-error-actions">
            <Link
              href="/auth/signin"
              className="auth-error-button-primary"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="auth-error-button-secondary"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="auth-error-footer">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:nsutorbit@gmail.com">
              nsutorbit@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
