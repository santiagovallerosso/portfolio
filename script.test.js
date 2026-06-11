<<<<<<< jules-1918621933211355245-e61d3c35
const { validateContactForm } = require('./script.js');
=======

global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {}
    observe(target) {}
    unobserve(target) {}
    disconnect() {}
};


const fs = require('fs');

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
>>>>>>> main

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
<<<<<<< jules-1918621933211355245-e61d3c35
=======
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
        this.innerHTML = "";
        this.textContent = '';
        this.value = '';
        this.dataset = {};

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
            this.listeners[eventName].forEach(cb => cb.call(this, typeof event === 'object' ? event : {
                preventDefault: () => {},
                target: this,
                getAttribute: (attr) => this.getAttribute(attr)
            }));
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

    removeAttribute(name) {
        delete this.attributes[name];
    }

    querySelector(sel) {
        return new MockElement();
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

const windowListeners = {};

const documentMock = {
    elements: {
        sections: []
    },
    createElement: (tag) => new MockElement(tag),
    head: new MockElement('head'),
    body: new MockElement('body'),
    addEventListener: (event, callback) => {},
    getElementById: (id) => {
        return documentMock.elements[id] || new MockElement();
    },
    querySelector: (sel) => {
        return new MockElement();
    },
    querySelectorAll: (sel) => {
        if (sel === 'section') return documentMock.elements.sections;
        return [];
    }
};

global.document = documentMock;

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
    alert: jest.fn(),
    navigator: {
        userAgent: 'node'
    },
    __listeners: windowListeners
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

describe('updateSectionOffsets Tests', () => {
    let updateSectionOffsets, getSectionOffsets, setSectionOffsets;

    beforeEach(() => {
        documentMock.elements.sections = [];
        const section1 = new MockElement('section');
        section1.setAttribute('id', 'section1');
        section1.offsetTop = 100;

        const section2 = new MockElement('section');
        section2.setAttribute('id', 'section2');
        section2.offsetTop = 500;

        documentMock.elements.sections = [section1, section2];

        jest.isolateModules(() => {
            const scriptExports = require('./script.js');
            updateSectionOffsets = scriptExports.updateSectionOffsets;
            getSectionOffsets = scriptExports.getSectionOffsets;
            setSectionOffsets = scriptExports.setSectionOffsets;
        });

        global.window.requestAnimationFrame = jest.fn(cb => cb());
    });

    it('debería calcular correctamente los offsets de las secciones en el DOM mockeado', () => {
        setSectionOffsets([]);
        updateSectionOffsets();

        const offsets = getSectionOffsets();
        expect(offsets).toHaveLength(2);
        expect(offsets[0].id).toBe('section1');
        expect(offsets[0].top).toBe(100);
        expect(offsets[1].id).toBe('section2');
        expect(offsets[1].top).toBe(500);
    });

    it('debería adjuntar evento de resize al window si ResizeObserver no está disponible', () => {
        const originalResizeObserver = global.ResizeObserver;
        global.ResizeObserver = undefined;

        const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener');

        jest.isolateModules(() => {
            require('./script.js');
        });

        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

        global.ResizeObserver = originalResizeObserver;
        addEventListenerSpy.mockRestore();
    });

    it('debería observar el body si ResizeObserver está disponible', () => {
        const observeMock = jest.fn();
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: observeMock
        }));

        jest.isolateModules(() => {
            require('./script.js');
        });

        expect(global.ResizeObserver).toHaveBeenCalled();
        expect(observeMock).toHaveBeenCalledWith(global.document.body);
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
>>>>>>> main
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

    test('Should handle non-string types gracefully (number, arrays) without crashing', () => {
        const result = validateContactForm(123, ['email'], { message: 'hello' });
        // Since we stringify arrays and objects, array ['email'] becomes 'email' (invalid email), object becomes '[object Object]'
        // If email is 'email', it will fail the regex.
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    // Longitudes extremas
    test('Should handle extremely long strings safely', () => {
        const veryLongString = 'A'.repeat(10000);
        const result = validateContactForm('John', 'john@example.com', veryLongString);
        expect(result).toEqual({ isValid: true });
    });

    test('Should handle single character inputs successfully if email is valid', () => {
        const result = validateContactForm('J', 'a@bc.de', 'H');
        expect(result).toEqual({ isValid: true });
    });

    // Emails maliciosos o inusuales
    test('Should return isValid false when email lacks domain structural parts (user@domain)', () => {
        const result = validateContactForm('John', 'user@domain', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email lacks TLD parts (user@.com)', () => {
        const result = validateContactForm('John', 'user@.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email lacks username part (@domain.com)', () => {
        const result = validateContactForm('John', '@domain.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should return isValid false when email has invalid special characters in host', () => {
        const result = validateContactForm('John', 'user@dom!ain.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
});
