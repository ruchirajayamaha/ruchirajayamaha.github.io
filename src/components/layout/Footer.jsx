import { personalInfo } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-900 py-8 text-slate-500 bg-slate-950/80 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Ruchira Jayamaha. Built with React & Tailwind CSS.</p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
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
  );
}
