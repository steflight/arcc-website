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
    'nav.services': 'Our Services',
    'nav.values': 'Our Values',
    'nav.about': 'About ARCC',
    'nav.directory': 'Skills Directory',
    'nav.contact': 'Contact',
    'header.joinUs': 'Join ARCC',

    // Hero
    'hero.badge': 'Cameroonian Community in Canada',
    'hero.headline': 'United <span style="color: #ffb224; font-weight: 600;">We Stand</span>, Together <span style="color: #ffb224; font-weight: 600;">We Thrive</span>.',
    'hero.subtitle': 'ARCC brings together <span style="color: #ffb224; font-weight: 600;">Cameroonians</span> in Canada to support, guide, and empower each other through community, mentorship, and shared resources.',
    'hero.cta.primary': 'Join Our Community',
    'hero.cta.secondary': 'Get Support',
    'hero.trust': 'Over 500+ Cameroonians supported since 2020',
    'hero.banner.option1.headline': 'United <span style="color: #ffb224; font-weight: 600;">We Stand</span>, Together <span style="color: #ffb224; font-weight: 600;">We Thrive</span>.',
    'hero.banner.option1.subtitle': 'ARCC brings together <span style="color: #ffb224; font-weight: 600;">Cameroonians</span> in Canada to support, guide, and empower each other through <span class="color-transition-4 font-semibold">community</span> and shared resources.',
    'hero.banner.option2.headline': 'Your Success is Our Community\'s Success.',
    'hero.banner.option2.subtitle': 'At ARCC, we believe in the power of community. We provide guidance, support, and resources to help every Cameroonian thrive in Canada.',
    'hero.banner.option3.headline': 'From Arrival to Achievement — Together.',
    'hero.banner.option3.subtitle': 'We guide newcomers through settlement, provide mentorship, and create opportunities for professional and personal growth.',
    'hero.banner.option4.headline': 'Building Bridges, Creating Opportunities.',
    'hero.banner.option4.subtitle': 'ARCC connects Cameroonians with expertise, resources, and opportunities to overcome challenges and achieve their Canadian dreams.',

    // Services
    'services.title': 'Our <span class="color-transition-1 font-semibold">Core Services</span>',
    'services.subtitle': 'How we <span class="color-transition-2 font-semibold">support</span> and <span class="color-transition-3 font-semibold">empower</span> our community.',
    'services.settlement.title': 'Newcomer Settlement',
    'services.settlement.desc': 'Comprehensive support for new arrivals: housing assistance, job search guidance, and integration into Canadian society.',
    'services.legal.title': 'Legal Support',
    'services.legal.desc': 'Expert assistance with immigration issues, deportation risks, and legal challenges. We connect you with qualified professionals.',
    'services.mentorship.title': 'Mentorship Program',
    'services.mentorship.desc': 'One-on-one guidance from experienced Cameroonians who have successfully navigated life in Canada.',
    'services.networking.title': 'Professional Networking',
    'services.networking.desc': 'Connect with professionals in your field, discover job opportunities, and build meaningful career relationships.',
    'services.crisis.title': 'Crisis Intervention',
    'services.crisis.desc': 'Immediate support during difficult times: financial hardship, family emergencies, and mental health challenges.',
    'services.skills.title': 'Skills Directory',
    'services.skills.desc': 'Access our network of skilled professionals ready to help with specific challenges and opportunities.',
    'services.learnMore': 'Learn More',
    'services.cta.title': 'Need Support? We\'re Here to Help',
    'services.cta.subtitle': 'Whether you\'re new to Canada or facing challenges, our community is ready to support you.',
    'services.cta.button': 'Get Support Now',

    // Core Values
    'values.title': 'Our Core Values',
    'values.subtitle': 'These principles guide every decision and every relationship. They are the foundation of our community and the promise we make to each other.',
    'values.excellence.title': 'Unity',
    'values.excellence.desc': 'We believe in the strength of community. Together, we can overcome any challenge and achieve greater success.',
    'values.integrity.title': 'Support',
    'values.integrity.desc': 'We provide unwavering support to our members, especially during difficult times and transitions.',
    'values.innovation.title': 'Excellence',
    'values.innovation.desc': 'We strive for excellence in everything we do, setting high standards for ourselves and our community.',
    'values.quality.title': 'Empowerment',
    'values.quality.desc': 'We empower each other through knowledge sharing, mentorship, and creating opportunities for growth.',
    'values.collaboration.title': 'Cultural Pride',
    'values.collaboration.desc': 'We celebrate our Cameroonian heritage while embracing Canadian values and opportunities.',
    'values.global.title': 'Service',
    'values.global.desc': 'We are committed to serving our community with dedication, compassion, and professionalism.',
    'values.quote': 'Our values are not just words—they are the living principles that guide our daily actions and define our commitment to building a stronger Cameroonian community in Canada.',
    'values.attribution': 'ARCC Community',

    // About
    'about.title': 'About ARCC',
    'about.subtitle': 'We are a community-driven organization dedicated to supporting Cameroonians in Canada.',
    'about.description': 'ARCC was founded with a simple yet powerful vision: to unite Cameroonians in Canada and provide the support, guidance, and resources needed to thrive in our new home. We believe that together, we are stronger.',
    'about.highlights.founded': 'Founded in 2020 by Cameroonian professionals who understood the challenges of settling in Canada',
    'about.highlights.team': 'Diverse team of volunteers from various professional backgrounds and regions of Cameroon',
    'about.highlights.methods': 'Proven methodologies for newcomer settlement and community integration',
    'about.highlights.partnerships': 'Partnerships with settlement agencies, legal professionals, and community organizations',
    'about.highlights.commitment': 'Commitment to continuous community building and member support',
    'about.cta': 'Join Our Community',
    'about.stats.members': 'Active Members',
    'about.stats.provinces': 'Provinces',
    'about.stats.success': 'Success Rate',
    'about.stats.experience': 'Years of Service',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To create a thriving, united Cameroonian community in Canada where every member can achieve their full potential.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide comprehensive support, guidance, and resources to Cameroonians in Canada, fostering unity, success, and cultural pride.',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Need support or want to join our community? We\'re here to help and welcome you with open arms.',
    'contact.form.title': 'Request Support',
    'contact.form.name': 'Full Name *',
    'contact.form.email': 'Email *',
    'contact.form.company': 'Profession/Field',
    'contact.form.message': 'How can we help? *',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.emailPlaceholder': 'Your email address',
    'contact.form.companyPlaceholder': 'Your profession or field of work',
    'contact.form.messagePlaceholder': 'Describe how we can support you',
    'contact.form.submit': 'Send Request',
    'contact.form.success.title': 'Thank you!',
    'contact.form.success.message': 'Your request has been received. We will respond within 24 hours to provide the support you need.',
    'contact.info.title': 'Contact Information',
    'contact.info.subtitle': 'We are here to support you. Reach out to us and our community will be happy to help.',
    'contact.info.email': 'info@camercanada.com',
    'contact.info.phone': '+1 (514) 555-0123',
    'contact.info.office': 'Montreal, Quebec, Canada',
    'contact.response.title': 'Response Time',
    'contact.response.subtitle': 'We respond to all requests within 24 hours.',
    'contact.response.hours': 'Hours: Monday - Friday, 9:00 AM - 6:00 PM EST',
    'contact.response.emergency': 'Emergency support: Available 24/7 for urgent situations',

    // Footer
    'footer.company.description': 'We unite Cameroonians in Canada through community support, mentorship, and shared resources to help everyone thrive.',
    'footer.links.company': 'Organization',
    'footer.links.services': 'Services',
    'footer.links.resources': 'Resources',
    'footer.newsletter.title': 'Stay Connected with ARCC',
    'footer.newsletter.subtitle': 'Subscribe to our newsletter for community updates, events, and opportunities.',
    'footer.newsletter.placeholder': 'Your email address',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.copyright': 'All rights reserved.',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.twitter': 'Twitter',
    'footer.social.facebook': 'Facebook',
  },
  fr: {
    // Header
    'nav.services': 'Nos Services',
    'nav.values': 'Nos Valeurs',
    'nav.about': 'À Propos ARCC',
    'nav.directory': 'Répertoire des Compétences',
    'nav.contact': 'Contact',
    'header.joinUs': 'Rejoindre ARCC',

    // Hero
    'hero.badge': 'Communauté Camerounaise au Canada',
    'hero.headline': 'Unis <span style="color: #ffb224; font-weight: 600;">Nous Sommes</span> Plus Forts, Ensemble Nous <span style="color: #ffb224; font-weight: 600;">Réussissons</span>.',
    'hero.subtitle': 'ARCC rassemble les <span style="color: #ffb224; font-weight: 600;">Camerounais</span> au Canada pour se soutenir, se guider et s\'autonomiser mutuellement grâce à la communauté, au mentorat et aux ressources partagées.',
    'hero.cta.primary': 'Rejoindre Notre Communauté',
    'hero.cta.secondary': 'Obtenir de l\'Aide',
    'hero.trust': 'Plus de 500+ Camerounais soutenus depuis 2020',
    'hero.banner.option1.headline': 'Unis <span style="color: #ffb224; font-weight: 600;">Nous Sommes</span> Plus Forts, Ensemble Nous <span style="color: #ffb224; font-weight: 600;">Réussissons</span>.',
    'hero.banner.option1.subtitle': 'ARCC rassemble les <span style="color: #ffb224; font-weight: 600;">Camerounais</span> au Canada pour se soutenir, se guider et s\'autonomiser mutuellement grâce à la <span class="color-transition-4 font-semibold">communauté</span> et aux ressources partagées.',
    'hero.banner.option2.headline': 'Votre Succès est le Succès de Notre Communauté.',
    'hero.banner.option2.subtitle': 'Chez ARCC, nous croyons en la force de la communauté. Nous offrons orientation, soutien et ressources pour aider chaque Camerounais à s\'épanouir au Canada.',
    'hero.banner.option3.headline': 'De l\'Arrivée à la Réussite — Ensemble.',
    'hero.banner.option3.subtitle': 'Nous guidons les nouveaux arrivants dans leur établissement, offrons du mentorat et créons des opportunités de croissance professionnelle et personnelle.',
    'hero.banner.option4.headline': 'Construire des Ponts, Créer des Opportunités.',
    'hero.banner.option4.subtitle': 'ARCC connecte les Camerounais avec l\'expertise, les ressources et les opportunités pour surmonter les défis et réaliser leurs rêves canadiens.',

    // Services
    'services.title': 'Nos <span class="color-transition-1 font-semibold">Services Principaux</span>',
    'services.subtitle': 'Comment nous <span class="color-transition-2 font-semibold">soutenons</span> et <span class="color-transition-3 font-semibold">autonomisons</span> notre communauté.',
    'services.settlement.title': 'Établissement des Nouveaux Arrivants',
    'services.settlement.desc': 'Soutien complet pour les nouveaux arrivants : aide au logement, orientation professionnelle et intégration dans la société canadienne.',
    'services.legal.title': 'Soutien Juridique',
    'services.legal.desc': 'Assistance experte pour les questions d\'immigration, risques d\'expulsion et défis juridiques. Nous vous connectons avec des professionnels qualifiés.',
    'services.mentorship.title': 'Programme de Mentorat',
    'services.mentorship.desc': 'Guidance individuelle de Camerounais expérimentés qui ont réussi à naviguer la vie au Canada.',
    'services.networking.title': 'Réseautage Professionnel',
    'services.networking.desc': 'Connectez-vous avec des professionnels de votre domaine, découvrez des opportunités d\'emploi et construisez des relations de carrière significatives.',
    'services.crisis.title': 'Intervention de Crise',
    'services.crisis.desc': 'Soutien immédiat en période difficile : difficultés financières, urgences familiales et défis de santé mentale.',
    'services.skills.title': 'Répertoire des Compétences',
    'services.skills.desc': 'Accédez à notre réseau de professionnels qualifiés prêts à aider avec des défis et opportunités spécifiques.',
    'services.learnMore': 'En Savoir Plus',
    'services.cta.title': 'Besoin d\'Aide ? Nous Sommes Là',
    'services.cta.subtitle': 'Que vous soyez nouveau au Canada ou que vous fassiez face à des défis, notre communauté est prête à vous soutenir.',
    'services.cta.button': 'Obtenir de l\'Aide',

    // Core Values
    'values.title': 'Nos Valeurs Fondamentales',
    'values.subtitle': 'Ces principes guident chaque décision et chaque relation. Ils sont le fondement de notre communauté et la promesse que nous nous faisons mutuellement.',
    'values.excellence.title': 'Unité',
    'values.excellence.desc': 'Nous croyons en la force de la communauté. Ensemble, nous pouvons surmonter tout défi et atteindre un plus grand succès.',
    'values.integrity.title': 'Soutien',
    'values.integrity.desc': 'Nous offrons un soutien inébranlable à nos membres, surtout en période difficile et de transition.',
    'values.innovation.title': 'Excellence',
    'values.innovation.desc': 'Nous visons l\'excellence dans tout ce que nous faisons, établissant des standards élevés pour nous-mêmes et notre communauté.',
    'values.quality.title': 'Autonomisation',
    'values.quality.desc': 'Nous nous autonomisons mutuellement par le partage de connaissances, le mentorat et la création d\'opportunités de croissance.',
    'values.collaboration.title': 'Fierté Culturelle',
    'values.collaboration.desc': 'Nous célébrons notre héritage camerounais tout en embrassant les valeurs et opportunités canadiennes.',
    'values.global.title': 'Service',
    'values.global.desc': 'Nous nous engageons à servir notre communauté avec dévouement, compassion et professionnalisme.',
    'values.quote': 'Nos valeurs ne sont pas que des mots—ce sont les principes vivants qui guident nos actions quotidiennes et définissent notre engagement à construire une communauté camerounaise plus forte au Canada.',
    'values.attribution': 'Communauté ARCC',

    // About
    'about.title': 'À Propos d\'ARCC',
    'about.subtitle': 'Nous sommes une organisation communautaire dédiée à soutenir les Camerounais au Canada.',
    'about.description': 'ARCC a été fondée avec une vision simple mais puissante : unir les Camerounais au Canada et fournir le soutien, l\'orientation et les ressources nécessaires pour s\'épanouir dans notre nouveau foyer. Nous croyons qu\'ensemble, nous sommes plus forts.',
    'about.highlights.founded': 'Fondée en 2020 par des professionnels camerounais qui comprenaient les défis de l\'établissement au Canada',
    'about.highlights.team': 'Équipe diversifiée de bénévoles de divers milieux professionnels et régions du Cameroun',
    'about.highlights.methods': 'Méthodologies éprouvées pour l\'établissement des nouveaux arrivants et l\'intégration communautaire',
    'about.highlights.partnerships': 'Partenariats avec des agences d\'établissement, des professionnels juridiques et des organisations communautaires',
    'about.highlights.commitment': 'Engagement envers la construction communautaire continue et le soutien aux membres',
    'about.cta': 'Rejoindre Notre Communauté',
    'about.stats.members': 'Membres Actifs',
    'about.stats.provinces': 'Provinces',
    'about.stats.success': 'Taux de Réussite',
    'about.stats.experience': 'Années de Service',
    'about.vision.title': 'Notre Vision',
    'about.vision.desc': 'Créer une communauté camerounaise prospère et unie au Canada où chaque membre peut atteindre son plein potentiel.',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Fournir un soutien complet, une orientation et des ressources aux Camerounais au Canada, favorisant l\'unité, le succès et la fierté culturelle.',

    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Besoin de soutien ou envie de rejoindre notre communauté ? Nous sommes là pour vous aider et vous accueillir à bras ouverts.',
    'contact.form.title': 'Demander du Soutien',
    'contact.form.name': 'Nom Complet *',
    'contact.form.email': 'Email *',
    'contact.form.company': 'Profession/Domaine',
    'contact.form.message': 'Comment pouvons-nous vous aider ? *',
    'contact.form.namePlaceholder': 'Votre nom complet',
    'contact.form.emailPlaceholder': 'Votre adresse email',
    'contact.form.companyPlaceholder': 'Votre profession ou domaine de travail',
    'contact.form.messagePlaceholder': 'Décrivez comment nous pouvons vous soutenir',
    'contact.form.submit': 'Envoyer la Demande',
    'contact.form.success.title': 'Merci !',
    'contact.form.success.message': 'Votre demande a été reçue. Nous vous répondrons dans les 24 heures pour vous fournir le soutien dont vous avez besoin.',
    'contact.info.title': 'Informations de Contact',
    'contact.info.subtitle': 'Nous sommes là pour vous soutenir. Contactez-nous et notre communauté sera ravie de vous aider.',
    'contact.info.email': 'info@camercanada.com',
    'contact.info.phone': '+1 (514) 555-0123',
    'contact.info.office': 'Montréal, Québec, Canada',
    'contact.response.title': 'Temps de Réponse',
    'contact.response.subtitle': 'Nous répondons à toutes les demandes dans les 24 heures.',
    'contact.response.hours': 'Heures : Lundi - Vendredi, 9h00 - 18h00 HNE',
    'contact.response.emergency': 'Soutien d\'urgence : Disponible 24h/24 pour les situations urgentes',

    // Footer
    'footer.company.description': 'Nous unissons les Camerounais au Canada par le soutien communautaire, le mentorat et les ressources partagées pour aider tout le monde à s\'épanouir.',
    'footer.links.company': 'Organisation',
    'footer.links.services': 'Services',
    'footer.links.resources': 'Ressources',
    'footer.newsletter.title': 'Restez Connecté avec ARCC',
    'footer.newsletter.subtitle': 'Abonnez-vous à notre newsletter pour les mises à jour communautaires, événements et opportunités.',
    'footer.newsletter.placeholder': 'Votre adresse email',
    'footer.newsletter.subscribe': 'S\'abonner',
    'footer.copyright': 'Tous droits réservés.',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.twitter': 'Twitter',
    'footer.social.facebook': 'Facebook'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arcc-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('arcc-language', newLanguage)
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
