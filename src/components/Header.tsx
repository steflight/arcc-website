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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ARCC Logo"
                width={64}
                height={64}
                className="w-20 h-20 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:from-green-500 hover:to-yellow-400 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-green-400/50"
            >
              {t('header.joinUs')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="#contact"
                  className="bg-gradient-to-r from-green-600 to-yellow-500 text-white block px-3 py-2 rounded-2xl text-base font-bold hover:from-green-500 hover:to-yellow-400 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.joinUs')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
