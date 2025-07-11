import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { isAdmin } from './admin'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user's email domain is allowed
      if (user.email) {
        const emailDomain = user.email.split('@')[1]
        const allowedDomains = ['nsut.ac.in', 'nsit.ac.in']
        
        if (!allowedDomains.includes(emailDomain)) {
          return false // Reject sign-in
        }
      }
      return true // Allow sign-in
    },
    async session({ session, token }) {
      // Add admin role to session
      if (session.user && session.user.email && isAdmin(session.user.email)) {
        session.user.role = 'admin'
      } else if (session.user) {
        session.user.role = 'user'
      }
      return session
    },
    async jwt({ token, user }) {
      // Add admin role to JWT token
      if (token.email && isAdmin(token.email)) {
        token.role = 'admin'
      } else {
        token.role = 'user'
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}
