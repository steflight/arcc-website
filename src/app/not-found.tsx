import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'
import Header from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <span className="text-4xl font-bold text-blue-600">404</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Page non trouvée
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
            Elle a peut-être été supprimée ou l'URL est incorrecte.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Link>
            
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Search className="h-5 w-5 mr-2" />
              Explorer le blog
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Besoin d'aide ?
            </h3>
            <p className="text-gray-600 mb-4">
              Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous contacter.
            </p>
            <Link
              href="/#contact"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Nous contacter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
