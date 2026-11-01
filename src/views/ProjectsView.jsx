import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { useMotionVariants } from '../lib/motion';
import MathFormula from '../components/MathFormula';
import { GithubIcon } from '../components/ui/SocialIcons';

export default function ProjectsView({ onOpenProject }) {
  const { cardContainerVariants, cardItemVariants, cardHover } = useMotionVariants();

  return (
    <div className="space-y-8 py-4">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Proven Evidence</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Featured Projects</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Showcasing formal mathematical modeling, empirical validation, and measurable impact.
        </p>
      </div>

      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
      >
        {projectsData.map((proj) => (
          <motion.div
            key={proj.id}
            variants={cardItemVariants}
            whileHover={cardHover}
            className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between h-full hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-colors transition-shadow duration-300 group"
          >
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-mono text-indigo-400 tracking-wider uppercase font-semibold">
                    {proj.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1 group-hover:text-indigo-300 transition">
                    {proj.title}
                  </h3>
                </div>

                {/* Quant Chips Badges */}
                {proj.quantChips && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {proj.quantChips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {/* Responsive LaTeX Math Formula Container with Fade Mask */}
                {proj.formula && (
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-indigo-500/20 my-3 shadow-inner max-w-full overflow-hidden relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-indigo-400/90 uppercase tracking-wider block">
                        Mathematical Formulation
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">LaTeX</span>
                    </div>
                    <div className="overflow-x-auto no-scrollbar max-w-full py-1 formula-mask">
                      <MathFormula math={proj.formula} block={true} />
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1 mt-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                  Quantified Empirical Impact
                </span>
                <p className="text-xs font-medium text-emerald-400 leading-relaxed">
                  {proj.metrics}
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-4 mt-auto">
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
                  onClick={() => onOpenProject(proj)}
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition"
                >
                  <BookOpen className="w-3.5 h-3.5" /> View Methodology
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
