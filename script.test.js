// Simple DOM element mock
class MockElement {
    constructor(tagName = 'div', options = {}) {
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

        this.offsetTop = options.offsetTop || 0;
        this.clientHeight = options.clientHeight || 0;
        this.offsetHeight = options.offsetHeight || 0;
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
    querySelector(sel) { return null; }
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
        if (id === 'sticky-nav') return documentMock.elements.stickyNav;
        if (id === 'inicio') return documentMock.elements.inicio;
        if (id === 'video-modal') return documentMock.elements.videoModal;
        if (id === 'youtube-player') return documentMock.elements.youtubePlayer;
        if (id === 'back-to-top') return documentMock.elements.backToTop;
        if (id === 'brand-modal') return documentMock.elements.brandModal;
        if (id === 'brand-player-1') return documentMock.elements.brandPlayer1;
        if (id === 'brand-player-2') return documentMock.elements.brandPlayer2;
        return documentMock.elements[id] || new MockElement();
    },
    querySelector: (sel) => {
        if (sel === '.hamburger') return documentMock.elements.hamburger;
        if (sel === '.nav-links') return documentMock.elements.navLinks;
        if (sel === '.contact-form') return documentMock.elements.contactForm;
        if (sel === '.about') return documentMock.elements.about;
        if (sel === '.hero') return documentMock.elements.hero;
        return new MockElement(); // fallback
    },
    querySelectorAll: (sel) => {
        if (sel === '.nav-links a') return documentMock.elements.navLinksAs || [];
        if (sel === 'a[href^="#"]') return documentMock.elements.anchors || [];
        if (sel === 'section') return documentMock.elements.sections || [];
        if (sel === '.project-card, .skill-category, .stat') return documentMock.elements.animated || [];
        return [];
    },
    getElementById: (id) => {
        if (id === 'sticky-nav') return documentMock.elements.stickyNav;
        if (id === 'inicio') return documentMock.elements.hero;
        return null;
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

documentMock.elements.contactForm.querySelector = (sel) => {
    if (sel === 'input[type="text"]') return documentMock.elements.nameInput;
    if (sel === 'input[type="email"]') return documentMock.elements.emailInput;
    if (sel === 'textarea') return documentMock.elements.messageTextArea;
    return new MockElement('input');
};

documentMock.elements.about = new MockElement();
documentMock.elements.hero = new MockElement();
documentMock.elements.stickyNav = new MockElement();
documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a')];

documentMock.elements.stickyNav = new MockElement();
documentMock.elements.inicio = new MockElement();
documentMock.elements.inicio.offsetTop = 0;
documentMock.elements.inicio.offsetHeight = 800;
documentMock.elements.videoModal = new MockElement();
documentMock.elements.youtubePlayer = new MockElement();
documentMock.elements.backToTop = new MockElement();
documentMock.elements.brandModal = new MockElement();
documentMock.elements.brandPlayer1 = new MockElement();
documentMock.elements.brandPlayer2 = new MockElement();

documentMock.elements.sections = [new MockElement('section'), new MockElement('section')];
documentMock.elements.sections.forEach(s => {
    s.offsetTop = 0;
    s.clientHeight = 500;
    s.getAttribute = (attr) => attr === 'id' ? 'test-id' : null;
});

const alertMock = jest.fn();
const intersectionObserverMock = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn()
}));

global.document = documentMock;
global.window = {
    addEventListener: jest.fn(),
    pageYOffset: 0,
    scrollY: 0,
    scrollTo: jest.fn(),
    IntersectionObserver: intersectionObserverMock,
    alert: alertMock,
    navigator: {
        userAgent: 'node'
    }
};
global.alert = alertMock;
global.IntersectionObserver = intersectionObserverMock;
global.FormData = jest.fn();

// Execute script
const { updateActiveNavLink } = require('./script.js');

describe('Portfolio Script Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';
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

    describe('updateActiveNavLink', () => {
        let sections;
        let linksById;
        let link1, link2, link3, link4;

        beforeEach(() => {
            // Setup sections with heights
            const s1 = new MockElement('section', { offsetTop: 0, clientHeight: 800 });
            s1.setAttribute('id', 'hero');
            const s2 = new MockElement('section', { offsetTop: 800, clientHeight: 600 });
            s2.setAttribute('id', 'about');
            const s3 = new MockElement('section', { offsetTop: 1400, clientHeight: 800 });
            s3.setAttribute('id', 'portfolio');
            const s4 = new MockElement('section', { offsetTop: 2200, clientHeight: 600 });
            s4.setAttribute('id', 'contact');

            sections = [s1, s2, s3, s4];

            link1 = new MockElement('a');
            link2 = new MockElement('a');
            link3 = new MockElement('a');
            link4 = new MockElement('a');

            linksById = {
                'hero': [link1],
                'about': [link2],
                'portfolio': [link3],
                'contact': [link4]
            };

            // Reset state
            updateActiveNavLink(0, sections, linksById, true);
        });

        test('Scroll = 0 (Initial case)', () => {
            updateActiveNavLink(0, sections, linksById);
            expect(link1.classList.contains('active')).toBe(true);
            expect(link2.classList.contains('active')).toBe(false);
            expect(link3.classList.contains('active')).toBe(false);
            expect(link4.classList.contains('active')).toBe(false);
        });

        test('Crossing threshold (Scroll down to about section)', () => {
            // s2.offsetTop - 200 = 600
            updateActiveNavLink(601, sections, linksById);
            expect(link1.classList.contains('active')).toBe(false);
            expect(link2.classList.contains('active')).toBe(true);
            expect(link3.classList.contains('active')).toBe(false);
            expect(link4.classList.contains('active')).toBe(false);
        });

        test('Entering specific section (Scroll within portfolio)', () => {
            // s3.offsetTop - 200 = 1200
            updateActiveNavLink(1500, sections, linksById);
            expect(link1.classList.contains('active')).toBe(false);
            expect(link2.classList.contains('active')).toBe(false);
            expect(link3.classList.contains('active')).toBe(true);
            expect(link4.classList.contains('active')).toBe(false);
        });

        test('Returning to 0', () => {
            // First go down
            updateActiveNavLink(1500, sections, linksById);
            expect(link3.classList.contains('active')).toBe(true);

            // Then back to top
            updateActiveNavLink(0, sections, linksById);
            expect(link1.classList.contains('active')).toBe(true);
            expect(link2.classList.contains('active')).toBe(false);
            expect(link3.classList.contains('active')).toBe(false);
        });

        test('Rapid scrolling to end', () => {
            // s4.offsetTop - 200 = 2000
            updateActiveNavLink(3000, sections, linksById);
            expect(link1.classList.contains('active')).toBe(false);
            expect(link2.classList.contains('active')).toBe(false);
            expect(link3.classList.contains('active')).toBe(false);
            expect(link4.classList.contains('active')).toBe(true);
        });


    });
});
