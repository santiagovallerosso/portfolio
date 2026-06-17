
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {}
    observe(target) {}
    unobserve(target) {}
    disconnect() {}
};

const fs = require('fs');

const {
  updateSectionOffsets,
  getSectionOffsets,
  determineActiveSection,
  invalidateOffsetCache
} = require('./script.js');



let validateFormFn;

try {
    const fs = require('fs');
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function validateContactForm[\s\S]*?return \{ isValid: true \};\n\}/);
    if (match) {
        eval(match[0].replace('function validateContactForm', 'validateFormFn = function'));
    }
} catch (e) {
    console.error(e);
}

describe('validateContactForm', () => {
    test('Should return isValid true when all fields are correct', () => {
        const result = validateFormFn('John', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: true });
    });

    test('Should return isValid false when name is empty', () => {
        const result = validateFormFn('', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should return isValid false when email is empty', () => {
        const result = validateFormFn('John', '', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should return isValid false when message is empty', () => {
        const result = validateFormFn('John', 'john@example.com', '');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should trim whitespace and validate as empty if only spaces, tabs, or newlines are provided', () => {
        const result = validateFormFn(' \t\n ', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    // Casos nulos, undefined y tipos no compatibles
    test('Should handle null values gracefully and return isValid false', () => {
        const result = validateFormFn(null, 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle undefined values gracefully and return isValid false', () => {
        const result = validateFormFn('John', undefined, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle object/array types gracefully without crashing', () => {
        const result = validateFormFn(['John'], { email: 'john@example.com' }, ['Hello']);
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should handle non-string types gracefully (number, arrays) without crashing', () => {
        const result = validateFormFn(123, ['email'], { message: 'hello' });
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    // Sanitización y Espacios en blanco
    test('Should trim whitespaces from inputs and return true', () => {
        const result = validateFormFn('   John   ', '  john@example.com  ', '   Hello world!   ');
        expect(result).toEqual({ isValid: true });
    });

    test('Should fail if inputs are only whitespaces', () => {
        const result = validateFormFn('   ', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    // Seguridad y extremos (Performance y ReDoS)
    test('Should reject extremely long emails', () => {
        const longEmail = 'a'.repeat(300) + '@example.com';
        const result = validateFormFn('John', longEmail, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    // Formatos de email inválidos
    test('Should reject email without @', () => {
        const result = validateFormFn('John', 'johnexample.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email without domain', () => {
        const result = validateFormFn('John', 'john@', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email with spaces', () => {
        const result = validateFormFn('John', 'john @example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email with special invalid characters', () => {
        const result = validateFormFn('John', 'john!@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
});
