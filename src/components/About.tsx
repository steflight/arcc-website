'use client'

import { motion } from 'framer-motion'
import { CheckCircle, TrendingUp, Users, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  
  const stats = [
    { icon: Users, number: '500+', label: t('about.stats.members') },
    { icon: Globe, number: '6+', label: t('about.stats.provinces') },
    { icon: TrendingUp, number: '95%', label: t('about.stats.success') },
    { icon: CheckCircle, number: '4+', label: t('about.stats.experience') }
  ]

  const highlights = [
    t('about.highlights.founded'),
    t('about.highlights.team'),
    t('about.highlights.methods'),
    t('about.highlights.partnerships'),
    t('about.highlights.commitment')
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('about.subtitle')}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/25 border-2 border-green-400/50"
            >
              {t('about.cta')}
            </motion.button>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 text-white mb-4">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Company Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">
                {t('about.vision.title')}
              </h3>
              <p className="text-green-100 leading-relaxed">
                {t('about.vision.desc')}
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.mission.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission.desc')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
