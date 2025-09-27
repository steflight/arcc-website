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
    <section id="founder-message" className="py-24 bg-gradient-to-br from-white via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-300/20 transform rotate-45 rounded-lg opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-red-200/20 to-yellow-300/20 transform -rotate-12 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-300/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Motifs décoratifs */}
        <div className="absolute top-32 left-32 w-24 h-24 border-4 border-amber-400/30 rounded-full opacity-60 animate-spin" style={{animationDuration: '12s'}}></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 border-4 border-orange-400/30 transform rotate-45 opacity-60 animate-pulse" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
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
            <Quote className="h-4 w-4" />
            <span>Mot du Fondateur</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Un Message du <span className="text-amber-600">Cœur</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez la vision et la passion qui ont donné naissance à notre association
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Photo et infos du fondateur */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200/50 text-center">
              {/* Photo du fondateur */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl">
                <img 
                  src={founderData.image} 
                  alt={founderData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {founderData.name}
              </h3>
              <p className="text-amber-600 font-medium mb-4">
                {founderData.title}
              </p>
              
              {/* Réalisations */}
              <div className="space-y-3">
                {founderData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-amber-500" />
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
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200/50">
              {/* Citation mise en avant */}
              <div className="mb-8">
                <Quote className="h-12 w-12 text-amber-500 mb-4" />
                <blockquote className="text-xl text-gray-700 italic leading-relaxed font-medium">
                  "{founderData.quote}"
                </blockquote>
              </div>

              {/* Message complet */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {founderData.fullMessage}
                </div>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{founderData.name}</p>
                    <p className="text-amber-600 text-sm">{founderData.title}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-medium">Avec gratitude</span>
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Rejoignez Notre Vision
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Ensemble, construisons une communauté forte, unie et prospère. 
              Votre participation fait la différence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 bg-white text-amber-600 rounded-2xl font-bold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Devenir Membre
              </button>
              <button 
                className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
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
