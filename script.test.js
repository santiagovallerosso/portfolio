
global.document = {
    addEventListener: () => {},
    querySelector: () => ({ addEventListener: () => {}, classList: { toggle: () => {}, remove: () => {} }, getAttribute: () => '', style: {} }),
    querySelectorAll: () => [],
    getElementById: () => null,
    documentElement: { lang: '' },
    body: { innerHTML: '', appendChild: () => {} }
};

global.window = {
    innerWidth: 1024,
    pageYOffset: 0,
    scrollY: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    alert: () => {}
};

global.IntersectionObserver = class {
    constructor(callback, options) {}
    observe(target) {}
    unobserve(target) {}
    disconnect() {}
};


global.IntersectionObserver = class {
    constructor(callback, options) {}
    observe(target) {}
    unobserve(target) {}
    disconnect() {}
};

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
});
