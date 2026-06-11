const { validateContactForm } = require('./script.js');

describe('validateContactForm', () => {
    test('Should return isValid true when all fields are correct', () => {
        const result = validateContactForm('John', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: true });
    });

    test('Should return isValid false when name is empty', () => {
        const result = validateContactForm('', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should return isValid false when email is empty', () => {
        const result = validateContactForm('John', '', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should return isValid false when message is empty', () => {
        const result = validateContactForm('John', 'john@example.com', '');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should trim whitespace and validate as empty if only spaces, tabs, or newlines are provided', () => {
        const result = validateContactForm(' \t\n ', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    // Casos nulos, undefined y tipos no compatibles
    test('Should handle null values gracefully and return isValid false', () => {
        const result = validateContactForm(null, 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle undefined values gracefully and return isValid false', () => {
        const result = validateContactForm('John', undefined, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle non-string types gracefully (number, arrays) without crashing', () => {
        const result = validateContactForm(123, ['email'], { message: 'hello' });
        // Since we stringify arrays and objects, array ['email'] becomes 'email' (invalid email), object becomes '[object Object]'
        // If email is 'email', it will fail the regex.
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    // Longitudes extremas
    test('Should handle extremely long strings safely', () => {
        const veryLongString = 'A'.repeat(10000);
        const result = validateContactForm('John', 'john@example.com', veryLongString);
        expect(result).toEqual({ isValid: true });
    });

    test('Should handle single character inputs successfully if email is valid', () => {
        const result = validateContactForm('J', 'a@bc.de', 'H');
        expect(result).toEqual({ isValid: true });
    });

    // Emails maliciosos o inusuales
    test('Should return isValid false when email lacks domain structural parts (user@domain)', () => {
        const result = validateContactForm('John', 'user@domain', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email lacks TLD parts (user@.com)', () => {
        const result = validateContactForm('John', 'user@.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email lacks username part (@domain.com)', () => {
        const result = validateContactForm('John', '@domain.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email has invalid special characters in host', () => {
        const result = validateContactForm('John', 'user@dom!ain.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
});
