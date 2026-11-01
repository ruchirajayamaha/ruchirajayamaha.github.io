import { useCallback, useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    return document.execCommand('copy');
  } catch (err) {
    console.error('Copy fallback failed', err);
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
};

export function useCopyEmail(showToast) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const timerRef = useRef(null);

  const copyEmail = useCallback(async (e) => {
    if (e) e.preventDefault();
    const emailText = personalInfo.email;

    let copied = false;
    try {
      await navigator.clipboard.writeText(emailText);
      copied = true;
    } catch {
      copied = fallbackCopyTextToClipboard(emailText);
    }

    if (copied) {
      setCopiedEmail(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedEmail(false), 2500);
      showToast('Email address copied');
    } else {
      showToast(`Couldn't copy automatically. Email: ${emailText}`, 'error');
    }
  }, [showToast]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { copiedEmail, copyEmail };
}
