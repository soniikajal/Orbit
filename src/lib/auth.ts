import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
      // Add custom fields to session if needed
      return session
    },
    async jwt({ token, user }) {
      // Add custom fields to JWT token if needed
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
