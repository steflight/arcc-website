import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
})

function getAdminEmails() {
  return (process.env.ARCC_ADMIN_EMAILS ?? 'admin@kladriva.ca')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Champs invalides.' },
        { status: 400 }
      )
    }

    const { email, password, phone, city } = parsed.data
    const emailLower = email.toLowerCase()

    const existing = await prisma.user.findUnique({
      where: { email: emailLower },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Un compte existe deja avec cet email.' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const adminEmails = getAdminEmails()
    const role = adminEmails.includes(emailLower) ? 'ADMIN' : 'MEMBER'

    await prisma.user.create({
      data: {
        email: emailLower,
        name: emailLower.split('@')[0],
        passwordHash,
        phone: phone?.trim() || null,
        city: city?.trim() || null,
        role,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Erreur /api/auth/signup:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    )
  }
}

