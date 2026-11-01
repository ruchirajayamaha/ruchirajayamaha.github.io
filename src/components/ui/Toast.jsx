import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

export default function Toast({ toast }) {
  const isError = toast?.tone === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-4 w-full max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium shadow-xl backdrop-blur-md bg-slate-900/95 ${
              isError ? 'border-rose-500/40 text-rose-200' : 'border-emerald-500/40 text-emerald-200'
            }`}
          >
            {isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
