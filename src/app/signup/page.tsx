'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phone, city }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Impossible de creer le compte.")
        return
      }

      setSuccess("Compte cree. Vous pouvez maintenant vous connecter.")
      window.location.href = '/login'
    } catch {
      setError("Erreur reseau. Veuillez reessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#8B4513]/20 p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2">Creer un compte ARCC</h1>
        <p className="text-sm text-gray-600 mb-6">
          Inscription simple pour acceder a l’espace membre.
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Mot de passe</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Telephone (optionnel)</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Ville (optionnel)</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? 'Creation...' : 'Creer le compte'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez deja un compte ?{' '}
          <Link className="text-[#8B4513] font-semibold" href="/login">
            Connexion
          </Link>
        </p>
      </div>
    </main>
  )
}

