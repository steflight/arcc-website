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
      response: "Pour vous aider avec l'établissement, veuillez saisir votre numéro de téléphone et nous vous contacterons dans les 24h. Vous pouvez aussi nous écrire directement au +1 (514) 555-0123 ou par email à info@camercanada.com"
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
    <>
      {/* Overlay pour mobile - ferme le chatbot au clic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9997] md:hidden"
          />
        )}
      </AnimatePresence>

      <div 
        className="fixed bottom-3 right-3 z-[9999] md:bottom-4 md:right-4"
        style={{ position: 'fixed' }}
      >
        {/* Chatbot Button - Ultra compact et mobile-friendly */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-sm transition-all duration-300 border border-amber-300/20 relative overflow-hidden flex items-center justify-center touch-manipulation"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
            boxShadow: '0 1px 4px rgba(245, 158, 11, 0.25), 0 0 0 0.5px rgba(255, 255, 255, 0.08)',
            WebkitTapHighlightColor: 'transparent'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          animate={!isOpen ? {
            scale: [1, 1.01, 1],
            boxShadow: [
              '0 1px 4px rgba(245, 158, 11, 0.25), 0 0 0 0.5px rgba(255, 255, 255, 0.08)',
              '0 2px 8px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.12)',
              '0 1px 4px rgba(245, 158, 11, 0.25), 0 0 0 0.5px rgba(255, 255, 255, 0.08)'
            ]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
        >
          <div className="relative z-10 text-white">
            {isOpen ? (
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            ) : (
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            )}
          </div>

          {/* Indicateur de notification - Minimaliste */}
          {!isOpen && (
            <motion.div 
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center border border-white shadow-sm"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white text-[7px] sm:text-[8px] font-bold">!</span>
            </motion.div>
          )}
        </motion.button>

        {/* Chatbot Window - Mobile First */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed md:absolute bottom-0 md:bottom-16 right-0 md:right-0 w-full md:w-[420px] h-[calc(100vh-80px)] md:h-[600px] md:max-h-[600px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border-t-4 md:border-4 border-amber-200/50 overflow-hidden flex flex-col"
              style={{
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(245, 158, 11, 0.1)',
                zIndex: 9998
              }}
            >
            {/* Header - Optimisé Mobile */}
            <div
              className="p-4 md:p-5 lg:p-6 text-white relative overflow-hidden flex-shrink-0"
              style={{
                backgroundColor: '#1a1a2e'
              }}
            >
              <div className="flex items-center justify-between relative z-10 w-full">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FF6347] rounded-full flex items-center justify-center border-2 border-[#FFD700] shadow-lg flex-shrink-0">
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base md:text-lg text-white drop-shadow-sm truncate">ARCC Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <p className="text-xs md:text-sm text-white/95 font-medium truncate">En ligne maintenant</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white active:scale-95 transition-all duration-200 p-2 hover:bg-white/15 rounded-full flex-shrink-0 touch-manipulation"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </div>

            {/* Messages - Zone optimisée mobile avec scroll amélioré */}
            <div 
              className="flex-1 overflow-y-auto space-y-3 md:space-y-4 bg-[#F5F5DC] px-3 py-4 md:px-4 md:py-6"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} w-full`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-sm px-4 py-3 rounded-2xl shadow-sm break-words ${msg.isBot
                        ? 'bg-white text-gray-800 border border-[#8B4513]/30'
                        : 'bg-[#FF6347] text-white'
                      }`}
                  >
                    <div className="text-sm md:text-base leading-relaxed font-normal">
                      <MarkdownContent content={msg.text} />
                    </div>
                    <p className={`text-[10px] md:text-xs mt-2 ${msg.isBot ? 'text-gray-500' : 'text-white/80'}`}>
                      {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Indicateur de chargement LLM */}
              {isLoading && (
                <div className="flex justify-start w-full">
                  <div className="bg-white text-gray-800 max-w-[85%] md:max-w-sm px-4 py-3 rounded-2xl shadow-sm border border-amber-200/60">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent flex-shrink-0"></div>
                      <span className="text-sm md:text-base font-medium">ARCC Assistant réfléchit...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message d'erreur */}
              {error && (
                <div className="flex justify-start w-full">
                  <div className="bg-red-50 text-red-800 max-w-[85%] md:max-w-sm px-4 py-3 rounded-2xl shadow-sm border border-red-200/60">
                    <div className="flex items-center space-x-2">
                      <span className="text-base md:text-lg flex-shrink-0">⚠️</span>
                      <span className="text-sm md:text-base font-medium break-words">{error}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - Accordéon Mobile Optimisé */}
            <div className="border-t border-[#8B4513]/30 bg-[#FFF8DC] flex-shrink-0">
              <button
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="w-full p-3 md:p-4 text-left flex items-center justify-between active:bg-[#FFFACD] transition-colors duration-200 touch-manipulation"
                aria-expanded={isQuickActionsOpen}
                aria-label="Actions rapides"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm md:text-base font-semibold text-gray-700">Actions rapides</span>
                  <span className="text-xs text-gray-500">({quickActions.length})</span>
                </div>
                {isQuickActionsOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#8B4513]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#8B4513]" />
                )}
              </button>

              <AnimatePresence>
                {isQuickActionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-3 md:px-4 pb-3 md:pb-4 space-y-2 max-h-48 overflow-y-auto"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleQuickAction(action)
                            setIsQuickActionsOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-sm md:text-base bg-white active:bg-[#FFFACD] rounded-xl transition-all duration-200 flex items-center space-x-3 border border-[#8B4513]/20 active:border-[#8B4513]/40 active:scale-[0.98] touch-manipulation"
                        >
                          <action.icon className="h-5 w-5 text-[#8B4513] flex-shrink-0" />
                          <span className="font-medium text-gray-700">{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input - Zone de saisie optimisée mobile */}
            <div className="p-3 md:p-4 border-t border-[#8B4513]/30 bg-white flex-shrink-0 safe-area-inset-bottom">
              <div className="flex space-x-2 md:space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-3 md:py-3.5 border-2 border-[#8B4513]/40 rounded-xl text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-all duration-200 bg-white shadow-sm placeholder-gray-400 touch-manipulation"
                  disabled={isLoading}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="sentences"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="px-4 md:px-6 py-3 md:py-3.5 rounded-xl font-bold text-white transition-all duration-200 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 touch-manipulation min-w-[48px] flex items-center justify-center"
                  style={{
                    background: (message.trim() && !isLoading) ? '#FF6347' : '#d1d5db',
                    boxShadow: (message.trim() && !isLoading) ? '0 4px 15px rgba(255, 99, 71, 0.4)' : 'none'
                  }}
                  aria-label="Envoyer le message"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Indicateurs d'aide - Masqués sur mobile pour économiser l'espace */}
              {message.length > 0 && (
                <div className="mt-2 text-xs text-[#8B4513] font-medium hidden md:flex items-center space-x-1">
                  <span>💬</span>
                  <span>Appuyez sur Entrée ou cliquez pour envoyer</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  )
}
