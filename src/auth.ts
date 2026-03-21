import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const adminEmails = (process.env.ARCC_ADMIN_EMAILS ?? 'admin@kladriva.ca')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

const googleEnabled =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Email et mot de passe',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        // NextAuth expose credentials comme un objet non typé; on normalise vers string.
        const email = String((credentials as any)?.email ?? '').toLowerCase()
        const password = String((credentials as any)?.password ?? '')

        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user?.passwordHash) return null
        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          membershipStatus: user.membershipStatus,
        }
      },
    }),

    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return true

      const email = String(user.email).toLowerCase()
      if (!adminEmails.includes(email)) return true

      // Met en place les rôles admin dès le premier login.
      await prisma.user.updateMany({
        where: { email },
        data: { role: 'ADMIN' },
      })

      return true
    },
    async session({ session, user }) {
      // Expose les champs nécessaires au frontend/protected routes.
      if (session.user) {
        ;(session.user as any).id = (user as any).id
        ;(session.user as any).role = (user as any).role
        ;(session.user as any).membershipStatus = (user as any).membershipStatus
      }
      return session
    },
  },
})

