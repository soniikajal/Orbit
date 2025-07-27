import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { isAdmin } from './admin'
import { connectToDB } from '@/lib/mongoose'
import User from '@/models/User'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict domain
      if (user.email) {
        const emailDomain = user.email.split('@')[1]
        const allowedDomains = ['nsut.ac.in', 'nsit.ac.in']
        if (!allowedDomains.includes(emailDomain)) return false
      }

      try {
        await connectToDB()
        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            role: isAdmin(user.email!) ? 'admin' : 'user',
            lastLogin: new Date(),
          })
        } else {
          existingUser.lastLogin = new Date()
          await existingUser.save()
        }
      } catch (err) {
        console.error('Error syncing user to DB:', err)
      }

      return true
    },

    async session({ session }) {
      if (session.user?.email) {
        try {
          await connectToDB()
          const dbUser = await User.findOne({ email: session.user.email })
          session.user.role = dbUser?.role || 'user'
        } catch (err) {
          console.error('Session callback error:', err)
          session.user.role = 'user'
        }
      }
      return session
    },

    async jwt({ token }) {
      if (token.email) {
        token.role = isAdmin(token.email) ? 'admin' : 'user'
      }
      return token
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
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
