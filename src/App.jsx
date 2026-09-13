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
  ArrowRight,
  Clock,
  Globe,
  BookOpen,
  Send,
  ExternalLink,
  Layers,
  Activity,
  Award,
  Loader2,
  MapPin,
  AlertCircle
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

  // Modal State for Project Proof of Work / Methodology
  const [activeMethodologyProject, setActiveMethodologyProject] = useState(null);

  // Interactive Contact Inquiry Form State powered by Web3Forms
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3a94fa64-d032-4654-9997-64ebe0b8d363',
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject || 'Portfolio Inquiry',
          message: contactForm.message,
          from_name: 'Portfolio Inquiry'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Submission failed. Please check your inputs.');
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('Network error occurred. Please try again or send a direct email.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Ambience Gradients */}
      <div className="fixed top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Global SPA Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            onClick={() => handleTabChange('home')}
            className="font-mono text-sm tracking-wider font-semibold text-slate-200 hover:text-indigo-400 transition flex items-center gap-1 group"
          >
            <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">&gt;</span> ruchirajayamaha.ds
          </button>

          {/* Desktop Tab Switcher */}
          <nav className="hidden md:flex items-center space-x-1 font-medium text-sm bg-slate-900/60 p-1 rounded-xl border border-slate-800/80 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 font-semibold shadow-sm border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-400 rounded-full" />
                  )}
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
      <main className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex-1 w-full flex flex-col justify-center">
        
        {/* VIEW 1: HOME (Hero + SPA Teaser Hub) */}
        {activeTab === 'home' && (
          <div className="space-y-14 animate-view my-auto">
            {/* Minimal Vercel/Linear Style Hero Section */}
            <section className="py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 flex items-center gap-2"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <button
                onClick={() => handleTabChange('competencies')}
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group space-y-3"
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
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group space-y-3"
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
                className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-300 group space-y-3"
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
          <div className="space-y-8 animate-view py-4 my-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Background & Focus</span>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">About Ruchira Jayamaha</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Main Bio Card */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-slate-700/80 transition shadow-lg">
                <div className="space-y-4">
                  <p className="text-slate-300 text-base leading-relaxed">
                    I am a final-year <strong className="text-white">B.Sc. (Hons) in Financial Mathematics and Industrial Statistics</strong> undergraduate at the <strong className="text-white">University of Ruhuna, Sri Lanka</strong>, holding an <strong className="text-white">Advanced Diploma in Data Science</strong> from NIBM.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    My core interest lies at the intersection of rigorous probability theory, financial econometrics, and production machine learning pipelines. I focus on developing quantitative algorithms that resolve real-world uncertainty — from predicting high-frequency stock volatility regimes on the Colombo Stock Exchange (CSE) to engineering explainable AI churn classification systems using TreeSHAP.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Equipped with deep coursework in probability distributions, matrix decompositions, stochastic analysis, and statistical quality control, I bridge theoretical mathematics with scalable Python/R/SQL implementations.
                  </p>
                </div>

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

              {/* Right Side: Core Quant Stack Chips & Impact Metrics */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Key Metrics Indicator Card */}
                <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4 hover:border-indigo-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-slate-100 text-xs font-mono uppercase tracking-wider">
                      Quant Indicators & Benchmarks
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-center">
                      <span className="text-2xl font-bold text-indigo-400 font-mono block">3+</span>
                      <span className="text-[11px] text-slate-400">Quant & ML Models</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-center">
                      <span className="text-2xl font-bold text-emerald-400 font-mono block">0.88</span>
                      <span className="text-[11px] text-slate-400">ROC-AUC Benchmark</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-center">
                      <span className="text-2xl font-bold text-sky-400 font-mono block">CSE</span>
                      <span className="text-[11px] text-slate-400">GARCH(1,1) Volatility</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-center">
                      <span className="text-2xl font-bold text-amber-400 font-mono block">B.Sc.</span>
                      <span className="text-[11px] text-slate-400">Financial Math Hons</span>
                    </div>
                  </div>
                </div>

                {/* Core Quant Stack Interactive Chips */}
                <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 space-y-4 flex-1 hover:border-slate-700/90 transition-all duration-300">
                  <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-semibold text-slate-100 text-xs font-mono uppercase tracking-wider">
                      Core Quant & Statistical Stack
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Financial Econometrics",
                      "Stochastic Calculus",
                      "GARCH(1,1) Volatility",
                      "TreeSHAP Explainability",
                      "SMOTE-Tomek Imbalance",
                      "Simplex LP Optimization",
                      "Statsmodels & arch",
                      "PostgreSQL Window CTEs",
                      "Power BI DAX"
                    ].map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-950 border border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:text-white transition"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleTabChange('projects')}
                      className="w-full py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-medium text-xs flex items-center justify-center gap-2 transition"
                    >
                      Explore Applied Projects <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: COMPETENCIES */}
        {activeTab === 'competencies' && (
          <div className="space-y-8 animate-view py-4 my-auto">
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
                  className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      {getCategoryIcon(idx)}
                    </div>
                    <h3 className="font-semibold text-slate-100">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-950/90 text-slate-300 border border-slate-800/80 hover:border-slate-700 transition"
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
          <div className="space-y-8 animate-view py-4 my-auto">
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
                  className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group"
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

                    {/* Responsive LaTeX Math Formula Container */}
                    {proj.formula && (
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-indigo-500/20 my-3 shadow-inner max-w-full overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-indigo-400/90 uppercase tracking-wider block">
                            Mathematical Formulation
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">LaTeX</span>
                        </div>
                        <div className="overflow-x-auto no-scrollbar max-w-full py-1">
                          <MathFormula math={proj.formula} block={true} />
                        </div>
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

                    {/* Proof of Work Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Source Code
                      </a>
                      
                      <button
                        onClick={() => setActiveMethodologyProject(proj)}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> View Methodology
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-8 animate-view py-4 my-auto">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Academic Background</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Education & Credentials</h2>
            </div>

            <div className="relative border-l border-slate-800 ml-3 pl-8 space-y-8">
              {educationData.map((edu, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 transition" />
                  
                  <div className="bg-slate-900/50 border border-slate-800/90 rounded-2xl p-5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 space-y-3 shadow-sm">
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

        {/* VIEW 6: CONTACT (Web3Forms Interactive Form) */}
        {activeTab === 'contact' && (
          <div className="animate-view py-6 my-auto min-h-[75vh] flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full space-y-8">
              
              {/* Header & Quick Metadata Pills */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Let's Connect for Opportunities</h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
                  I am actively preparing for an internship opportunity in Data Science, Machine Learning, or Analytics. Reach out directly for collaboration or interview inquiries.
                </p>

                {/* Quick Metadata Badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Status: Available in 3 Months
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    Location: Colombo, Sri Lanka (UTC+05:30)
                  </div>
                </div>
              </div>

              {/* Grid: Web3Forms Form & Secondary Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Glassmorphic Contact Form */}
                <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider text-indigo-400">
                      <Send className="w-4 h-4 text-indigo-400" /> Direct Inquiry Form
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Powered by Web3Forms
                    </span>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 animate-view">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <Check className="w-5 h-5 shrink-0" /> Message Sent Successfully!
                      </div>
                      <p className="leading-relaxed">
                        Thank you! Your message has been sent directly to Ruchira. I'll get back to you shortly.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-3 animate-view">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" /> Submission Failed
                      </div>
                      <p className="leading-relaxed">
                        {errorMessage || 'Something went wrong. Please try again or reach out via direct email.'}
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="px-3 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 text-xs font-semibold transition"
                      >
                        Retry Submission
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Subject / Reason
                      </label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
                      >
                        <option value="Internship Opportunity">Internship Opportunity</option>
                        <option value="Quant / ML Collaboration">Quant / ML Collaboration</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Write your message here regarding internship opportunities or quantitative projects..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition resize-none placeholder:text-slate-600"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right: Secondary Contact Options Card */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
                    <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider text-indigo-400 border-b border-slate-800/80 pb-3">
                      Secondary Channels
                    </h3>
                    
                    <div className="space-y-3">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center justify-between shadow-md"
                      >
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Send Direct Email
                        </span>
                        <ExternalLink className="w-4 h-4 opacity-80" />
                      </a>

                      <button
                        onClick={handleCopyEmail}
                        className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-medium text-sm transition flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2 font-mono text-xs">
                          <Copy className="w-4 h-4 text-slate-400" />
                          {copiedEmail ? (
                            <span className="text-emerald-400 font-bold">Copied!</span>
                          ) : (
                            <span>Copy Email Address</span>
                          )}
                        </span>
                        {copiedEmail ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Gmail</span>
                        )}
                      </button>

                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-medium text-sm transition flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <LinkedinIcon className="w-4 h-4 text-sky-400" /> Connect on LinkedIn
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                    <p className="text-xs font-mono text-slate-400">Direct Email Address:</p>
                    <p className="text-xs font-mono font-bold text-slate-200 select-all">{personalInfo.email}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Proof of Work Methodology Modal */}
      {activeMethodologyProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-view">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveMethodologyProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                Project Proof of Work & Methodology
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {activeMethodologyProject.title}
              </h3>
              <p className="text-xs text-indigo-300 font-mono mt-0.5">
                {activeMethodologyProject.subtitle}
              </p>
            </div>

            {/* LaTeX Equation Container in Modal */}
            {activeMethodologyProject.formula && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 max-w-full overflow-hidden">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                  Analytical Framework Equation
                </span>
                <div className="overflow-x-auto no-scrollbar max-w-full py-1">
                  <MathFormula math={activeMethodologyProject.formula} block={true} />
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-semibold text-white font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Methodology & Pipeline
                </h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs">
                  {activeMethodologyProject.methodology}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Problem & Mathematical Approach
                </h4>
                <p>{activeMethodologyProject.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white font-mono text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Empirical Impact & Metrics
                </h4>
                <p className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                  {activeMethodologyProject.metrics}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <a
                href={activeMethodologyProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" /> View Full Repository
              </a>
              <button
                onClick={() => setActiveMethodologyProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

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