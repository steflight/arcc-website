import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripeWebhookSecret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET manque.' },
      { status: 500 }
    )
  }

  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante.' }, { status: 400 })
  }

  const stripe = getStripe()

  let event: any
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret
    )
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err)
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      const userId = session?.metadata?.userId as string | undefined
      if (userId) {
        const validUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: {
              membershipStatus: 'ACTIVE',
              membershipValidUntil: validUntil,
            },
          }),
          prisma.membership.create({
            data: {
              userId,
              status: 'ACTIVE',
              validUntil,
              stripeCustomerId: session.customer ? String(session.customer) : null,
              stripeCheckoutSessionId: String(session.id),
            },
          }),
        ])
      }
    }
  } catch (error) {
    console.error('Erreur webhook stripe:', error)
    // On retourne 200 quand meme, sinon Stripe retentera en boucle.
  }

  return NextResponse.json({ received: true })
}

