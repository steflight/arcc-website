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
    'hero.badge': 'Solutions IA pour la Croissance',
    'hero.headline': 'Transformez votre business avec l\'IA en 10 jours, pas en 6 mois.',
    'hero.subtitle': 'Kladriva combine consulting IA, mentoring et développement sur mesure pour accélérer votre croissance. Nous livrons des résultats concrets, pas des promesses.',
    'hero.cta.primary': 'Audit gratuit en 24h',
    'hero.cta.secondary': 'Voir nos réalisations',
    'hero.trust': '70% de réduction du time-to-start : de 6 mois à 10 jours',
    
    // Core Activities
    'activities.title': 'Nos 3 Piliers Kladriva',
    'activities.subtitle': 'Trois manières d\'accélérer votre croissance avec Kladriva.',
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
    'contact.info.phone': '+1 (514) 555-0123',
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
    
    // Core Activities
    'activities.title': 'Nos 3 Piliers Kladriva',
    'activities.subtitle': 'Trois manières d\'accélérer votre croissance avec Kladriva.',
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
    'contact.info.phone': '+1 (514) 555-0123',
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
