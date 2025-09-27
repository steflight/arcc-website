'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  Heart, 
  Zap, 
  Award,
  Users,
  Globe
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CoreValues() {
  const { t } = useLanguage()
  
  const values = [
    {
      icon: Target,
      title: t('values.excellence.title'),
      description: t('values.excellence.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: t('values.integrity.title'),
      description: t('values.integrity.desc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: t('values.innovation.title'),
      description: t('values.innovation.desc'),
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Award,
      title: t('values.quality.title'),
      description: t('values.quality.desc'),
      color: 'from-yellow-600 to-green-500'
    },
    {
      icon: Users,
      title: t('values.collaboration.title'),
      description: t('values.collaboration.desc'),
      color: 'from-green-600 to-yellow-500'
    },
    {
      icon: Globe,
      title: t('values.global.title'),
      description: t('values.global.desc'),
      color: 'from-red-600 to-yellow-500'
    }
  ]

  return (
    <section id="values" className="py-24 bg-gradient-to-br from-yellow-50 via-green-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('values.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Values Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl text-gray-800 italic font-light leading-relaxed">
              &ldquo;{t('values.quote')}&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <span className="font-medium">{t('values.attribution')}</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
