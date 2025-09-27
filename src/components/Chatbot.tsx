'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail, MapPin } from 'lucide-react'
import MarkdownContent from './MarkdownContent'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Chatbot Button - Style Afritude - Ultra Visible */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-amber-300/50 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
          boxShadow: '0 25px 50px rgba(245, 158, 11, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.2), 0 0 20px rgba(245, 158, 11, 0.4)',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
            <X className="h-8 w-8" />
          ) : (
            <MessageCircle className="h-8 w-8" />
          )}
        </div>
        
        {/* Indicateur de notification - Plus visible */}
        {!isOpen && (
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-lg">
            <span className="text-white text-sm font-bold">!</span>
          </div>
        )}
        
        {/* Pulsation autour du bouton */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-4 border-amber-400/50 animate-ping"></div>
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
            className="absolute bottom-20 right-0 w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl border-4 border-amber-200/50 overflow-hidden"
            style={{
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(245, 158, 11, 0.2)',
              zIndex: 9998
            }}
          >
            {/* Header - Style Afritude Amélioré */}
            <div 
              className="p-6 text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)'
              }}
            >
              {/* Motifs décoratifs plus subtils */}
              <div className="absolute top-3 right-3 w-6 h-6 border border-white/15 rounded-full"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 bg-white/8 rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-2 h-2 bg-white/10 rounded-full"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/25 rounded-full flex items-center justify-center border-2 border-white/40 shadow-lg">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white drop-shadow-sm">ARCC Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-white/95 font-medium">En ligne maintenant</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white transition-all duration-200 p-3 hover:bg-white/15 rounded-full hover:scale-110"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Messages - Zone améliorée */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 h-80 bg-gradient-to-b from-gray-50 to-amber-50/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-sm px-5 py-4 rounded-2xl shadow-sm ${
                      msg.isBot
                        ? 'bg-white text-gray-800 border border-amber-200/60 shadow-amber-100/50'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                    }`}
                  >
                    <div className="text-sm leading-relaxed font-medium">
                      <MarkdownContent content={msg.text} />
                    </div>
                    <p className={`text-xs mt-2 ${
                      msg.isBot ? 'text-gray-500' : 'text-white/80'
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

            {/* Quick Actions améliorées */}
            <div className="p-4 border-t border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
              <p className="text-sm text-gray-700 mb-3 font-semibold">Actions rapides :</p>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left px-4 py-3 text-sm bg-white hover:bg-amber-50 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-amber-200/40 hover:border-amber-300/60 hover:shadow-sm"
                  >
                    <action.icon className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input - Zone de saisie améliorée */}
            <div className="p-6 border-t border-amber-200/50 bg-gradient-to-r from-white to-amber-50/30">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message ici..."
                  className="flex-1 px-5 py-4 border-2 border-amber-300/60 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-amber-200/50 focus:border-amber-400 transition-all duration-200 bg-white shadow-sm font-medium placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="px-6 py-4 rounded-2xl font-bold text-white transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: (message.trim() && !isLoading) ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : '#d1d5db',
                    boxShadow: (message.trim() && !isLoading) ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none'
                  }}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Indicateurs d'aide améliorés */}
              <div className="mt-4 space-y-2">
                {message.length > 0 && (
                  <div className="text-xs text-amber-600 font-medium flex items-center space-x-1">
                    <span>💬</span>
                    <span>Appuyez sur Entrée ou cliquez sur l'icône pour envoyer</span>
                  </div>
                )}
                <div className="text-xs text-gray-600 flex items-center space-x-1">
                  <span>💡</span>
                  <span>Utilisez les actions rapides ci-dessus pour des réponses instantanées</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
