'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'DE' | 'FR' | 'ES' | 'IT';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // NavBar
  'HOME': {
    EN: 'Home',
    DE: 'Startseite',
    FR: 'Accueil',
    ES: 'Inicio',
    IT: 'Home'
  },
  'JOURNEY': {
    EN: 'Journey',
    DE: 'Reise',
    FR: 'Parcours',
    ES: 'Trayecto',
    IT: 'Percorso'
  },
  'JOURNEYS': {
    EN: 'Journeys',
    DE: 'Reisen',
    FR: 'Parcours',
    ES: 'Trayectos',
    IT: 'Percorsi'
  },
  'OPPORTUNITIES': {
    EN: 'Opportunities',
    DE: 'Möglichkeiten',
    FR: 'Opportunités',
    ES: 'Oportunidades',
    IT: 'Opportunità'
  },
  'HERTZ CAREERS': {
    EN: 'Hertz Careers',
    DE: 'Hertz-Karrieren',
    FR: 'Carrières Hertz',
    ES: 'Carreras en Hertz',
    IT: 'Carriere Hertz'
  },
  'MENTORS': {
    EN: 'Mentors',
    DE: 'Mentoren',
    FR: 'Mentors',
    ES: 'Mentores',
    IT: 'Mentor'
  },
  'LEARN': {
    EN: 'Learn',
    DE: 'Lernen',
    FR: 'Apprendre',
    ES: 'Aprender',
    IT: 'Impara'
  },
  'LEARN+': {
    EN: 'Learn+',
    DE: 'Lernen+',
    FR: 'Apprendre+',
    ES: 'Aprender+',
    IT: 'Impara+'
  },
  'MENTORSHIP': {
    EN: 'Mentorship',
    DE: 'Mentoring',
    FR: 'Mentorat',
    ES: 'Mentoría',
    IT: 'Mentorship'
  },
  'NETWORK': {
    EN: 'Network',
    DE: 'Netzwerk',
    FR: 'Réseau',
    ES: 'Red',
    IT: 'Rete'
  },
  'MILESTONES': {
    EN: 'Milestones',
    DE: 'Meilensteine',
    FR: 'Jalons',
    ES: 'Hitos',
    IT: 'Traguardi'
  },
  'MASTERY': {
    EN: 'Mastery',
    DE: 'Meisterschaft',
    FR: 'Maîtrise',
    ES: 'Maestría',
    IT: 'Maestria'
  },
  'MY_PLAN': {
    EN: 'My Development Plan',
    DE: 'Mein Entwicklungsplan',
    FR: 'Mon plan de développement',
    ES: 'Mi plan de desarrollo',
    IT: 'Il mio piano di sviluppo'
  },
  // AIProfileAnalyzer - Header
  'NAVIGATE_YOUR_NEXT_MOVE': {
    EN: 'NAVIGATE YOUR\nNEXT MOVE.',
    DE: 'NAVIGIEREN SIE IHREN\nNÄCHSTEN SCHRITT.',
    FR: 'NAVIGUEZ VOTRE\nPROCHAIN MOUVEMENT.',
    ES: 'NAVEGA TU\nPRÓXIMO MOVIMIENTO.',
    IT: 'NAVIGA IL TUO\nPROSSIMO MOVIMENTO.'
  },
  'UPLOAD_RESUME': {
    EN: 'UPLOAD RESUME',
    DE: 'LEBENSLAUF HOCHLADEN',
    FR: 'TÉLÉCHARGER LE CV',
    ES: 'SUBIR CURRÍCULUM',
    IT: 'CARICA CURRICULUM'
  },
  'REVALIDATE': {
    EN: 'REVALIDATE',
    DE: 'REVALIDIEREN',
    FR: 'REVALIDER',
    ES: 'REVALIDAR',
    IT: 'REVALIDA'
  },
  // AIProfileAnalyzer - Results
  'EXPLORE_FUTURE_MOVES': {
    EN: 'Explore Future Moves',
    DE: 'Zukünftige Schritte erkunden',
    FR: 'Explorer les mouvements futurs',
    ES: 'Explorar futuros movimientos',
    IT: 'Esplora le mosse future'
  },
  'TECH_UPGRADE': {
    EN: 'TECH UPGRADE',
    DE: 'TECH-UPGRADE',
    FR: 'MISE À NIVEAU TECH',
    ES: 'MEJORA TECNOLÓGICA',
    IT: 'UPGRADE TECNOLOGICO'
  },
  'SUGGESTED_MOVES': {
    EN: 'Suggested Moves',
    DE: 'Vorgeschlagene Schritte',
    FR: 'Mouvements suggérés',
    ES: 'Movimientos sugeridos',
    IT: 'Mosse suggerite'
  },
  'SIMULATE_PATHWAY': {
    EN: 'Simulate Pathway',
    DE: 'Pfad simulieren',
    FR: 'Simuler le parcours',
    ES: 'Simular trayectoria',
    IT: 'Simula percorso'
  },
  'STRATEGIC_NODE': {
    EN: 'STRATEGIC NODE',
    DE: 'STRATEGISCHER KNOTEN',
    FR: 'NOEUD STRATÉGIQUE',
    ES: 'NODO ESTRATÉGICO',
    IT: 'NODO STRATEGICO'
  },
  'MAKE_A_NEW_JOURNEY': {
    EN: 'Make a new Journey',
    DE: 'Eine neue Reise erstellen',
    FR: 'Créer un nouveau parcours',
    ES: 'Crear una nueva trayectoria',
    IT: 'Crea un nuovo percorso'
  },
  'RE_ALIGN_PROFILE': {
    EN: 'RE-ALIGN PROFILE',
    DE: 'PROFIL NEU AUSRICHTEN',
    FR: 'RÉALIGNER LE PROFIL',
    ES: 'RE-ALINEAR PERFIL',
    IT: 'RIALLINEA PROFILO'
  },
  'HIGH_MATCH': {
    EN: 'BEST FIT',
    DE: 'BESTE PASSFORM',
    FR: 'MEILLEURE CORRESPONDANCE',
    ES: 'MEJOR OPCIÓN',
    IT: 'MIGLIORE SCELTA'
  },
  'BEST_FIT': {
    EN: 'HIGH MATCH',
    DE: 'IDEALER KANDIDAT',
    FR: 'MEILLEUR CHOIX',
    ES: 'MEJOR AJUSTE',
    IT: 'MIGLIORE CORRISPONDENZA'
  },
  'ADJACENT': {
    EN: 'POTENTIAL',
    DE: 'POTENZIAL',
    FR: 'POTENTIEL',
    ES: 'POTENCIAL',
    IT: 'POTENZIALE'
  },
  'WILD_CARD': {
    EN: 'NEW HORIZON',
    DE: 'NEUER HORIZONT',
    FR: 'NOUVEL HORIZON',
    ES: 'NUEVO HORIZONTE',
    IT: 'NUOVO ORIZZONTE'
  },
  'NEXT_STEP': {
    EN: 'NEXT STEP',
    DE: 'NÄCHSTER SCHRITT',
    FR: 'PROCHAINE ÉTAPE',
    ES: 'PRÓXIMO PASO',
    IT: 'PROSSIMO PASSO'
  },
  'EXPLORE': {
    EN: 'EXPLORE',
    DE: 'ERKUNDEN',
    FR: 'EXPLORER',
    ES: 'EXPLORAR',
    IT: 'ESPLORA'
  },
  'FULL_ROADMAP': {
    EN: 'FULL ROADMAP',
    DE: 'GESAMTE ROADMAP',
    FR: 'FEUILLE DE ROUTE COMPLÈTE',
    ES: 'MAPA COMPLETO',
    IT: 'ROADMAP COMPLETA'
  },
  'PROFILE': {
    EN: 'Profile',
    DE: 'Profil',
    FR: 'Profil',
    ES: 'Perfil',
    IT: 'Profilo'
  },
  'INSPIRATION': {
    EN: 'Inspiration for the day',
    DE: 'Inspiration für den Tag',
    FR: 'Inspiration du jour',
    ES: 'Inspiración del día',
    IT: 'Ispirazione del giorno'
  },
  'DRIVE_YOUR_CAREER_FORWARD': {
    EN: 'DRIVE YOUR\nCAREER FORWARD.',
    DE: 'BRINGEN SIE IHRE\nKARRIERE VORAN.',
    FR: 'PROPULSEZ VOTRE\nCARRIÈRE.',
    ES: 'IMPULSA TU\nCARRERA.',
    IT: 'GUIDA LA TUA\nCARRIERA.'
  },
  'EXPLORE_JOURNEYS': {
    EN: 'Explore Journeys',
    DE: 'Reisen erkunden',
    FR: 'Explorer les parcours',
    ES: 'Explorar trayectos',
    IT: 'Esplora i percorsi'
  },
<<<<<<< HEAD
  'VIEW_VACANCIES': {
    EN: 'View Vacancies',
    DE: 'Vakanzen ansehen',
    FR: 'Voir les postes vacants',
    ES: 'Ver vacantes',
    IT: 'Vedi le posizioni aperte'
=======
  'VIEW_HERTZ_CAREERS': {
    EN: 'View Hertz Careers',
    DE: 'Hertz-Karrieren ansehen',
    FR: 'Voir les carrières Hertz',
    ES: 'Ver carreras en Hertz',
    IT: 'Vedi carriere Hertz'
>>>>>>> 0ee8d5b4dc861dd89fed0b044a1a428de994dc79
  },
  'PROFILE_AWESOME': {
    EN: 'Your profile is looking awesome',
    DE: 'Dein Profil sieht fantastisch aus',
    FR: 'Votre profil a fière allure',
    ES: 'Tu perfil se ve increíble',
    IT: 'Il tuo profilo ha un aspetto fantastico'
  },
  'ELEVATE_POTENTIAL': {
    EN: 'Elevate your potential',
    DE: 'Steigere dein Potenzial',
    FR: 'Élevez votre potentiel',
    ES: 'Eleva tu potencial',
    IT: 'Eleva il tuo potenziale'
  },
  'EXPLORE_FUTURE': {
    EN: 'Explore Future with ',
    DE: 'Entdecke die Zukunft mit ',
    FR: 'Explorez l\'avenir avec ',
    ES: 'Explora el futuro con ',
    IT: 'Esplora il futuro con '
  },
  'HUB_DESCRIPTION': {
    EN: 'Welcome to your AI-powered career mobility hub. Discover tailored pathways for upskilling, reskilling, and internal job opportunities designed entirely around your potential.',
    DE: 'Willkommen in deinem KI-gestützten Career Mobility Hub. Entdecke maßgeschneiderte Wege für Upskilling, Reskilling und interne Jobmöglichkeiten, die ganz auf dein Potenzial abgestimmt sind.',
    FR: 'Bienvenue dans votre centre de mobilité professionnelle alimenté par l\'IA. Découvrez des parcours sur mesure pour le perfectionnement, la reconversion et les opportunités d\'emploi internes, entièrement conçus autour de votre potentiel.',
    ES: 'Bienvenido a tu centro de movilidad profesional impulsado por IA. Descubre vías personalizadas de mejora de capacidades, reciclaje profesional y oportunidades de empleo interno diseñadas enteramente en torno a tu potencial.',
    IT: 'Benvenuto nel tuo hub di mobilità professionale basato sull\'IA. Scopri percorsi su misura per l\'aggiornamento, la riqualificazione e le opportunità di lavoro interne, pensati interamente intorno al tuo potenziale.'
  },
  'JOURNEYS_DESC': {
    EN: 'Explore journeys and discover potential career paths.',
    DE: 'Erkunde Reisen und entdecke mögliche Karrierewege.',
    FR: 'Explorez des parcours et découvrez des cheminements de carrière potentiels.',
    ES: 'Explora trayectos y descubre posibles trayectorias profesionales.',
    IT: 'Esplora i percorsi e scopri potenziali percorsi di carriera.'
  },
  'SKILLS': {
    EN: 'SKILLS',
    DE: 'FÄHIGKEITEN',
    FR: 'COMPÉTENCES',
    ES: 'HABILIDADES',
    IT: 'COMPETENZE'
  },
  'SKILLS_DESC': {
    EN: 'Manage skills required for your role and career.',
    DE: 'Verwalte die für deine Rolle und Karriere erforderlichen Fähigkeiten.',
    FR: 'Gérez les compétences requises pour votre rôle et votre carrière.',
    ES: 'Gestiona las habilidades requeridas para tu puesto y carrera.',
    IT: 'Gestisci le competenze richieste per il tuo ruolo e la tua carriera.'
  },
<<<<<<< HEAD
  'GIGS_DESC': {
    EN: 'Explore gigs and projects to grow your talents.',
    DE: 'Erkunde Gigs und Projekte, um deine Talente zu fördern.',
    FR: 'Explorez des missions et des projets pour développer vos talents.',
    ES: 'Explora proyectos y tareas para desarrollar tus talentos.',
    IT: 'Esplora lavoretti e progetti per accrescere i tuoi talenti.'
  },
=======

>>>>>>> 0ee8d5b4dc861dd89fed0b044a1a428de994dc79
  'MENTORS_DESC': {
    EN: 'Discover mentors ready to guide your growth.',
    DE: 'Entdecke Mentoren, die bereit sind, dein Wachstum zu begleiten.',
    FR: 'Découvrez des mentors prêts à guider votre croissance.',
    ES: 'Descubre mentores dispuestos a guiar tu crecimiento.',
    IT: 'Scopri mentori pronti a guidare la tua crescita.'
  },
  'MILESTONES_DESC': {
    EN: 'Track your career milestones and achievements.',
    DE: 'Verfolge deine Meilensteine und Erfolge in der Karriere.',
    FR: 'Suivez les jalons et les réalisations de votre carrière.',
    ES: 'Sigue los hitos y logros de tu carrera.',
    IT: 'Tieni traccia dei traguardi e dei successi della tua carriera.'
  },
  'MASTERY_DESC': {
    EN: 'Develop mastery through curated learning paths.',
    DE: 'Entwickle Meisterschaft durch kuratierte Lernpfade.',
    FR: 'Développez la maîtrise grâce à des parcours d\'apprentissage organisés.',
    ES: 'Desarrolla el dominio a través de rutas de aprendizaje seleccionadas.',
    IT: 'Sviluppa la maestria attraverso percorsi di apprendimento curati.'
  },
  'PROFILE_DESC': {
    EN: 'Manage your professional identity and preferences.',
    DE: 'Verwalte deine berufliche Identität und Vorlieben.',
    FR: 'Gérez votre identité et vos préférences professionnelles.',
    ES: 'Gestiona tu identidad y preferencias profesionales.',
    IT: 'Gestisci la tua identità e le tue preferenze professionali.'
  },
<<<<<<< HEAD
  'VACANCIES_DESC': {
=======
  'HERTZ_CAREERS_DESC': {
>>>>>>> 0ee8d5b4dc861dd89fed0b044a1a428de994dc79
    EN: 'Explore open positions and new opportunities at Hertz.',
    DE: 'Entdecke offene Stellen und neue Möglichkeiten bei Hertz.',
    FR: 'Explorez les postes vacants et les nouvelles opportunités chez Hertz.',
    ES: 'Explora puestos vacantes y nuevas oportunidades en Hertz.',
    IT: 'Esplora posizioni aperte e nuove opportunità in Hertz.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('hertz_lang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hertz_lang', lang);
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]['EN'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
