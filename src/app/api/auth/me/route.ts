import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ session: null })
  }

  return NextResponse.json({
    session: {
      user: {
        id: (session.user as any)?.id,
        email: session.user?.email,
        role: (session.user as any)?.role,
        membershipStatus: (session.user as any)
          ?.membershipStatus,
      },
    },
  })
}

