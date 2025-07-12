'use client'
import { signIn } from 'next-auth/react'

interface SignInButtonProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function SignInButton({ className = '', children, style }: SignInButtonProps) {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className={`px-6 py-3 bg-transparent text-black border border-black font-normal hover:bg-gray-50 transition-colors duration-200 ${className}`}
      style={{ fontFamily: 'Space Grotesk, sans-serif', borderRadius: '100px', ...style }}
    >
      {children || 'Login/Signup'}
    </button>
  )
}
