import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Server, Code2, Database, Globe2, FileDown, Menu, X, BookOpen, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section, header');
      let currentSection = 'about';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const articles = [
    {
      title: "Understanding Dependency Injection in ASP.NET Core Web API",
      date: "Dec 22, 2024",
      image: "./images/dependency-injection.jpg",
      description: "Learn about dependency injection patterns and implementation in ASP.NET Core Web API.",
      link: "https://medium.com/@faycalsawadogo/understanding-dependency-injection-in-asp-net-core-web-api-86ea80bd896a",
      readTime: "5 min read"
    },
    {
      title: "Understanding Behavior-Driven Development (BDD) and Implementing it with SpecFlow",
      date: "Feb 16, 2024",
      image: "./images/behavior-driven-development.webp",
      description: "Explore BDD principles and practical implementation using SpecFlow in .NET projects.",
      link: "https://medium.com/@faycalsawadogo/understanding-behavior-driven-development-bdd-and-implementing-it-with-specflow-d1b52163c106",
      readTime: "7 min read"
    },
    {
      title: "Ensuring Software Excellence: The Importance of Quality Assurance",
      date: "May 1, 2023",
      image: "./images/quality-assurance.jpg",
      description: "Discover the critical role of quality assurance in software development and how it ensures product excellence.",
      link: "https://medium.com/@faycalsawadogo/ensuring-software-excellence-the-importance-of-quality-assurance-in-software-development-5695da183156",
      readTime: "6 min read"
    },
    {
      title: "Programmers, Developers, and Software Engineers: What's the Difference?",
      date: "Feb 27, 2023",
      image: "./images/software-engineer.jpg",
      description: "Understanding the distinct roles and responsibilities in the software development industry.",
      link: "https://medium.com/@faycalsawadogo/programmers-developers-and-software-engineers-whats-the-difference-a3abe8effda2",
      readTime: "5 min read"
    },
    {
      title: "Unlock the Power of AI: 3 Tools You Need to Know About",
      date: "Feb 5, 2023",
      image: "./images/ai-tools.jpg",
      description: "Explore essential AI tools that can revolutionize your workflow and boost productivity.",
      link: "https://medium.com/@faycalsawadogo/unlock-the-power-of-ai-3-tools-you-need-to-know-about-ef4612a3e30",
      readTime: "4 min read"
    },
    {
      title: "Top 3 Powerful AI Tools You Must Have in 2023",
      date: "Jan 17, 2023",
      image: "./images/powerful-ai-tools.jpg",
      description: "Discover the most impactful AI tools that are reshaping the technology landscape in 2023.",
      link: "https://medium.com/@faycalsawadogo/top-3-powerful-ai-tools-you-must-have-in-2023-d918a092bffb",
      readTime: "5 min read"
    }
  ];

  const displayedArticles = showAllArticles ? articles : articles.slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark'
            ? 'py-3 bg-gray-900/95 backdrop-blur-sm shadow-lg'
            : 'py-3 bg-white/95 backdrop-blur-sm shadow-lg'
          : 'py-5 bg-transparent'
      }`}>
        <div className="container mx-auto flex justify-between items-center px-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Faïçal
          </span>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800/50'
                  : 'hover:bg-gray-200/50'
              }`}
              aria-label="Toggle language"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800/50'
                  : 'hover:bg-gray-200/50'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-800/50'
                  : 'hover:bg-gray-200/50'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex space-x-8">
              {['about', 'experience', 'skills', 'projects', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    activeSection === item 
                      ? 'text-emerald-500' 
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t(item)}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 transform origin-left transition-transform duration-300 ${
                    activeSection === item ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full ${
            theme === 'dark'
              ? 'bg-gray-900/95 backdrop-blur-sm border-t border-gray-800/50'
              : 'bg-white/95 backdrop-blur-sm border-t border-gray-200/50'
          } shadow-lg`}>
            <div className="flex flex-col p-6 space-y-4">
              {['about', 'experience', 'skills', 'projects', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item 
                      ? 'bg-emerald-500/10 text-emerald-500 translate-x-2'
                      : theme === 'dark'
                        ? 'hover:bg-gray-800/50 hover:translate-x-2'
                        : 'hover:bg-gray-200/50 hover:translate-x-2'
                  }`}
                >
                  <span className="uppercase tracking-wider text-sm font-medium">{t(item)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="about" className={`container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-32 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="max-w-3xl relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 -right-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 relative">
              {t('hi-im')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Faïçal
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-emerald-400/20 -skew-x-12 transform -rotate-1" />
              </span>
              <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </h1>
            <p className={`text-xl md:text-2xl leading-relaxed mb-10 [text-wrap:balance] ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('developer-intro')}
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Github, href: 'https://github.com/fsawadogo', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/afsawadogo/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:contact@fsawadogo.com', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3 transition-all duration-200 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 hover:bg-gray-700/50'
                      : 'bg-gray-200/50 hover:bg-gray-300/50'
                  } hover:text-emerald-500 hover:scale-110`}
                >
                  <Icon size={24} />
                </a>
              ))}
              <a 
                href="./cv/resume.pdf" 
                download
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-white"
              >
                <FileDown size={20} />
                {t('download-resume')}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Experience Section */}
      <section id="experience" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center">
            {t('professional-experience')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {[
              {
                title: t('professional-experience-astus'),
                company: 'Astus Inc.',
                period: 'Fév 2024 - Présent',
                location: 'Longueuil',
                achievements: [
                  'Concevoir, développer et mettre en place d\'applications C# de haute performance conçues pour les environnements distribués.',
                  'Collaborer étroitement avec les architectes pour concevoir des solutions logicielles flexibles, basées sur les principes des systèmes distribués',
                  'Gérer des bases de données SQL Server, incluant la conception de schémas et l\'optimisation des requêtes SQL pour des performances optimales.',
                  'Optimiser les performances des applications, résoudre des problèmes complexes et effectuer des tests approfondis.'
                ]
              },
              {
                title: 'Développeur Back End | Consultant',
                company: 'Beeye',
                period: 'Juil 2023 - Oct 2023',
                location: 'Montreal',
                achievements: [
                  'Développer et maintenir des systèmes back-end en utilisant C#, Blazor Server, GraphQL et JavaScript.',
                  'Conception et mise en œuvre d\'API RESTful, optimisant les performances des points de terminaison.',
                  'Collaboration avec l\'équipe front-end pour définir les exigences de l\'API et résoudre les problèmes.',
                  'Bases de données gérées et optimisées en SQL, améliorant l\'efficacité des requêtes.'
                ]
              },
              {
                title: 'Développeur Back End',
                company: 'Ubisoft',
                period: '2020 - Juil 2023',
                location: 'Montreal',
                achievements: [
                  'Travailler sur la conception et le développement d\'une architecture de microservices utilisant C#, ASP.NET Core, MySQL.',
                  'Implémenter les pipelines d\'intégration continue et de déploiement continu (CI/CD).',
                  'Implémenter les métriques (Prometheus) et créer des tableaux de bord (Grafana, Splunk).',
                  'Assurer un support de qualité aux équipes de production, collaboration dans un environnement Agile.'
                ]
              }
            ].map((experience, index) => (
              <div
                key={index}
                className="relative pl-12 group"
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent" />
                <div className={`absolute w-6 h-6 rounded-full -left-[11px] top-2 border-2 border-emerald-400 group-hover:scale-125 transition-transform duration-300 ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                }`} />
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <h3 className={`text-2xl font-semibold ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                        : 'text-gray-900'
                    }`}>
                      {experience.title}
                    </h3>
                    <span className="text-emerald-500 font-medium">• {experience.company}</span>
                  </div>
                  <p className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Calendar size={16} />
                    {experience.period} • {experience.location}
                  </p>
                </div>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <li 
                      key={i} 
                      className={`flex items-start gap-2 group/item transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="mt-2 w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center">{t('what-i-do')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Server,
                title: t('backend-development'),
                description: t('backend-description')
              },
              {
                icon: Code2,
                title: t('frontend-development'),
                description: t('frontend-description')
              },
              {
                icon: Database,
                title: t('database-design'),
                description: t('database-description')
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-500/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 h-full ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/50'
                    : 'bg-white/50 border-gray-200/50 hover:border-emerald-500/50'
                }`}>
                  <div className={`absolute top-0 left-0 w-full h-full rounded-2xl ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-emerald-500/5 to-transparent'
                      : 'bg-gradient-to-br from-emerald-500/10 to-transparent'
                  }`} />
                  <div className="relative">
                    <Icon className="w-12 h-12 text-emerald-500 mb-6 transform transition-transform group-hover:scale-110" />
                    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center">{t('featured-projects')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                title: t('ecommerce-platform'),
                description: t('ecommerce-description'),
                tags: ["React", "Node.js", "MongoDB", "Stripe"]
              },
              {
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                title: t('analytics-dashboard'),
                description: t('analytics-description'),
                tags: ["Vue.js", "Python", "PostgreSQL", "D3.js"]
              }
            ].map((project, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-500/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/50'
                    : 'bg-white/50 border-gray-200/50 hover:border-emerald-500/50'
                }`}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      theme === 'dark'
                        ? 'from-gray-900 via-gray-900/50 to-transparent'
                        : 'from-gray-800 via-gray-800/50 to-transparent'
                    }`} />
                  </div>
                  <div className="relative p-8">
                    <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                    <p className={`mb-6 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            theme === 'dark'
                              ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                              : 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center">{t('latest-articles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedArticles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-500/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 h-full ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/50'
                    : 'bg-white/50 border-gray-200/50 hover:border-emerald-500/50'
                }`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'dark'
                        ? 'from-gray-900 via-gray-900/50 to-transparent'
                        : 'from-gray-800 via-gray-800/50 to-transparent'
                    }`} />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-emerald-500" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-emerald-500" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 line-clamp-2 transition-colors ${
                      theme === 'dark'
                        ? 'group-hover:text-emerald-400'
                        : 'group-hover:text-emerald-600'
                    }`}>
                      {article.title}
                    </h3>
                    <p className={`mb-6 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray- 400' : 'text-gray-600'
                    }`}>
                      {article.description}
                    </p>
                    <span className={`inline-flex items-center transition-colors ${
                      theme === 'dark'
                        ? 'text-emerald-400 group-hover:text-emerald-300'
                        : 'text-emerald-600 group-hover:text-emerald-500'
                    }`}>
                      {t('read-on-medium')}
                      <svg className="w-4 h-4 ml-1.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {!showAllArticles && articles.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllArticles(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-white"
              >
                <span className="text-lg font-medium">{t('see-more-articles')}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-bold mb-8">{t('lets-work-together')}</h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('contact-description')}
          </p>
          <a 
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 group text-white"
          >
            <Mail size={20} className="transform transition-transform group-hover:scale-110" />
            <span className="text-lg font-medium">{t('get-in-touch')}</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 text-center ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="flex items-center justify-center gap-3">
          <Globe2 size={18} className="text-emerald-500" />
          <p>{t('based-in')}</p>
        </div>
      </footer>

      {/* Add styles for wave animation */}
      <style>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(14deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(14deg); }
          80% { transform: rotate(-4deg); }
          100% { transform: rotate(10deg); }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;