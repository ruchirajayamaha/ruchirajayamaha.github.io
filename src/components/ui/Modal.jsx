import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Shared dialog shell: backdrop, Escape, focus trap, focus restore and scroll lock.
export default function Modal({ open, onClose, labelledBy, align = 'center', panelClassName = '', children }) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Runs before any child effect can move focus into the dialog.
  useLayoutEffect(() => {
    if (open) previousFocusRef.current = document.activeElement;
  }, [open]);

  // Passive on purpose: React reapplies its pre-commit focus after layout cleanups, undoing a restore there.
  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    if (panel && !panel.contains(document.activeElement)) panel.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current instanceof HTMLElement) previousFocusRef.current.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={`fixed inset-0 z-[60] flex justify-center p-4 bg-slate-950/80 backdrop-blur-md ${
            align === 'top' ? 'items-start pt-[12vh]' : 'items-center'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className={`bg-slate-900 border border-slate-800 rounded-2xl w-full shadow-2xl relative focus:outline-none ${panelClassName}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
