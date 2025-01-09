import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'hi-im': "Hi, I'm",
    'developer-intro': "A passionate Full Stack Developer with over 8 years of experience specializing in building scalable backend systems and elegant web solutions. Based in Montreal, I combine technical expertise with a deep understanding of business needs to deliver high-quality software solutions.",
    'download-resume': "Download Resume",
    
    // Navigation
    'about': "About",
    'experience': "Experience",
    'skills': "Skills",
    'projects': "Projects",
    'blog': "Blog",
    'contact': "Contact",

    // Experience Section
    'professional-experience': "Professional Experience",
    'present': "Present",
    'professional-experience-astus': "Back End Developer | Consultant",
    // Skills Section
    'what-i-do': "What I Do",
    'backend-development': "Backend Development",
    'backend-description': "Building scalable and robust server-side applications with modern technologies like .NET Core, Node.js, and Python.",
    'frontend-development': "Frontend Development",
    'frontend-description': "Creating responsive and intuitive user interfaces with React, Angular, and modern CSS frameworks.",
    'database-design': "Database Design",
    'database-description': "Designing efficient database schemas and optimizing queries for performance using SQL Server, PostgreSQL, and MongoDB.",

    // Projects Section
    'featured-projects': "Featured Projects",
    'ecommerce-platform': "E-Commerce Platform",
    'ecommerce-description': "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    'analytics-dashboard': "Analytics Dashboard",
    'analytics-description': "Real-time analytics platform with interactive visualizations and data processing.",

    // Blog Section
    'latest-articles': "Latest Articles",
    'read-on-medium': "Read on Medium",
    'see-more-articles': "See More Articles",
    'min-read': "min read",

    // Contact Section
    'lets-work-together': "Let's Work Together",
    'contact-description': "I'm always interested in hearing about new projects and opportunities.",
    'get-in-touch': "Get in Touch",

    // Footer
    'based-in': "Based in Montreal, Canada"
  },
  fr: {
    // Header
    'hi-im': "Bonjour, je suis",
    'developer-intro': "Un développeur Full Stack passionné avec plus de 8 ans d'expérience, spécialisé dans la construction de systèmes backend évolutifs et de solutions web élégantes. Basé à Montréal, je combine expertise technique et compréhension approfondie des besoins métier pour livrer des solutions logicielles de haute qualité.",
    'download-resume': "Télécharger CV",
    
    // Navigation
    'about': "À propos",
    'experience': "Expérience",
    'skills': "Compétences",
    'projects': "Projets",
    'blog': "Blog",
    'contact': "Contact",

    // Experience Section
    'professional-experience': "Expérience Professionnelle",
    'present': "Présent",
    
    // Skills Section
    'what-i-do': "Ce que je fais",
    'backend-development': "Développement Backend",
    'backend-description': "Construction d'applications serveur évolutives et robustes avec des technologies modernes comme .NET Core, Node.js et Python.",
    'frontend-development': "Développement Frontend",
    'frontend-description': "Création d'interfaces utilisateur réactives et intuitives avec React, Angular et des frameworks CSS modernes.",
    'database-design': "Conception de Base de Données",
    'database-description': "Conception de schémas de base de données efficaces et optimisation des requêtes pour la performance avec SQL Server, PostgreSQL et MongoDB.",

    // Projects Section
    'featured-projects': "Projets en Vedette",
    'ecommerce-platform': "Plateforme E-Commerce",
    'ecommerce-description': "Une solution e-commerce complète avec gestion des stocks en temps réel et traitement des paiements.",
    'analytics-dashboard': "Tableau de Bord Analytique",
    'analytics-description': "Plateforme d'analyse en temps réel avec visualisations interactives et traitement des données.",

    // Blog Section
    'latest-articles': "Derniers Articles",
    'read-on-medium': "Lire sur Medium",
    'see-more-articles': "Voir Plus d'Articles",
    'min-read': "min de lecture",

    // Contact Section
    'lets-work-together': "Travaillons Ensemble",
    'contact-description': "Je suis toujours intéressé par de nouveaux projets et opportunités.",
    'get-in-touch': "Me Contacter",

    // Footer
    'based-in': "Basé à Montréal, Canada"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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