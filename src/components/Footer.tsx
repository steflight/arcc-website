'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Globe
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language, setLanguage, t } = useLanguage()

  const footerLinks = {
    company: [
      { name: t('nav.services'), href: '#services' },
      { name: 'Première Rencontre', href: '#first-meeting' },
      { name: 'Mot du Fondateur', href: '#founder-message' },
      { name: t('nav.directory'), href: '#directory' },
      { name: 'Blog', href: '/blog' }
    ],
    services: [
      { name: t('services.settlement.title'), href: '#services' },
      { name: t('services.legal.title'), href: '#services' },
      { name: t('services.mentorship.title'), href: '#services' },
      { name: t('services.networking.title'), href: '#services' },
      { name: t('services.crisis.title'), href: '#services' }
    ],
    resources: [
      { name: 'Guide d\'Établissement', href: '/blog/guide-etablissement-nouveaux-arrivants' },
      { name: 'Support Juridique', href: '/blog/defis-juridiques-camerounais-canada' },
      { name: 'Programme de Mentorat', href: '/blog/pouvoir-mentorat-camerounais' },
      { name: 'Événements', href: '#first-meeting' },
      { name: 'Ressources', href: '#directory' }
    ]
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-700' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">ARCC</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {t('footer.company.description')}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-sm sm:text-base">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="break-all">info@camercanada.com</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-sm sm:text-base">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>+1 (514) 555-0123</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-sm sm:text-base">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Montreal, Quebec, Canada</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.links.company')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.links.services')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.links.resources')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800"
        >
          <div className="text-center px-4">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              {t('footer.newsletter.title')}
            </h4>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('footer.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <button className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base">
                {t('footer.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-400 text-xs sm:text-sm text-center md:text-left"
            >
              © {currentYear} ARCC. {t('footer.copyright')}
            </motion.div>

            {/* Social Links & Language */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 sm:space-x-6"
            >
              {/* Social Links */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{language.toUpperCase()}</span>
                <span className="text-gray-600">|</span>
                <span
                  className="text-xs sm:text-sm hover:text-white cursor-pointer transition-colors duration-200"
                  onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                >
                  {language === 'en' ? 'FR' : 'EN'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
