

const fs = require('fs');

let validateContactForm;

// We dynamically extract validateContactForm to avoid module issues since script.js had some nasty module exports conflicts
try {
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function validateContactForm[\s\S]*?return \{ isValid: true \};\n\}/g);
    if (match) {
        eval(match[match.length - 1].replace('function validateContactForm', 'validateContactForm = function'));
    }
} catch (e) {
    console.error(e);
}


let determineActiveSection;
try {
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function determineActiveSection[\s\S]*?return activeSection;\n\}/);
    if (match) {
        eval(match[0].replace('function determineActiveSection', 'determineActiveSection = function'));
    }
} catch (e) {
    console.error(e);
}


describe('determineActiveSection', () => {
    test('Should return null if offsets is null', () => {
        expect(determineActiveSection(500, null)).toBeNull();
    });

    test('Should return null if offsets is empty', () => {
        expect(determineActiveSection(500, {})).toBeNull();
    });

    test('Should return the correct active section based on scrollY and threshold', () => {
        const offsets = {
            'home': 0,
            'about': 500,
            'projects': 1000
        };

        // Before 'about' enters threshold (500 - 100 = 400)
        expect(determineActiveSection(300, offsets)).toBe('home');

        // Right at the threshold of 'about'
        expect(determineActiveSection(400, offsets)).toBe('about');

        // Past 'about' but before 'projects' threshold (1000 - 100 = 900)
        expect(determineActiveSection(600, offsets)).toBe('about');

        // Right at the threshold of 'projects'
        expect(determineActiveSection(900, offsets)).toBe('projects');
    });

    test('Should return null if scrollY is before any section threshold and sections have larger offsets', () => {
         const offsets = {
            'home': 200,
            'about': 500
         };
         // Threshold is 100, so home is active at 100.
         // Scroll at 50, before threshold of home.
         // Note: the loop will just not set anything and remain activeSection=null, since no condition scrollY >= offset - threshold is met.
         expect(determineActiveSection(50, offsets)).toBeNull();
    });
});


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

    test('Should handle object/array types gracefully without crashing', () => {
        const result = validateContactForm(123, ['email'], { message: 'hello' });
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
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
