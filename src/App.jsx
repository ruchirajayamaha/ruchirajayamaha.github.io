import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Copy,
  FileText,
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import { navItems } from './data/navigation';
import { personalInfo } from './data/portfolioData';
import { useContactForm } from './hooks/useContactForm';
import { useCopyEmail } from './hooks/useCopyEmail';
import { useToast } from './hooks/useToast';
import { useMotionVariants } from './lib/motion';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import ProjectMethodologyModal from './components/modals/ProjectMethodologyModal';
import ResumeModal from './components/modals/ResumeModal';
import CommandPalette from './components/ui/CommandPalette';
import { GithubIcon, LinkedinIcon } from './components/ui/SocialIcons';
import Toast from './components/ui/Toast';
import AboutView from './views/AboutView';
import CompetenciesView from './views/CompetenciesView';
import ContactView from './views/ContactView';
import EducationView from './views/EducationView';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';

const openExternal = (url) => window.open(url, '_blank', 'noopener,noreferrer');

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [scrollToLab, setScrollToLab] = useState(false);

  const { pageVariants } = useMotionVariants();
  const { toast, showToast } = useToast();
  const { copiedEmail, copyEmail } = useCopyEmail(showToast);
  const contact = useContactForm(showToast);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeResume = useCallback(() => setIsResumeOpen(false), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const closeProject = useCallback(() => setActiveProject(null), []);
  const clearLabScroll = useCallback(() => setScrollToLab(false), []);

  useEffect(() => {
    document.title = navItems.find((item) => item.id === activeTab).title;
  }, [activeTab]);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveProject(null);
        setIsResumeOpen(false);
        setIsPaletteOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const commands = useMemo(() => [
    { id: 'projects', label: 'Projects', group: 'Page', icon: FolderGit2, keywords: 'garch churn shap simplex models work', run: () => handleTabChange('projects') },
    {
      id: 'quant-lab',
      label: 'Quant Lab',
      group: 'Page',
      icon: Activity,
      keywords: 'monte carlo gbm simulation var sharpe interactive',
      run: () => {
        setActiveTab('home');
        setScrollToLab(true);
      },
    },
    { id: 'education', label: 'Education', group: 'Page', icon: GraduationCap, keywords: 'degree university ruhuna nibm', run: () => handleTabChange('education') },
    { id: 'competencies', label: 'Competencies', group: 'Page', icon: Sparkles, keywords: 'skills python sql r stack', run: () => handleTabChange('competencies') },
    { id: 'about', label: 'About', group: 'Page', icon: User, keywords: 'background bio', run: () => handleTabChange('about') },
    { id: 'contact', label: 'Contact', group: 'Page', icon: Mail, keywords: 'hire message inquiry form', run: () => handleTabChange('contact') },
    { id: 'home', label: 'Home', group: 'Page', icon: Home, keywords: 'start landing', run: () => handleTabChange('home') },
    { id: 'resume', label: 'Download Resume', group: 'Action', icon: FileText, keywords: 'cv pdf', run: () => setIsResumeOpen(true) },
    { id: 'copy-email', label: 'Copy Email', group: 'Action', icon: Copy, keywords: 'address clipboard', run: () => copyEmail() },
    { id: 'github', label: 'GitHub', group: 'Link', icon: GithubIcon, keywords: 'code repositories source', run: () => openExternal(personalInfo.github) },
    { id: 'linkedin', label: 'LinkedIn', group: 'Link', icon: LinkedinIcon, keywords: 'profile network', run: () => openExternal(personalInfo.linkedin) },
  ], [copyEmail, handleTabChange]);

  const copyProps = { onCopyEmail: copyEmail, copiedEmail };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Ambience Gradients & Stochastic Grid */}
      <div className="fixed inset-0 -z-10 bg-stochastic-grid opacity-35 pointer-events-none" />
      <div className="fixed top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      <Navbar
        activeTab={activeTab}
        onNavigate={handleTabChange}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />

      {/* Main SPA Content Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex-1 w-full flex flex-col justify-start md:justify-center min-h-[calc(100vh-14rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="my-auto w-full"
          >
            {activeTab === 'home' && (
              <HomeView onNavigate={handleTabChange} {...copyProps} scrollToLab={scrollToLab} onLabScrolled={clearLabScroll} />
            )}
            {activeTab === 'about' && <AboutView onNavigate={handleTabChange} />}
            {activeTab === 'competencies' && <CompetenciesView />}
            {activeTab === 'projects' && <ProjectsView onOpenProject={setActiveProject} />}
            {activeTab === 'education' && <EducationView />}
            {activeTab === 'contact' && <ContactView contact={contact} {...copyProps} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <ProjectMethodologyModal project={activeProject} onClose={closeProject} />
      <ResumeModal open={isResumeOpen} onClose={closeResume} {...copyProps} />
      <CommandPalette open={isPaletteOpen} onClose={closePalette} commands={commands} />
      <Toast toast={toast} />

      <Footer onNavigate={handleTabChange} />
    </div>
  );
}
