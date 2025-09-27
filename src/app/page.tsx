'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import FirstMeeting from '@/components/FirstMeeting'
import FounderMessage from '@/components/FounderMessage'
import SkillsDirectory from '@/components/SkillsDirectory'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import AnniversaryCelebration from '@/components/AnniversaryCelebration'

export default function Home() {
  const [showAnniversary, setShowAnniversary] = useState(false)

  useEffect(() => {
    // Afficher l'anniversaire à chaque ouverture du site
    const timer = setTimeout(() => {
      setShowAnniversary(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <FirstMeeting />
      <FounderMessage />
      <SkillsDirectory />
      <Contact />
      <Footer />
      <Chatbot />
      <AnniversaryCelebration 
        isVisible={showAnniversary} 
        onClose={() => setShowAnniversary(false)} 
      />
    </main>
  )
}
