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
      borderColor: '#D2691E'
    },
    {
      icon: Scale,
      title: t('services.legal.title'),
      description: t('services.legal.desc'),
      color: '#DC143C',
      bgColor: '#FFF8DC',
      borderColor: '#B22222'
    },
    {
      icon: Users,
      title: t('services.mentorship.title'),
      description: t('services.mentorship.desc'),
      color: '#FFD700',
      bgColor: '#FFFACD',
      borderColor: '#DAA520'
    },
    {
      icon: Network,
      title: t('services.networking.title'),
      description: t('services.networking.desc'),
      color: '#32CD32',
      bgColor: '#F0FFF0',
      borderColor: '#228B22'
    },
    {
      icon: Heart,
      title: t('services.crisis.title'),
      description: t('services.crisis.desc'),
      color: '#FF6347',
      bgColor: '#FFF0F5',
      borderColor: '#CD5C5C'
    },
    {
      icon: Briefcase,
      title: t('services.skills.title'),
      description: t('services.skills.desc'),
      color: '#4B0082',
      bgColor: '#F8F8FF',
      borderColor: '#6A5ACD'
    }
  ]

  return (
    <section id="services" className="py-24 bg-[#F5F5DC] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#8B4513]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#D2691E]/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#FF6347]/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#FFD700]/10 rounded-full blur-xl"></div>
        
        {/* Motifs géométriques africains */}
        <div className="absolute top-32 right-20 w-24 h-24 border-4 border-[#8B4513]/20 rounded-full opacity-60"></div>
        <div className="absolute bottom-32 left-20 w-32 h-32 border-4 border-[#D2691E]/20 transform rotate-45 opacity-60"></div>
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
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 hover:border-gray-300 overflow-hidden"
              style={{ borderColor: service.borderColor }}
            >
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.bgColor }}
              ></div>
              
              {/* Icon */}
              <div 
                className="relative z-10 inline-flex p-4 rounded-xl text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-md"
                style={{ backgroundColor: service.color }}
              >
                <service.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
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
            className="inline-flex items-center px-10 py-5 bg-[#FF6347] text-white text-lg font-bold rounded-2xl hover:bg-[#FF4500] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#FFD700]"
          >
            {t('services.cta.button')}
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
