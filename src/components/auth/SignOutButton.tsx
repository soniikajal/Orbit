'use client'
import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function SignOutButton({ className = '', children }: SignOutButtonProps) {
  // Extract base styling that can be overridden by className
  const baseClasses = className.includes('bg-') || className.includes('text-') || className.includes('border') 
    ? '' // If className contains styling, don't apply defaults
    : 'px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200';
    
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`${baseClasses} ${className}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {children || 'Sign Out'}
    </button>
  )
}
