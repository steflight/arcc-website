'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-600 to-red-700 overflow-hidden px-4">
      {/* Background Elements - Motifs africains modernes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Motifs géométriques africains */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 transform rotate-45 rounded-lg opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-red-400/20 to-yellow-500/20 transform -rotate-12 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Motifs tribaux modernes */}
        <div className="absolute top-32 right-32 w-24 h-24 border-4 border-yellow-400/30 rounded-full opacity-60 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 border-4 border-orange-400/30 transform rotate-45 opacity-60 animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-red-500/20 to-yellow-500/20 transform rotate-12 rounded-lg opacity-60 animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
        
        {/* Motifs de tissus africains */}
        <div className="absolute top-40 left-1/4 w-40 h-20 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 transform -skew-x-12 opacity-50 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-16 bg-gradient-to-r from-red-500/15 to-yellow-400/15 transform skew-x-12 opacity-50 animate-pulse" style={{animationDelay: '3.5s'}}></div>
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
              className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 sm:px-12 py-5 sm:py-6 rounded-3xl text-base sm:text-lg font-bold hover:from-amber-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-amber-500/30 border-2 border-amber-300/50 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)'
              }}
            >
              <span className="relative z-10 flex items-center">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="#services"
              className="group text-white hover:text-amber-300 px-10 sm:px-12 py-5 sm:py-6 rounded-3xl text-base sm:text-lg font-bold border-2 border-white/50 hover:border-amber-400 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="relative z-10">{t('hero.cta.secondary')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
