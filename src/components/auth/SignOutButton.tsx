'use client'
import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function SignOutButton({ className = '', children }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 ${className}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {children || 'Sign Out'}
    </button>
  )
}
