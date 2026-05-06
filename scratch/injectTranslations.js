const fs = require('fs');

const jobTranslations = {
  'Courtesy Service Driver': {
    EN: 'Courtesy Service Driver', DE: 'Fahrer im Kundenservice', FR: 'Chauffeur de Service Courtoisie', ES: 'Conductor de Servicio de Cortesía', IT: 'Autista Servizio Cortesia'
  },
  'Fleet & Facilities Supervisor - 6 months contract': {
    EN: 'Fleet & Facilities Supervisor - 6 months contract', DE: 'Flotten- & Anlagenleiter - 6 Monate Vertrag', FR: 'Superviseur de Flotte et Installations - Contrat de 6 mois', ES: 'Supervisor de Flota y Facilidades - Contrato de 6 meses', IT: 'Supervisore Flotta e Strutture - Contratto di 6 mesi'
  },
  'Manager Trainee': {
    EN: 'Manager Trainee', DE: 'Trainee-Manager', FR: 'Manager Stagiaire', ES: 'Gerente en Entrenamiento', IT: 'Responsabile in Formazione'
  },
  'Automotive Sales Consultant': {
    EN: 'Automotive Sales Consultant', DE: 'Automobil-Verkaufsberater', FR: 'Conseiller en Ventes Automobiles', ES: 'Consultor de Ventas Automotrices', IT: 'Consulente Vendite Automobili'
  },
  'Certified Automotive Technician': {
    EN: 'Certified Automotive Technician', DE: 'Zertifizierter Kfz-Techniker', FR: 'Technicien Automobile Certifié', ES: 'Técnico Automotriz Certificado', IT: 'Tecnico Automobilistico Certificato'
  },
  'Automotive Technician': {
    EN: 'Automotive Technician', DE: 'Kfz-Techniker', FR: 'Technicien Automobile', ES: 'Técnico Automotriz', IT: 'Tecnico Automobilistico'
  },
  'Part Time Car Wash Attendant': {
    EN: 'Part Time Car Wash Attendant', DE: 'Teilzeit-Autowäscher', FR: 'Laveur de Voitures à Temps Partiel', ES: 'Asistente de Lavado de Autos a Tiempo Parcial', IT: 'Addetto Lavaggio Auto Part-Time'
  },
  'Sales and Service Specialist': {
    EN: 'Sales and Service Specialist', DE: 'Verkaufs- und Servicespezialist', FR: 'Spécialiste des Ventes et Services', ES: 'Especialista en Ventas y Servicio', IT: 'Specialista Vendite e Servizi'
  },
  'Seasonal Part Time Car Wash Attendant': {
    EN: 'Seasonal Part Time Car Wash Attendant', DE: 'Saisonaler Teilzeit-Autowäscher', FR: 'Laveur de Voitures Saisonnier', ES: 'Asistente de Lavado de Autos de Temporada', IT: 'Addetto Lavaggio Auto Stagionale'
  },
  'Mobility Location Manager': {
    EN: 'Mobility Location Manager', DE: 'Mobilitätsstandort-Manager', FR: 'Gérant de Succursale Mobilité', ES: 'Gerente de Ubicación de Movilidad', IT: 'Gestore Sede Mobilità'
  },
  'Automotive Sales Finance Manager': {
    EN: 'Automotive Sales Finance Manager', DE: 'Finanzmanager Automobilvertrieb', FR: 'Directeur Financier des Ventes Automobiles', ES: 'Gerente de Finanzas de Ventas Automotrices', IT: 'Responsabile Finanziario Vendite Auto'
  },
  'Tire and Lube Technician': {
    EN: 'Tire and Lube Technician', DE: 'Reifen- und Schmiertechniker', FR: 'Technicien en Pneus et Lubrification', ES: 'Técnico en Neumáticos y Lubricación', IT: 'Tecnico Pneumatici e Lubrificazione'
  },
  'Driver': {
    EN: 'Driver', DE: 'Fahrer', FR: 'Chauffeur', ES: 'Conductor', IT: 'Autista'
  },
  'Customer Service Associate': {
    EN: 'Customer Service Associate', DE: 'Kundendienstmitarbeiter', FR: 'Associé du Service Client', ES: 'Asociado de Servicio al Cliente', IT: 'Addetto al Servizio Clienti'
  },
  'Customer Service Representative': {
    EN: 'Customer Service Representative', DE: 'Kundendienstvertreter', FR: 'Représentant du Service Client', ES: 'Representante de Servicio al Cliente', IT: 'Rappresentante del Servizio Clienti'
  },
  'Branch Manager': {
    EN: 'Branch Manager', DE: 'Filialleiter', FR: 'Chef de Succursale', ES: 'Gerente de Sucursal', IT: 'Direttore di Filiale'
  },
  'Supervisor': {
    EN: 'Supervisor', DE: 'Supervisor', FR: 'Superviseur', ES: 'Supervisor', IT: 'Supervisore'
  },
  'Product Manager': {
    EN: 'Product Manager', DE: 'Produktmanager', FR: 'Chef de Produit', ES: 'Gerente de Producto', IT: 'Product Manager'
  }
};

let code = fs.readFileSync('src/context/LanguageContext.tsx', 'utf8');

// Build the string to inject
let injectStr = `  'APPLY': {
    EN: 'Apply',
    DE: 'Bewerben',
    FR: 'Postuler',
    ES: 'Aplicar',
    IT: 'Candidati'
  },\n`;

for (const [key, trans] of Object.entries(jobTranslations)) {
  injectStr += `  '${key}': ${JSON.stringify(trans)},\n`;
}

// Remove trailing comma for the last item and close object
injectStr = injectStr.replace(/,\n$/, '\n};\n');

code = code.replace(/  'APPLY': {\s*EN: 'Apply',\s*DE: 'Bewerben',\s*FR: 'Postuler',\s*ES: 'Aplicar',\s*IT: 'Candidati'\s*[\s\S]*?};/, injectStr);

fs.writeFileSync('src/context/LanguageContext.tsx', code);
console.log('Successfully injected job titles into LanguageContext.tsx');
