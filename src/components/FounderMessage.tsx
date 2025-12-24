'use client'

import { motion } from 'framer-motion'
import { Quote, User, Calendar, Heart, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FounderMessage() {
  const { t } = useLanguage()

  const founderData = {
    name: "M. Leonidas Ledoux",
    title: "Fondateur d'ARCC",
    image: "/leo.jpg",
    quote: "L'ARCC est née d'un rêve simple : créer un foyer pour tous les Camerounais au Canada. Un endroit où nous pouvons nous soutenir, grandir ensemble et préserver notre héritage tout en embrassant notre nouvelle patrie.",
    fullMessage: `Chers frères et sœurs,

L'Association des Ressortissants Camerounais au Canada (ARCC) est bien plus qu'une simple organisation - c'est le fruit d'une vision partagée, d'un rêve collectif qui a pris vie grâce à votre engagement et votre solidarité.

En créant ARCC, nous avons voulu répondre à un besoin fondamental : celui de créer un pont entre notre terre natale, le Cameroun, et notre terre d'accueil, le Canada. Trop souvent, nous avons vu des compatriotes arriver ici avec des rêves plein la tête mais se retrouver isolés, perdus dans un système qu'ils ne comprenaient pas encore.

Notre mission est claire : accompagner, soutenir et unir. Que vous soyez nouvellement arrivé ou établi depuis des années, ARCC est votre famille élargie. Nous sommes là pour vous aider à naviguer les défis de l'établissement, pour vous connecter avec des professionnels qualifiés, et surtout, pour vous rappeler que vous n'êtes jamais seul.

Chaque membre de notre communauté apporte une richesse unique. Nos différences sont notre force. Que vous veniez de Douala, Yaoundé, Bafoussam ou de n'importe quelle région de notre beau pays, vous avez votre place ici.

Ensemble, nous construisons non seulement notre avenir au Canada, mais nous contribuons aussi au développement de notre pays d'origine. L'ARCC est un pont, un lien vivant entre deux cultures que nous chérissons.

Merci de faire partie de cette belle aventure. Merci de croire en notre vision. Merci d'être ARCC.

Avec toute ma gratitude et ma solidarité,

M. Leonidas Ledoux
Fondatrice et Présidente d'ARCC`,
    achievements: [
      "Artiste et Compositeur",
      "Manager Evenementiel",
    ]
  }

  return (
    <section id="founder-message" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-amber-200/20 to-orange-300/20 transform rotate-45 rounded-lg opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-red-200/20 to-yellow-300/20 transform -rotate-12 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-amber-300/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Motifs décoratifs */}
        <div className="absolute top-16 sm:top-32 left-16 sm:left-32 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 sm:border-4 border-amber-400/30 rounded-full opacity-60 animate-spin" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-2 sm:border-4 border-orange-400/30 transform rotate-45 opacity-60 animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <Quote className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Mot du Fondateur</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Un Message du <span className="text-amber-600">Cœur</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Découvrez la vision et la passion qui ont donné naissance à notre association
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start px-4 sm:px-0">
          {/* Photo et infos du fondateur */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl border border-amber-200/50 text-center">
              {/* Photo du fondateur */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-2 sm:border-4 border-amber-300 shadow-2xl">
                <img
                  src={founderData.image}
                  alt={founderData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                {founderData.name}
              </h3>
              <p className="text-amber-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                {founderData.title}
              </p>

              {/* Réalisations */}
              <div className="space-y-2 sm:space-y-3">
                {founderData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl border border-amber-200/50">
              {/* Citation mise en avant */}
              <div className="mb-6 sm:mb-8">
                <Quote className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-amber-500 mb-3 sm:mb-4" />
                <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 italic leading-relaxed font-medium">
                  "{founderData.quote}"
                </blockquote>
              </div>

              {/* Message complet */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {founderData.fullMessage}
                </div>
              </div>

              {/* Signature */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{founderData.name}</p>
                    <p className="text-amber-600 text-xs sm:text-sm">{founderData.title}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Avec gratitude</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 lg:mt-16 px-4"
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-white shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Rejoignez Notre Vision
            </h3>
            <p className="text-amber-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Ensemble, construisons une communauté forte, unie et prospère.
              Votre participation fait la différence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-xl sm:rounded-2xl font-bold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Devenir Membre
              </button>
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl sm:rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Nous Contacter
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
