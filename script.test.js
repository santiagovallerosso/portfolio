// Simple DOM element mock
class MockElement {
    constructor(tagName = 'div') {
        this.tagName = tagName.toUpperCase();
        this.classList = {
            classes: new Set(),
            add: (c) => this.classList.classes.add(c),
            remove: (c) => this.classList.classes.delete(c),
            toggle: (c) => {
                if (this.classList.classes.has(c)) {
                    this.classList.classes.delete(c);
                } else {
                    this.classList.classes.add(c);
                }
            },
            contains: (c) => this.classList.classes.has(c)
        };
        this.listeners = {};
        this.attributes = {};
        this.style = {};
        this.innerHTML = '';
        this.textContent = '';
        this.value = '';
        this.offsetTop = 0;
        this.clientHeight = 0;
        this.offsetHeight = 0;
    }

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    dispatchEvent(event) {
        const eventName = typeof event === 'string' ? event : event.type;
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(cb => cb.call(this, {
                preventDefault: () => {},
                target: this,
                getAttribute: (attr) => this.getAttribute(attr)
            }));
        }
    }

    click() {
        this.dispatchEvent('click');
    }

    setAttribute(name, value) { this.attributes[name] = value; }
    getAttribute(name) { return this.attributes[name] || null; }
    querySelector(sel) {
        if (sel === 'input[type="text"]') return documentMock.elements.nameInput;
        if (sel === 'input[type="email"]') return documentMock.elements.emailInput;
        if (sel === 'textarea') return documentMock.elements.messageTextArea;
        if (sel === '.hero-video') return new MockElement('video');
        return null;
    }
    querySelectorAll(sel) { return []; }
    reset() {
        this.classList.classes.clear();
        this.value = '';
    }
    scrollIntoView() {}
    appendChild() {}
}

// Mock document
const documentMock = {
    elements: {},
    getElementById: (id) => {
        if (documentMock.elements[id]) return documentMock.elements[id];
        const el = new MockElement();
        documentMock.elements[id] = el;
        return el;
    },
    querySelector: (sel) => {
        if (sel === '.hamburger') return documentMock.elements.hamburger;
        if (sel === '.nav-links') return documentMock.elements.navLinks;
        if (sel === '.contact-form') return documentMock.elements.contactForm;
        if (sel === '.about') return documentMock.elements.about;
        if (sel === '.hero') return documentMock.elements.hero;
        if (sel === '.hero-cinematic') return documentMock.elements.heroCinematic;
        if (sel === '.close-modal') return documentMock.elements.closeModal;
        if (sel === '.close-brand-modal') return documentMock.elements.closeBrandModal;
        if (sel === '.brand-modal-content') return documentMock.elements.brandModalContent;
        if (sel.startsWith('#')) return documentMock.getElementById(sel.slice(1));
        return new MockElement(); // fallback
    },
    querySelectorAll: (sel) => {
        if (sel === '.nav-links a') return documentMock.elements.navLinksAs || [];
        if (sel === 'a[href^="#"]') return documentMock.elements.anchors || [];
        if (sel === 'section') return documentMock.elements.sections || [];
        if (sel === '.project-card, .skill-category, .stat') return documentMock.elements.animated || [];
        if (sel === '.portfolio-card') return documentMock.elements.portfolioCards || [];
        if (sel === '.brand-card') return documentMock.elements.brandCards || [];
        return [];
    },
    createElement: (tag) => new MockElement(tag),
    head: new MockElement('head'),
    body: new MockElement('body'),
    addEventListener: (event, callback) => {}
};

// Setup elements
documentMock.elements.hamburger = new MockElement();
documentMock.elements.navLinks = new MockElement();
documentMock.elements.contactForm = new MockElement('form');
documentMock.elements.contactForm.reset = jest.fn();
documentMock.elements.nameInput = new MockElement('input');
documentMock.elements.emailInput = new MockElement('input');
documentMock.elements.messageTextArea = new MockElement('textarea');
documentMock.elements.about = new MockElement();
documentMock.elements.hero = new MockElement();
documentMock.elements.heroCinematic = new MockElement();
documentMock.elements.closeModal = new MockElement();
documentMock.elements.closeBrandModal = new MockElement();
documentMock.elements.brandModalContent = new MockElement();
documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a')];
documentMock.elements.portfolioCards = [new MockElement(), new MockElement()];
documentMock.elements.brandCards = [new MockElement(), new MockElement()];
documentMock.elements.sections = [new MockElement('section'), new MockElement('section')];

const alertMock = jest.fn();
const intersectionObserverMock = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn()
}));

global.document = documentMock;
global.navigator = {
    userAgent: 'node'
};
global.window = {
    addEventListener: jest.fn(),
    pageYOffset: 0,
    scrollY: 0,
    scrollTo: jest.fn(),
    IntersectionObserver: intersectionObserverMock,
    alert: alertMock,
    navigator: global.navigator
};
global.alert = alertMock;
global.IntersectionObserver = intersectionObserverMock;
global.FormData = jest.fn();

// Execute script
const { isMobileDevice } = require('./script.js');

describe('Portfolio Script Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';
        documentMock.body.classList.classes.clear();
    });

    test('Hamburger menu toggles active class', () => {
        const hamburger = documentMock.elements.hamburger;
        const navLinks = documentMock.elements.navLinks;

        hamburger.click();

        expect(hamburger.classList.contains('active')).toBe(true);
        expect(navLinks.classList.contains('active')).toBe(true);

        hamburger.click();
        expect(hamburger.classList.contains('active')).toBe(false);
        expect(navLinks.classList.contains('active')).toBe(false);
    });

    test('Clicking a nav link closes the menu', () => {
        const hamburger = documentMock.elements.hamburger;
        const navLinks = documentMock.elements.navLinks;
        const link = documentMock.elements.navLinksAs[0];

        // Open first
        hamburger.classList.add('active');
        navLinks.classList.add('active');

        link.click();

        expect(hamburger.classList.contains('active')).toBe(false);
        expect(navLinks.classList.contains('active')).toBe(false);
    });

    test('Contact form validation - empty fields', () => {
        const form = documentMock.elements.contactForm;

        form.dispatchEvent('submit');

        expect(alertMock).toHaveBeenCalledWith('Por favor completa todos los campos');
    });

    test('Contact form validation - invalid email', () => {
        const form = documentMock.elements.contactForm;
        documentMock.elements.nameInput.value = 'John Doe';
        documentMock.elements.emailInput.value = 'invalid-email';
        documentMock.elements.messageTextArea.value = 'Hello';

        form.dispatchEvent('submit');

        expect(alertMock).toHaveBeenCalledWith('Por favor ingresa un email válido');
    });

    test('Contact form validation - success', () => {
        const form = documentMock.elements.contactForm;
        documentMock.elements.nameInput.value = 'John Doe';
        documentMock.elements.emailInput.value = 'test@example.com';
        documentMock.elements.messageTextArea.value = 'Hello';

        form.dispatchEvent('submit');

        expect(alertMock).toHaveBeenCalledWith('¡Mensaje enviado! Gracias por contactarme.');
        expect(form.reset).toHaveBeenCalled();
    });

    describe('isMobileDevice', () => {
        const originalUserAgent = global.navigator.userAgent;

        afterEach(() => {
            global.navigator.userAgent = originalUserAgent;
        });

        test('returns true for iPhone', () => {
            global.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/04.1';
            expect(isMobileDevice()).toBe(true);
        });

        test('returns true for Android', () => {
            global.navigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36';
            expect(isMobileDevice()).toBe(true);
        });

        test('returns true for iPad', () => {
            global.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
            expect(isMobileDevice()).toBe(true);
        });

        test('returns false for Desktop Chrome', () => {
            global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
            expect(isMobileDevice()).toBe(false);
        });

        test('adds mobile class to body when isMobileDevice is true on load', () => {
            global.navigator.userAgent = 'iPhone';
            documentMock.body.classList.remove('mobile');

            // Re-require to trigger initial code execution
            jest.isolateModules(() => {
                require('./script.js');
            });

            expect(documentMock.body.classList.contains('mobile')).toBe(true);
        });

        test('does not add mobile class to body when isMobileDevice is false on load', () => {
            global.navigator.userAgent = 'Desktop';
            documentMock.body.classList.remove('mobile');

            jest.isolateModules(() => {
                require('./script.js');
            });

            expect(documentMock.body.classList.contains('mobile')).toBe(false);
        });
    });
});
