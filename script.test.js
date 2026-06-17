
const { validateContactForm, updateSectionOffsets, getSectionOffsets, determineActiveSection, setSectionOffsets, invalidateOffsetCache } = require('./script.js');

global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {}
    observe(target) {}
    unobserve(target) {}
    disconnect() {}
};

describe('validateContactForm Tests', () => {
    test('Should return isValid false when message is empty', () => {
        const result = validateContactForm('John', 'john@example.com', '');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

    test('Should handle extremely long strings safely', () => {
        const veryLongString = 'A'.repeat(10000);
        const result = validateContactForm('John', 'john@example.com', veryLongString);
        expect(result).toEqual({ isValid: true });
    });
});
