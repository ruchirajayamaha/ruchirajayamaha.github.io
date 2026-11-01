import { useCallback, useEffect, useRef, useState } from 'react';

const TOAST_DURATION_MS = 3200;

// One toast at a time: a new message replaces the current one and restarts the timer.
export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, tone = 'success') => {
    clearTimeout(timerRef.current);
    setToast({ id: Date.now(), message, tone });
    timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, showToast };
}
