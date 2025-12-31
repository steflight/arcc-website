'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#1a1a2e] overflow-hidden px-4 sm:px-6">
      {/* Background Elements - Motifs africains authentiques */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Motifs géométriques africains - Couleurs terre - Responsive */}
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#8B4513]/20 transform rotate-45 rounded-lg opacity-40"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-[#D2691E]/20 transform -rotate-12 rounded-full opacity-40"></div>

        {/* Motifs tribaux - Couleurs traditionnelles - Responsive */}
        <div className="absolute top-16 right-16 sm:top-32 sm:right-32 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 sm:border-4 border-[#FFD700]/30 rounded-full opacity-50"></div>
        <div className="absolute bottom-16 left-16 sm:bottom-32 sm:left-32 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-2 sm:border-4 border-[#CD853F]/30 transform rotate-45 opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-[#8B4513]/20 transform rotate-12 rounded-lg opacity-40"></div>

        {/* Motifs de tissus africains - Couleurs vives - Responsive */}
        <div className="absolute top-20 left-1/4 w-20 h-10 sm:w-32 sm:h-16 lg:w-40 lg:h-20 bg-[#FF6347]/15 transform -skew-x-12 opacity-40"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-8 sm:w-24 sm:h-12 lg:w-32 lg:h-16 bg-[#32CD32]/15 transform skew-x-12 opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center pt-24 sm:pt-32 pb-20 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 lg:space-y-12 w-full flex flex-col items-center justify-center"
        >


          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight max-w-5xl mx-auto tracking-tight"
            dangerouslySetInnerHTML={{ __html: t('hero.banner.option1.headline') }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light text-center"
            dangerouslySetInnerHTML={{ __html: t('hero.banner.option1.subtitle') }}
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4"
          >
            <Link
              href="#contact"
              className="group relative overflow-hidden text-white px-6 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-[#FFD700]/50 w-full sm:w-auto"
              style={{ 
                background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)',
                boxShadow: '0 10px 30px rgba(139, 69, 19, 0.5)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="#services"
              className="group text-white hover:text-[#FFD700] px-6 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-bold border-2 border-white/50 hover:border-[#FFD700] transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
            >
              <span>{t('hero.cta.secondary')}</span>
            </Link>
          </motion.div>




        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white bg-white/10 backdrop-blur-md rounded-full p-2 sm:p-3 border border-white/30 hover:bg-white/20 hover:border-[#FFD700]/50 transition-all duration-300 cursor-pointer shadow-lg"
        >
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}
