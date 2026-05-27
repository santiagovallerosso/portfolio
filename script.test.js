// Mock global DOM variables before requiring the script
global.document = {
    querySelector: jest.fn(() => null),
    querySelectorAll: jest.fn(() => []),
    getElementById: jest.fn(() => null),
    createElement: jest.fn(() => ({})),
    head: { appendChild: jest.fn() },
    body: { classList: { add: jest.fn() } }
};
global.window = {
    addEventListener: jest.fn(),
    pageYOffset: 0,
    scrollY: 0
};
global.navigator = {
    userAgent: ''
};
global.IntersectionObserver = class {
    constructor(callback, options) {}
    observe() {}
    unobserve() {}
};

const { animateCounter } = require('./script.js');

describe('animateCounter', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('debería animar desde 0 hasta el valor final sin sufijos', () => {
        const element = { textContent: '100' };

        animateCounter(element);

        jest.advanceTimersByTime(30);
        expect(parseInt(element.textContent)).toBeGreaterThanOrEqual(2);

        jest.advanceTimersByTime(30 * 50);
        expect(element.textContent).toBe('100');
    });

    it('debería manejar sufijos como "+"', () => {
        const element = { textContent: '500+' };

        animateCounter(element);

        jest.advanceTimersByTime(30);
        expect(element.textContent).toMatch(/\d+\+/);

        jest.advanceTimersByTime(30 * 50);
        expect(element.textContent).toBe('500+');
    });

    it('debería manejar sufijos como "%"', () => {
        const element = { textContent: '99%' };

        animateCounter(element);

        jest.advanceTimersByTime(30);
        expect(element.textContent).toMatch(/\d+%/);

        jest.advanceTimersByTime(30 * 50);
        expect(element.textContent).toBe('99%');
    });

    it('debería ignorar texto que no puede ser parseado a número', () => {
        const element = { textContent: 'No soy un numero' };

        animateCounter(element);

        jest.advanceTimersByTime(30 * 50);
        expect(element.textContent).toBe('No soy un numero');
    });
});
