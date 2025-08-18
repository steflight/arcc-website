import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CoreActivities from '@/components/CoreActivities'
import CoreValues from '@/components/CoreValues'
import About from '@/components/About'
import BlogPreview from '@/components/BlogPreview'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CoreActivities />
      <CoreValues />
      <About />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  )
}
