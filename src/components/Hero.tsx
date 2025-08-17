'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [currentBannerOption, setCurrentBannerOption] = useState(1)
  
  const bannerOptions = [
    {
      id: 1,
      headline: t('hero.banner.option1.headline'),
      subtitle: t('hero.banner.option1.subtitle')
    },
    {
      id: 2,
      headline: t('hero.banner.option2.headline'),
      subtitle: t('hero.banner.option2.subtitle')
    },
    {
      id: 3,
      headline: t('hero.banner.option3.headline'),
      subtitle: t('hero.banner.option3.subtitle')
    },
    {
      id: 4,
      headline: t('hero.banner.option4.headline'),
      subtitle: t('hero.banner.option4.subtitle')
    }
  ]

  const currentBanner = bannerOptions[currentBannerOption - 1]

  const cycleBanner = () => {
    setCurrentBannerOption((prev) => (prev % 4) + 1)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            {t('hero.badge')}
          </motion.div>

          {/* Banner Options Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center space-x-2 mb-4"
          >
            <span className="text-sm text-gray-600 mr-2">Banner Option:</span>
            {bannerOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setCurrentBannerOption(option.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  currentBannerOption === option.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {option.id}
              </button>
            ))}
            <button
              onClick={cycleBanner}
              className="ml-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200"
              title="Cycle through banner options"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={currentBannerOption}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
          >
            {currentBanner.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${currentBannerOption}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {currentBanner.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#contact"
              className="group bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="#activities"
              className="group text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 hover:border-blue-600 transition-all duration-300"
            >
              {t('hero.cta.secondary')}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-12"
          >
            <p className="text-sm text-gray-500 mb-4">{t('hero.trust')}</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
