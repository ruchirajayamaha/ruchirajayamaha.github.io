import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FileText, Menu, Search, X } from 'lucide-react';
import { navItems } from '../../data/navigation';

const IS_MAC = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform);

export default function Navbar({ activeTab, onNavigate, onOpenResume, onOpenPalette }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (tabId) => {
    setIsMobileMenuOpen(false);
    onNavigate(tabId);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="font-mono text-sm tracking-wider font-semibold text-slate-200 hover:text-indigo-400 transition flex items-center gap-1 group shrink-0"
        >
          <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">&gt;</span> ruchirajayamaha.ds
        </button>

        {/* Desktop Tab Switcher */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm bg-slate-900/60 p-1 rounded-xl border border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 relative ${
                  isActive
                    ? 'text-indigo-200 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/30 rounded-lg shadow-sm"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 450, damping: 35, duration: 0.22 }
                    }
                  >
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-indigo-400 rounded-full" />
                  </motion.div>
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Search, Resume & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenPalette}
            className="inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
            aria-label="Open quick navigation"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline lg:hidden xl:inline">Search</span>
            <kbd className="hidden sm:inline font-mono text-[10px] text-slate-500">{IS_MAC ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 p-2 sm:px-3.5 sm:py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition shadow-sm"
            aria-label="Open resume options"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile View Switcher Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-6 py-4 space-y-2 overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
