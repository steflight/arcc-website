'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Snowflake, Star } from 'lucide-react'

interface ChristmasCelebrationProps {
  isVisible: boolean
  onClose: () => void
}

export default function ChristmasCelebration({ isVisible, onClose }: ChristmasCelebrationProps) {
  const [showSnow, setShowSnow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowSnow(true)
      // Arrêter la neige après 15 secondes
      const timer = setTimeout(() => setShowSnow(false), 15000)
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
          {/* Flocons de neige */}
          {showSnow && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 150 }).map((_, i) => {
                const size = Math.random() * 10 + 5 // 5-15px
                const startX = Math.random() * window.innerWidth
                const endX = startX + (Math.random() - 0.5) * 100 // Mouvement latéral léger
                const duration = Math.random() * 5 + 8 // 8-13 secondes
                const delay = Math.random() * 3 // 0-3 secondes
                const opacity = Math.random() * 0.5 + 0.5 // 0.5-1.0
                
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
                      rotate: Math.random() * 360, // Rotation lente
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

          {/* Modal de Noël */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-br from-red-50 via-white to-green-50 rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-red-500"
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
              {/* Icônes de Noël */}
              <div className="flex justify-center space-x-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Snowflake className="h-12 w-12 text-blue-400" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Gift className="h-12 w-12 text-red-500" />
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
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent"
              >
                🎄 Joyeux Noël ! 🎄
              </h2>

              {/* Message */}
              <div className="space-y-4 mb-6">
                <p 
                  className="text-lg font-medium text-red-600"
                >
                  L'ARCC vous souhaite un Joyeux Noël !
                </p>
                <p 
                  className="text-base leading-relaxed text-gray-700"
                >
                  En cette période de fêtes, nous pensons à tous les membres de notre communauté camerounaise au Canada. Que cette saison soit remplie de joie, de paix et de moments précieux en famille.
                </p>
                <p 
                  className="text-sm text-green-600 font-medium"
                >
                  Que la magie de Noël illumine vos cœurs et vos foyers ! ✨
                </p>
              </div>

              {/* Bouton de célébration */}
              <motion.button
                onClick={onClose}
                className="px-8 py-3 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-red-500 bg-gradient-to-r from-red-600 to-green-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Passez de Joyeuses Fêtes ! 🎁
              </motion.button>
            </div>

            {/* Motifs décoratifs de Noël */}
            <div className="absolute top-2 right-2 text-2xl">🎅</div>
            <div className="absolute bottom-2 left-2 text-2xl">🦌</div>
            <div className="absolute top-1/2 right-2 text-xl">⭐</div>
            <div className="absolute top-1/2 left-2 text-xl">❄️</div>
            
            {/* Guirlandes décoratives */}
            <div className="absolute top-0 left-1/4 w-1 h-8 bg-gradient-to-b from-red-500 to-transparent rounded-full"></div>
            <div className="absolute top-0 right-1/4 w-1 h-8 bg-gradient-to-b from-green-500 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-1/3 w-1 h-8 bg-gradient-to-t from-red-500 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-8 bg-gradient-to-t from-green-500 to-transparent rounded-full"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



