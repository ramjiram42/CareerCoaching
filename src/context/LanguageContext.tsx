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
  'VACANCIES': {
    EN: 'Vacancies',
    DE: 'Vakanzen',
    FR: 'Vacances',
    ES: 'Vacantes',
    IT: 'Posti vacanti'
  },
  'GIGS': {
    EN: 'Gigs',
    DE: 'Gigs',
    FR: 'Missions',
    ES: 'Proyectos',
    IT: 'Missioni'
  },
  'MENTORS': {
    EN: 'Mentors',
    DE: 'Mentoren',
    FR: 'Mentors',
    ES: 'Mentores',
    IT: 'Mentor'
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
