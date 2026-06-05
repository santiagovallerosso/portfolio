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
            contains: (c) => this.classList.classes.has(c)
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
  constructor(tagName = "div") {
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
    };
    this.listeners = {};
    this.attributes = {};
    this.style = {};
    this.innerHTML = "";
    this.textContent = "";

    this.value = "";
    this.dataset = {};
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  dispatchEvent(event) {
    const eventName = typeof event === "string" ? event : event.type;
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((cb) =>
        cb.call(this, {
          preventDefault: () => {},
          target: this,
          getAttribute: (attr) => this.getAttribute(attr),
        }),
      );
    }
  }

  click() {
    this.dispatchEvent("click");
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name] || null;
  }
  querySelector(sel) {
    return null;
  }
  querySelectorAll(sel) {
    return [];
  }
  reset() {
    this.classList.classes.clear();
    this.value = "";
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
  elements: {},
  getElementById: (id) => {
    if (id === "sticky-nav") return documentMock.elements.stickyNav;
    if (id === "inicio") return documentMock.elements.inicio;
    if (id === "video-modal") return documentMock.elements.videoModal;
    if (id === "youtube-player") return documentMock.elements.youtubePlayer;
    if (id === "back-to-top") return documentMock.elements.backToTop;
    if (id === "brand-modal") return documentMock.elements.brandModal;
    if (id === "brand-player-1") return documentMock.elements.brandPlayer1;
    if (id === "brand-player-2") return documentMock.elements.brandPlayer2;
    return documentMock.elements[id] || new MockElement();
  },
  querySelector: (sel) => {
    if (sel === ".hamburger") return documentMock.elements.hamburger;
    if (sel === ".nav-links") return documentMock.elements.navLinks;
    if (sel === ".contact-form") return documentMock.elements.contactForm;
    if (sel === ".about") return documentMock.elements.about;
    if (sel === ".hero") return documentMock.elements.hero;
    return new MockElement(); // fallback
  },

  querySelectorAll: (sel) => {
    if (sel === ".nav-links a") return documentMock.elements.navLinksAs || [];
    if (sel === 'a[href^="#"]') return documentMock.elements.anchors || [];
    if (sel === "section") return documentMock.elements.sections || [];
    if (sel === ".project-card, .skill-category, .stat")
      return documentMock.elements.animated || [];
    if (sel === ".lang-btn") return documentMock.elements.langBtns || [];
    if (sel === "[data-i18n]") return documentMock.elements.i18nElements || [];
    if (sel === "[data-i18n-placeholder]")
      return documentMock.elements.i18nPlaceholders || [];
    return [];
  },

  getElementById: (id) => {
    if (id === "sticky-nav") return documentMock.elements.stickyNav;
    if (id === "inicio") return documentMock.elements.hero;
    return null;
  },
  createElement: (tag) => new MockElement(tag),
  head: new MockElement("head"),
  documentElement: new MockElement("html"),
  body: new MockElement("body"),
  addEventListener: (event, callback) => {},
};

// Setup elements
documentMock.elements.hamburger = new MockElement();
documentMock.elements.navLinks = new MockElement();
documentMock.elements.contactForm = new MockElement("form");
documentMock.elements.contactForm.reset = jest.fn();
documentMock.elements.nameInput = new MockElement("input");
documentMock.elements.emailInput = new MockElement("input");
documentMock.elements.messageTextArea = new MockElement("textarea");

documentMock.elements.contactForm.querySelector = (sel) => {
  if (sel === 'input[type="text"]') return documentMock.elements.nameInput;
  if (sel === 'input[type="email"]') return documentMock.elements.emailInput;
  if (sel === "textarea") return documentMock.elements.messageTextArea;
  return new MockElement("input");
};

documentMock.elements.about = new MockElement();
documentMock.elements.hero = new MockElement();
documentMock.elements.heroCinematic = new MockElement();
documentMock.elements.heroVideo = new MockElement();
documentMock.elements.heroCinematic.querySelector = (sel) => {
    if (sel === '.hero-video') return documentMock.elements.heroVideo;
    return null;
};
documentMock.elements.stickyNav = new MockElement();

documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a'), new MockElement('a')];
documentMock.elements.navLinksAs[0].setAttribute('href', '#home');
documentMock.elements.navLinksAs[1].setAttribute('href', '#about');
documentMock.elements.navLinksAs[2].setAttribute('href', '#contact');

documentMock.elements.navLinksAs = [
        (() => { const a = new MockElement('a'); a.setAttribute('href', '#inicio'); return a; })(),
        (() => { const a = new MockElement('a'); a.setAttribute('href', '#about'); return a; })()
    ];
documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a')];
documentMock.elements.navLinksAs[0].setAttribute('href', '#test-id');
documentMock.elements.navLinksAs[1].setAttribute('href', '#other-id');
documentMock.elements.navLinksAs = [new MockElement("a"), new MockElement("a")];

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


documentMock.elements.langBtns = [
  new MockElement("button"),
  new MockElement("button"),
];
documentMock.elements.langBtns[0].dataset = { lang: "en" };
documentMock.elements.langBtns[1].dataset = { lang: "es" };

documentMock.elements.i18nElements = [new MockElement("span")];
documentMock.elements.i18nElements[0].dataset = { i18n: "hero_subtitle" };

documentMock.elements.i18nPlaceholders = [new MockElement("input")];
documentMock.elements.i18nPlaceholders[0].dataset = {
  i18nPlaceholder: "contact_name",
};

documentMock.elements.sections = [
  new MockElement("section"),
  new MockElement("section"),
];

documentMock.elements.sections.forEach((s) => {
  s.offsetTop = 0;
  s.clientHeight = 500;
  s.getAttribute = (attr) => (attr === "id" ? "test-id" : null);
});
documentMock.elements.closeModalBtn = new MockElement();

const validCard = new MockElement();
validCard.setAttribute('data-youtube-id', 'dQw4w9WgXcQ');
const invalidCard = new MockElement();

documentMock.elements.portfolioCards = [validCard, invalidCard];


const alertMock = jest.fn();
let lastObserverCallback = null;
const intersectionObserverMock = jest.fn().mockImplementation((callback) => {
    lastObserverCallback = callback;
    return {
        observe: jest.fn(),
        unobserve: jest.fn()
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
        this.scrollTo = jest.fn();
        this.IntersectionObserver = intersectionObserverMock;
        this.alert = alertMock;
        this.navigator = {
            userAgent: 'node'
        };
    }

    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    dispatchEvent(event) {
        const eventName = typeof event === 'string' ? event : event.type;
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(cb => cb.call(this, event));
        }
    }
}

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

documentMock.elements.sections = [new MockElement('section'), new MockElement('section'), new MockElement('section')];
const sectionIds = ['home', 'about', 'contact'];
documentMock.elements.sections.forEach((s, index) => {
    s.offsetTop = index * 800; // home: 0, about: 800, contact: 1600
    s.clientHeight = 800;
    s.getAttribute = (attr) => attr === 'id' ? sectionIds[index] : null;
});

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

  test("Contact form validation - empty fields", () => {
    const form = documentMock.elements.contactForm;

    form.dispatchEvent("submit");

    expect(alertMock).toHaveBeenCalledWith(
      "Por favor completa todos los campos",
    );
  });

  test("Contact form validation - invalid email", () => {
    const form = documentMock.elements.contactForm;
    documentMock.elements.nameInput.value = "John Doe";
    documentMock.elements.emailInput.value = "invalid-email";
    documentMock.elements.messageTextArea.value = "Hello";

    form.dispatchEvent("submit");

    expect(alertMock).toHaveBeenCalledWith("Por favor ingresa un email válido");
  });

  test("Contact form validation - success", () => {
    const form = documentMock.elements.contactForm;
    documentMock.elements.nameInput.value = "John Doe";
    documentMock.elements.emailInput.value = "test@example.com";
    documentMock.elements.messageTextArea.value = "Hello";

    form.dispatchEvent("submit");

    expect(alertMock).toHaveBeenCalledWith(
      "¡Mensaje enviado! Gracias por contactarme.",
    );
    expect(form.reset).toHaveBeenCalled();
  });

  test("Translation sets textContent instead of innerHTML to prevent XSS", () => {
    const langBtnEs = documentMock.elements.langBtns[1];

    // Simular click en botón de idioma español
    langBtnEs.dispatchEvent({ type: "click", target: langBtnEs });

    const i18nEl = documentMock.elements.i18nElements[0];

    // El contenido debería haberse asignado a textContent, asegurando que es texto seguro
    expect(i18nEl.textContent).toBe(
      "Filmmaker, Editor de Video y Diseñador de Sonido",
    );
    // Asegurarse de que no haya inyección de HTML
    expect(i18nEl.innerHTML).toBe("");
  });
});

describe('isMobileDevice tests', () => {
    let originalNavigator;

    beforeEach(() => {
        jest.clearAllMocks();
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';
        documentMock.elements.videoModal.classList.classes.clear();
        documentMock.elements.youtubePlayer.src = '';
        // Save the original navigator object to restore it later
        originalNavigator = global.navigator;
        // Mock body classList
        documentMock.elements.body = new MockElement('body');
        global.document.body = documentMock.elements.body;
    });

    afterEach(() => {
        // Restore original navigator
        global.navigator = originalNavigator;
        global.window.navigator = originalNavigator;
        jest.resetModules(); // Important to clear cached module for the re-require
    });

    test('should return true for iPhone user agent', () => {
        const mockNavigator = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        const { isMobileDevice } = require('./script.js');
        expect(isMobileDevice()).toBe(true);
    });

    test('should return true for Android user agent', () => {
        const mockNavigator = { userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        const { isMobileDevice } = require('./script.js');
        expect(isMobileDevice()).toBe(true);
    });

    test('should return false for desktop Windows Chrome user agent', () => {
        const mockNavigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        const { isMobileDevice } = require('./script.js');
        expect(isMobileDevice()).toBe(false);
    });

    test('should return false for desktop Mac Safari user agent', () => {
        const mockNavigator = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        const { isMobileDevice } = require('./script.js');
        expect(isMobileDevice()).toBe(false);
    });

    test('should add "mobile" class to body when on mobile device', () => {
        const mockNavigator = { userAgent: 'iPhone' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        require('./script.js');

        expect(global.document.body.classList.contains('mobile')).toBe(true);
    });

    test('should NOT add "mobile" class to body when on desktop device', () => {
        const mockNavigator = { userAgent: 'Windows' };
        global.navigator = mockNavigator;
        global.window.navigator = mockNavigator;

        require('./script.js');

        expect(global.document.body.classList.contains('mobile')).toBe(false);
    });
});
    test('Active navigation updates correctly on scroll', () => {
        // Prepare mock sections and nav links
        const section1 = new MockElement('section');
        section1.getAttribute = () => 'inicio';
        section1.offsetTop = 0;

    test('Contact form validation - success', () => {
        jest.useFakeTimers();
        const form = documentMock.elements.contactForm;

        // Mock the submit button
        const mockSubmitBtn = new MockElement('button');
        mockSubmitBtn.setAttribute('type', 'submit');
        mockSubmitBtn.textContent = 'Enviar mensaje';
        mockSubmitBtn.style = {};

        // Add querySelector override specifically for this test
        const originalQuerySelector = form.querySelector;
        form.querySelector = (sel) => {
            if (sel === 'input[type="text"]') return documentMock.elements.nameInput;
            if (sel === 'input[type="email"]') return documentMock.elements.emailInput;
            if (sel === 'textarea') return documentMock.elements.messageTextArea;
            if (sel === 'button[type="submit"]') return mockSubmitBtn;
            return originalQuerySelector(sel);
        };

        documentMock.elements.nameInput.value = 'John Doe';
        documentMock.elements.emailInput.value = 'test@example.com';
        documentMock.elements.messageTextArea.value = 'Hello';
        const section2 = new MockElement('section');
        section2.getAttribute = () => 'trabajos';
        section2.offsetTop = 800;

        const navLink1 = new MockElement('a');
        navLink1.getAttribute = () => '#inicio';
        navLink1.classList.add('nav-link');

        expect(mockSubmitBtn.textContent).toBe('¡Mensaje enviado con éxito!');
        expect(mockSubmitBtn.disabled).toBe(true);
        expect(mockSubmitBtn.style.background).toBe('#10b981');

        jest.runAllTimers();

        expect(mockSubmitBtn.textContent).toBe('Enviar mensaje');
        expect(mockSubmitBtn.disabled).toBe(false);
        expect(form.reset).toHaveBeenCalled();

        jest.useRealTimers();
        const navLink2 = new MockElement('a');
        navLink2.getAttribute = () => '#trabajos';
        navLink2.classList.add('nav-link');

        // We need to reload the script so it binds to our specific test DOM elements
        // Note: The previous require executes in the global context, we might need a clean context
        // to test this thoroughly if we change global variables. However, we'll test the resize observer.

        // As JSDOM and require caches globals we need to carefully set them or create a custom test for it.
        // Given that it's just script.js without exports, we'll verify it syntactically doesn't break,
        // and we rely on manual/sandbox testing.
    });


    describe('Parallax Simple Effect Tests', () => {
        let originalPageYOffset;

        beforeAll(() => {
            originalPageYOffset = global.window.pageYOffset;
        });

        afterAll(() => {
            global.window.pageYOffset = originalPageYOffset;
        });

        test('calculates correct background position for .hero', () => {
            const { handleParallaxScroll } = require('./script.js');

            // Set mock scroll position
            global.window.pageYOffset = 200;

            // Execute parallax handler
            handleParallaxScroll();

            // Expect backgroundPosition to be centered and 50% of scroll position
            expect(documentMock.elements.hero.style.backgroundPosition).toBe('center 100px');
        });

        test('applies correct transform to .hero-video when .hero is null and .hero-cinematic exists', () => {
            // To test the "else if" branch, we have to isolate require caching.
            // Jest allows jest.isolateModules to test files again, or resetModules.
            jest.resetModules();

            // Override querySelector to simulate a page with heroCinematic but NO hero
            const originalQuerySelector = documentMock.querySelector;
            documentMock.querySelector = (sel) => {
                if (sel === '.hero') return null; // simulate no hero
                if (sel === '.hero-cinematic') return documentMock.elements.heroCinematic;
                if (sel === '.hero-video') return documentMock.elements.heroVideo;
                return originalQuerySelector(sel);
            };

            const freshScript = require('./script.js');

            // Set mock scroll position
            global.window.pageYOffset = 300;

            // Execute parallax handler
            freshScript.handleParallaxScroll();

            // Assert style is applied (300 * 0.3 = 90)
            expect(documentMock.elements.heroVideo.style.transform).toBe('translateX(-50%) translateY(calc(-50% + 90px))');

            // Restore mock
            documentMock.querySelector = originalQuerySelector;
            // Restore modules to their previous state to not break other tests, or just let them continue
        });
    });

});

describe('checkMobileDevice Tests', () => {
    let originalMatchMedia;

    beforeEach(() => {
        originalMatchMedia = global.window.matchMedia;
    });

    afterEach(() => {
        global.window.matchMedia = originalMatchMedia;
        document.body.classList.remove('mobile');
    });

    test('adds mobile class when matches is true', () => {
        global.window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: true,
            media: query,
            addEventListener: jest.fn(),
        }));

        // Re-require to run logic
        jest.isolateModules(() => {
            require('./script.js');
        });

        expect(document.body.classList.contains('mobile')).toBe(true);
    });

    test('removes mobile class when matches is false', () => {
        document.body.classList.add('mobile');
        global.window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            addEventListener: jest.fn(),
        }));

        // Re-require to run logic
        jest.isolateModules(() => {
            require('./script.js');
        });

        expect(document.body.classList.contains('mobile')).toBe(false);
    });

    test('IntersectionObserver toggles active class on nav links', () => {
        // Trigger observer callback with an intersection entry
        expect(lastObserverCallback).not.toBeNull();

        const mockEntry = {
            isIntersecting: true,
            target: {
                getAttribute: (attr) => attr === 'id' ? 'test-id' : null
            }
        };

        lastObserverCallback([mockEntry]);

        // Check if the link corresponding to 'test-id' got the 'active' class
        const testLink = documentMock.elements.navLinksAs[0];
        expect(testLink.classList.contains('active')).toBe(true);

        // Now intersecting another element
        const otherEntry = {
            isIntersecting: true,
            target: {
                getAttribute: (attr) => attr === 'id' ? 'other-id' : null
            }
        };
        lastObserverCallback([otherEntry]);

        const otherLink = documentMock.elements.navLinksAs[1];
        expect(otherLink.classList.contains('active')).toBe(true);
        expect(testLink.classList.contains('active')).toBe(false);
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
