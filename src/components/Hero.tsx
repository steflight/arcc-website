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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-400/30 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            {t('hero.badge')}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={currentBannerOption}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            {currentBanner.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${currentBannerOption}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
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
              className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-500/30"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="#activities"
              className="group text-white hover:text-blue-300 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white/30 hover:border-blue-400 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              {t('hero.cta.secondary')}
            </Link>
          </motion.div>

          {/* Elegant Banner Selector - Google Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            {/* Subtle Label */}
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              Explore Different Messages
            </div>

            {/* Clean Selector with Google Aesthetic */}
            <div className="flex items-center justify-center space-x-3">
              {bannerOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCurrentBannerOption(option.id)}
                  className={`group relative p-4 transition-all duration-300 rounded-xl ${
                    currentBannerOption === option.id
                      ? 'text-blue-400 bg-blue-400/10 border border-blue-400/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                  title={`Banner ${option.id}`}
                >
                  {/* Active Indicator */}
                  {currentBannerOption === option.id && (
                    <motion.div
                      layoutId="activeBanner"
                      className="absolute inset-0 bg-blue-400/20 rounded-xl border border-blue-400/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Content */}
                  <span className="relative z-10 text-lg font-semibold">
                    {option.id}
                  </span>
                </button>
              ))}

              {/* Cycle Button */}
              <button
                onClick={cycleBanner}
                className="ml-6 p-4 text-gray-400 hover:text-blue-400 transition-all duration-200 group rounded-xl hover:bg-gray-800/50 hover:shadow-lg"
                title="Cycle through banner options"
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-12"
          >
            <p className="text-sm text-gray-400 mb-4">{t('hero.trust')}</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="w-24 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-24 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
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
