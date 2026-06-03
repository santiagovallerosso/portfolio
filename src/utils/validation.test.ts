import { describe, it, expect } from 'vitest';
import { validateContactForm } from './validation';
import { translations } from './translations';
import { FormFields, Language } from '../types';

describe('validateContactForm', () => {
  const defaultValidFields: FormFields = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Important Subject',
    message: 'This is a message that is longer than fifteen characters.'
  };

  describe('Happy Paths', () => {
    it('should return isValid true for a fully valid form in English', () => {
      const result = validateContactForm(defaultValidFields, 'en');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should return isValid true for a fully valid form in Spanish', () => {
      const result = validateContactForm(defaultValidFields, 'es');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should allow valid names with spaces and accented characters', () => {
      const result = validateContactForm({
        ...defaultValidFields,
        name: "José d'Ávila-Smith"
      }, 'es');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Name Validation', () => {
    it('should fail if name is empty (English)', () => {
      const result = validateContactForm({ ...defaultValidFields, name: ' ' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe(translations.en.errNameRequired);
      expect(result.error).toBe(translations.en.errNameRequired);
    });

    it('should fail if name is empty (Spanish)', () => {
      const result = validateContactForm({ ...defaultValidFields, name: '' }, 'es');
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe(translations.es.errNameRequired);
    });

    it('should fail if name is too short', () => {
      const result = validateContactForm({ ...defaultValidFields, name: 'A' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe(translations.en.errNameTooShort);
    });

    it('should fail if name contains numbers', () => {
      const result = validateContactForm({ ...defaultValidFields, name: 'John Doe 123' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe(translations.en.errNameChars);
    });
  });

  describe('Email Validation', () => {
    it('should fail if email is empty', () => {
      const result = validateContactForm({ ...defaultValidFields, email: '   ' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe(translations.en.errEmailRequired);
    });

    it('should fail if email is invalid format (missing @)', () => {
      const result = validateContactForm({ ...defaultValidFields, email: 'johndoe.com' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe(translations.en.errEmailInvalid);
    });

    it('should fail if email is invalid format (missing domain)', () => {
      const result = validateContactForm({ ...defaultValidFields, email: 'johndoe@' }, 'es');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe(translations.es.errEmailInvalid);
    });
  });

  describe('Subject Validation', () => {
    it('should fail if subject is empty', () => {
      const result = validateContactForm({ ...defaultValidFields, subject: '' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.subject).toBe(translations.en.errSubjectRequired);
    });

    it('should fail if subject is too short (< 3 chars)', () => {
      const result = validateContactForm({ ...defaultValidFields, subject: 'Hi' }, 'es');
      expect(result.isValid).toBe(false);
      expect(result.errors.subject).toBe(translations.es.errSubjectTooShort);
    });
  });

  describe('Message Validation', () => {
    it('should fail if message is empty', () => {
      const result = validateContactForm({ ...defaultValidFields, message: '' }, 'en');
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBe(translations.en.errMessageRequired);
    });

    it('should fail if message is too short (< 15 chars)', () => {
      const result = validateContactForm({ ...defaultValidFields, message: 'Too short MSG' }, 'es');
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBe(translations.es.errMessageTooShort);
    });
  });

  describe('Multiple Errors', () => {
    it('should return multiple errors and set the summary to the first error', () => {
      const result = validateContactForm({
        name: '1',
        email: 'invalid',
        subject: '12',
        message: 'short'
      }, 'en');

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBe(4);
      expect(result.errors.name).toBe(translations.en.errNameTooShort); // Fails too short check first
      expect(result.errors.email).toBe(translations.en.errEmailInvalid);
      expect(result.errors.subject).toBe(translations.en.errSubjectTooShort);
      expect(result.errors.message).toBe(translations.en.errMessageTooShort);

      // Error summary should correspond to the first property checked/failed
      expect(result.error).toBe(result.errors.name);
    });
  });
});
