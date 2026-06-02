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
    }

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    dispatchEvent(event) {
        const eventName = typeof event === 'string' ? event : event.type;
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(cb => cb.call(this, typeof event === 'object' ? event : {
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
        if (sel === '.close-modal') return documentMock.elements.closeModalBtn;
        return new MockElement(); // fallback
    },
    querySelectorAll: (sel) => {
        if (sel === '.nav-links a') return documentMock.elements.navLinksAs || [];
        if (sel === 'a[href^="#"]') return documentMock.elements.anchors || [];
        if (sel === 'section') return documentMock.elements.sections || [];
        if (sel === '.project-card, .skill-category, .stat') return documentMock.elements.animated || [];
        if (sel === '.portfolio-card') return documentMock.elements.portfolioCards || [];
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

documentMock.elements.contactForm.querySelector = (sel) => {
    if (sel === 'input[type="text"]') return documentMock.elements.nameInput;
    if (sel === 'input[type="email"]') return documentMock.elements.emailInput;
    if (sel === 'textarea') return documentMock.elements.messageTextArea;
    return new MockElement('input');
};

documentMock.elements.about = new MockElement();
documentMock.elements.hero = new MockElement();
documentMock.elements.stickyNav = new MockElement();
documentMock.elements.navLinksAs = [
        (() => { const a = new MockElement('a'); a.setAttribute('href', '#inicio'); return a; })(),
        (() => { const a = new MockElement('a'); a.setAttribute('href', '#about'); return a; })()
    ];

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
documentMock.elements.closeModalBtn = new MockElement();

const validCard = new MockElement();
validCard.setAttribute('data-youtube-id', 'dQw4w9WgXcQ');
const invalidCard = new MockElement();

documentMock.elements.portfolioCards = [validCard, invalidCard];


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
jest.resetModules();
require('./script.js');

describe('Portfolio Script Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';
        documentMock.elements.videoModal.classList.classes.clear();
        documentMock.elements.youtubePlayer.src = '';
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

    test('Clicking a valid portfolio card opens the modal', () => {
        const validCard = documentMock.elements.portfolioCards[0];
        const modal = documentMock.elements.videoModal;
        const player = documentMock.elements.youtubePlayer;

        validCard.click();

        expect(modal.classList.contains('show')).toBe(true);
        expect(player.src).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
    });

    test('Clicking an invalid portfolio card does not open the modal', () => {
        const invalidCard = documentMock.elements.portfolioCards[1];
        const modal = documentMock.elements.videoModal;
        const player = documentMock.elements.youtubePlayer;

        modal.classList.classes.clear();
        player.src = '';

        invalidCard.click();

        expect(modal.classList.contains('show')).toBe(false);
        expect(player.src).toBe('');
    });

    test('Clicking close button closes the modal and clears src', () => {
        jest.useFakeTimers();

        const closeBtn = documentMock.elements.closeModalBtn;
        const modal = documentMock.elements.videoModal;
        const player = documentMock.elements.youtubePlayer;

        modal.classList.add('show');
        player.src = 'some-video';

        closeBtn.click();

        expect(modal.classList.contains('show')).toBe(false);
        expect(player.src).toBe('some-video'); // Before timeout

        jest.advanceTimersByTime(300);

        expect(player.src).toBe('');

        jest.useRealTimers();
    });

    test('Clicking outside the modal closes it', () => {
        jest.useFakeTimers();

        const modal = documentMock.elements.videoModal;
        const player = documentMock.elements.youtubePlayer;

        modal.classList.add('show');
        player.src = 'some-video';

        modal.dispatchEvent({ type: 'click', target: modal });

        expect(modal.classList.contains('show')).toBe(false);

        jest.advanceTimersByTime(300);
        expect(player.src).toBe('');

        jest.useRealTimers();
    });
});
