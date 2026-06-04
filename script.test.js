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

    test('Should return isValid false when email is invalid', () => {
        const result = validateFormFn('John', 'not-an-email', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should trim whitespace and validate as empty if only spaces are provided', () => {
        const result = validateFormFn('   ', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });
});
