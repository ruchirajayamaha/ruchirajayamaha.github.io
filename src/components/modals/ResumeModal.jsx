import { useEffect, useState } from 'react';
import { Check, Copy, Download, ExternalLink, FileText, Loader2, Mail, X } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { LinkedinIcon } from '../ui/SocialIcons';
import Modal from '../ui/Modal';

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;
const REQUEST_CV_HREF = `mailto:${personalInfo.email}?subject=${encodeURIComponent('CV Request via Portfolio')}&body=${encodeURIComponent(
  `Hi Ruchira,\n\nI came across your portfolio and would like to request your latest CV.\n\nRole / team:\n\nThanks,\n`
)}`;

const actionClass = 'w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-medium text-sm transition flex items-center justify-between';

function ResumeOptions({ onClose, onCopyEmail, copiedEmail }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'available' | 'missing'

  // The SPA fallback can answer 200 with HTML for a missing file, so check the content type too.
  useEffect(() => {
    const controller = new AbortController();

    fetch(RESUME_URL, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const isPdf = (response.headers.get('content-type') || '').includes('pdf');
        setStatus(response.ok && isPdf ? 'available' : 'missing');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('missing');
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        aria-label="Close modal"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="pr-10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Resume</span>
        <h3 id="resume-modal-title" className="text-xl font-bold text-white mt-1">
          {status === 'missing' ? 'My latest CV is on its way' : personalInfo.name}
        </h3>
        {status === 'missing' && (
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            The downloadable PDF is being refreshed. In the meantime, these are the fastest ways to reach me or review my background.
          </p>
        )}
      </div>

      {status === 'checking' && (
        <div className="flex items-center gap-2 py-6 justify-center text-sm text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" /> Looking up the latest version...
        </div>
      )}

      {status === 'available' && (
        <div className="space-y-3">
          <a
            href={RESUME_URL}
            download="Ruchira_Jayamaha_Resume.pdf"
            className="w-full p-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</span>
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={actionClass}>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400" /> View in Browser</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      )}

      {status === 'missing' && (
        <div className="space-y-3">
          <a
            href={REQUEST_CV_HREF}
            className="w-full p-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Request Updated CV</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={actionClass}>
            <span className="flex items-center gap-2"><LinkedinIcon className="w-4 h-4 text-sky-400" /> View LinkedIn Profile</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>

          <button onClick={onCopyEmail} className={actionClass}>
            <span className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-slate-400" />
              {copiedEmail ? <span className="text-emerald-400 font-semibold">Copied!</span> : <span>Copy Email Address</span>}
            </span>
            {copiedEmail && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      )}
    </>
  );
}

export default function ResumeModal({ open, onClose, ...optionProps }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="resume-modal-title" panelClassName="max-w-md p-6 sm:p-7 space-y-5">
      <ResumeOptions onClose={onClose} {...optionProps} />
    </Modal>
  );
}
