import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const postSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(['ADMIN', 'MEMBER', 'STAFF']),
})

function assertAdminRole(role: unknown) {
  return role === 'ADMIN' || role === 'STAFF'
}

export async function GET() {
  const session = await auth()
  const role = (session?.user as any)?.role

  if (!session) return NextResponse.json({ error: 'Non connecte.' }, { status: 401 })
  if (!assertAdminRole(role)) return NextResponse.json({ error: 'Acces interdit.' }, { status: 403 })

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      city: true,
      membershipStatus: true,
      membershipValidUntil: true,
    },
  })

  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  const role = (session?.user as any)?.role

  if (!session) return NextResponse.json({ error: 'Non connecte.' }, { status: 401 })
  if (!assertAdminRole(role)) return NextResponse.json({ error: 'Acces interdit.' }, { status: 403 })

  try {
    const body = await request.json()
    const parsed = postSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Donnnees invalides.' }, { status: 400 })
    }

    const { userId, role: newRole } = parsed.data
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Erreur /api/admin/users:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 })
  }
}

