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

    // Casos nulos, undefined y tipos no compatibles
    test('Should handle null values gracefully and return isValid false', () => {
        const result = validateContactForm(null, 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle undefined values gracefully and return isValid false', () => {
        const result = validateContactForm('John', undefined, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle object/array types gracefully without crashing', () => {
        const result = validateContactForm(['John'], { email: 'john@example.com' }, ['Hello']);
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' }); // because object stringifies to [object Object]
    });

    // Sanitización y Espacios en blanco
    test('Should trim whitespaces from inputs and return true', () => {
        const result = validateContactForm('   John   ', '  john@example.com  ', '   Hello world!   ');
        expect(result).toEqual({ isValid: true });
    });

    test('Should fail if inputs are only whitespaces', () => {
        const result = validateContactForm('   ', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    // Seguridad y extremos (Performance y ReDoS)
    test('Should reject extremely long emails', () => {
        const longEmail = 'a'.repeat(300) + '@example.com';
        const result = validateContactForm('John', longEmail, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    // Formatos de email inválidos
    test('Should reject email without @', () => {
        const result = validateContactForm('John', 'johnexample.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email without domain', () => {
        const result = validateContactForm('John', 'john@', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email with spaces', () => {
        const result = validateContactForm('John', 'john @example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email with special invalid characters', () => {
        const result = validateContactForm('John', 'john!@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
});
