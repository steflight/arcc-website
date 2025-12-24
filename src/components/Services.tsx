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
      color: '#8B4513',
      bgColor: '#F5F5DC',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    },
    {
      icon: Scale,
      title: t('services.legal.title'),
      description: t('services.legal.desc'),
      color: '#8B4513',
      bgColor: '#FFF8DC',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    },
    {
      icon: Users,
      title: t('services.mentorship.title'),
      description: t('services.mentorship.desc'),
      color: '#8B4513',
      bgColor: '#FFFACD',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    },
    {
      icon: Network,
      title: t('services.networking.title'),
      description: t('services.networking.desc'),
      color: '#8B4513',
      bgColor: '#F0FFF0',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    },
    {
      icon: Heart,
      title: t('services.crisis.title'),
      description: t('services.crisis.desc'),
      color: '#8B4513',
      bgColor: '#FFF0F5',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    },
    {
      icon: Briefcase,
      title: t('services.skills.title'),
      description: t('services.skills.desc'),
      color: '#8B4513',
      bgColor: '#F8F8FF',
      borderColor: '#D2691E',
      textColor: '#2F1B14'
    }
  ]

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-[#F5F5DC] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-[#8B4513]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 bg-[#D2691E]/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-[#FF6347]/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 sm:w-20 sm:h-20 bg-[#FFD700]/10 rounded-full blur-xl"></div>

        {/* Motifs géométriques africains */}
        <div className="absolute top-16 sm:top-32 right-10 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 border-2 sm:border-4 border-[#8B4513]/20 rounded-full opacity-60"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-10 sm:left-20 w-20 h-20 sm:w-32 sm:h-32 border-2 sm:border-4 border-[#D2691E]/20 transform rotate-45 opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 px-4"
            style={{ color: '#1a1a2e' }}
            dangerouslySetInnerHTML={{ __html: t('services.title') }}
          />
          <p
            className="text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-4"
            style={{ color: '#2F1B14' }}
            dangerouslySetInnerHTML={{ __html: t('services.subtitle') }}
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 hover:border-gray-300 overflow-hidden"
              style={{ borderColor: service.borderColor }}
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.bgColor }}
              ></div>

              {/* Icon */}
              <div
                className="relative z-10 inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl text-white mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-md"
                style={{ backgroundColor: service.color }}
              >
                <service.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ color: service.textColor }}
                >
                  {service.title}
                </h3>
                <p
                  className="leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
                  style={{ color: service.textColor }}
                >
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div
                  className="inline-flex items-center font-semibold group-hover:opacity-80 transition-opacity duration-300"
                  style={{ color: service.color }}
                >
                  <span className="mr-2">{t('services.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100 mx-4 sm:mx-0"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#2F1B14' }}>
            {t('services.cta.title')}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4" style={{ color: '#2F1B14' }}>
            {t('services.cta.subtitle')}
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-white text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#FFD700]"
            style={{ backgroundColor: '#8B4513' }}
          >
            {t('services.cta.button')}
            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
