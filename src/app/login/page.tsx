'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchCsrfToken() {
    const res = await fetch('/api/auth/csrf')
    const data = await res.json().catch(() => ({}))
    return data?.csrfToken as string | undefined
  }

  async function postSignIn(
    providerType: 'credentials' | 'oauth',
    providerId: string
  ) {
    const callbackUrl = '/dashboard'
    const csrfToken = await fetchCsrfToken()
    if (!csrfToken) throw new Error('CSRF token manquant.')

    const baseUrl = '/api/auth'
    const signInUrl =
      providerType === 'credentials'
        ? `${baseUrl}/callback/${providerId}`
        : `${baseUrl}/signin/${providerId}`

    const body =
      providerType === 'credentials'
        ? new URLSearchParams({
            email,
            password,
            csrfToken,
            callbackUrl,
          })
        : new URLSearchParams({
            csrfToken,
            callbackUrl,
          })

    const res = await fetch(signInUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-Return-Redirect': '1',
      },
      body,
    })

    const data = await res.json().catch(() => ({}))
    if (data?.url) {
      window.location.href = data.url
      return
    }

    window.location.href = callbackUrl
  }

  const handleCredentialsLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await postSignIn('credentials', 'credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await postSignIn('oauth', 'google')
    } catch (err) {
      setError("Connexion Google indisponible pour le moment.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#8B4513]/20 p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2">Connexion ARCC</h1>
        <p className="text-sm text-gray-600 mb-6">
          Accedez a votre espace membre et aux ressources.
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
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
              autoComplete="current-password"
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="my-5 border-t border-gray-200" />

        <button
          disabled={isLoading}
          className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGoogleLogin}
        >
          Continuer avec Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link className="text-[#8B4513] font-semibold" href="/signup">
            Creer un compte
          </Link>
        </p>
      </div>
    </main>
  )
}

