'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Calendar, Star } from 'lucide-react'

interface NewYearCelebrationProps {
  isVisible: boolean
  onClose: () => void
}

export default function NewYearCelebration({ isVisible, onClose }: NewYearCelebrationProps) {
  const [showSnow, setShowSnow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowSnow(true)
      // Arrêter la neige après 20 secondes
      const timer = setTimeout(() => setShowSnow(false), 20000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          {/* Effet de neige canadien - Flocons réalistes */}
          {showSnow && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 200 }).map((_, i) => {
                const size = Math.random() * 12 + 4 // 4-16px pour des flocons variés
                const startX = Math.random() * window.innerWidth
                const endX = startX + (Math.random() - 0.5) * 150 // Mouvement latéral plus prononcé
                const duration = Math.random() * 6 + 10 // 10-16 secondes (chute lente)
                const delay = Math.random() * 4 // 0-4 secondes
                const opacity = Math.random() * 0.6 + 0.4 // 0.4-1.0
                const rotation = Math.random() * 360 // Rotation aléatoire
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-white"
                    style={{
                      fontSize: size,
                      left: startX,
                      top: -50,
                      opacity: opacity,
                    }}
                    initial={{ 
                      y: -50, 
                      x: 0,
                      rotate: 0,
                    }}
                    animate={{ 
                      y: window.innerHeight + 100,
                      x: endX - startX,
                      rotate: rotation + Math.random() * 360, // Rotation continue
                    }}
                    transition={{ 
                      duration: duration,
                      delay: delay,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    ❄
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Modal de Bonne Année */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-blue-400"
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Contenu */}
            <div className="text-center">
              {/* Icônes de Nouvel An */}
              <div className="flex justify-center space-x-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-12 w-12 text-blue-500" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Calendar className="h-12 w-12 text-[#8B4513]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Star className="h-12 w-12 text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>

              {/* Titre */}
              <h2 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-[#8B4513] to-blue-600 bg-clip-text text-transparent"
              >
                🎊 Bonne Année 2025 ! 🎊
              </h2>

              {/* Message */}
              <div className="space-y-4 mb-6">
                <p 
                  className="text-lg font-medium text-[#8B4513]"
                >
                  L'ARCC vous souhaite une Excellente Année !
                </p>
                <p 
                  className="text-base leading-relaxed text-gray-700"
                >
                  En cette nouvelle année, nous vous souhaitons santé, bonheur et succès dans tous vos projets. Que 2025 soit une année de croissance, de solidarité et de réalisations pour toute notre communauté camerounaise au Canada.
                </p>
                <p 
                  className="text-sm text-blue-600 font-medium"
                >
                  Ensemble, construisons un avenir meilleur ! ✨
                </p>
              </div>

              {/* Bouton de célébration */}
              <motion.button
                onClick={onClose}
                className="px-8 py-3 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-blue-400 bg-gradient-to-r from-blue-600 via-[#8B4513] to-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bonne Année à Tous ! 🎉
              </motion.button>
            </div>

            {/* Motifs décoratifs de Nouvel An */}
            <div className="absolute top-2 right-2 text-2xl">🎆</div>
            <div className="absolute bottom-2 left-2 text-2xl">🎇</div>
            <div className="absolute top-1/2 right-2 text-xl">⭐</div>
            <div className="absolute top-1/2 left-2 text-xl">✨</div>
            
            {/* Guirlandes décoratives */}
            <div className="absolute top-0 left-1/4 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
            <div className="absolute top-0 right-1/4 w-1 h-8 bg-gradient-to-b from-[#8B4513] to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-1/3 w-1 h-8 bg-gradient-to-t from-blue-500 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-8 bg-gradient-to-t from-[#8B4513] to-transparent rounded-full"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

