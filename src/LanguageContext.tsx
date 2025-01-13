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
    'experience': "Experiences",
    'skills': "Skills",
    'projects': "Projects",
    'blog': "Blog",
    'contact': "Contact",
    'education': "Education",

    // Experience Section
    'professional-experience': "Professional Experience",
    'present': "Present",
    'experience-backend-consultant': "Backend Developer | Consultant",
    'experience-backend': "Backend Developer",
    'experience-fullstack': "Full Stack Developer | Consultant",
    'experience-achievement-astus': [
      'Designing, developing, and implementing high-performance C# applications designed for distributed environments.',
      'Collaborating closely with architects to design flexible software solutions based on distributed systems principles.',
      'Managing SQL Server databases, including schema design and SQL query optimization for optimal performance.',
      'Optimizing application performance, troubleshooting complex issues, and conducting thorough testing.'
    ],
    'experience-achievement-beeye': [
      'Developing and maintaining back-end systems using C#, Blazor Server, GraphQL, and JavaScript.',
      'Designing and implementing RESTful APIs, optimizing endpoint performance.',
      'Collaborating with the front-end team to define API requirements and resolve issues.',
      'Managed and optimized databases in SQL, improving query efficiency.'
    ],
    'experience-achievement-ubisoft': [
      'Working on the design and development of a microservices architecture using C#, ASP.NET Core, MySQL.',
      'Implementing continuous integration and continuous deployment (CI/CD) pipelines.',
      'Implementing metrics (Prometheus) and creating dashboards (Grafana, Splunk).',
      'Providing quality support to production teams, collaborating in an Agile environment.'
    ],
    // Education Section
    'education-title': "Education",
    'mcgill-university': "McGill University",
    'ets-university': "École de Technologie Supérieure",
    'uqam-university': "Université du Québec à Montréal",
    'data-science-cert': "Professional Development Certificate in Data Science and Machine Learning",
    'masters-degree': "Master's in Information Technology Engineering",
    'bachelors-degree': "Bachelor's in Computer Science and Software Engineering",
    'education-period1': "Sep 2024 - Present",
    'education-period2': "Sep 2019 - Aug 2022",
    'education-period3': "Sep 2012 - Apr 2016",
    'education-description1': "Advanced studies in data science, machine learning, and artificial intelligence applications.",
    'education-description2': "Specialized in software architecture, distributed systems, and cloud computing technologies.",
    'education-description3': "Comprehensive foundation in computer science principles and software engineering practices.",
    'key-courses': "Key Courses",
    'courses-ds': "Machine Learning, Deep Learning, Statistical Analysis, Big Data Analytics, Data Science",
    'courses-masters': "Distributed Systems, Cloud Architecture, Advanced Software Design, Enterprise Integration",
    'courses-bachelors': "Algorithms, Data Structures, Software Engineering, Database Systems, Network Programming",
    'key-achievements': "Key Achievements",
    
    // Skills Section
    'what-i-do': "What I Do",
    'backend-development': "Backend Development",
    'backend-description': "Building scalable and robust server-side applications with modern technologies like .NET Core and Python.",
    'frontend-development': "Frontend Development",
    'frontend-description': "Creating responsive and intuitive user interfaces with React, and modern CSS frameworks.",
    'database-design': "Database Design",
    'database-description': "Designing efficient database schemas and optimizing queries for performance using SQL Server, PostgreSQL, and MySQL.",

    // Projects Section
    'featured-projects': "Featured Projects",
    'pos-platform': "P.O.S Platform",
    'pos-description': "A complete Point of Sale Project with real-time inventory management and payment processing.",
    'basketball-platform': "Basketball Sessions Management System",
    'basketball-description': "A comprehensive platform for managing basketball training sessions, player statistics, and team schedules with real-time updates.",

    // Blog Section
    'latest-articles': "Latest Articles",
    'read-on-medium': "Read on Medium",
    'see-more-articles': "See More Articles",
    'min-read': "min read",

    // Contact Section
    'lets-work-together': "Let's work together",
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
    'experience': "Expériences",
    'skills': "Compétences",
    'projects': "Projets",
    'blog': "Blog",
    'contact': "Contact",
    'education': "Formations",

    // Experience Section
    'professional-experience': "Expériences",
    'present': "Présent",
    'experience-backend-consultant': "Développeur Back End | Consultant",
    'experience-backend': "Développeur Back End",
    'experience-fullstack': "Développeur Full Stack | Consultant",
    'experience-achievement-astus': [
      'Concevoir, développer et mettre en place d\'applications C# de haute performance conçues pour les environnements distribués.',
      'Collaborer étroitement avec les architectes pour concevoir des solutions logicielles flexibles, basées sur les principes des systèmes distribués',
      'Gérer des bases de données SQL Server, incluant la conception de schémas et l\'optimisation des requêtes SQL pour des performances optimales.',
      'Optimiser les performances des applications, résoudre des problèmes complexes et effectuer des tests approfondis.'
    ],
    'experience-achievement-beeye': [
      'Développer et maintenir des systèmes back-end en utilisant C#, Blazor Server, GraphQL et JavaScript.',
      'Conception et mise en œuvre d\'API RESTful, optimisant les performances des points de terminaison.',
      'Collaboration avec l\'équipe front-end pour définir les exigences de l\'API et résoudre les problèmes.',
      'Bases de données gérées et optimisées en SQL, améliorant l\'efficacité des requêtes.'
    ],
    'experience-achievement-ubisoft': [
      'Travailler sur la conception et le développement d\'une architecture de microservices utilisant C#, ASP.NET Core, MySQL.',
      'Implémenter les pipelines d\'intégration continue et de déploiement continu (CI/CD).',
      'Implémenter les métriques (Prometheus) et créer des tableaux de bord (Grafana, Splunk).',
      'Assurer un support de qualité aux équipes de production, collaboration dans un environnement Agile.'
    ],
    // Education Section
    'education-title': "Formations",
    'mcgill-university': "Université McGill",
    'ets-university': "École de Technologie Supérieure",
    'uqam-university': "Université du Québec à Montréal",
    'data-science-cert': "Certificat de développement professionnel en science des données et apprentissage automatique",
    'masters-degree': "Maîtrise en génie des technologies de l'information",
    'bachelors-degree': "Baccalauréat en informatique et génie logiciel",
    'education-period1': "Sep 2024 - Présent",
    'education-period2': "Sep 2019 - Août 2022",
    'education-period3': "Sep 2012 - Avr 2016",
    'education-description1': "Études avancées en science des données, apprentissage automatique et applications d'intelligence artificielle.",
    'education-description2': "Spécialisation en architecture logicielle, systèmes distribués et technologies cloud.",
    'education-description3': "Formation approfondie en principes d'informatique et pratiques de génie logiciel.",
    'key-courses': "Cours Principaux",
    'courses-ds': "Apprentissage automatique, Deep Learning, Analyse statistique, Analytique Big Data, Science des donnees",
    'courses-masters': "Systèmes distribués, Architecture cloud, Conception logicielle avancée, Intégration d'entreprise",
    'courses-bachelors': "Algorithmes, Structures de données, Génie logiciel, Systèmes de bases de données, Programmation réseau",
    'key-achievements': "Réalisations Principales",
    
    // Skills Section
    'what-i-do': "Ce que je fais",
    'backend-development': "Développement Backend",
    'backend-description': "Construction d'applications serveur évolutives et robustes avec des technologies modernes comme .NET Core et Python.",
    'frontend-development': "Développement Frontend",
    'frontend-description': "Création d'interfaces utilisateur réactives et intuitives avec React et des frameworks CSS modernes.",
    'database-design': "Conception de Base de Données",
    'database-description': "Conception de schémas de base de données efficaces et optimisation des requêtes pour la performance avec SQL Server, PostgreSQL et MySQL.",

    // Projects Section
    'featured-projects': "Projets en Vedette",
    'pos-platform': "Plateforme P.O.S",
    'pos-description': "Un projet complet de point de vente avec gestion des stocks en temps réel et traitement des paiements.",
    'basketball-platform': "Système de Gestion des Sessions de Basketball",
    'basketball-description': "Une plateforme complète pour gérer les sessions d'entraînement de basketball.",
    // Blog Section
    'latest-articles': "Derniers Articles",
    'read-on-medium': "Lire sur Medium",
    'see-more-articles': "Voir Plus d'Articles",
    'min-read': "min de lecture",

    // Contact Section
    'lets-work-together': "Travaillons ensemble",
    'contact-description': "Je suis toujours intéressé par de nouveaux projets et opportunités.",
    'get-in-touch': "Me Contacter",

    // Footer
    'based-in': "Basé à Montréal, Canada"
  }
} as const;

type TranslationKeys = keyof typeof translations.en;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as TranslationKeys] || key;
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