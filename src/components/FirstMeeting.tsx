'use client'

import { motion } from 'framer-motion'
import { Camera, Users, Calendar, MapPin, Heart, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FirstMeeting() {
  const { t } = useLanguage()
  
  // Données de la première rencontre - à remplacer par de vraies photos
  const meetingData = {
    title: "Notre Première Rencontre",
    subtitle: "Le début d'une belle aventure communautaire",
    date: "15 Janvier 2024",
    location: "Montréal, Québec",
    attendees: "25+ Camerounais",
    description: "Une rencontre historique qui a marqué le début de notre association. Des moments de partage, de rires et de solidarité qui nous ont rappelé l'importance de rester unis au Canada."
  }

  // Photos de la rencontre ARCC
  const photos = [
    {
      id: 1,
      src: "/event-one/arcc-1.JPG",
      alt: "Groupe de Camerounais lors de la première rencontre",
      caption: "Moment de partage et de convivialité"
    },
    {
      id: 2,
      src: "/event-one/arcc-2.JPG",
      alt: "Discussions autour d'une table",
      caption: "Échanges sur les défis et opportunités"
    },
    {
      id: 3,
      src: "/event-one/arcc-3.JPG",
      alt: "Présentation des objectifs de l'association",
      caption: "Présentation de la vision ARCC"
    },
    {
      id: 4,
      src: "/event-one/arcc-4.JPG",
      alt: "Photo de groupe finale",
      caption: "Notre première famille ARCC"
    },
    {
      id: 5,
      src: "/event-one/arcc-5.JPG",
      alt: "Ateliers et formations",
      caption: "Apprentissage et développement"
    },
    {
      id: 6,
      src: "/event-one/arcc-6.JPG",
      alt: "Réseautage professionnel",
      caption: "Connexions et opportunités"
    },
    {
      id: 7,
      src: "/event-one/arcc-7.JPG",
      alt: "Célébration culturelle",
      caption: "Préservation de notre héritage"
    },
    {
      id: 8,
      src: "/event-one/arcc-8.JPG",
      alt: "Moment de détente",
      caption: "Amitié et solidarité"
    }
  ]

  return (
    <section id="first-meeting" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements - Motifs africains */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-300/20 transform rotate-45 rounded-lg opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-red-200/20 to-yellow-300/20 transform -rotate-12 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-300/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Motifs tribaux */}
        <div className="absolute top-32 right-32 w-24 h-24 border-4 border-amber-400/30 rounded-full opacity-60 animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 border-4 border-orange-400/30 transform rotate-45 opacity-60 animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Camera className="h-4 w-4" />
            <span>Mémoires de Notre Histoire</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {meetingData.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {meetingData.subtitle}
          </p>
          
          {/* Informations de la rencontre */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              <span className="font-medium">{meetingData.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-amber-600" />
              <span className="font-medium">{meetingData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-amber-600" />
              <span className="font-medium">{meetingData.attendees}</span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200/50">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {meetingData.description}
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Unis par la solidarité, guidés par l'espoir</span>
            </div>
          </div>
        </motion.div>

        {/* Galerie de photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* Image réelle */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Bouton de zoom */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez Notre Histoire
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Chaque rencontre est une nouvelle page de notre histoire commune. 
              Soyez partie de cette belle aventure qui unit les Camerounais au Canada.
            </p>
            <button 
              className="px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-110 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)'
              }}
            >
              Participer aux Prochaines Rencontres
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
