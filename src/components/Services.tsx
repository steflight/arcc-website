'use client'

import { motion } from 'framer-motion'
import { 
  Home, 
  Scale, 
  Users, 
  Network, 
  Heart, 
  Briefcase,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function Services() {
  const { t } = useLanguage()
  
  const services = [
    {
      icon: Home,
      title: t('services.settlement.title'),
      description: t('services.settlement.desc'),
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      icon: Scale,
      title: t('services.legal.title'),
      description: t('services.legal.desc'),
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: Users,
      title: t('services.mentorship.title'),
      description: t('services.mentorship.desc'),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: Network,
      title: t('services.networking.title'),
      description: t('services.networking.desc'),
      color: 'from-amber-600 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      borderColor: 'border-amber-300'
    },
    {
      icon: Heart,
      title: t('services.crisis.title'),
      description: t('services.crisis.desc'),
      color: 'from-red-600 to-orange-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50',
      borderColor: 'border-red-300'
    },
    {
      icon: Briefcase,
      title: t('services.skills.title'),
      description: t('services.skills.desc'),
      color: 'from-orange-600 to-amber-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      borderColor: 'border-orange-300'
    }
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-200/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Motifs géométriques africains */}
        <div className="absolute top-32 right-20 w-24 h-24 border-4 border-amber-400/30 rounded-full opacity-60 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 border-4 border-orange-400/30 transform rotate-45 opacity-60 animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
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
            dangerouslySetInnerHTML={{ __html: t('services.title') }}
          />
          <p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('services.subtitle') }}
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 ${service.borderColor} hover:border-gray-300 overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`relative z-10 inline-flex p-5 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <service.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                  <span className="mr-2">{t('services.learnMore')}</span>
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
            {t('services.cta.title')}
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('services.cta.subtitle')}
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-lg font-bold rounded-2xl hover:from-amber-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-amber-500/25 border-2 border-amber-400/50"
          >
            {t('services.cta.button')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
