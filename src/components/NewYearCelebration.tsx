'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface NewYearCelebrationProps {
  isVisible: boolean
  onClose: () => void
}

export default function NewYearCelebration({ isVisible, onClose }: NewYearCelebrationProps) {
  const [showSnow, setShowSnow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowSnow(true)
      const snowTimer = setTimeout(() => setShowSnow(false), 20000)
      return () => {
        clearTimeout(snowTimer)
      }
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
        >
          {/* Effet de neige - Style canadien (très abondant et visible) */}
          {showSnow && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 400 }).map((_, i) => {
                const size = Math.random() * 8 + 4 // 4-12px (plus gros)
                const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)
                const endX = startX + (Math.random() - 0.5) * 200
                const duration = Math.random() * 6 + 4 // 4-10 secondes
                const delay = Math.random() * 1.5
                const opacity = Math.random() * 0.5 + 0.7 // 0.7-1.2 (très visible)

                return (
                  <motion.div
                    key={i}
                    className="absolute text-white drop-shadow-lg"
                    style={{
                      fontSize: size,
                      left: startX,
                      top: -20,
                      opacity: Math.min(opacity, 1), // Limiter à 1 pour l'opacité max
                      filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))',
                    }}
                    initial={{
                      y: -20,
                      x: 0,
                      rotate: 0,
                    }}
                    animate={{
                      y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 50,
                      x: endX - startX,
                      rotate: Math.random() * 360,
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

          {/* Modal Corporate - Compact et Mobile Friendly */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-md sm:max-w-lg mx-3 sm:mx-4 shadow-2xl border border-gray-300"
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 text-gray-400 hover:text-gray-600 active:scale-95 transition-all duration-200 p-1"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Contenu */}
            <div className="text-center pt-1">
              {/* En-tête avec séparateur */}
              <div className="mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 tracking-tight">
                  Bonne Année 2026
                </h2>
                <div className="w-12 sm:w-16 h-0.5 bg-[#8B4513] mx-auto"></div>
              </div>

              {/* Message principal */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  L'ARCC vous souhaite une Excellente Année
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-gray-700 px-1">
                  En cette nouvelle année, nous vous souhaitons santé, bonheur et succès dans tous vos projets. Que 2026 soit une année de croissance, de solidarité et de réalisations pour toute notre communauté camerounaise au Canada.
                </p>
                <p className="text-sm sm:text-base text-gray-800 font-medium pt-1">
                  Ensemble, construisons un avenir meilleur.
                </p>
              </div>

              {/* Bouton Corporate */}
              <motion.button
                onClick={onClose}
                className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-[#8B4513] text-white text-sm sm:text-base font-semibold rounded-md transition-all duration-200 shadow-sm hover:bg-[#6B3410] hover:shadow-md active:scale-95"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Continuer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
