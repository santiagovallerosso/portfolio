
const {
  updateSectionOffsets,
  getSectionOffsets,
  determineActiveSection,
  invalidateOffsetCache
} = require('./script.js');

describe('Navigation Scroll Performance Suite', () => {
  beforeEach(() => {
    invalidateOffsetCache();
    // Setting up clean document environment
    global.document = {
      body: {
        innerHTML: '',
        appendChild: jest.fn()
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
      },
      createElement: (tag) => ({
        tagName: tag,
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        getAttribute(name) { return this.attributes[name]; },
        getBoundingClientRect: () => ({ top: 0 })
      }),
      getElementById: jest.fn()
    };
    global.window = {
        scrollY: 0
    };
});
const intersectionObserverMock = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
}));

global.document = documentMock;

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
global.window = {
    addEventListener: jest.fn(),
    pageYOffset: 0,
    scrollY: 0,
    scrollTo: jest.fn(),
    IntersectionObserver: intersectionObserverMock,
    alert: alertMock,
    matchMedia: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
    navigator: {
        userAgent: 'node'
    }
  addEventListener: jest.fn(),
  pageYOffset: 0,
  scrollY: 0,
  scrollTo: jest.fn(),
  IntersectionObserver: intersectionObserverMock,
  alert: alertMock,
  navigator: {
    userAgent: "node",
  },
};
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
// Execute script


describe('Portfolio Script Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        // Reset classes
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';

        // Reset script file cache and re-evaluate script so logic can pick up modified DOM (if necessary, though we just modify scrollY)
        jest.isolateModules(() => {
           require('./script.js');
        });
    });


    test('Hamburger menu toggles active class', () => {
        const hamburger = documentMock.elements.hamburger;
        const navLinks = documentMock.elements.navLinks;
jest.resetModules();
require('./script.js');
const { updateActiveNavLink } = require('./script.js');
require("./script.js");

describe("Portfolio Script Tests", () => {
  test("dummy", () => {
    expect(true).toBe(true);
  });

  test("Clicking a nav link closes the menu", () => {
    const hamburger = documentMock.elements.hamburger;
    const navLinks = documentMock.elements.navLinks;
    const link = documentMock.elements.navLinksAs[0];

    // Open first
    hamburger.classList.add("active");
    navLinks.classList.add("active");

    link.click();

    expect(hamburger.classList.contains("active")).toBe(false);
    expect(navLinks.classList.contains("active")).toBe(false);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    documentMock.elements.hamburger.classList.classes.clear();
    documentMock.elements.navLinks.classList.classes.clear();
    documentMock.elements.nameInput.value = "";
    documentMock.elements.emailInput.value = "";
    documentMock.elements.messageTextArea.value = "";
  });

  test('updateSectionOffsets correctly captures and structures offset metrics', () => {
    const ids = ['home', 'services', 'contact'];

    // Setting up mock elements with custom properties for offset calculation
    const mockElements = {};
    ids.forEach((id, index) => {
      const el = global.document.createElement('div');
      el.setAttribute('id', id);
      el.getBoundingClientRect = () => ({
        top: (index + 1) * 200, // Mock layout height spacing
      });
      mockElements[id] = el;
      global.document.body.appendChild(el);
    });

    global.document.getElementById = jest.fn((id) => mockElements[id] || null);

    global.window.scrollY = 50;

    const offsets = updateSectionOffsets(ids);
    expect(offsets['home']).toBe(250);     // 200 + 50
    expect(offsets['services']).toBe(450); // 400 + 50
    expect(offsets['contact']).toBe(650);  // 600 + 50
  });

  test('getSectionOffsets utilizes cached records rather than triggering layout queries', () => {
    const ids = ['home'];
    const el = global.document.createElement('div');
    el.setAttribute('id', 'home');
    el.getBoundingClientRect = () => ({ top: 100 });
    global.document.body.appendChild(el);
    global.document.getElementById = jest.fn((id) => id === 'home' ? el : null);

    global.window.scrollY = 0;

    // First call populates cache
    const initialOffsets = getSectionOffsets(ids);
    expect(initialOffsets['home']).toBe(100);

    // Modify original element property (should not change the cached output)
    el.getBoundingClientRect = () => ({ top: 999 });
    const cachedOffsets = getSectionOffsets(ids);
    expect(cachedOffsets['home']).toBe(100); // Verify value returned comes from cache
  });

  test('determineActiveSection resolves current interactive segment coordinates', () => {
    const offsets = {
      home: 0,
      about: 500,
      contact: 1000
    };

    // Scroll is near top inside home range
    expect(determineActiveSection(50, offsets)).toBe('home');

    // Scroll enters threshold boundary for about section (offset 500 - 100 threshold = 400)
    expect(determineActiveSection(420, offsets)).toBe('about');

    // Scroll is deep inside contact section range
    expect(determineActiveSection(1100, offsets)).toBe('contact');
  });
});
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


    test('Navigation scroll updates active link - scrollY = 0', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll at top
        global.window.scrollY = 0;
        global.window.dispatchEvent(new Event('scroll'));

        // First link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(true);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(false);
    });


    test('Navigation scroll updates active link - scrolled to middle section', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll to the second section (offsetTop is 800)
        // With threshold of 200 (800 - 200 = 600), so 600 should trigger it.
        global.window.scrollY = 650;
        global.window.dispatchEvent(new Event('scroll'));

        // Second link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(true);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(false);
    });

    test('Navigation scroll updates active link - scrolled to bottom section', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll to the last section (offsetTop is 1600)
        global.window.scrollY = 1500; // >= 1600 - 200 (1400)
        global.window.dispatchEvent(new Event('scroll'));

        // Third link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(true);
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
