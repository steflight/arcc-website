'use client'

import { motion } from 'framer-motion'
import {
  User,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SkillsDirectory() {
  const { t } = useLanguage()

  // Exemple de données - dans une vraie application, cela viendrait d'une API
  const professionals = [
    {
      id: 1,
      name: 'Dr. Marie Nguema',
      profession: 'Médecin Généraliste',
      specialization: 'Santé Familiale',
      experience: '8 ans',
      location: 'Montréal, QC',
      languages: ['Français', 'Anglais', 'Douala'],
      rating: 4.9,
      availability: 'Disponible',
      contact: 'marie.nguema@email.com',
      phone: '+1 (514) 555-0101',
      bio: 'Médecin expérimentée spécialisée dans les soins de santé familiaux pour la communauté camerounaise.',
      services: ['Consultations générales', 'Suivi pédiatrique', 'Santé mentale']
    },
    {
      id: 2,
      name: 'Jean-Baptiste Mballa',
      profession: 'Avocat en Immigration',
      specialization: 'Droit de l\'Immigration',
      experience: '12 ans',
      location: 'Toronto, ON',
      languages: ['Français', 'Anglais', 'Ewondo'],
      rating: 4.8,
      availability: 'Disponible',
      contact: 'jb.mballa@law.ca',
      phone: '+1 (416) 555-0102',
      bio: 'Avocat spécialisé en immigration avec une expertise particulière dans les cas camerounais.',
      services: ['Demandes de résidence', 'Réunification familiale', 'Appels d\'expulsion']
    },
    {
      id: 3,
      name: 'Fatima Tchoumi',
      profession: 'Conseillère Financière',
      specialization: 'Planification Financière',
      experience: '6 ans',
      location: 'Vancouver, BC',
      languages: ['Français', 'Anglais', 'Fulfulde'],
      rating: 4.7,
      availability: 'Disponible',
      contact: 'fatima.tchoumi@finance.ca',
      phone: '+1 (604) 555-0103',
      bio: 'Conseillère financière certifiée aidant les nouveaux arrivants à établir leur sécurité financière.',
      services: ['Planification budgétaire', 'Investissements', 'Assurance']
    },
    {
      id: 4,
      name: 'Samuel Nkeng',
      profession: 'Ingénieur Logiciel',
      specialization: 'Développement Web',
      experience: '10 ans',
      location: 'Calgary, AB',
      languages: ['Français', 'Anglais', 'Bamoun'],
      rating: 4.9,
      availability: 'Disponible',
      contact: 'samuel.nkeng@tech.ca',
      phone: '+1 (403) 555-0104',
      bio: 'Développeur senior spécialisé dans les technologies web modernes et l\'entrepreneuriat tech.',
      services: ['Développement web', 'Mentorat tech', 'Conseil en startup']
    },
    {
      id: 5,
      name: 'Grace Mefire',
      profession: 'Psychologue',
      specialization: 'Thérapie Familiale',
      experience: '7 ans',
      location: 'Ottawa, ON',
      languages: ['Français', 'Anglais', 'Bassa'],
      rating: 4.8,
      availability: 'Disponible',
      contact: 'grace.mefire@psychology.ca',
      phone: '+1 (613) 555-0105',
      bio: 'Psychologue clinicienne spécialisée dans l\'adaptation culturelle et le soutien aux familles immigrantes.',
      services: ['Thérapie individuelle', 'Thérapie familiale', 'Soutien aux nouveaux arrivants']
    },
    {
      id: 6,
      name: 'Alain Fouda',
      profession: 'Agent Immobilier',
      specialization: 'Résidentiel',
      experience: '5 ans',
      location: 'Montréal, QC',
      languages: ['Français', 'Anglais', 'Bamileke'],
      rating: 4.6,
      availability: 'Disponible',
      contact: 'alain.fouda@realestate.ca',
      phone: '+1 (514) 555-0106',
      bio: 'Agent immobilier expérimenté aidant les Camerounais à trouver leur foyer au Canada.',
      services: ['Achat de propriété', 'Location', 'Conseil en investissement immobilier']
    }
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Disponible':
        return 'text-green-600 bg-green-100'
      case 'Occupé':
        return 'text-yellow-600 bg-yellow-100'
      case 'Indisponible':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <section id="directory" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Répertoire des <span className="text-blue-600">Compétences</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Connectez-vous avec des professionnels camerounais qualifiés prêts à vous aider dans votre domaine d'expertise.
          </p>
        </motion.div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {professionals.map((professional, index) => (
            <motion.div
              key={professional.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg flex-shrink-0">
                    {professional.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{professional.name}</h3>
                    <p className="text-blue-600 font-medium text-xs sm:text-sm truncate">{professional.profession}</p>
                  </div>
                </div>
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${getAvailabilityColor(professional.availability)}`}>
                  <span className="hidden sm:inline">{professional.availability}</span>
                  <span className="sm:hidden">✓</span>
                </div>
              </div>

              {/* Specialization */}
              <div className="mb-3 sm:mb-4">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Spécialisation</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{professional.specialization}</p>
              </div>

              {/* Experience & Rating */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">{professional.experience} d'expérience</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900">{professional.rating}</span>
                </div>
              </div>

              {/* Location & Languages */}
              <div className="mb-3 sm:mb-4 space-y-1 sm:space-y-2">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">{professional.location}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="font-medium">Langues: </span>
                  <span className="line-clamp-1">{professional.languages.join(', ')}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                {professional.bio}
              </p>

              {/* Services */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Services offerts:</p>
                <div className="flex flex-wrap gap-1">
                  {professional.services.map((service, idx) => (
                    <span key={idx} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                <a
                  href={`mailto:${professional.contact}`}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors break-all"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">{professional.contact}</span>
                </a>
                <a
                  href={`tel:${professional.phone}`}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{professional.phone}</span>
                </a>
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
          className="mt-10 sm:mt-12 lg:mt-16 text-center bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg border border-gray-100 mx-4 sm:mx-0"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Vous êtes un professionnel camerounais ?
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Rejoignez notre répertoire et aidez d'autres Camerounais à réussir au Canada.
            Partagez votre expertise et construisez une communauté plus forte.
          </p>
          <button className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base">
            Rejoindre le Répertoire
          </button>
        </motion.div>
      </div>
    </section>
  )
}
