import { FormFields, Language, ValidationResult } from '../types';
import { translations } from './translations';

/**
 * Validates the contact form fields based on the selected language's translations.
 * @param fields The current form state.
 * @param lang The active language.
 * @returns A structured ValidationResult.
 */
export function validateContactForm(fields: FormFields, lang: Language): ValidationResult {
  const t = translations[lang];
  const errors: Partial<Record<keyof FormFields, string>> = {};

  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const subject = (fields.subject || '').trim();
  const message = (fields.message || '').trim();

  // 1. Name validation
  if (!name) {
    errors.name = t.errNameRequired;
  } else if (name.length < 2) {
    errors.name = t.errNameTooShort;
  } else {
    // Basic alphabetical check (letters and spaces only, supports accented characters etc.)
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if (!nameRegex.test(name)) {
      errors.name = t.errNameChars;
    }
  }

  // 2. Email validation
  if (!email) {
    errors.email = t.errEmailRequired;
  } else {
    // Custom robust email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = t.errEmailInvalid;
    }
  }

  // 3. Subject validation
  if (!subject) {
    errors.subject = t.errSubjectRequired;
  } else if (subject.length < 3) {
    errors.subject = t.errSubjectTooShort;
  }

  // 4. Message validation
  if (!message) {
    errors.message = t.errMessageRequired;
  } else if (message.length < 15) {
    errors.message = t.errMessageTooShort;
  }

  const keys = Object.keys(errors) as Array<keyof FormFields>;
  const isValid = keys.length === 0;

  // Single top-level error string summarizing the first error (used for general alert fallbacks)
  let errorSummary: string | null = null;
  if (!isValid && keys.length > 0) {
    const firstKey = keys[0];
    errorSummary = errors[firstKey] || null;
  }

  return {
    isValid,
    error: errorSummary,
    errors
  };
}
