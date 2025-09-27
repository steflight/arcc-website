'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1a1a2e] overflow-hidden px-4">
      {/* Background Elements - Motifs africains authentiques */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Motifs géométriques africains - Couleurs terre */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#8B4513]/20 transform rotate-45 rounded-lg opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#D2691E]/20 transform -rotate-12 rounded-full opacity-40"></div>
        
        {/* Motifs tribaux - Couleurs traditionnelles */}
        <div className="absolute top-32 right-32 w-24 h-24 border-4 border-[#FFD700]/30 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 border-4 border-[#CD853F]/30 transform rotate-45 opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#8B4513]/20 transform rotate-12 rounded-lg opacity-40"></div>
        
        {/* Motifs de tissus africains - Couleurs vives */}
        <div className="absolute top-40 left-1/4 w-40 h-20 bg-[#FF6347]/15 transform -skew-x-12 opacity-40"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-16 bg-[#32CD32]/15 transform skew-x-12 opacity-40"></div>
      </div>

             {/* Main Content */}
       <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-20 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
                     className="space-y-12 w-full flex flex-col items-center justify-center"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Link
              href="#contact"
              className="group text-white px-12 py-6 rounded-2xl text-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#FFD700]"
              style={{ backgroundColor: '#8B4513' }}
            >
              <span className="flex items-center">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link
              href="#services"
              className="group text-white hover:text-[#FFD700] px-12 py-6 rounded-2xl text-lg font-bold border-2 border-white hover:border-[#FFD700] transition-all duration-300 hover:bg-white/10"
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
         className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
       >
         <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="text-white bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
         >
           <ChevronDown className="h-8 w-8" />
         </motion.div>
       </motion.div>
    </section>
  )
}
