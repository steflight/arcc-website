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
import NewYearCelebration from '@/components/NewYearCelebration'

export default function Home() {
  const [showNewYear, setShowNewYear] = useState(false)

  useEffect(() => {
    // Afficher le popup de Bonne Année à chaque ouverture du site
    const timer = setTimeout(() => {
      setShowNewYear(true)
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
      <NewYearCelebration
        isVisible={showNewYear}
        onClose={() => setShowNewYear(false)}
      />
    </main>
  )
}
