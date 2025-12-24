'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import MarkdownContent from './MarkdownContent'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant virtuel d'ARCC. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    {
      text: "Besoin d'aide pour l'établissement",
      icon: MapPin,
      response: "Pour vous aider avec l'établissement, veuillez saisir votre numéro de téléphone et nous vous contacterons dans les 24h. Vous pouvez aussi nous écrire directement au +1 (514) 555-0123 ou par email à info@arcc-canada.ca"
    },
    {
      text: "Support juridique",
      icon: Phone,
      response: "Pour le support juridique, contactez-nous immédiatement au +1 (514) 555-0123. En cas d'urgence (risque d'expulsion), appelez le +1 (514) 555-0124. Nous avons des avocats spécialisés disponibles 24h/7j."
    },
    {
      text: "Rejoindre l'association",
      icon: Mail,
      response: "Pour rejoindre l'ARCC, veuillez saisir votre nom, numéro de téléphone et ville de résidence. Un membre de notre équipe vous contactera pour finaliser votre adhésion. Frais d'adhésion : 50$ CAD/an."
    },
    {
      text: "Programme de mentorat",
      icon: MapPin,
      response: "Le programme de mentorat ARCC connecte les nouveaux arrivants avec des mentors expérimentés. Saisissez votre domaine d'expertise et vos besoins pour être mis en contact avec un mentor approprié."
    }
  ]

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)
    setError(null)

    try {
      // Appel à l'API LLM ARCC
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: messages.map(msg => ({
            role: msg.isBot ? 'assistant' : 'user',
            content: msg.text
          }))
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.content || "Désolé, je n'ai pas pu traiter votre demande.",
        isBot: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])

      // Log du coût si disponible
      if (data.cost) {
        console.log(`Coût de la requête: $${data.cost.toFixed(4)}`)
      }

    } catch (error) {
      console.error('Erreur lors du traitement du message:', error)
      setError('Une erreur s\'est produite. Veuillez réessayer.')

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter directement au +1 (514) 555-0123.",
        isBot: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: any) => {
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: (messages.length + 1).toString(),
      text: action.text,
      isBot: false,
      timestamp: new Date()
    }

    // Ajouter la réponse automatique du bot
    const botResponse = {
      id: (messages.length + 2).toString(),
      text: action.response,
      isBot: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botResponse])
    setMessage('')
  }

  return (
    <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999 }} className="sm:bottom-6 sm:right-6">
      {/* Chatbot Button - Style Afritude - Ultra Visible */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 sm:p-5 lg:p-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 sm:border-4 border-amber-300/50 relative overflow-hidden w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
          boxShadow: '0 25px 50px rgba(245, 158, 11, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.2), 0 0 20px rgba(245, 158, 11, 0.4)'
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          boxShadow: [
            '0 25px 50px rgba(245, 158, 11, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.2), 0 0 20px rgba(245, 158, 11, 0.4)',
            '0 30px 60px rgba(245, 158, 11, 0.8), 0 0 0 8px rgba(255, 255, 255, 0.3), 0 0 30px rgba(245, 158, 11, 0.6)',
            '0 25px 50px rgba(245, 158, 11, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.2), 0 0 20px rgba(245, 158, 11, 0.4)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        <div className="relative z-10 text-white">
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
          ) : (
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
          )}
        </div>

        {/* Indicateur de notification - Plus visible */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-lg">
            <span className="text-white text-xs sm:text-sm font-bold">!</span>
          </div>
        )}

        {/* Pulsation autour du bouton */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-amber-400/50 animate-ping"></div>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 sm:bottom-24 right-0 w-[calc(100vw-32px)] sm:w-[420px] max-w-[420px] h-[calc(100vh-120px)] sm:h-[600px] max-h-[600px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-200/50 overflow-hidden"
            style={{
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(245, 158, 11, 0.2)',
              zIndex: 9998
            }}
          >
            {/* Header - Style Afritude Amélioré */}
            <div
              className="p-4 sm:p-5 lg:p-6 text-white relative overflow-hidden"
              style={{
                backgroundColor: '#1a1a2e'
              }}
            >
              {/* Motifs décoratifs plus subtils */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-4 h-4 sm:w-6 sm:h-6 border border-white/15 rounded-full"></div>
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 bg-white/8 rounded-full"></div>
              <div className="absolute top-1/2 right-4 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/10 rounded-full"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#FF6347] rounded-full flex items-center justify-center border-2 border-[#FFD700] shadow-lg flex-shrink-0">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl text-white drop-shadow-sm truncate">ARCC Assistant</h3>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-white/95 font-medium truncate">En ligne maintenant</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white transition-all duration-200 p-2 sm:p-3 hover:bg-white/15 rounded-full hover:scale-110 flex-shrink-0"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Messages - Zone améliorée */}
            <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto space-y-3 sm:space-y-4 bg-[#F5F5DC]" style={{ height: 'calc(100% - 200px)' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-sm px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl shadow-sm ${msg.isBot
                        ? 'bg-white text-gray-800 border border-[#8B4513]/30 shadow-md'
                        : 'bg-[#FF6347] text-white shadow-lg'
                      }`}
                  >
                    <div className="text-xs sm:text-sm leading-relaxed font-medium">
                      <MarkdownContent content={msg.text} />
                    </div>
                    <p className={`text-[10px] sm:text-xs mt-1 sm:mt-2 ${msg.isBot ? 'text-gray-500' : 'text-white/80'
                      }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Indicateur de chargement LLM amélioré */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 max-w-sm px-5 py-4 rounded-2xl shadow-sm border border-amber-200/60">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent"></div>
                      <span className="text-sm font-medium">ARCC Assistant réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message d'erreur amélioré */}
              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-50 text-red-800 max-w-sm px-5 py-4 rounded-2xl shadow-sm border border-red-200/60">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">⚠️</span>
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - Accordéon */}
            <div className="border-t border-[#8B4513]/30 bg-[#FFF8DC]">
              {/* Header de l'accordéon */}
              <button
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FFFACD] transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-700">Actions rapides</span>
                  <span className="text-xs text-gray-500">({quickActions.length})</span>
                </div>
                {isQuickActionsOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#8B4513]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#8B4513]" />
                )}
              </button>

              {/* Contenu de l'accordéon */}
              <AnimatePresence>
                {isQuickActionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#8B4513]/30 scrollbar-track-transparent">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleQuickAction(action)
                            setIsQuickActionsOpen(false) // Fermer l'accordéon après sélection
                          }}
                          className="w-full text-left px-4 py-3 text-sm bg-white hover:bg-[#FFFACD] rounded-xl transition-all duration-200 flex items-center space-x-3 border border-[#8B4513]/20 hover:border-[#8B4513]/40 hover:shadow-sm"
                        >
                          <action.icon className="h-4 w-4 text-[#8B4513] flex-shrink-0" />
                          <span className="font-medium text-gray-700">{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input - Zone de saisie améliorée */}
            <div className="p-3 sm:p-4 lg:p-6 border-t border-[#8B4513]/30 bg-white">
              <div className="flex space-x-2 sm:space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-4 border-2 border-[#8B4513]/40 rounded-xl sm:rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-all duration-200 bg-white shadow-sm font-medium placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-white transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  style={{
                    background: (message.trim() && !isLoading) ? '#FF6347' : '#d1d5db',
                    boxShadow: (message.trim() && !isLoading) ? '0 4px 15px rgba(255, 99, 71, 0.4)' : 'none'
                  }}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>

              {/* Indicateurs d'aide améliorés */}
              <div className="mt-2 sm:mt-3 lg:mt-4 space-y-1 sm:space-y-2">
                {message.length > 0 && (
                  <div className="text-[10px] sm:text-xs text-[#8B4513] font-medium flex items-center space-x-1">
                    <span>💬</span>
                    <span className="hidden sm:inline">Appuyez sur Entrée ou cliquez sur l'icône pour envoyer</span>
                    <span className="sm:hidden">Entrée pour envoyer</span>
                  </div>
                )}
                <div className="text-[10px] sm:text-xs text-gray-600 flex items-center space-x-1">
                  <span>💡</span>
                  <span className="hidden sm:inline">Utilisez les actions rapides ci-dessus pour des réponses instantanées</span>
                  <span className="sm:hidden">Actions rapides disponibles</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
