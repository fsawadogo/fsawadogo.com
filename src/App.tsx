import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Server, Code2, Database, Globe2, FileDown, Menu, X, BookOpen, Calendar, Sun, Moon, GraduationCap, ChevronUp } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { articles } from './data/articles';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedArticles = showAllArticles ? articles : articles.slice(0, 3);

  const navItems = ['about', 'experience', 'education', 'skills', 'blog', 'contact'];

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
            Faïçal Sawadogo
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
              {navItems.map((item) => (
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
              {navItems.map((item) => (
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
      <header id="about" className="min-h-screen flex items-center justify-center relative">
        <div className={`container mx-auto px-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="max-w-3xl mx-auto relative">
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
                <span className="inline-block animate-wave origin-[70%_70%]">👋🏾</span>
              </h1>
              <p className={`text-xl md:text-2xl leading-relaxed mb-10 [text-wrap:balance] ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('developer-intro')}
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Github, href: 'https://github.com/fsawadogo', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/afsawadogo', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:contact@fsawadogo.me', label: 'Email' }
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
                  href="/resume.pdf" 
                  download
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-white"
                >
                  <FileDown size={20} />
                  {t('download-resume')}
                </a>
              </div>
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
                title: t('experience-backend-consultant'),
                company: 'Astus Inc.',
                period: 'Fév 2024 - Présent',
                location: 'Longueuil',
                achievements: t('experience-achievement-astus')
              },
              {
                title: t('experience-fullstack'),
                company: 'Beeye',
                period: 'Juil 2023 - Oct 2023',
                location: 'Montreal',
                achievements: t('experience-achievement-beeye')
              },
              {
                title: t('experience-backend'),
                company: 'Ubisoft',
                period: '2020 - Juil 2023',
                location: 'Montreal',
                achievements: t('experience-achievement-ubisoft')
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
                  {Array.isArray(experience.achievements) ? experience.achievements.map((achievement, i) => (
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
                  )) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent'
        }`} />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-16 text-center">
            {t('education-title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {[
              {
                university: t('mcgill-university'),
                degree: t('data-science-cert'),
                period: t('education-period1'),
                description: t('education-description1'),
                courses: t('courses-ds')
              },
              {
                university: t('ets-university'),
                degree: t('masters-degree'),
                period: t('education-period2'),
                description: t('education-description2'),
                courses: t('courses-masters')
              },
              {
                university: t('uqam-university'),
                degree: t('bachelors-degree'),
                period: t('education-period3'),
                description: t('education-description3'),
                courses: t('courses-bachelors')
              }
            ].map((education, index) => (
              <div
                key={index}
                className="relative pl-12 group"
              >
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent" />
                <div className={`absolute w-6 h-6 rounded-full -left-[11px] top-2 border-2 border-emerald-400 group-hover:scale-125 transition-transform duration-300 ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                }`}>
                  <GraduationCap className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400" />
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <h3 className={`text-2xl font-semibold ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                        : 'text-gray-900'
                    }`}>
                      {education.university}
                    </h3>
                    <span className="text-emerald-500 font-medium">• {education.degree}</span>
                  </div>
                  <p className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Calendar size={16} />
                    {education.period}
                  </p>
                </div>
                <div className={`space-y-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>{education.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-emerald-500">{t('key-courses')}</h4>
                    <p>{education.courses}</p>
                  </div>
                </div>
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
      {/* <section id="projects" className={`py-24 relative overflow-hidden ${
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
                image: "https://images.unsplash.com/photo-1602665742701-389671bc40c0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: t('pos-platform'),
                description: t('pos-description'),
                techLogos: [
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
                ]
              },
              {
                image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
                title: t('basketball-platform'),
                description: t('basketball-description'),
                techLogos: [
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
                  "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
                ]
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
                    <div className="flex flex-wrap gap-4">
                      {project.techLogos.map((logo, i) => (
                        <img 
                          key={i}
                          src={logo}
                          alt={`Technology ${i + 1}`}
                          className={`w-8 h-8 transition-transform hover:scale-110 ${
                            theme === 'dark' ? 'filter invert' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
                        : 'group-hover:text-emer ald-600'
                    }`}>
                      {article.title}
                    </h3>
                    <p className={`mb-6 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
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
            href="mailto:contact@fsawadogo.me"
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

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } hover:bg-emerald-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 z-50`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

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