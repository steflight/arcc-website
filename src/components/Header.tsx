'use client'

import { useState } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navigation = [
    { name: t('nav.services'), href: '/#services' },
    { name: 'Rencontre', href: '/#first-meeting' },
    { name: 'Fondateur', href: '/#founder-message' },
    { name: t('nav.directory'), href: '/#directory' },
    { name: t('nav.contact'), href: '/#contact' },
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ]

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as 'en' | 'fr')
    setIsLanguageOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b-2 border-gradient-to-r from-green-500 to-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ARCC Logo"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 xl:space-x-2 text-gray-700 hover:text-blue-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                <Globe className="h-3 w-3 xl:h-4 xl:w-4" />
                <span className="hidden xl:inline">{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4" />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 xl:w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="flex items-center space-x-2 xl:space-x-3 w-full px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button - Arrêt plan visuel */}
            <Link
              href="/#contact"
              className="group relative overflow-hidden px-4 xl:px-8 py-2 xl:py-4 rounded-xl xl:rounded-2xl text-xs xl:text-sm font-bold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-white/30 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #ff700a 0%, #ff8c00 50%, #ffa500 100%)',
                boxShadow: '0 10px 30px rgba(255, 112, 10, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              {/* Contenu du bouton */}
              <span className="relative z-10 flex items-center space-x-1 xl:space-x-2">
                <span className="hidden xl:inline">{t('header.joinUs')}</span>
                <span className="xl:hidden">Rejoindre</span>
                <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-white rounded-full animate-pulse"></div>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2.5 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Language Switcher Mobile */}
              <div className="pt-2 border-t border-gray-200">
                <div className="px-3 py-2">
                  <p className="text-xs text-gray-500 mb-2">Langue / Language</p>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code)
                          setIsMenuOpen(false)
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${language === lang.code
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="#contact"
                  className="group relative overflow-hidden block px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-white/30 shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ff700a 0%, #ff8c00 50%, #ffa500 100%)',
                    boxShadow: '0 10px 30px rgba(255, 112, 10, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  {/* Contenu du bouton */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{t('header.joinUs')}</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
