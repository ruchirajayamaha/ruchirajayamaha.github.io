import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Copy, ExternalLink, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { LinkedinIcon } from '../components/ui/SocialIcons';

const inputClass = (hasError) => `w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition placeholder:text-slate-600 ${
  hasError ? 'border-rose-500/70' : 'border-slate-800'
}`;

function FieldError({ id, message }) {
  if (!message) return null;
  return <p id={id} className="mt-1 text-xs text-rose-300">{message}</p>;
}

export default function ContactView({ contact, onCopyEmail, copiedEmail }) {
  const { form, fieldErrors, isSubmitting, submitStatus, errorMessage, setSubmitStatus, updateField, handleSubmit } = contact;
  const emailFallbackHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;

  return (
    <div className="py-6 min-h-[75vh] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Header & Quick Metadata Pills */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Let's Connect for Opportunities</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            I am actively preparing for an internship opportunity in Data Science, Machine Learning, or Analytics. Reach out directly for collaboration or interview inquiries.
          </p>

          {/* Quick Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Status: Available in 3 Months
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Location: Colombo, Sri Lanka (UTC+05:30)
            </div>
          </div>
        </div>

        {/* Grid: Web3Forms Form & Secondary Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Glassmorphic Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider text-indigo-400">
                <Send className="w-4 h-4 text-indigo-400" /> Direct Inquiry Form
              </h3>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Powered by Web3Forms
              </span>
            </div>

            <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Check className="w-5 h-5 shrink-0" /> Message Sent Successfully!
                </div>
                <p className="leading-relaxed">
                  Thank you! Your message has been sent directly to Ruchira. I'll get back to you shortly.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-3"
              >
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" /> Submission Failed
                </div>
                <p className="leading-relaxed">
                  {errorMessage || 'Something went wrong. Please try again or reach out via direct email.'}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="px-3 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 text-xs font-semibold transition"
                  >
                    Retry Submission
                  </button>
                  <a
                    href={emailFallbackHref}
                    className="px-3 py-1 rounded border border-rose-500/30 hover:bg-rose-600/20 text-rose-200 text-xs font-semibold transition inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> Send via Email Instead
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  className={inputClass(fieldErrors.name)}
                />
                <FieldError id="contact-name-error" message={fieldErrors.name} />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  className={inputClass(fieldErrors.email)}
                />
                <FieldError id="contact-email-error" message={fieldErrors.email} />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-400 mb-1">
                Subject / Reason
              </label>
              <select
                id="contact-subject"
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className={inputClass(false)}
              >
                <option value="Internship Opportunity">Internship Opportunity</option>
                <option value="Quant / ML Collaboration">Quant / ML Collaboration</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="contact-message"
                rows="5"
                required
                placeholder="Write your message here regarding internship opportunities or quantitative projects..."
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                className={`${inputClass(fieldErrors.message)} resize-none`}
              ></textarea>
              <FieldError id="contact-message-error" message={fieldErrors.message} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
          </div>

          {/* Right: Secondary Contact Options Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider text-indigo-400 border-b border-slate-800/80 pb-3">
                Secondary Channels
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-sm transition flex items-center justify-between shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Send Direct Email
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <button
                  onClick={onCopyEmail}
                  className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-medium text-sm transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 font-mono text-xs">
                    <Copy className="w-4 h-4 text-slate-400" />
                    {copiedEmail ? (
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    ) : (
                      <span>Copy Email Address</span>
                    )}
                  </span>
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">Gmail</span>
                  )}
                </button>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-200 font-medium text-sm transition flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-sky-400" /> Connect on LinkedIn
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
              <p className="text-xs font-mono text-slate-400">Direct Email Address:</p>
              <p className="text-xs font-mono font-bold text-slate-200 select-all">{personalInfo.email}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
