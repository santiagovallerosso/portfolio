export interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type Language = 'en' | 'es' | 'fr' | 'de';

export interface TranslationData {
  languageName: string;
  formTitle: string;
  formSubtitle: string;

  // Field Labels
  labelName: string;
  labelEmail: string;
  labelSubject: string;
  labelMessage: string;

  // Placeholders
  placeholderName: string;
  placeholderEmail: string;
  placeholderSubject: string;
  placeholderMessage: string;

  // Buttons and Actions
  btnSubmit: string;
  btnSubmitting: string;
  btnReset: string;

  // Validation Messages (validation will use active language)
  errNameRequired: string;
  errNameTooShort: string;
  errNameChars: string;
  errEmailRequired: string;
  errEmailInvalid: string;
  errSubjectRequired: string;
  errSubjectTooShort: string;
  errMessageRequired: string;
  errMessageTooShort: string;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  errors: Partial<Record<keyof FormFields, string>>;
}
