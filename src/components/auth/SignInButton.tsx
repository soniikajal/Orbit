'use client'
import { signIn } from 'next-auth/react'

interface SignInButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function SignInButton({ className = '', children }: SignInButtonProps) {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className={`px-6 py-3 bg-[#f4c430] text-black rounded-lg font-medium hover:bg-[#e6b52a] transition-colors duration-200 ${className}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {children || 'Sign In'}
    </button>
  )
}
