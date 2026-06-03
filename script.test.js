
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
            contains: (c) => this.classList.classes.has(c),
            clear: () => this.classList.classes.clear()
        };
        this.listeners = {};
        this.attributes = {};
        this.style = {};

        this.textContent = '';
        this.value = '';

        this.offsetTop = options.offsetTop || 0;
        this.clientHeight = options.clientHeight || 0;
        this.offsetHeight = options.offsetHeight || 0;
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

    addEventListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    removeEventListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }

    getAttribute(attr) {
        return this.attributes[attr] || null;
    }

    setAttribute(attr, val) {
        this.attributes[attr] = val;
    }

    click() {
        this.dispatchEvent('click');
    }
}

class MockWindow {
    constructor() {
        this.listeners = {};
        this.pageYOffset = 0;
        this.scrollY = 0;
        this.navigator = { userAgent: 'node' };
        this.matchMedia = jest.fn().mockImplementation(query => ({
            matches: false, media: query, onchange: null,
            addListener: jest.fn(), removeListener: jest.fn(),
            addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
        }));
        this.__listeners = this.listeners;
    }
    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    removeEventListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
    dispatchEvent(event) {
        const eventName = typeof event === 'string' ? event : event.type;
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(cb => cb.call(this, typeof event === 'object' ? event : {}));
        }
    }
    scrollTo() {}
}

const alertMock = jest.fn();
const intersectionObserverMock = jest.fn();

global.window = new MockWindow();
global.alert = alertMock;
global.IntersectionObserver = intersectionObserverMock;
global.FormData = jest.fn();

const documentMock = {
    elements: {},
    getElementById: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    createElement: jest.fn(),
    body: new MockElement('body'),
    documentElement: new MockElement('html')
};

documentMock.elements.sections = [new MockElement('section'), new MockElement('section'), new MockElement('section')];
const sectionIds = ['home', 'about', 'contact'];
documentMock.elements.sections.forEach((s, index) => {
    s.offsetTop = index * 800; // home: 0, about: 800, contact: 1600
    s.clientHeight = 800;
    s.getAttribute = (attr) => attr === 'id' ? sectionIds[index] : null;
});

documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a'), new MockElement('a')];
documentMock.elements.navLinksAs.forEach((a, index) => {
    a.getAttribute = (attr) => attr === 'href' ? '#' + sectionIds[index] : null;
});

global.document = documentMock;

describe('Portfolio Script Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.window.listeners = {};
    });

    test('dummy', () => {
        expect(true).toBe(true);
    });
});

describe('handleScroll logic tests', () => {
    let mockHero;
    let mockStickyNav;
    let mockNavItems;
    let mockSections;
    let offsetTopSpy;

    beforeEach(() => {
        const { initScrollCoordinator } = require('./script.js');

        mockHero = new MockElement('div');
        Object.defineProperty(mockHero, 'offsetHeight', { value: 500 });

        mockStickyNav = new MockElement('nav');
        mockStickyNav.classList.add('hidden');

        offsetTopSpy = jest.fn((id) => {
            if (id === 'home') return 0;
            if (id === 'about') return 800;
            if (id === 'contact') return 1600;
            return 0;
        });

        const createMockSection = (id, offset) => {
            const section = new MockElement('section');
            section.getAttribute = () => id;
            section.id = id;
            Object.defineProperty(section, 'offsetTop', { get: () => offsetTopSpy(id), configurable: true });
            Object.defineProperty(section, 'clientHeight', { value: 800 });
            return section;
        };

        mockSections = [
            createMockSection('home', 0),
            createMockSection('about', 800),
            createMockSection('contact', 1600)
        ];

        const createMockNavItem = (href) => {
            const a = new MockElement('a');
            a.getAttribute = () => href;
            return a;
        };

        mockNavItems = [
            createMockNavItem('#home'),
            createMockNavItem('#about'),
            createMockNavItem('#contact')
        ];

        // Mock document queries
        global.document.querySelector = (selector) => {
            if (selector === '.hero') return mockHero;
            return null;
        };

        global.document.querySelectorAll = (selector) => {
            if (selector === 'section') return mockSections;
            if (selector === '.nav-links a') return mockNavItems;
            return [];
        };

        global.document.getElementById = (id) => {
            if (id === 'sticky-nav') return mockStickyNav;
            return null;
        };

        // Clear spies
        jest.clearAllMocks();

        // Init cache - this should call offsetTop exactly once per section
        initScrollCoordinator();
    });

    test('activates sticky navbar when scroll > hero height - 100', () => {
        const { handleScroll } = require('./script.js');

        global.window.scrollY = 400; // not > 500 - 100
        handleScroll();
        expect(mockStickyNav.classList.contains('hidden')).toBe(true);

        global.window.scrollY = 401; // > 500 - 100
        handleScroll();
        expect(mockStickyNav.classList.contains('hidden')).toBe(false);
    });

    test('identifies active section and updates nav links optimally without DOM thrashing', () => {
        const { handleScroll } = require('./script.js');

        // Initial setup counts (3 reads during init)
        expect(offsetTopSpy).toHaveBeenCalledTimes(3);

        global.window.scrollY = 650; // >= 800 - 200 = 600, so 'about' should activate
        handleScroll();

        expect(mockNavItems[0].classList.contains('active')).toBe(false);
        expect(mockNavItems[1].classList.contains('active')).toBe(true);
        expect(mockNavItems[2].classList.contains('active')).toBe(false);

        // The most critical assertion: handleScroll MUST NOT read offsetTop!
        expect(offsetTopSpy).toHaveBeenCalledTimes(3);

        global.window.scrollY = 1500; // 'contact'
        handleScroll();

        expect(mockNavItems[0].classList.contains('active')).toBe(false);
        expect(mockNavItems[1].classList.contains('active')).toBe(false);
        expect(mockNavItems[2].classList.contains('active')).toBe(true);

        // Still no new offsetTop reads!
        expect(offsetTopSpy).toHaveBeenCalledTimes(3);
    });
});
