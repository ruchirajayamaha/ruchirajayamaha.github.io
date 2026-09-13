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
  Terminal,
  Copy,
  Check
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

const InstituteLogo = ({ logo, name, code, badgeColor }) => {
  const [imgError, setImgError] = useState(false);

  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'indigo':
        return 'bg-indigo-950/80 border-indigo-500/40 text-indigo-400';
      case 'emerald':
        return 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400';
      case 'amber':
        return 'bg-amber-950/80 border-amber-500/40 text-amber-400';
      default:
        return 'bg-slate-900 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-mono font-bold text-xs shadow-md overflow-hidden transition-all duration-300 group-hover:scale-105 ${getBadgeStyle()}`}>
      {logo && !imgError ? (
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain p-1"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="tracking-wider">{code}</span>
      )}
    </div>
  );
};

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Ambience Gradients */}
      <div className="fixed top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono text-sm tracking-wider font-semibold text-slate-200 hover:text-indigo-400 transition">
            <span className="text-indigo-400">&gt;</span> ruchirajayamaha.ds
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#skills" className="hover:text-white transition">Competencies</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#education" className="hover:text-white transition">Education</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Ruchira_Jayamaha_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Download Resume
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-28">

        {/* Hero Section */}
        <section id="about" className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-4">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {personalInfo.status}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Applied Mathematics Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">Predictive AI</span>.
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-indigo-600/25"
              >
                View Technical Projects <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm transition flex items-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-6 pt-3 text-slate-400">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5 text-xs font-medium">
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5 text-xs font-medium">
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <span className="text-xs text-slate-600">|</span>
              <span className="text-xs text-slate-500 font-mono">Based in {personalInfo.location}</span>
            </div>
          </div>

          {/* Hero Terminal Card */}
          <div className="w-full sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Terminal className="w-3.5 h-3.5" /> ruchira_profile.py
              </div>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-2.5">
              <div>
                <span className="text-slate-500"># Academic Background</span>
                <p><span className="text-indigo-400">university</span> = <span className="text-emerald-300">"Univ. of Ruhuna"</span></p>
                <p><span className="text-indigo-400">major</span> = <span className="text-emerald-300">"Financial Math & Ind. Statistics"</span></p>
              </div>
              <div>
                <span className="text-slate-500"># Professional Certification</span>
                <p><span className="text-indigo-400">diploma</span> = <span className="text-emerald-300">"NIBM Data Science"</span></p>
              </div>
              <div>
                <span className="text-slate-500"># Secondary Education</span>
                <p><span className="text-indigo-400">school</span> = <span className="text-emerald-300">"Bandaranayake College"</span></p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400 text-[11px]">
                Financial mathematics, stochastic modeling, and enterprise data science.
              </div>
            </div>
          </div>
        </section>

        {/* Competencies Section */}
        <section id="skills" className="space-y-8">
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
                className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-6 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                    {getCategoryIcon(idx)}
                  </div>
                  <h3 className="font-semibold text-slate-100">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section with Live Math Rendering */}
        <section id="projects" className="space-y-8">
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
                className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between hover:border-indigo-500/40 transition group"
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
                    <div className="p-2.5 rounded-lg bg-slate-950/90 border border-indigo-500/20 my-2 shadow-inner">
                      <span className="text-[9px] font-mono text-indigo-400/80 uppercase tracking-wider block mb-1">
                        Mathematical Formulation
                      </span>
                      <MathFormula math={proj.formula} block={true} />
                    </div>
                  )}

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
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
                      rel="noreferrer"
                      className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section id="education" className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Academic Background</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Education & Credentials</h2>
          </div>

          <div className="relative border-l border-slate-800 ml-3 pl-8 space-y-8">
            {educationData.map((edu, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 transition" />
                
                <div className="bg-slate-900/50 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700/90 transition space-y-3 shadow-sm">
                  <div className="flex items-start gap-4">
                    <InstituteLogo
                      logo={edu.logo}
                      name={edu.institution}
                      code={edu.code}
                      badgeColor={edu.badgeColor}
                    />
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
        </section>

        {/* Contact Hub */}
        <section className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Let's Connect for Opportunities</h2>
            <p className="text-slate-400 text-sm">
              I am actively preparing for an internship opportunity in Data Science, Machine Learning, or Analytics. Reach out directly for collaboration or interview inquiries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Send Direct Email
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2"
            >
              <LinkedinIcon className="w-4 h-4 text-sky-400" /> Connect on LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Ruchira Jayamaha. Built with React & Tailwind CSS. Hosted on GitHub Pages.</p>
      </footer>
    </div>
  );
} 5