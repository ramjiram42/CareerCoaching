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

  // Jobs Portal / Opportunities
  'STRATEGIC_RECRUITMENT_ECU': {
    EN: 'Strategic Recruitment ECU',
    DE: 'Strategische Personalbeschaffung ECU',
    FR: 'ECU de recrutement stratégique',
    ES: 'ECU de Reclutamiento Estratégico',
    IT: 'ECU di reclutamento strategico'
  },
  'UNIFIED': {
    EN: 'Unified',
    DE: 'Vereint',
    FR: 'Unifié',
    ES: 'Unificado',
    IT: 'Unificato'
  },
  'OPPORTUNITIES_GRADIENT': {
    EN: 'Opportunities',
    DE: 'Möglichkeiten',
    FR: 'Opportunités',
    ES: 'Oportunidades',
    IT: 'Opportunità'
  },
  'JOBS_HERO_DESC_1': {
    EN: 'Access ',
    DE: 'Zugriff auf ',
    FR: 'Accès à ',
    ES: 'Acceso a ',
    IT: 'Accesso a '
  },
  'JOBS_HERO_DESC_2': {
    EN: ' high-altitude vacancies precision-matched by Hertz Intelligence.',
    DE: ' hochrangige Vakanzen, präzisionsabgestimmt durch Hertz Intelligence.',
    FR: ' postes vacants de haut niveau adaptés avec précision par Hertz Intelligence.',
    ES: ' vacantes de alto nivel adaptadas con precisión por Hertz Intelligence.',
    IT: ' posizioni vacanti di alto livello abbinate con precisione da Hertz Intelligence.'
  },
  'ROLE_SEARCH': {
    EN: 'Role Search',
    DE: 'Rollensuche',
    FR: 'Recherche de rôle',
    ES: 'Búsqueda de puesto',
    IT: 'Ricerca ruolo'
  },
  'ROLE_SEARCH_PLACEHOLDER': {
    EN: 'Job title or keywords...',
    DE: 'Jobtitel oder Schlüsselwörter...',
    FR: 'Titre du poste ou mots-clés...',
    ES: 'Título del puesto o palabras clave...',
    IT: 'Titolo del lavoro o parole chiave...'
  },
  'LOCATION': {
    EN: 'Location',
    DE: 'Standort',
    FR: 'Emplacement',
    ES: 'Ubicación',
    IT: 'Posizione'
  },
  'LOCATION_PLACEHOLDER': {
    EN: 'City or remote...',
    DE: 'Stadt oder remote...',
    FR: 'Ville ou à distance...',
    ES: 'Ciudad o remoto...',
    IT: 'Città o remoto...'
  },
  'EXPLORE_ROLES': {
    EN: 'Explore Roles',
    DE: 'Rollen erkunden',
    FR: 'Explorer les rôles',
    ES: 'Explorar puestos',
    IT: 'Esplora i ruoli'
  },
  'PROFILE_INTELLIGENCE': {
    EN: 'Profile Intelligence',
    DE: 'Profil-Intelligenz',
    FR: 'Intelligence de profil',
    ES: 'Inteligencia de Perfil',
    IT: 'Intelligenza del profilo'
  },
  'PROFILE_INTELLIGENCE_DESC': {
    EN: 'Upload your resume to unlock AI-powered precision matching.',
    DE: 'Lade deinen Lebenslauf hoch, um das KI-gestützte Präzisions-Matching freizuschalten.',
    FR: 'Téléchargez votre CV pour débloquer la correspondance de précision alimentée par l\'IA.',
    ES: 'Sube tu currículum para desbloquear el emparejamiento de precisión impulsado por IA.',
    IT: 'Carica il tuo curriculum per sbloccare l\'abbinamento di precisione basato sull\'IA.'
  },
  'PROFILE_OPTIMIZED': {
    EN: 'Profile Optimized',
    DE: 'Profil optimiert',
    FR: 'Profil optimisé',
    ES: 'Perfil Optimizado',
    IT: 'Profilo ottimizzato'
  },
  'HERTZ_INTELLIGENCE_ACTIVE': {
    EN: 'Hertz Intelligence Active',
    DE: 'Hertz Intelligence aktiv',
    FR: 'Intelligence Hertz active',
    ES: 'Hertz Intelligence Activa',
    IT: 'Hertz Intelligence attiva'
  },
  'RESET_FILTER': {
    EN: 'Reset Filter',
    DE: 'Filter zurücksetzen',
    FR: 'Réinitialiser le filtre',
    ES: 'Restablecer filtro',
    IT: 'Reimposta filtro'
  },
  'QUICK_FILTERS': {
    EN: 'Quick Filters',
    DE: 'Schnellfilter',
    FR: 'Filtres rapides',
    ES: 'Filtros rápidos',
    IT: 'Filtri rapidi'
  },
  'LIVE_OPPORTUNITIES': {
    EN: 'Live Opportunities',
    DE: 'Live-Möglichkeiten',
    FR: 'Opportunités en direct',
    ES: 'Oportunidades en vivo',
    IT: 'Opportunità in diretta'
  },
  'PRECISION_MATCHES': {
    EN: 'Precision Matches for You',
    DE: 'Präzisionstreffer für dich',
    FR: 'Correspondances de précision pour vous',
    ES: 'Coincidencias de precisión para ti',
    IT: 'Abbinamenti di precisione per te'
  },
  'SORT_BY': {
    EN: 'Sort by:',
    DE: 'Sortieren nach:',
    FR: 'Trier par :',
    ES: 'Ordenar por:',
    IT: 'Ordina per:'
  },
  'NEWEST': {
    EN: 'Newest',
    DE: 'Neueste',
    FR: 'Plus récent',
    ES: 'Más reciente',
    IT: 'Più recente'
  },
  'SIMULATE_PATH': {
    EN: 'Simulate Path',
    DE: 'Pfad simulieren',
    FR: 'Simuler le parcours',
    ES: 'Simular Trayectoria',
    IT: 'Simula percorso'
  },
  'APPLY': {
    EN: 'Apply',
    DE: 'Bewerben',
    FR: 'Postuler',
    ES: 'Postularse',
    IT: 'Candidati'
  },
  'IMMEDIATE_START': {
    EN: 'Immediate Start',
    DE: 'Sofortiger Start',
    FR: 'Démarrage immédiat',
    ES: 'Inicio Inmediato',
    IT: 'Inizio immediato'
  },
  'MATCH_LABEL': {
    EN: 'Match',
    DE: 'Übereinstimmung',
    FR: 'Correspondance',
    ES: 'Coincidencia',
    IT: 'Corrispondenza'
  },

  // Dashboard
  'STRATEGIC_TALENT_DASHBOARD': {
    EN: 'Strategic Talent Dashboard',
    DE: 'Strategisches Talent-Dashboard',
    FR: 'Tableau de bord stratégique des talents',
    ES: 'Panel de Talento Estratégico',
    IT: 'Dashboard strategica dei talenti'
  },
  'WELCOME': {
    EN: 'Welcome',
    DE: 'Willkommen',
    FR: 'Bienvenue',
    ES: 'Bienvenido',
    IT: 'Benvenuto'
  },
  'DASHBOARD_DESC': {
    EN: 'Hertz Global operations analysis and path calibration.',
    DE: 'Analyse der globalen Hertz-Operationen und Pfadkalibrierung.',
    FR: 'Analyse des opérations mondiales de Hertz et calibrage des parcours.',
    ES: 'Análisis de operaciones globales de Hertz y calibración de trayectorias.',
    IT: 'Analisi delle operazioni globali di Hertz e calibrazione dei percorsi.'
  },
  'CURRENT_READINESS': {
    EN: 'Current Readiness',
    DE: 'Aktuelle Einsatzbereitschaft',
    FR: 'Préparation actuelle',
    ES: 'Preparación Actual',
    IT: 'Prontezza attuale'
  },
  'LEARNING_VELOCITY': {
    EN: 'Learning Velocity',
    DE: 'Lerngeschwindigkeit',
    FR: 'Vitesse d\'apprentissage',
    ES: 'Velocidad de Aprendizaje',
    IT: 'Velocità di apprendimento'
  },
  'NETWORK_SYNC': {
    EN: 'Network Sync',
    DE: 'Netzwerk-Synchronisation',
    FR: 'Synchronisation réseau',
    ES: 'Sincronización de Red',
    IT: 'Sincronizzazione di rete'
  },
  'TARGET_ALTITUDE': {
    EN: 'Target Altitude',
    DE: 'Ziel-Höhe',
    FR: 'Altitude cible',
    ES: 'Altitud Objetivo',
    IT: 'Altitudine target'
  },
  'ACTIVE_INTELLIGENCE_MODULES': {
    EN: 'Active Intelligence Modules',
    DE: 'Aktive Intelligenzmodule',
    FR: 'Modules d\'intelligence active',
    ES: 'Módulos de Inteligencia Activa',
    IT: 'Moduli di intelligenza attiva'
  },
  'STRATEGIC_SYNC': {
    EN: 'Strategic Sync',
    DE: 'Strategische Synchronisation',
    FR: 'Synchronisation stratégique',
    ES: 'Sincronización Estratégica',
    IT: 'Sincronizzazione strategica'
  },
  'SKILL_INTELLIGENCE': {
    EN: 'SKILL INTELLIGENCE',
    DE: 'SKILL-INTELLIGENZ',
    FR: 'INTELLIGENCE DES COMPÉTENCES',
    ES: 'INTELIGENCIA DE HABILIDADES',
    IT: 'INTELLIGENZA DELLE COMPETENZE'
  },
  'NEXT_MENTORSHIP_NODE': {
    EN: 'Next Mentorship Node',
    DE: 'Nächster Mentoring-Knoten',
    FR: 'Prochain nœud de mentorat',
    ES: 'Próximo Nodo de Mentoría',
    IT: 'Prossimo nodo di tutoraggio'
  },
  'SIMULATE_PREP': {
    EN: 'SIMULATE PREP',
    DE: 'VORBEREITUNG SIMULIEREN',
    FR: 'SIMULER LA PRÉPARATION',
    ES: 'SIMULAR PREPARACIÓN',
    IT: 'SIMULA PREPARAZIONE'
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
    ES: 'Crear una nuova trayectoria',
    IT: 'Crea un nuovo percorso'
  },
  'RE_ALIGN_PROFILE': {
    EN: 'RE-ALIGN PROFILE',
    DE: 'PROFIL NEU AUSRICHTEN',
    FR: 'RÉALIGNER LE PROFIL',
    ES: 'RE-ALINEAR PERFIL',
    IT: 'RIALLINEA PROFILO'
  },
  'BEST_FIT': {
    EN: 'BEST FIT',
    DE: 'BESTE PASSFORM',
    FR: 'MEILLEURE CORRESPONDANCE',
    ES: 'MEJOR OPCIÓN',
    IT: 'MIGLIORE SCELTA'
  },
  'HIGH_MATCH': {
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
  'NEW_HORIZON': {
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

  // Home Page
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
    ES: 'Gestiona las habilidades requeridas para tu posto y carrera.',
    IT: 'Gestisci le competenze richieste per il tuo ruolo e la tua carriera.'
  },
  'GIGS_DESC': {
    EN: 'Explore gigs and projects to grow your talents.',
    DE: 'Erkunde Gigs und Projekte, um deine Talente zu fördern.',
    FR: 'Explorez des missions et des projets pour développer vos talents.',
    ES: 'Explora proyectos y tareas para desarrollar tus talentos.',
    IT: 'Esplora lavoretti e progetti per accrescere i tuoi talenti.'
  },
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
  'HERTZ_CAREERS_DESC': {
    EN: 'Explore open positions and new opportunities at Hertz.',
    DE: 'Entdecke offene Stellen und neue Möglichkeiten bei Hertz.',
    FR: 'Explorez les postes vacants et les nouvelles opportunités chez Hertz.',
    ES: 'Explora puestos vacantes y nuevas oportunidades en Hertz.',
    IT: 'Esplora posizioni aperte e nuove opportunità in Hertz.'
  },
  // Mentorship Page
  'HUMAN_INTELLIGENCE_NETWORK': {
    EN: 'Human Intelligence Network',
    DE: 'Humanes Intelligenz-Netzwerk',
    FR: 'Réseau d\'intelligence humaine',
    ES: 'Red de Inteligencia Humana',
    IT: 'Rete di intelligenza umana'
  },
  'CAREER_MENTORSHIP_TITLE': {
    EN: 'CAREER\nMENTORSHIP.',
    DE: 'KARRIERE-\nMENTORING.',
    FR: 'MENTORAT DE\nCARRIÈRE.',
    ES: 'MENTORÍA DE\nCARRERA.',
    IT: 'MENTORSHIP DI\nCARRIERA.'
  },
  'MENTORSHIP_HERO_DESC': {
    EN: 'Connect with seasoned leaders who have mastered the paths you aspire to take.',
    DE: 'Verbinde dich mit erfahrenen Führungskräften, die die Wege gemeistert haben, die du einschlagen möchtest.',
    FR: 'Connectez-vous avec des leaders chevronnés qui ont maîtrisé les parcours que vous aspirez à suivre.',
    ES: 'Conéctate con líderes experimentados que han dominado las trayectorias que aspiras a seguir.',
    IT: 'Connettiti con leader esperti che hanno padroneggiato i percorsi che aspiri a intraprendere.'
  },
  'SEARCH_MENTORS_PLACEHOLDER': {
    EN: 'Search mentors by name or expertise...',
    DE: 'Mentoren nach Name oder Fachwissen suchen...',
    FR: 'Rechercher des mentors par nom ou expertise...',
    ES: 'Buscar mentores por nombre o experiencia...',
    IT: 'Cerca mentori per nome o competenza...'
  },
  'ALL': {
    EN: 'All',
    DE: 'Alle',
    FR: 'Tout',
    ES: 'Todos',
    IT: 'Tutto'
  },
  'EXP': {
    EN: 'Exp',
    DE: 'Erf',
    FR: 'Exp',
    ES: 'Exp',
    IT: 'Exp'
  },
  'SESSIONS': {
    EN: 'Sessions',
    DE: 'Sitzungen',
    FR: 'Sessions',
    ES: 'Sesiones',
    IT: 'Sessioni'
  },
  'CHAT_NOW': {
    EN: 'CHAT NOW',
    DE: 'JETZT CHATTEN',
    FR: 'DISCUTER MAINTENANT',
    ES: 'CHATEAR AHORA',
    IT: 'CHAT ORA'
  },
  // Profile Page
  'VIEW_PROFILE_AS_ME': {
    EN: 'View profile as Me',
    DE: 'Profil als Ich anzeigen',
    FR: 'Voir le profil comme moi',
    ES: 'Ver perfil como yo',
    IT: 'Visualizza profilo come me'
  },
  'PERSONALIZE': {
    EN: 'PERSONALIZE',
    DE: 'PERSONALISIEREN',
    FR: 'PERSONNALISER',
    ES: 'PERSONALIZAR',
    IT: 'PERSONALIZZA'
  },
  'TALENTS': {
    EN: 'TALENTS',
    DE: 'TALENTE',
    FR: 'TALENTS',
    ES: 'TALENTOS',
    IT: 'TALENTI'
  },
  'FEEDBACK': {
    EN: 'FEEDBACK',
    DE: 'FEEDBACK',
    FR: 'COMMENTAIRES',
    ES: 'COMENTARIOS',
    IT: 'FEEDBACK'
  },
  'ABOUT_ME': {
    EN: 'ABOUT ME',
    DE: 'ÜBER MICH',
    FR: 'À PROPOS DE MOI',
    ES: 'SOBRE MÍ',
    IT: 'SU DI ME'
  },
  'CAREER_ENGAGERS_SATISFACTION': {
    EN: 'Career Engagers and Satisfaction',
    DE: 'Karriere-Engager und Zufriedenheit',
    FR: 'Engagement et satisfaction professionnelle',
    ES: 'Compromiso y Satisfacción Profesional',
    IT: 'Coinvolgimento e soddisfazione professionale'
  },
  'SATISFACTION_RATINGS': {
    EN: 'Satisfaction Ratings',
    DE: 'Zufriedenheitsbewertungen',
    FR: 'Évaluations de satisfaction',
    ES: 'Calificaciones de Satisfacción',
    IT: 'Valutazioni di soddisfazione'
  },
  'COMPLETE_SATISFACTION_TEXT_1': {
    EN: 'Now you have completed the Career Engagers please complete the ',
    DE: 'Da du die Karriere-Engager abgeschlossen hast, fülle bitte das Tool ',
    FR: 'Maintenant que vous avez terminé les Engagements de carrière, veuillez compléter l\'outil ',
    ES: 'Ahora que has completado los Compromisos de Carrera, por favor completa la herramienta ',
    IT: 'Ora che hai completato i Coinvolgimenti di Carriera, completa lo strumento '
  },
  'COMPLETE_SATISFACTION_TEXT_2': {
    EN: ' tool.',
    DE: ' aus.',
    FR: '.',
    ES: '.',
    IT: '.'
  },
  'RESULTS': {
    EN: 'Results',
    DE: 'Ergebnisse',
    FR: 'Résultats',
    ES: 'Resultados',
    IT: 'Risultati'
  },
  'TEAMWORK_TITLE': {
    EN: 'Teamwork',
    DE: 'Teamarbeit',
    FR: 'Travail d\'équipe',
    ES: 'Trabajo en equipo',
    IT: 'Lavoro di squadra'
  },
  'ACHIEVEMENT': {
    EN: 'Achievement',
    DE: 'Leistung',
    FR: 'Réalisation',
    ES: 'Logro',
    IT: 'Traguardo'
  },
  'QUALITY': {
    EN: 'Quality',
    DE: 'Qualität',
    FR: 'Qualité',
    ES: 'Calidad',
    IT: 'Qualità'
  },
  'NEXT_UP': {
    EN: 'Next up',
    DE: 'Als nächstes',
    FR: 'À suivre',
    ES: 'Siguiente',
    IT: 'Prossimo'
  },
  'MY_SATISFACTION': {
    EN: 'My Satisfaction',
    DE: 'Meine Zufriedenheit',
    FR: 'Ma satisfaction',
    ES: 'Mi Satisfacción',
    IT: 'La mia soddisfazione'
  },
  'INSIGHTS_FOR': {
    EN: 'Insights for',
    DE: 'Einblicke für',
    FR: 'Aperçus pour',
    ES: 'Información para',
    IT: 'Approfondimenti per'
  },
  'ENGAGERS_SATISFACTION_VALUES_ALIGNMENT': {
    EN: 'Engagers, Satisfaction, Values and Alignment',
    DE: 'Engager, Zufriedenheit, Werte und Ausrichtung',
    FR: 'Engagements, satisfaction, valeurs et alignement',
    ES: 'Compromisos, Satisfacción, Valores y Alineación',
    IT: 'Coinvolgimenti, soddisfazione, valori e allineamento'
  },
  'WORK_STYLE': {
    EN: 'Work Style',
    DE: 'Arbeitsstil',
    FR: 'Style de travail',
    ES: 'Estilo de Trabajo',
    IT: 'Stile di lavoro'
  },
  'AGILITY_FACTORS': {
    EN: 'Agility Factors',
    DE: 'Agilitätsfaktoren',
    FR: 'Facteurs d\'agilité',
    ES: 'Factores de Agilidad',
    IT: 'Fattori di agilità'
  },
  'READ_REPORT': {
    EN: 'Read Report',
    DE: 'Bericht lesen',
    FR: 'Lire le rapport',
    ES: 'Leer Informe',
    IT: 'Leggi rapporto'
  },
  // Journey Flow
  'CALIBRATING_TRAJECTORY': {
    EN: 'Calibrating Trajectory',
    DE: 'Trajektorie kalibrieren',
    FR: 'Calibrage de la trajectoire',
    ES: 'Calibrando Trayectoria',
    IT: 'Calibrazione della traiettoria'
  },
  'AI_ENGINE_ANALYZING_1': {
    EN: 'Our AI engine is analyzing 15,000+ career data points to optimize your next move into ',
    DE: 'Unsere KI-Engine analysiert über 15.000 Karriere-Datenpunkte, um deinen nächsten Schritt in Richtung ',
    FR: 'Notre moteur d\'IA analyse plus de 15 000 points de données de carrière pour optimiser votre prochain passage en ',
    ES: 'Nuestro motor de IA está analizando más de 15,000 puntos de datos de carrera para optimizar su próximo paso hacia ',
    IT: 'Il nostro motore di IA sta analizzando oltre 15.000 punti dati di carriera per ottimizzare il tuo prossimo passaggio a '
  },
  'AI_ENGINE_ANALYZING_2': {
    EN: '...',
    DE: ' zu optimieren...',
    FR: '...',
    ES: '...',
    IT: '...'
  },
  'BACK_TO_SEARCH': {
    EN: 'BACK TO SEARCH',
    DE: 'ZURÜCK ZUR SUCHE',
    FR: 'RETOUR À LA RECHERCHE',
    ES: 'VOLVER A LA BÚSQUEDA',
    IT: 'TORNA ALLA RICERCA'
  },
  'STRETCH_OPPORTUNITIES': {
    EN: 'STRETCH OPPORTUNITIES',
    DE: 'STRETCH-MÖGLICHKEITEN',
    FR: 'OPPORTUNITÉS DE DÉVELOPPEMENT',
    ES: 'OPORTUNIDADES DE DESAFÍO',
    IT: 'OPPORTUNITÀ DI CRESCITA'
  },
  'FIND_A_JOURNEY': {
    EN: 'Find a ',
    DE: 'Finde eine ',
    FR: 'Trouver un ',
    ES: 'Encuentra un ',
    IT: 'Trova un '
  },
  'SIMULATE_CAREER_TRAJECTORY': {
    EN: 'Simulate your career trajectory with the simulation engine.',
    DE: 'Simuliere deine Karriere-Trajektorie mit der Simulations-Engine.',
    FR: 'Simulez votre trajectoire de carrière avec le moteur de simulation.',
    ES: 'Simula tu trayectoria profesional con el motor de simulación.',
    IT: 'Simula la tua traiettoria di carriera con il motore di simulazione.'
  },
  'CURRENT_LOCATION': {
    EN: 'Current Location',
    DE: 'Aktueller Standort',
    FR: 'Emplacement actuel',
    ES: 'Ubicación Actual',
    IT: 'Posizione attuale'
  },
  'DESTINATION': {
    EN: 'Destination',
    DE: 'Ziel',
    FR: 'Destination',
    ES: 'Destino',
    IT: 'Destinazione'
  },
  'CURRENT_DESIGNATION': {
    EN: 'Current Designation',
    DE: 'Aktuelle Bezeichnung',
    FR: 'Désignation actuelle',
    ES: 'Designación Actual',
    IT: 'Designazione attuale'
  },
  'TARGET_DESIGNATION': {
    EN: 'Target Designation',
    DE: 'Ziel-Bezeichnung',
    FR: 'Désignation cible',
    ES: 'Designación Objetivo',
    IT: 'Designazione target'
  },
  'SELECT_TARGET_ROLE': {
    EN: 'Select target role...',
    DE: 'Zielrolle auswählen...',
    FR: 'Sélectionner le rôle cible...',
    ES: 'Seleccionar puesto objetivo...',
    IT: 'Seleziona ruolo target...'
  },
  'SIMULATION_CORE': {
    EN: 'Simulation Core',
    DE: 'Simulationskern',
    FR: 'Cœur de simulation',
    ES: 'Núcleo de Simulación',
    IT: 'Core di simulazione'
  },
  'SYSTEMS_OPTIMAL': {
    EN: 'Systems Optimal',
    DE: 'Systeme optimal',
    FR: 'Systèmes optimaux',
    ES: 'Sistemas Óptimos',
    IT: 'Sistemi ottimali'
  },
  'IN_MY_FUNCTION': {
    EN: 'In my function',
    DE: 'In meiner Funktion',
    FR: 'Dans ma fonction',
    ES: 'En mi función',
    IT: 'Nella mia funzione'
  },
  'OTHER_FUNCTIONS': {
    EN: 'Other functions',
    DE: 'Andere Funktionen',
    FR: 'Autres fonctions',
    ES: 'Otras funciones',
    IT: 'Altre funzioni'
  },
  // Resume Upload Section
  'UPLOAD_PROFESSIONAL_HISTORY': {
    EN: 'Upload Professional History',
    DE: 'Berufshistorie hochladen',
    FR: 'Télécharger l\'historique professionnel',
    ES: 'Cargar Historial Profesional',
    IT: 'Carica cronologia professionale'
  },
  'NEURAL_ENGINE_MAP_TRAJECTORY': {
    EN: 'Let our Neural Engine map your Hertz trajectory',
    DE: 'Lass unsere Neural Engine deine Hertz-Trajektorie planen',
    FR: 'Laissez notre moteur neuronal tracer votre trajectoire Hertz',
    ES: 'Deja que nuestro Motor Neuronal trace tu trayectoria en Hertz',
    IT: 'Lascia che il nostro Motore Neurale tracci la tua traiettoria Hertz'
  },
  'RESUME_ACTIVE': {
    EN: 'Resume Active',
    DE: 'Lebenslauf aktiv',
    FR: 'CV actif',
    ES: 'Currículum Activo',
    IT: 'CV attivo'
  },
  'NEURAL_ENGINE_READY': {
    EN: 'Neural Engine Ready',
    DE: 'Neural Engine bereit',
    FR: 'Moteur neuronal prêt',
    ES: 'Motor Neuronal Listo',
    IT: 'Motore neurale pronto'
  },
  'UPLOAD_RESUME': {
    EN: 'Upload Resume',
    DE: 'Lebenslauf hochladen',
    FR: 'Télécharger le CV',
    ES: 'Cargar Currículum',
    IT: 'Carica CV'
  },
  'SKIP_TO_RESULTS': {
    EN: 'Skip to Results',
    DE: 'Zu den Ergebnissen springen',
    FR: 'Passer aux résultats',
    ES: 'Saltar a los resultados',
    IT: 'Vai ai risultati'
  },
  'HERTZ_CAREER_FORGE_POWERED_BY': {
    EN: 'Hertz Career Forge is powered by ',
    DE: 'Hertz Career Forge wird betrieben von ',
    FR: 'Hertz Career Forge est propulsé par ',
    ES: 'Hertz Career Forge está impulsado por ',
    IT: 'Hertz Career Forge è alimentato da '
  },
  'INTELLIGENT_NEURAL_PATHFINDING': {
    EN: 'Intelligent Neural Pathfinding.',
    DE: 'intelligenter neuronaler Pfadfindung.',
    FR: 'recherche de chemin neuronale intelligente.',
    ES: 'Búsqueda de Caminos Neuronales Inteligentes.',
    IT: 'Ricerca neurale intelligente dei percorsi.'
  },
  // Home Page
  'DRIVE_YOUR_CAREER_FORWARD': {
    EN: 'DRIVE YOUR\nCAREER FORWARD.',
    DE: 'TREIBE DEINE\nKARRIERE VORAN.',
    FR: 'PROPULSEZ VOTRE\nCARRIÈRE.',
    ES: 'IMPULSA TU\nCARRERA.',
    IT: 'GUIDA LA TUA\nCARRIERA.'
  },
  'EXPLORE_JOURNEYS': {
    EN: 'Explore Journeys',
    DE: 'Karrierewege erkunden',
    FR: 'Explorer les parcours',
    ES: 'Explorar Trayectorias',
    IT: 'Esplora i percorsi'
  },
  'EXPLORE_FUTURE': {
    EN: 'Explore your future at ',
    DE: 'Entdecke deine Zukunft bei ',
    FR: 'Explorez votre avenir chez ',
    ES: 'Explora tu futuro en ',
    IT: 'Esplora il tuo futuro in '
  },
  'HUB_DESCRIPTION': {
    EN: 'Your centralized cockpit for professional evolution. Map your trajectory, bridge skill gaps, and connect with mentors across the global Hertz ecosystem.',
    DE: 'Dein zentrales Cockpit für die berufliche Entwicklung. Plane deine Flugbahn, schließe Wissenslücken und vernetze dich mit Mentoren im gesamten globalen Hertz-Ökosystem.',
    FR: 'Votre cockpit centralisé pour l\'évolution professionnelle. Cartographiez votre trajectoire, comblez vos lacunes et connectez-vous avec des mentors dans tout l\'écosystème mondial de Hertz.',
    ES: 'Tu cabina centralizada para la evolución profesional. Traza tu trayectoria, cierra brechas de habilidades y conéctate mit mentores en todo el ecosistema global de Hertz.',
    IT: 'Il tuo cockpit centralizzato per l\'evoluzione professionale. Mappa la tua traiettoria, colma le lacune di competenze e connettiti con i mentori in tutto l\'ecosistema globale Hertz.'
  },
  'INSPIRATION': {
    EN: 'Daily Inspiration',
    DE: 'Tägliche Inspiration',
    FR: 'Inspiration quotidienne',
    ES: 'Inspiración Diaria',
    IT: 'Ispirazione quotidiana'
  },
  'JOURNEYS': {
    EN: 'Journeys',
    DE: 'Reisen',
    FR: 'Parcours',
    ES: 'Trayectorias',
    IT: 'Percorsi'
  },
  'JOURNEYS_DESC': {
    EN: 'Interactive career path simulation and AI analysis.',
    DE: 'Interaktive Karriereweg-Simulation und KI-Analyse.',
    FR: 'Simulation interactive de parcours de carrière et analyse IA.',
    ES: 'Simulación interactiva de carrera y análisis de IA.',
    IT: 'Simulazione interattiva del percorso di carriera e analisi AI.'
  },
  'SKILLS': {
    EN: 'Skills',
    DE: 'Kompetenzen',
    FR: 'Compétences',
    ES: 'Habilidades',
    IT: 'Competenze'
  },
  'SKILLS_DESC': {
    EN: 'Detailed skill matrix and Gap-to-Goal analysis.',
    DE: 'Detaillierte Kompetenzmatrix und Gap-zu-Ziel-Analyse.',
    FR: 'Matrice de compétences détaillée et analyse des écarts.',
    ES: 'Matriz de habilidades detallada y análisis de brechas.',
    IT: 'Matrice delle competenze dettagliata e analisi dei gap.'
  },
  'MENTORS': {
    EN: 'Mentors',
    DE: 'Mentoren',
    FR: 'Mentors',
    ES: 'Mentores',
    IT: 'Mentori'
  },
  'MENTORS_DESC': {
    EN: 'Connect with leaders for personalized growth sessions.',
    DE: 'Vernetze dich mit Führungskräften für persönliche Sitzungen.',
    FR: 'Connectez-vous avec des leaders pour des sessions de croissance.',
    ES: 'Conéctate con líderes para sesiones de crecimiento personal.',
    IT: 'Connettiti con i leader per sessioni di crescita personalizzate.'
  },
  'MILESTONES': {
    EN: 'Milestones',
    DE: 'Meilensteine',
    FR: 'Étapes',
    ES: 'Hitos',
    IT: 'Traguardi'
  },
  'MILESTONES_DESC': {
    EN: 'Track your professional evolution and achievements.',
    DE: 'Verfolge deine berufliche Entwicklung und Erfolge.',
    FR: 'Suivez votre évolution professionnelle et vos réussites.',
    ES: 'Rastrea tu evolución profesional y logros.',
    IT: 'Monitora la tua evoluzione professionale e i tuoi traguardi.'
  },
  'MASTERY': {
    EN: 'Mastery',
    DE: 'Meisterschaft',
    FR: 'Maîtrise',
    ES: 'Maestría',
    IT: 'Padronanza'
  },
  'MASTERY_DESC': {
    EN: 'Curated learning hub and precision-engineered courses.',
    DE: 'Kuratierter Learning Hub und präzise Kurse.',
    FR: 'Centre d\'apprentissage et cours de précision.',
    ES: 'Centro de aprendizaje y cursos de precisión.',
    IT: 'Hub di apprendimento curato e corsi di precisione.'
  },
  'PROFILE': {
    EN: 'Profile',
    DE: 'Profil',
    FR: 'Profil',
    ES: 'Perfil',
    IT: 'Profilo'
  },
  'PROFILE_DESC': {
    EN: 'Manage your professional identity and preferences.',
    DE: 'Verwalte deine berufliche Identität und Präferenzen.',
    FR: 'Gérez votre identité professionnelle et vos préférences.',
    ES: 'Gestiona tu identidad profesional y preferencias.',
    IT: 'Gestisci la tua identità professionale e le tue preferenze.'
  },
  'HERTZ_CAREERS': {
    EN: 'Hertz Careers',
    DE: 'Hertz-Karrieren',
    FR: 'Carrières Hertz',
    ES: 'Hertz Carreras',
    IT: 'Hertz Carriere'
  },
  'HERTZ_CAREERS_DESC': {
    EN: 'Direct access to global vacancies and live roles.',
    DE: 'Direkter Zugriff auf globale Vakanzen und Rollen.',
    FR: 'Accès direct aux postes vacants mondiaux.',
    ES: 'Acceso directo a vacantes globales y roles en vivo.',
    IT: 'Accesso diretto alle posizioni aperte globali.'
  },
  // Skills Page
  'SKILL_PORTFOLIO': {
    EN: 'Skill Portfolio',
    DE: 'Kompetenzportfolio',
    FR: 'Portfolio de compétences',
    ES: 'Portafolio de Habilidades',
    IT: 'Portfolio delle competenze'
  },
  'VALIDATED_MASTERY': {
    EN: 'Validated Mastery',
    DE: 'Validierte Meisterschaft',
    FR: 'Maîtrise validée',
    ES: 'Maestría Validada',
    IT: 'Padronanza validata'
  },
  'STRATEGIC_GAPS': {
    EN: 'Strategic Gaps',
    DE: 'Strategische Lücken',
    FR: 'Écarts stratégiques',
    ES: 'Brechas Estratégicas',
    IT: 'Gap strategici'
  },
  'INTELLIGENCE_LOADING': {
    EN: 'Intelligence Loading...',
    DE: 'Intelligenz lädt...',
    FR: 'Chargement de l\'intelligence...',
    ES: 'Cargando Inteligencia...',
    IT: 'Caricamento intelligenza...'
  },
  'CLOSING_LOOP': {
    EN: 'Closing the loop on your professional trajectory analysis.',
    DE: 'Analyse deiner beruflichen Entwicklung wird abgeschlossen.',
    FR: 'Finalisation de l\'analyse de votre trajectoire professionnelle.',
    ES: 'Cerrando el ciclo de tu análisis de trayectoria profesional.',
    IT: 'Chiusura del cerchio sull\'analisi della tua traiettoria professionale.'
  },
  // Milestones Page
  'CAREER_MILESTONES': {
    EN: 'Career Milestones',
    DE: 'Karriere-Meilensteine',
    FR: 'Étapes de carrière',
    ES: 'Hitos de Carrera',
    IT: 'Traguardi di carriera'
  },
  'ACHIEVEMENT_TIMELINE': {
    EN: 'Achievement Timeline',
    DE: 'Erfolgs-Zeitachse',
    FR: 'Chronologie des réussites',
    ES: 'Cronología de Logros',
    IT: 'Cronologia dei traguardi'
  },
  'AUDIT_PROGRESS': {
    EN: 'AUDIT PROGRESS',
    DE: 'FORTSCHRITT PRÜFEN',
    FR: 'AUDIT DE PROGRESSION',
    ES: 'AUDITAR PROGRESO',
    IT: 'VERIFICA PROGRESSI'
  },
  'CURRENT_VECTOR': {
    EN: 'Current Vector',
    DE: 'Aktueller Vektor',
    FR: 'Vecteur actuel',
    ES: 'Vector Actual',
    IT: 'Vettore attuale'
  },
  'UNLOCK_NEXT_NODE': {
    EN: 'Unlock Next Node',
    DE: 'Nächsten Knoten freischalten',
    FR: 'Débloquer le nœud suivant',
    ES: 'Desbloquear Siguiente Nodo',
    IT: 'Sblocca il nodo successivo'
  },
  // Learning Hub
  'LEARNING_HUB': {
    EN: 'Learning Hub',
    DE: 'Lernzentrum',
    FR: 'Centre d\'apprentissage',
    ES: 'Centro de Aprendizaje',
    IT: 'Hub di apprendimento'
  },
  'PRECISION_LEARNING': {
    EN: 'PRECISION\nLEARNING.',
    DE: 'PRÄZISIONS-\nLERNEN.',
    FR: 'APPRENTISSAGE\nDE PRÉCISION.',
    ES: 'APRENDIZAJE\nDE PRECISIÓN.',
    IT: 'APPRENDIMENTO\nDI PRECISIONE.'
  },
  'LEARNING_HUB_DESC': {
    EN: 'Precision-engineered courses and paths to close your skill gaps for your next move.',
    DE: 'Präzise konzipierte Kurse und Wege, um deine Wissenslücken für den nächsten Schritt zu schließen.',
    FR: 'Cours et parcours conçus avec précision pour combler vos lacunes avant votre prochain mouvement.',
    ES: 'Cursos y trayectorias diseñados con precisión para cerrar tus brechas de habilidades para tu próximo movimiento.',
    IT: 'Corsi e percorsi progettati con precisione per colmare le tue lacune di competenze per il tuo prossimo passo.'
  },
  'START_LEARNING': {
    EN: 'Start Learning',
    DE: 'Lernen beginnen',
    FR: 'Commencer l\'apprentissage',
    ES: 'Empezar a Aprender',
    IT: 'Inizia ad imparare'
  },
  'GO_TO_PLATFORM': {
    EN: 'Go to Platform',
    DE: 'Zur Plattform',
    FR: 'Aller sur la plateforme',
    ES: 'Ir a la Plataforma',
    IT: 'Vai alla piattaforma'
  },
  // Mentorship Page Data
  'LEARNING & DEVELOPMENT': {
    EN: 'Learning & Development',
    DE: 'Personalentwicklung',
    FR: 'Formation et développement',
    ES: 'Aprendizaje y Desarrollo',
    IT: 'Apprendimento e Sviluppo'
  },
  'OPERATIONS': {
    EN: 'Operations',
    DE: 'Betrieb',
    FR: 'Opérations',
    ES: 'Operaciones',
    IT: 'Operazioni'
  },
  'TECHNOLOGY': {
    EN: 'Technology',
    DE: 'Technologie',
    FR: 'Technologie',
    ES: 'Tecnología',
    IT: 'Tecnologia'
  },
  'INCENTIVE COMPENSATION': {
    EN: 'Incentive Compensation',
    DE: 'Leistungsvergütung',
    FR: 'Rémunération incitative',
    ES: 'Compensación de incentivos',
    IT: 'Compensi di incentivo'
  },
  'SR MANAGER LEARNING PROJECTS': {
    EN: 'Sr Manager Learning Projects',
    DE: 'Senior Manager Lernprojekte',
    FR: 'Chef de projet principal en formation',
    ES: 'Gerente Senior de Proyectos de Aprendizaje',
    IT: 'Senior Manager Progetti di Apprendimento'
  },
  'GM CUSTOMER OPS': {
    EN: 'GM Customer Ops',
    DE: 'GM Kundenbetreuung',
    FR: 'DG Opérations Client',
    ES: 'GM Operaciones de Clientes',
    IT: 'GM Customer Ops'
  },
  'SR MANAGER CUSTOMER OPS': {
    EN: 'Sr Manager Customer Ops',
    DE: 'Senior Manager Kundenbetreuung',
    FR: 'Responsable principal opérations client',
    ES: 'Gerente Senior de Operaciones de Clientes',
    IT: 'Senior Manager Customer Ops'
  },
  'DIRECTOR TECHNOLOGY': {
    EN: 'Director Technology',
    DE: 'Direktor Technologie',
    FR: 'Directeur de la technologie',
    ES: 'Director de Tecnología',
    IT: 'Direttore della Tecnologia'
  },
  'MANAGER CUSTOMER OPS': {
    EN: 'Manager Customer Ops',
    DE: 'Manager Kundenbetreuung',
    FR: 'Responsable opérations client',
    ES: 'Gerente de Operaciones de Clientes',
    IT: 'Manager Customer Ops'
  },
  'MANAGER VAS SALES': {
    EN: 'Manager VAS Sales',
    DE: 'Manager VAS-Vertrieb',
    FR: 'Responsable des ventes VAS',
    ES: 'Gerente de Ventas VAS',
    IT: 'Manager Vendite VAS'
  },
  'MANAGER INCENTIVE COMPENSATION': {
    EN: 'Manager Incentive Compensation',
    DE: 'Manager Leistungsvergütung',
    FR: 'Responsable de la rémunération incitative',
    ES: 'Gerente de Compensación de Incentivos',
    IT: 'Manager Compensi di Incentivo'
  },
  'EXPERIENCE': {
    EN: 'Experience',
    DE: 'Erfahrung',
    FR: 'Expérience',
    ES: 'Experiencia',
    IT: 'Esperienza'
  },
  'SESSIONS': {
    EN: 'Sessions',
    DE: 'Sitzungen',
    FR: 'Séances',
    ES: 'Sesiones',
    IT: 'Sessioni'
  },
  'BOOK_A_SESSION': {
    EN: 'Book a Session',
    DE: 'Sitzung buchen',
    FR: 'Réserver une séance',
    ES: 'Reservar una sesión',
    IT: 'Prenota una sessione'
  },
  'YR': {
    EN: 'yr',
    DE: 'J.',
    FR: 'an',
    ES: 'año',
    IT: 'anno'
  },
  // Learn & Jobs Pages
  'VIEW_HERTZ_CAREERS': {
    EN: 'View Hertz Careers',
    DE: 'Hertz-Karrieren anzeigen',
    FR: 'Voir les carrières Hertz',
    ES: 'Ver carreras en Hertz',
    IT: 'Vedi le carriere in Hertz'
  },
  'LEARNING_HUB': {
    EN: 'Learning Hub',
    DE: 'Lernzentrum',
    FR: "Centre d'apprentissage",
    ES: 'Centro de aprendizaje',
    IT: 'Centro di apprendimento'
  },
  'PRECISION_LEARNING': {
    EN: 'PRECISION\nLEARNING.',
    DE: 'PRÄZISIONS-\nLERNEN.',
    FR: 'APPRENTISSAGE\nDE PRÉCISION.',
    ES: 'APRENDIZAJE\nDE PRECISIÓN.',
    IT: 'APPRENDIMENTO\nDI PRECISIONE.'
  },
  'LEARNING_HUB_DESC': {
    EN: 'Precision-engineered courses and paths to close your skill gaps for your next move.',
    DE: 'Präzisionsgefertigte Kurse und Pfade, um deine Wissenslücken für deinen nächsten Schritt zu schließen.',
    FR: 'Des cours et des parcours de précision pour combler vos lacunes pour votre prochaine étape.',
    ES: 'Cursos y rutas diseñados con precisión para cerrar tus brechas de habilidades para tu próximo movimiento.',
    IT: 'Corsi e percorsi progettati con precisione per colmare le tue lacune per la tua prossima mossa.'
  },
  'PUBLIC_LEARNING': {
    EN: 'Public Learning',
    DE: 'Öffentliches Lernen',
    FR: 'Apprentissage public',
    ES: 'Aprendizaje público',
    IT: 'Apprendimento pubblico'
  },
  'COURSES': {
    EN: 'Courses',
    DE: 'Kurse',
    FR: 'Cours',
    ES: 'Cursos',
    IT: 'Corsi'
  },
  'PATHWAYS': {
    EN: 'Pathways',
    DE: 'Pfade',
    FR: 'Parcours',
    ES: 'Rutas',
    IT: 'Percorsi'
  },
  'LIVE_OPPORTUNITIES': {
    EN: 'Live Opportunities',
    DE: 'Aktuelle Möglichkeiten',
    FR: 'Opportunités en direct',
    ES: 'Oportunidades en vivo',
    IT: 'Opportunità dal vivo'
  },
  'SORT_BY': {
    EN: 'Sort by:',
    DE: 'Sortieren nach:',
    FR: 'Trier par:',
    ES: 'Ordenar por:',
    IT: 'Ordina per:'
  },
  'NEWEST': {
    EN: 'Newest',
    DE: 'Neueste',
    FR: 'Le plus récent',
    ES: 'Más nuevo',
    IT: 'Più recente'
  },
  'PROFILE_INTELLIGENCE': {
    EN: 'Profile Intelligence',
    DE: 'Profilintelligenz',
    FR: 'Intelligence de profil',
    ES: 'Inteligencia de perfil',
    IT: 'Intelligenza del profilo'
  },
  'PROFILE_INTEL_DESC': {
    EN: 'Upload your resume to unlock AI-powered precision matching.',
    DE: 'Lade deinen Lebenslauf hoch, um präzises KI-Matching freizuschalten.',
    FR: 'Téléchargez votre CV pour débloquer la correspondance précise de l\'IA.',
    ES: 'Sube tu currículum para desbloquear coincidencias de precisión con IA.',
    IT: 'Carica il tuo CV per sbloccare l\'abbinamento di precisione con IA.'
  },
  'QUICK_FILTERS': {
    EN: 'QUICK FILTERS',
    DE: 'SCHNELLE FILTER',
    FR: 'FILTRES RAPIDES',
    ES: 'FILTROS RÁPIDOS',
    IT: 'FILTRI RAPIDI'
  },
  'FULL_TIME': {
    EN: 'Full Time',
    DE: 'Vollzeit',
    FR: 'Temps plein',
    ES: 'Tiempo completo',
    IT: 'Tempo pieno'
  },
  'REMOTE': {
    EN: 'Remote',
    DE: 'Remote',
    FR: 'À distance',
    ES: 'Remoto',
    IT: 'Remoto'
  },
  'CONTRACT': {
    EN: 'Contract',
    DE: 'Vertrag',
    FR: 'Contrat',
    ES: 'Contrato',
    IT: 'Contratto'
  },
  'GIGS': {
    EN: 'Gigs',
    DE: 'Gigs',
    FR: 'Missions',
    ES: 'Proyectos',
    IT: 'Progetti'
  },
  'EXECUTIVE': {
    EN: 'Executive',
    DE: 'Führungskraft',
    FR: 'Exécutif',
    ES: 'Ejecutivo',
    IT: 'Esecutivo'
  },
  'ENTRY_LEVEL': {
    EN: 'Entry Level',
    DE: 'Einstiegsebene',
    FR: 'Niveau d\'entrée',
    ES: 'Nivel de entrada',
    IT: 'Livello base'
  },
  'GIG': {
    EN: 'GIG',
    DE: 'GIG',
    FR: 'MISSION',
    ES: 'PROYECTO',
    IT: 'PROGETTO'
  },
  'IMMEDIATE_START': {
    EN: 'Immediate Start',
    DE: 'Sofortiger Start',
    FR: 'Démarrage immédiat',
    ES: 'Inicio inmediato',
    IT: 'Inizio immediato'
  },
  'SIMULATE_PATH': {
    EN: 'Simulate Path',
    DE: 'Pfad simulieren',
    FR: 'Simuler le chemin',
    ES: 'Simular Ruta',
    IT: 'Simula il percorso'
  },
  'APPLY': {
    EN: 'Apply',
    DE: 'Bewerben',
    FR: 'Postuler',
    ES: 'Aplicar',
    IT: 'Candidati'
  },
  'Courtesy Service Driver': {"EN":"Courtesy Service Driver","DE":"Fahrer im Kundenservice","FR":"Chauffeur de Service Courtoisie","ES":"Conductor de Servicio de Cortesía","IT":"Autista Servizio Cortesia"},
  'Fleet & Facilities Supervisor - 6 months contract': {"EN":"Fleet & Facilities Supervisor - 6 months contract","DE":"Flotten- & Anlagenleiter - 6 Monate Vertrag","FR":"Superviseur de Flotte et Installations - Contrat de 6 mois","ES":"Supervisor de Flota y Facilidades - Contrato de 6 meses","IT":"Supervisore Flotta e Strutture - Contratto di 6 mesi"},
  'Manager Trainee': {"EN":"Manager Trainee","DE":"Trainee-Manager","FR":"Manager Stagiaire","ES":"Gerente en Entrenamiento","IT":"Responsabile in Formazione"},
  'Automotive Sales Consultant': {"EN":"Automotive Sales Consultant","DE":"Automobil-Verkaufsberater","FR":"Conseiller en Ventes Automobiles","ES":"Consultor de Ventas Automotrices","IT":"Consulente Vendite Automobili"},
  'Certified Automotive Technician': {"EN":"Certified Automotive Technician","DE":"Zertifizierter Kfz-Techniker","FR":"Technicien Automobile Certifié","ES":"Técnico Automotriz Certificado","IT":"Tecnico Automobilistico Certificato"},
  'Automotive Technician': {"EN":"Automotive Technician","DE":"Kfz-Techniker","FR":"Technicien Automobile","ES":"Técnico Automotriz","IT":"Tecnico Automobilistico"},
  'Part Time Car Wash Attendant': {"EN":"Part Time Car Wash Attendant","DE":"Teilzeit-Autowäscher","FR":"Laveur de Voitures à Temps Partiel","ES":"Asistente de Lavado de Autos a Tiempo Parcial","IT":"Addetto Lavaggio Auto Part-Time"},
  'Sales and Service Specialist': {"EN":"Sales and Service Specialist","DE":"Verkaufs- und Servicespezialist","FR":"Spécialiste des Ventes et Services","ES":"Especialista en Ventas y Servicio","IT":"Specialista Vendite e Servizi"},
  'Seasonal Part Time Car Wash Attendant': {"EN":"Seasonal Part Time Car Wash Attendant","DE":"Saisonaler Teilzeit-Autowäscher","FR":"Laveur de Voitures Saisonnier","ES":"Asistente de Lavado de Autos de Temporada","IT":"Addetto Lavaggio Auto Stagionale"},
  'Mobility Location Manager': {"EN":"Mobility Location Manager","DE":"Mobilitätsstandort-Manager","FR":"Gérant de Succursale Mobilité","ES":"Gerente de Ubicación de Movilidad","IT":"Gestore Sede Mobilità"},
  'Automotive Sales Finance Manager': {"EN":"Automotive Sales Finance Manager","DE":"Finanzmanager Automobilvertrieb","FR":"Directeur Financier des Ventes Automobiles","ES":"Gerente de Finanzas de Ventas Automotrices","IT":"Responsabile Finanziario Vendite Auto"},
  'Tire and Lube Technician': {"EN":"Tire and Lube Technician","DE":"Reifen- und Schmiertechniker","FR":"Technicien en Pneus et Lubrification","ES":"Técnico en Neumáticos y Lubricación","IT":"Tecnico Pneumatici e Lubrificazione"},
  'Driver': {"EN":"Driver","DE":"Fahrer","FR":"Chauffeur","ES":"Conductor","IT":"Autista"},
  'Customer Service Associate': {"EN":"Customer Service Associate","DE":"Kundendienstmitarbeiter","FR":"Associé du Service Client","ES":"Asociado de Servicio al Cliente","IT":"Addetto al Servizio Clienti"},
  'Customer Service Representative': {"EN":"Customer Service Representative","DE":"Kundendienstvertreter","FR":"Représentant du Service Client","ES":"Representante de Servicio al Cliente","IT":"Rappresentante del Servizio Clienti"},
  'Branch Manager': {"EN":"Branch Manager","DE":"Filialleiter","FR":"Chef de Succursale","ES":"Gerente de Sucursal","IT":"Direttore di Filiale"},
  'Supervisor': {"EN":"Supervisor","DE":"Supervisor","FR":"Superviseur","ES":"Supervisor","IT":"Supervisore"},
  'Product Manager': {"EN":"Product Manager","DE":"Produktmanager","FR":"Chef de Produit","ES":"Gerente de Producto","IT":"Product Manager"}
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
