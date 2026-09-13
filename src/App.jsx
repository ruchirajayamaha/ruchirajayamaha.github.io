import React, { useState } from 'react';
import {
  Mail,
  FileText,
  ChevronRight,
  BrainCircuit,
  Binary,
  Code2,
  BarChart3,
  GraduationCap,
  Sparkles,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import {
  personalInfo,
  skillsData,
  projectsData,
  educationData
} from './data/portfolioData';
import MathFormula from './components/MathFormula';

// Reliable Custom SVGs for Social Icons
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    if (e) e.preventDefault();
    const emailText = personalInfo.email;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      }).catch(() => {
        fallbackCopyTextToClipboard(emailText);
      });
    } else {
      fallbackCopyTextToClipboard(emailText);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
    document.body.removeChild(textArea);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'competencies', label: 'Competencies' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (index) => {
    switch (index) {
      case 0: return <Binary className="w-5 h-5 text-indigo-400" />;
      case 1: return <BrainCircuit className="w-5 h-5 text-emerald-400" />;
      case 2: return <Code2 className="w-5 h-5 text-sky-400" />;
      case 3: return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col justify-between">
      {/* Background Ambience Gradients */}
      <div className="fixed top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Global SPA Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            onClick={() => handleTabChange('home')}
            className="font-mono text-sm tracking-wider font-semibold text-slate-200 hover:text-indigo-400 transition flex items-center gap-1"
          >
            <span className="text-indigo-400">&gt;</span> ruchirajayamaha.ds
          </button>

          {/* Desktop Tab Switcher */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-sm bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/60 text-indigo-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Resume Download & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Ruchira_Jayamaha_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile View Switcher Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-6 py-4 space-y-2 animate-view">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main SPA Content Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 md:py-14 flex-1 w-full">
        
        {/* VIEW 1: HOME (Hero + SPA Teaser Hub) */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-view">
            {/* Minimal Vercel/Linear Style Hero Section */}
            <section className="py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {personalInfo.status}
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100">
                    {personalInfo.name}
                  </h1>
                  <p className="text-base sm:text-lg font-medium text-indigo-400/90 leading-snug">
                    B.Sc. (Hons) Financial Mathematics & Industrial Statistics Undergraduate
                  </p>
                </div>

                <div className="space-y-3 max-w-2xl">
                  <p className="text-slate-300 font-medium text-base sm:text-lg leading-relaxed">
                    Applying stochastic modeling, statistical inference, and machine learning to high-impact quantitative problems.
                  </p>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                {/* Primary SPA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleTabChange('projects')}
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                  >
                    View Projects <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleTabChange('contact')}
                    className="px-5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-slate-400" /> Contact Me
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition text-xs font-mono flex items-center gap-1.5"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Icons Row */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 text-slate-400">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:text-white transition flex items-center gap-2 text-xs font-medium"
                  >
                    <GithubIcon className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:text-white transition flex items-center gap-2 text-xs font-medium"
                  >
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  </a>
                  <span className="text-xs text-slate-600">|</span>
                  <span className="text-xs text-slate-500 font-mono">Based in {personalInfo.location}</span>
                </div>
              </div>

              {/* Right Column: Sleek Portrait Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[4/5] rounded-3xl p-2 bg-slate-900/90 border border-slate-800 shadow-2xl shadow-indigo-950/30 overflow-hidden group">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 pointer-events-none" />

                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={`${import.meta.env.BASE_URL}profile.jpg`}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    <div className="absolute bottom-3 left-3 right-3 backdrop-blur-md bg-slate-950/75 border border-slate-800/80 rounded-xl py-2 px-3 text-center shadow-lg">
                      <p className="text-xs font-mono font-medium text-slate-300 tracking-wide">
                        Univ. of Ruhuna • NIBM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SPA Navigation Teaser Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <button
                onClick={() => handleTabChange('competencies')}
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-indigo-500/40 transition group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Binary className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition">Core Competencies</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Explore specialized skills across Financial Math, ML, SQL, and Statistical Inference.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleTabChange('projects')}
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/40 transition group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-emerald-300 transition">Featured Projects</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    View GARCH(1,1) volatility models, SHAP explainable AI, and Simplex LP optimization.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleTabChange('education')}
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-sky-500/40 transition group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-sky-300 transition">Education & Credentials</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Review academic milestones from University of Ruhuna, NIBM, and Bandaranayake College.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-view py-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Background & Focus</span>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">About Ruchira Jayamaha</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
                <p className="text-slate-300 text-base leading-relaxed">
                  I am a final-year <strong className="text-white">B.Sc. (Hons) in Financial Mathematics and Industrial Statistics</strong> undergraduate at the <strong className="text-white">University of Ruhuna, Sri Lanka</strong>, holding an <strong className="text-white">Advanced Diploma in Data Science</strong> from NIBM.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  My core interest lies at the intersection of rigorous probability theory, financial econometrics, and production machine learning pipelines. I focus on developing quantitative algorithms that resolve real-world uncertainty — from predicting high-frequency stock volatility regimes on the Colombo Stock Exchange (CSE) to engineering explainable AI churn classification systems using TreeSHAP.
                </p>

                <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Current Academic Status</span>
                    <span className="text-emerald-400 font-semibold">Undergraduate (Final Year)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Primary Specialization</span>
                    <span className="text-indigo-400 font-semibold">Financial Math & Ind. Statistics</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-100 text-sm font-mono uppercase tracking-wider text-indigo-400">
                  Quick Navigation
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleTabChange('competencies')}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>View Competencies</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleTabChange('projects')}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleTabChange('education')}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between transition"
                  >
                    <span>View Education</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: COMPETENCIES */}
        {activeTab === 'competencies' && (
          <div className="space-y-8 animate-view py-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Knowledge Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Core Competencies</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Equally grounded in pure mathematics, statistical theory, and production-ready programming tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-slate-700 transition space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      {getCategoryIcon(idx)}
                    </div>
                    <h3 className="font-semibold text-slate-100">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-950/90 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-view py-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Proven Evidence</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Featured Projects</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Showcasing formal mathematical modeling, empirical validation, and measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projectsData.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/40 transition group"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-indigo-400 tracking-wider uppercase font-semibold">
                        {proj.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-slate-100 mt-1 group-hover:text-indigo-300 transition">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Math Formula Render */}
                    {proj.formula && (
                      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-indigo-500/20 my-2 shadow-inner">
                        <span className="text-[9px] font-mono text-indigo-400/80 uppercase tracking-wider block mb-1">
                          Mathematical Formulation
                        </span>
                        <MathFormula math={proj.formula} block={true} />
                      </div>
                    )}

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Quantified Impact</span>
                      <p className="text-xs font-medium text-emerald-400">
                        {proj.metrics}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-slate-800/80">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Source Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-8 animate-view py-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Academic Background</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Education & Credentials</h2>
            </div>

            <div className="relative border-l border-slate-800 ml-3 pl-8 space-y-8">
              {educationData.map((edu, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 transition" />
                  
                  <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-700/90 transition space-y-3 shadow-sm">
                    <div className="flex items-start gap-4">
                      {/* Official Institution Logo Container */}
                      <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-slate-700/60 shadow-md shrink-0 overflow-hidden">
                        {edu.logo ? (
                          <img 
                            src={edu.logo} 
                            alt={edu.institution} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="font-mono text-xs font-bold text-indigo-400">EDU</span>
                        )}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wide">
                            {edu.period}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">{edu.degree}</h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5 pt-0.5">
                          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" /> {edu.institution}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 pt-2 leading-relaxed max-w-3xl border-t border-slate-800/60">
                      {edu.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-view py-4">
            <section className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
              <div className="max-w-xl mx-auto space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Let's Connect for Opportunities</h2>
                <p className="text-slate-400 text-sm">
                  I am actively preparing for an internship opportunity in Data Science, Machine Learning, or Analytics. Reach out directly for collaboration or interview inquiries.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-indigo-600/25"
                >
                  <Mail className="w-4 h-4" /> Send Direct Email
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" /> Connect on LinkedIn
                </a>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Persistent SPA Footer */}
      <footer className="border-t border-slate-900 py-8 text-slate-500 bg-slate-950/80 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Ruchira Jayamaha. Built with React & Tailwind CSS.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleTabChange('home')}
              className="hover:text-slate-200 transition"
            >
              Home
            </button>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition flex items-center gap-1.5 font-medium"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition flex items-center gap-1.5 font-medium"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}