'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Header from '@/components/Header'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Une erreur s'est produite
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Désolé, quelque chose s'est mal passé. Notre équipe a été notifiée et travaille à résoudre le problème.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left">
              <details className="text-sm text-gray-700">
                <summary className="cursor-pointer font-medium mb-2">
                  Détails de l'erreur (Développement)
                </summary>
                <pre className="whitespace-pre-wrap bg-white p-3 rounded border">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Réessayer
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Home className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Le problème persiste ?
            </h3>
            <p className="text-gray-600 mb-4">
              Si l'erreur continue, contactez notre équipe technique pour obtenir de l'aide.
            </p>
            <Link
              href="/#contact"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Contacter le support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
