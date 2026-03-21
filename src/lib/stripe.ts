import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripe() {
  if (stripeInstance) return stripeInstance

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    throw new Error('STRIPE_SECRET_KEY manque (configurer les variables d’environnement).')
  }

  stripeInstance = new Stripe(secret, {
    // Laisse Stripe choisir une version compatible avec les types installés.
  })

  return stripeInstance
}

