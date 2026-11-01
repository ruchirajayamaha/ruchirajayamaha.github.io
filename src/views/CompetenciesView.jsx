import { motion } from 'framer-motion';
import { BarChart3, Binary, BrainCircuit, Code2, Sparkles } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { useMotionVariants } from '../lib/motion';

const getCategoryIcon = (index) => {
  switch (index) {
    case 0: return <Binary className="w-5 h-5 text-indigo-400" />;
    case 1: return <BrainCircuit className="w-5 h-5 text-emerald-400" />;
    case 2: return <Code2 className="w-5 h-5 text-sky-400" />;
    case 3: return <BarChart3 className="w-5 h-5 text-amber-400" />;
    default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
  }
};

export default function CompetenciesView() {
  const { cardContainerVariants, cardItemVariants, cardHover } = useMotionVariants();

  return (
    <div className="space-y-8 py-4">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Knowledge Architecture</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Core Competencies</h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Equally grounded in pure mathematics, statistical theory, and production-ready programming tools.
        </p>
      </div>

      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skillsData.map((group, idx) => (
          <motion.div
            key={idx}
            variants={cardItemVariants}
            whileHover={cardHover}
            className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-colors transition-shadow duration-300 space-y-4"
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
