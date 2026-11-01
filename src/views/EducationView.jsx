import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { useMotionVariants } from '../lib/motion';

export default function EducationView() {
  const { cardContainerVariants, cardItemVariants } = useMotionVariants();

  return (
    <div className="space-y-8 py-4">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Academic Background</span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Education & Credentials</h2>
      </div>

      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative border-l border-slate-800 ml-3 pl-8 space-y-8"
      >
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            variants={cardItemVariants}
            className="relative group"
          >
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
