'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Header
    'nav.activities': 'Core Activities',
    'nav.values': 'Core Values',
    'nav.about': 'About',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    'header.getStarted': 'Get Started',
    
    // Hero
    'hero.badge': 'AI Solutions for Growth',
    'hero.headline': 'Turn AI into results, faster.',
    'hero.subtitle': 'Kladriva helps you unlock growth with AI, mentoring, and tailored services — delivering measurable impact in weeks, not months.',
    'hero.cta.primary': 'Get Free Audit in 24h',
    'hero.cta.secondary': 'See Our Results',
    'hero.trust': '70% reduction in time-to-start: from 6 months to 10 days',
    'hero.banner.option1.headline': 'Turn <span class="color-transition-1 font-semibold">AI</span> into <span class="color-transition-2 font-semibold">results</span>, <span class="color-transition-3 font-semibold">faster</span>.',
    'hero.banner.option1.subtitle': 'Kladriva helps you unlock <span class="color-transition-1 font-semibold">growth</span> with AI, mentoring, and tailored services — delivering <span class="color-transition-4 font-semibold">measurable impact</span> in weeks, not months.',
    'hero.banner.option2.headline': 'AI that works for people, not the other way around.',
    'hero.banner.option2.subtitle': 'At Kladriva, we combine technology, mentoring, and human insight to create solutions that drive real business growth.',
    'hero.banner.option3.headline': 'From vision to execution — at the speed of Kladriva.',
    'hero.banner.option3.subtitle': 'We guide you with AI consulting, mentoring, and tailored services to transform ideas into tangible success.',
    'hero.banner.option4.headline': 'Your growth deserves more than promises — it needs results.',
    'hero.banner.option4.subtitle': 'Kladriva delivers AI-driven strategies, mentoring, and custom-built solutions that accelerate your business impact.',
    
    // Core Activities
    'activities.title': 'Our <span class="color-transition-1 font-semibold">3 Core Pillars</span>',
    'activities.subtitle': 'Three ways to <span class="color-transition-2 font-semibold">accelerate your growth</span> with Kladriva.',
    'activities.strategic.title': 'AI Consulting',
    'activities.strategic.desc': 'Audit, roadmap and profitable use cases. We identify concrete AI opportunities for your business.',
    'activities.international.title': 'Mentoring',
    'activities.international.desc': '1:1 coaching, workshops and skill development. AI doesn\'t replace humans, it enhances them.',
    'activities.organizational.title': 'Custom Solutions',
    'activities.organizational.desc': 'Unique tech solutions, delivered fast. Active listening → design → delivery → follow-up.',
    'activities.innovation.title': 'Web & AI Development',
    'activities.innovation.desc': 'Custom websites, applications and AI integrations. Automation and intelligent workflows.',
    'activities.risk.title': 'API Integration',
    'activities.risk.desc': 'Connect your tools and automate your processes. Unique solutions, no "one-size-fits-all".',
    'activities.performance.title': 'Lean Methodology',
    'activities.performance.desc': 'Agile and iterative approach. Fast delivery and continuous validation.',
    'activities.learnMore': 'Learn More',
    'activities.cta.title': 'Ready to Accelerate Your Growth?',
    'activities.cta.subtitle': 'Let\'s discuss how our AI solutions can transform your business in weeks, not quarters.',
    'activities.cta.button': 'Request Free Audit',
    
    // Core Values
    'values.title': 'Our Core Values',
    'values.subtitle': 'These principles guide every decision and every relationship. They are the foundation of our success and the promise we make to our clients.',
    'values.excellence.title': 'Pragmatism',
    'values.excellence.desc': 'We prioritize concrete and measurable solutions. Every recommendation must have an immediate business impact.',
    'values.integrity.title': 'Speed',
    'values.integrity.desc': 'Delivery in weeks, not quarters. We accelerate your growth without compromising quality.',
    'values.innovation.title': 'Transparency',
    'values.innovation.desc': 'Clear communication about processes, timelines and results. No surprises, only solutions.',
    'values.quality.title': 'Passion',
    'values.quality.desc': 'We are passionate about AI and its transformative potential. This energy is transmitted in every project.',
    'values.collaboration.title': '360° Approach',
    'values.collaboration.desc': 'We consider all aspects: technical, human, financial and cultural. Holistic vision of problem-solving.',
    'values.global.title': 'Measurable Results',
    'values.global.desc': 'Every solution must prove its value. We define clear KPIs and track business impact.',
    'values.quote': 'Our values are not words on a page—they are the living principles that guide our daily actions and define our commitment to accelerating your growth.',
    'values.attribution': 'Kladriva Team',
    
    // About
    'about.title': 'About Kladriva',
    'about.subtitle': 'We specialize in AI, mentoring and custom solutions to accelerate your business growth.',
    'about.description': 'Kladriva was born from a simple vision: to make AI a human and sustainable growth accelerator. We combine technical expertise, human coaching and lean methodology to deliver measurable results in weeks.',
    'about.highlights.founded': 'Founded with the vision of democratizing AI for SMEs and startups',
    'about.highlights.team': 'Team of AI, development and business experts with diverse backgrounds',
    'about.highlights.methods': 'Proprietary methodologies for fast delivery and continuous validation',
    'about.highlights.partnerships': 'Partnerships with technology leaders and training institutions',
    'about.highlights.commitment': 'Commitment to continuous innovation and operational excellence',
    'about.cta': 'Learn More About Us',
    'about.stats.clients': 'Projects Delivered',
    'about.stats.countries': 'Countries',
    'about.stats.success': 'Satisfaction Rate',
    'about.stats.experience': 'Years of Experience',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To make AI a human and sustainable growth accelerator, accessible to all companies, regardless of their size.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'Adopt a 360° approach to problem-solving (technical, human, financial, cultural) to transform your business in weeks, not quarters.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to accelerate your growth? Let\'s discuss how our AI solutions can transform your business in weeks.',
    'contact.form.title': 'Request Free Audit',
    'contact.form.name': 'Full Name *',
    'contact.form.email': 'Email *',
    'contact.form.company': 'Company',
    'contact.form.message': 'Your project or need *',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.emailPlaceholder': 'Your professional email',
    'contact.form.companyPlaceholder': 'Your company name',
    'contact.form.messagePlaceholder': 'Describe your project or AI need',
    'contact.form.submit': 'Request free audit',
    'contact.form.success.title': 'Thank you!',
    'contact.form.success.message': 'Your request has been sent. We will respond within 24h to schedule your free audit.',
    'contact.info.title': 'Contact Information',
    'contact.info.subtitle': 'We are here to accelerate your growth. Contact us and our team will be happy to help you.',
    'contact.info.email': 'contact@kladriva.ca',
    'contact.info.phone': '+1 (438) 951-5008',
    'contact.info.office': 'Montreal, Quebec, Canada',
    'contact.response.title': 'Response Time',
    'contact.response.subtitle': 'We respond to all requests within 24 business hours.',
    'contact.response.hours': 'Hours: Monday - Friday, 9:00 AM - 6:00 PM EST',
    'contact.response.emergency': 'Emergency audits: Available 24/7 for existing clients',
    
    // Footer
    'footer.company.description': 'We help companies achieve measurable results in weeks, not quarters, through AI consulting, mentoring and custom solutions.',
    'footer.links.company': 'Company',
    'footer.links.services': 'Services',
    'footer.links.resources': 'Resources',
    'footer.newsletter.title': 'Stay Informed About Our AI Insights',
    'footer.newsletter.subtitle': 'Subscribe to our newsletter for the latest AI trends, case studies and growth strategies.',
    'footer.newsletter.placeholder': 'Your professional email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.copyright': 'All rights reserved.',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.twitter': 'Twitter',
    'footer.social.facebook': 'Facebook'
  },
  fr: {
    // Header
    'nav.activities': 'Activités Principales',
    'nav.values': 'Valeurs Fondamentales',
    'nav.about': 'À Propos',
    'nav.insights': 'Perspectives',
    'nav.contact': 'Contact',
    'header.getStarted': 'Commencer',
    
    // Hero
    'hero.badge': 'Solutions IA pour la Croissance',
    'hero.headline': 'Kladriva – L\'IA qui accélère votre croissance.',
    'hero.subtitle': 'Nous aidons les entreprises à obtenir des résultats mesurables en semaines, pas en trimestres, grâce au consulting IA, au mentoring et à des solutions sur mesure.',
    'hero.cta.primary': 'Parler à un expert',
    'hero.cta.secondary': 'Découvrir nos services',
    'hero.trust': '70% de réduction du time-to-start : de 6 mois à 10 jours',
    'hero.banner.option1.headline': 'Transformez l\'<span class="color-transition-1 font-semibold">IA</span> en <span class="color-transition-2 font-semibold">résultats</span>, plus <span class="color-transition-3 font-semibold">rapidement</span>.',
    'hero.banner.option1.subtitle': 'Kladriva vous aide à débloquer la <span class="color-transition-1 font-semibold">croissance</span> avec l\'IA, le mentoring et des services sur mesure — livrant un <span class="color-transition-4 font-semibold">impact mesurable</span> en semaines, pas en mois.',
    'hero.banner.option2.headline': 'L\'IA qui travaille pour les gens, pas l\'inverse.',
    'hero.banner.option2.subtitle': 'Chez Kladriva, nous combinons technologie, mentoring et perspicacité humaine pour créer des solutions qui stimulent une vraie croissance business.',
    'hero.banner.option3.headline': 'De la vision à l\'exécution — à la vitesse de Kladriva.',
    'hero.banner.option3.subtitle': 'Nous vous guidons avec le consulting IA, le mentoring et des services sur mesure pour transformer vos idées en succès tangible.',
    'hero.banner.option4.headline': 'Votre croissance mérite plus que des promesses — elle a besoin de résultats.',
    'hero.banner.option4.subtitle': 'Kladriva livre des stratégies pilotées par l\'IA, du mentoring et des solutions sur mesure qui accélèrent votre impact business.',
    
    // Core Activities
    'activities.title': 'Nos <span class="color-transition-1 font-semibold">3 Piliers Kladriva</span>',
    'activities.subtitle': 'Trois manières d\'<span class="color-transition-2 font-semibold">accélérer votre croissance</span> avec Kladriva.',
    'activities.strategic.title': 'Consulting IA',
    'activities.strategic.desc': 'Audit, roadmap et cas d\'usage rentables. Nous identifions les opportunités IA concrètes pour votre business.',
    'activities.international.title': 'Mentoring',
    'activities.international.desc': 'Accompagnement 1:1, ateliers et montée en compétences. L\'IA ne remplace pas l\'humain, elle l\'augmente.',
    'activities.organizational.title': 'Prestations sur Mesure',
    'activities.organizational.desc': 'Solutions tech uniques, livrées vite. Écoute active → conception → livraison → suivi.',
    'activities.innovation.title': 'Développement Web & IA',
    'activities.innovation.desc': 'Sites, applications et intégrations IA sur mesure. Automatisation et workflows intelligents.',
    'activities.risk.title': 'Intégration API',
    'activities.risk.desc': 'Connectez vos outils et automatisez vos processus. Solutions uniques, pas de "one-size-fits-all".',
    'activities.performance.title': 'Méthodologie Lean',
    'activities.performance.desc': 'Approche agile et itérative. Livraison rapide et validation continue.',
    'activities.learnMore': 'En savoir plus',
    'activities.cta.title': 'Prêt à Accélérer Votre Croissance ?',
    'activities.cta.subtitle': 'Discutons de la façon dont nos solutions IA peuvent transformer votre business en semaines, pas en trimestres.',
    'activities.cta.button': 'Demander un audit gratuit',
    
    // Core Values
    'values.title': 'Nos Valeurs Fondamentales',
    'values.subtitle': 'Ces principes guident chaque décision et chaque relation. Ils sont le fondement de notre succès et la promesse que nous faisons à nos clients.',
    'values.excellence.title': 'Pragmatisme',
    'values.excellence.desc': 'Nous privilégions les solutions concrètes et mesurables. Chaque recommandation doit avoir un impact business immédiat.',
    'values.integrity.title': 'Rapidité',
    'values.integrity.desc': 'Livraison en semaines, pas en trimestres. Nous accélérons votre croissance sans compromettre la qualité.',
    'values.innovation.title': 'Transparence',
    'values.innovation.desc': 'Communication claire sur les processus, les délais et les résultats. Pas de surprise, que des solutions.',
    'values.quality.title': 'Passion',
    'values.quality.desc': 'Nous sommes passionnés par l\'IA et son potentiel transformateur. Cette énergie se transmet dans chaque projet.',
    'values.collaboration.title': 'Approche 360°',
    'values.collaboration.desc': 'Nous considérons tous les aspects : technique, humain, financier et culturel. Vision holistique du problem-solving.',
    'values.global.title': 'Résultats Mesurables',
    'values.global.desc': 'Chaque solution doit prouver sa valeur. Nous définissons des KPIs clairs et suivons l\'impact business.',
    'values.quote': 'Nos valeurs ne sont pas des mots sur une page—ce sont les principes vivants qui guident nos actions quotidiennes et définissent notre engagement à accélérer votre croissance.',
    'values.attribution': 'Équipe Kladriva',
    
    // About
    'about.title': 'À Propos de Kladriva',
    'about.subtitle': 'Nous sommes spécialisés en IA, mentoring et solutions sur mesure pour accélérer votre croissance business.',
    'about.description': 'Kladriva est née d\'une vision simple : faire de l\'IA un accélérateur de croissance humaine et durable. Nous combinons expertise technique, accompagnement humain et méthodologie lean pour livrer des résultats mesurables en semaines.',
    'about.highlights.founded': 'Fondé avec la vision de démocratiser l\'IA pour les PME et startups',
    'about.highlights.team': 'Équipe d\'experts en IA, développement et business avec parcours diversifiés',
    'about.highlights.methods': 'Méthodologies propriétaires de livraison rapide et validation continue',
    'about.highlights.partnerships': 'Partenariats avec leaders technologiques et institutions de formation',
    'about.highlights.commitment': 'Engagement envers l\'innovation continue et l\'excellence opérationnelle',
    'about.cta': 'En Savoir Plus Sur Nous',
    'about.stats.clients': 'Projets Livrés',
    'about.stats.countries': 'Pays',
    'about.stats.success': 'Taux de Satisfaction',
    'about.stats.experience': 'Années d\'Expérience',
    'about.vision.title': 'Notre Vision',
    'about.vision.desc': 'Faire de l\'IA un accélérateur de croissance humaine et durable, accessible à toutes les entreprises, quelle que soit leur taille.',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Adopter une approche 360° du problem-solving (technique, humain, financier, culturel) pour transformer votre business en semaines, pas en trimestres.',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Prêt à accélérer votre croissance ? Discutons de la façon dont nos solutions IA peuvent transformer votre business en semaines.',
    'contact.form.title': 'Demander un Audit Gratuit',
    'contact.form.name': 'Nom Complet *',
    'contact.form.email': 'Email *',
    'contact.form.company': 'Entreprise',
    'contact.form.message': 'Votre projet ou besoin *',
    'contact.form.namePlaceholder': 'Votre nom complet',
    'contact.form.emailPlaceholder': 'Votre email professionnel',
    'contact.form.companyPlaceholder': 'Nom de votre entreprise',
    'contact.form.messagePlaceholder': 'Décrivez votre projet ou votre besoin en IA',
    'contact.form.submit': 'Demander un audit gratuit',
    'contact.form.success.title': 'Merci !',
    'contact.form.success.message': 'Votre demande a été envoyée. Nous vous répondrons dans les 24h pour planifier votre audit gratuit.',
    'contact.info.title': 'Informations de Contact',
    'contact.info.subtitle': 'Nous sommes là pour accélérer votre croissance. Contactez-nous et notre équipe sera ravie de vous accompagner.',
    'contact.info.email': 'contact@kladriva.ca',
    'contact.info.phone': '+1 (438) 951-5008',
    'contact.info.office': 'Montréal, Québec, Canada',
    'contact.response.title': 'Temps de Réponse',
    'contact.response.subtitle': 'Nous répondons à toutes les demandes dans les 24h ouvrables.',
    'contact.response.hours': 'Horaires : Lundi - Vendredi, 9h00 - 18h00 HNE',
    'contact.response.emergency': 'Audits d\'urgence : Disponible 24h/24 pour clients existants',
    
    // Footer
    'footer.company.description': 'Nous aidons les entreprises à obtenir des résultats mesurables en semaines, pas en trimestres, grâce au consulting IA, au mentoring et à des solutions sur mesure.',
    'footer.links.company': 'Entreprise',
    'footer.links.services': 'Services',
    'footer.links.resources': 'Ressources',
    'footer.newsletter.title': 'Restez Informé de Nos Insights IA',
    'footer.newsletter.subtitle': 'Abonnez-vous à notre newsletter pour les dernières tendances IA, études de cas et stratégies de croissance.',
    'footer.newsletter.placeholder': 'Votre email professionnel',
    'footer.newsletter.subscribe': 'S\'abonner',
    'footer.copyright': 'Tous droits réservés.',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.twitter': 'Twitter',
    'footer.social.facebook': 'Facebook'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('kladriva-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('kladriva-language', newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
