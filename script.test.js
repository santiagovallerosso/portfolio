const { validateContactForm: exportedValidateContactForm, initStickyNavbar: exportedInitStickyNavbar } = require('./script.js');

const fs = require('fs');

let validateContactForm;
let initStickyNavbar;

// We dynamically extract validateContactForm to avoid module issues since script.js had some nasty module exports conflicts
try {
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function validateContactForm[\s\S]*?return \{ isValid: true \};\n\}/);
    if (match) {
        eval(match[0].replace('function validateContactForm', 'validateContactForm = function'));
        initStickyNavbar = exportedInitStickyNavbar;
    }
} catch (e) {
    console.error(e);
}

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
        const result = validateContactForm(['John'], { email: 'john@example.com' }, ['Hello']);
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should handle non-string types gracefully (number, arrays) without crashing', () => {
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

describe('initStickyNavbar', () => {
    let mockStickyNav;

    beforeEach(() => {
        // Reset dom and window state
        mockStickyNav = document.createElement('nav');
        mockStickyNav.id = 'main-nav';
        jest.spyOn(mockStickyNav.classList, 'add');
        jest.spyOn(mockStickyNav.classList, 'remove');
        document.body.appendChild(mockStickyNav);

        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('Should return early if stickyNav element does not exist', () => {
        document.body.innerHTML = '';
        const cleanup = initStickyNavbar();
        expect(typeof cleanup).toBe('function');
        // If we call cleanup it shouldn't crash
        cleanup();
    });

    test('Should add hidden class on scroll down', () => {
        initStickyNavbar();

        // Mock scroll down
        window.pageYOffset = 100;
        window.dispatchEvent(new Event('scroll'));

        expect(mockStickyNav.classList.add).toHaveBeenCalledWith('hidden');
    });

    test('Should remove hidden class on scroll up', () => {
        initStickyNavbar();

        // Mock scroll down first
        window.pageYOffset = 100;
        window.dispatchEvent(new Event('scroll'));

        // Mock scroll up
        window.pageYOffset = 50;
        window.dispatchEvent(new Event('scroll'));

        expect(mockStickyNav.classList.remove).toHaveBeenCalledWith('hidden');
    });

    test('Should cleanup event listeners correctly', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const cleanup = initStickyNavbar();

        cleanup();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});
