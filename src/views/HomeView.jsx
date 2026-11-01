import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Binary, BrainCircuit, Check, ChevronRight, Copy, GraduationCap, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useMotionVariants } from '../lib/motion';
import { GithubIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import QuantCanvas from '../components/ui/QuantCanvas';

export default function HomeView({ onNavigate, onCopyEmail, copiedEmail, scrollToLab, onLabScrolled }) {
  const { cardContainerVariants, cardItemVariants, cardHover } = useMotionVariants();

  // Runs once this view is mounted, so the jump also works when arriving from another tab.
  useEffect(() => {
    if (!scrollToLab) return;
    document.getElementById('quant-lab')?.scrollIntoView();
    onLabScrolled();
  }, [scrollToLab, onLabScrolled]);

  return (
    <div className="space-y-14">
      {/* Minimal Vercel/Linear Style Hero Section */}
      <section className="py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium shadow-sm">
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
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 flex items-center gap-2"
            >
              View Projects <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-400" /> Get in Touch
            </button>
            <button
              onClick={onCopyEmail}
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
          <div className="relative w-full max-w-[320px] sm:max-w-[340px] group">
            {/* Subtle ambient violet/indigo glow fitting dark theme */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-violet-600/20 via-indigo-500/15 to-purple-600/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* Rounded containment container */}
            <div className="relative aspect-[4/5] rounded-2xl border border-slate-800/80 shadow-xl shadow-violet-500/5 overflow-hidden bg-slate-950">
              <img
                src={`${import.meta.env.BASE_URL}profile.png`}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-all duration-700 rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Gradient overlays: subtle top & edge vignette plus bottom dark fade to blend stark white studio background into dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.35)_100%)] pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-800/80 rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <QuantCanvas />

      {/* SPA Navigation Teaser Cards */}
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2"
      >
        <motion.button
          variants={cardItemVariants}
          whileHover={cardHover}
          onClick={() => onNavigate('competencies')}
          className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-colors transition-shadow duration-300 group space-y-3"
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
        </motion.button>

        <motion.button
          variants={cardItemVariants}
          whileHover={cardHover}
          onClick={() => onNavigate('projects')}
          className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-colors transition-shadow duration-300 group space-y-3"
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
        </motion.button>

        <motion.button
          variants={cardItemVariants}
          whileHover={cardHover}
          onClick={() => onNavigate('education')}
          className="text-left bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-colors transition-shadow duration-300 group space-y-3"
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
        </motion.button>
      </motion.div>
    </div>
  );
}
