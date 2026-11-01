import { useState } from 'react';

const EMPTY_FORM = { name: '', email: '', subject: 'Internship Opportunity', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please write at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  return errors;
};

// Lives above the views so a half-written draft survives switching tabs.
export function useContactForm(showToast) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '3a94fa64-d032-4654-9997-64ebe0b8d363',
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Inquiry',
          message: form.message,
          from_name: 'Portfolio Inquiry'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setForm(EMPTY_FORM);
        showToast('Message sent. Thank you!');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Submission failed. Please check your inputs.');
        showToast('Message not sent', 'error');
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('Network error occurred. Please try again or send a direct email.');
      showToast('Message not sent', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, fieldErrors, isSubmitting, submitStatus, errorMessage, setSubmitStatus, updateField, handleSubmit };
}
