import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Non connecte.' }, { status: 401 })

  const userId = (session.user as any)?.id as string | undefined
  const emailFromBody = (await request.json().catch(() => ({}))).email as
    | string
    | undefined

  if (!userId) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 400 })

  const stripePriceId = process.env.STRIPE_MEMBERSHIP_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  if (!stripePriceId) {
    return NextResponse.json(
      { error: 'STRIPE_MEMBERSHIP_PRICE_ID manque.' },
      { status: 500 }
    )
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  const email = user?.email ?? emailFromBody ?? undefined
  if (!email) {
    return NextResponse.json({ error: 'Email manquant pour le paiement.' }, { status: 400 })
  }

  const stripe = getStripe()

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: stripePriceId, quantity: 1 }],
    success_url: `${siteUrl}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/dashboard?payment=cancel`,
    customer_email: email,
    client_reference_id: userId,
    metadata: {
      userId,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}

