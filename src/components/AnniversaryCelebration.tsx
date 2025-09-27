'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Calendar, PartyPopper } from 'lucide-react'

interface AnniversaryCelebrationProps {
  isVisible: boolean
  onClose: () => void
}

export default function AnniversaryCelebration({ isVisible, onClose }: AnniversaryCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true)
      // Arrêter les confettis après 10 secondes
      const timer = setTimeout(() => setShowConfetti(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const confettiColors = ['#8B4513', '#FFD700', '#D2691E', '#FF6347', '#32CD32', '#FF69B4', '#00CED1', '#FFD700']
  const confettiShapes = ['circle', 'rectangle', 'triangle', 'diamond', 'star']

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          {/* Confettis spontanés et variés */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 200 }).map((_, i) => {
                const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)]
                const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
                const size = Math.random() * 8 + 4 // 4-12px
                const startX = Math.random() * window.innerWidth
                const endX = startX + (Math.random() - 0.5) * 200 // Mouvement latéral
                const duration = Math.random() * 4 + 6 // 6-10 secondes
                const delay = Math.random() * 2 // 0-2 secondes
                
                const getShapeStyle = () => {
                  switch (shape) {
                    case 'circle':
                      return { borderRadius: '50%' }
                    case 'rectangle':
                      return { borderRadius: '2px' }
                    case 'triangle':
                      return { 
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        borderRadius: '0'
                      }
                    case 'diamond':
                      return { 
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        borderRadius: '0'
                      }
                    case 'star':
                      return { 
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        borderRadius: '0'
                      }
                    default:
                      return { borderRadius: '50%' }
                  }
                }

                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      left: startX,
                      top: -50,
                      ...getShapeStyle()
                    }}
                    initial={{ 
                      y: -50, 
                      x: 0,
                      rotate: 0,
                      scale: 0.5
                    }}
                    animate={{ 
                      y: window.innerHeight + 100,
                      x: endX - startX,
                      rotate: Math.random() * 720 + 360, // 1-3 tours
                      scale: [0.5, 1, 0.8, 1.2, 0.3] // Pulsation
                    }}
                    transition={{ 
                      duration: duration,
                      delay: delay,
                      ease: "easeOut",
                      times: [0, 0.2, 0.4, 0.6, 1] // Pour la pulsation
                    }}
                  />
                )
              })}
            </div>
          )}

          {/* Modal d'anniversaire */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-[#FFD700]"
          >
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Contenu */}
            <div className="text-center">
              {/* Icônes d'anniversaire */}
              <div className="flex justify-center space-x-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <PartyPopper className="h-12 w-12 text-[#FFD700]" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Gift className="h-12 w-12 text-[#8B4513]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Calendar className="h-12 w-12 text-[#D2691E]" />
                </motion.div>
              </div>

              {/* Titre */}
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: '#2F1B14' }}
              >
                🎉 Joyeux Anniversaire ! 🎉
              </h2>

              {/* Message */}
              <div className="space-y-4 mb-6">
                <p 
                  className="text-lg font-medium"
                  style={{ color: '#8B4513' }}
                >
                  L'ARCC fête son anniversaire !
                </p>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: '#2F1B14' }}
                >
                  Aujourd'hui marque une nouvelle année de solidarité, d'entraide et de croissance pour notre communauté camerounaise au Canada.
                </p>
                <p 
                  className="text-sm"
                  style={{ color: '#8B4513' }}
                >
                  Merci à tous nos membres pour leur engagement et leur soutien continu.
                </p>
              </div>

              {/* Bouton de célébration */}
              <motion.button
                onClick={onClose}
                className="px-8 py-3 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[#FFD700]"
                style={{ backgroundColor: '#8B4513' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Célébrons ensemble ! 🎊
              </motion.button>
            </div>

            {/* Motifs décoratifs */}
            <div className="absolute top-2 right-2 w-4 h-4 border-2 border-[#8B4513]/30 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#FFD700]/30 rounded-full"></div>
            <div className="absolute top-1/2 right-2 w-2 h-2 bg-[#D2691E]/30 rounded-full"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
