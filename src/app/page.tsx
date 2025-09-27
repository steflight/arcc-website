import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import FirstMeeting from '@/components/FirstMeeting'
import FounderMessage from '@/components/FounderMessage'
import SkillsDirectory from '@/components/SkillsDirectory'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function Home() {
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
    </main>
  )
}
