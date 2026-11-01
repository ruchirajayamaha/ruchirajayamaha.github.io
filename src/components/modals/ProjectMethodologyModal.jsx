import { Fragment, useState } from 'react';
import { ArrowDown, ArrowRight, Code2, FileText, Lightbulb, X } from 'lucide-react';
import MathFormula from '../MathFormula';
import Modal from '../ui/Modal';
import { GithubIcon } from '../ui/SocialIcons';

const headingClass = 'font-semibold font-mono text-xs uppercase tracking-wider text-slate-400 mb-2';

function EvidenceTag({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-0">
      <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block">{label}</span>
      <span className="text-xs font-medium text-slate-200 block mt-1 leading-snug">{value}</span>
    </div>
  );
}

function PipelineFlow({ steps }) {
  return (
    <ol className="flex flex-col lg:flex-row lg:items-stretch gap-1.5">
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <li className="flex-1 min-w-0 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-indigo-400 font-semibold">Step {index + 1}</span>
            <p className="text-xs font-semibold text-slate-100 mt-0.5 leading-snug">{step.title}</p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.detail}</p>
          </li>
          {index < steps.length - 1 && (
            <li aria-hidden="true" className="flex items-center justify-center text-slate-600 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 hidden lg:block" />
              <ArrowDown className="w-3.5 h-3.5 lg:hidden" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}

function MethodologyPanel({ project }) {
  return (
    <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <EvidenceTag label="Cross-Validation Scheme" value={project.evidence.crossValidation} />
        <EvidenceTag label="Evaluation Metric" value={project.evidence.evaluationMetric} />
        <EvidenceTag label="Production Readiness" value={project.evidence.productionReadiness} />
      </div>

      {/* LaTeX Equation Container in Modal */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 max-w-full overflow-hidden">
        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
          Analytical Framework Equation
        </span>
        <div className="overflow-x-auto no-scrollbar max-w-full py-1">
          <MathFormula math={project.formula} block={true} />
        </div>
      </div>

      <div>
        <h4 className={headingClass}>Architecture Pipeline</h4>
        <PipelineFlow steps={project.pipeline} />
      </div>

      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
        <h4 className="font-semibold font-mono text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Key Mathematical Insight
        </h4>
        <p>{project.insight.summary}</p>
        <div className="overflow-x-auto no-scrollbar max-w-full">
          <MathFormula math={project.insight.formula} block={true} />
        </div>
      </div>

      <div>
        <h4 className={headingClass}>Problem & Mathematical Approach</h4>
        <p>{project.description}</p>
      </div>

      <div>
        <h4 className={headingClass}>Empirical Impact & Metrics</h4>
        <p className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
          {project.metrics}
        </p>
      </div>
    </div>
  );
}

function CodePanel({ snippet }) {
  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3.5 py-2 border-b border-slate-800">
        <span className="text-[11px] font-mono text-slate-300 truncate">{snippet.filename}</span>
        <span className="text-[10px] font-mono text-slate-500 shrink-0">Illustrative preview</span>
      </div>
      <pre className="p-3.5 overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-slate-300 max-h-[46vh]">
        <code>{snippet.code}</code>
      </pre>
      <p className="px-3.5 py-2 border-t border-slate-800 text-[11px] text-slate-500">
        A condensed sketch of the technique, written for this page. It is not the project's full source.
      </p>
    </div>
  );
}

function ProjectDetail({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('methodology');
  const tabs = [
    { id: 'methodology', label: 'Methodology', icon: FileText },
    ...project.snippets.map((snippet) => ({ id: snippet.language, label: snippet.language, icon: Code2 })),
  ];
  const activeSnippet = project.snippets.find((snippet) => snippet.language === activeTab);

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="pr-10">
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
          Project Proof of Work & Methodology
        </span>
        <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
          {project.title}
        </h3>
        <p className="text-xs text-indigo-300 font-mono mt-0.5">{project.subtitle}</p>
        <p className="text-xs text-slate-400 font-mono mt-2">{project.methodology}</p>
      </div>

      <div role="tablist" aria-label="Project detail" className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === id ? 'bg-indigo-600/25 text-indigo-200' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activeSnippet ? <CodePanel snippet={activeSnippet} /> : <MethodologyPanel project={project} />}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-2"
        >
          <GithubIcon className="w-4 h-4" /> View on GitHub
        </a>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
        >
          Close Window
        </button>
      </div>
    </>
  );
}

export default function ProjectMethodologyModal({ project, onClose }) {
  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      labelledBy="project-modal-title"
      panelClassName="max-w-4xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
    >
      {project && <ProjectDetail key={project.id} project={project} onClose={onClose} />}
    </Modal>
  );
}
