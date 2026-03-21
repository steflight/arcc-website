'use client'

import { useState } from 'react'

export default function PayMembershipButton({ email }: { email: string }) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePay = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Paiement indisponible.")
        return
      }

      if (data?.url) {
        window.location.href = data.url
      } else {
        setError('URL de paiement introuvable.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full md:w-auto">
      <button
        className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
        type="button"
        onClick={handlePay}
      >
        {isLoading ? "Redirection..." : "Payer l’adhesion"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl p-2">
          {error}
        </p>
      )}
    </div>
  )
}

