import { Activity, ArrowRight, Layers } from 'lucide-react';

export default function AboutView({ onNavigate }) {
  return (
    <div className="space-y-8 py-4">
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
                onClick={() => onNavigate('projects')}
                className="w-full py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                Explore Applied Projects <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
