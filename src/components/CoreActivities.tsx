'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Lightbulb, 
  Shield, 
  BarChart3,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CoreActivities() {
  const { t } = useLanguage()
  
  const activities = [
    {
      icon: TrendingUp,
      title: t('activities.strategic.title'),
      description: t('activities.strategic.desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: t('activities.international.title'),
      description: t('activities.international.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: t('activities.organizational.title'),
      description: t('activities.organizational.desc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: t('activities.innovation.title'),
      description: t('activities.innovation.desc'),
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: t('activities.risk.title'),
      description: t('activities.risk.desc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: t('activities.performance.title'),
      description: t('activities.performance.desc'),
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('activities.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('activities.subtitle')}
          </p>
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
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${activity.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <activity.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {activity.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {activity.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                <span>{t('activities.learnMore')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t('activities.cta.title')}
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('activities.cta.subtitle')}
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
              {t('activities.cta.button')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
