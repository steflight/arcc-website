'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Lightbulb, 
  Shield, 
  BarChart,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function CoreActivities() {
  const { t } = useLanguage()
  
  const activities = [
    {
      icon: TrendingUp,
      title: t('activities.strategic.title'),
      description: t('activities.strategic.desc'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Globe,
      title: t('activities.international.title'),
      description: t('activities.international.desc'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Users,
      title: t('activities.organizational.title'),
      description: t('activities.organizational.desc'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: Lightbulb,
      title: t('activities.innovation.title'),
      description: t('activities.innovation.desc'),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: Shield,
      title: t('activities.risk.title'),
      description: t('activities.risk.desc'),
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: BarChart,
      title: t('activities.performance.title'),
      description: t('activities.performance.desc'),
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ]

  return (
    <section id="activities" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
            dangerouslySetInnerHTML={{ __html: t('activities.title') }}
          />
          <p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('activities.subtitle') }}
          />
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 ${activity.borderColor} hover:border-gray-300 overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${activity.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative z-10 inline-flex p-5 rounded-2xl bg-gradient-to-r ${activity.color} text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <activity.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {activity.description}
                </p>

                {/* Learn More Link */}
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <span className="mr-2">{t('activities.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-white rounded-3xl p-12 shadow-2xl border border-gray-100"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('activities.cta.title')}
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('activities.cta.subtitle')}
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('activities.cta.button')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
