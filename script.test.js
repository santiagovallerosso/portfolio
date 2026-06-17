let validateContactForm;



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


const fs = require('fs');


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
// We dynamically extract validateContactForm to avoid module issues since script.js had some nasty module exports conflicts
try {
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function validateContactForm[\s\S]*?return \{ isValid: true \};\n\}/g);
    if (match) {
        eval(match[match.length - 1].replace('function validateContactForm', 'validateContactForm = function'));
    }
} catch (e) {
    console.error(e);
}


let determineActiveSection;
try {
    const code = fs.readFileSync('script.js', 'utf8');
    const match = code.match(/function determineActiveSection[\s\S]*?return activeSection;\n\}/);
    if (match) {
        eval(match[0].replace('function determineActiveSection', 'determineActiveSection = function'));
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

describe('determineActiveSection', () => {
    test('Should return null if offsets is null', () => {
        expect(determineActiveSection(500, null)).toBeNull();
    });

    test('Should return null if offsets is empty', () => {
        expect(determineActiveSection(500, {})).toBeNull();
    });

    test('Should return the correct active section based on scrollY and threshold', () => {
        const offsets = {
            'home': 0,
            'about': 500,
            'projects': 1000
        };

        // Before 'about' enters threshold (500 - 100 = 400)
        expect(determineActiveSection(300, offsets)).toBe('home');

        // Right at the threshold of 'about'
        expect(determineActiveSection(400, offsets)).toBe('about');

        // Past 'about' but before 'projects' threshold (1000 - 100 = 900)
        expect(determineActiveSection(600, offsets)).toBe('about');

        // Right at the threshold of 'projects'
        expect(determineActiveSection(900, offsets)).toBe('projects');
    });

    test('Should return null if scrollY is before any section threshold and sections have larger offsets', () => {
         const offsets = {
            'home': 200,
            'about': 500
         };
         // Threshold is 100, so home is active at 100.
         // Scroll at 50, before threshold of home.
         // Note: the loop will just not set anything and remain activeSection=null, since no condition scrollY >= offset - threshold is met.
         expect(determineActiveSection(50, offsets)).toBeNull();
    });
});


describe('validateContactForm', () => {
    test('Should return isValid true when all fields are correct', () => {
        const result = validateContactForm('John', 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: true });
    });

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
    test('Should handle null values gracefully and return isValid false', () => {
        const result = validateContactForm(null, 'john@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor completa todos los campos' });
    });

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
    test('Should handle object/array types gracefully without crashing', () => {
        const result = validateContactForm(['John'], { email: 'john@example.com' }, ['Hello']);
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' }); // because object stringifies to [object Object]
    });

    test('Should handle non-string types gracefully (number, arrays) without crashing', () => {
        const result = validateContactForm(123, ['email'], { message: 'hello' });
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should trim whitespaces from inputs and return true', () => {
        const result = validateContactForm('   John   ', '  john@example.com  ', '   Hello world!   ');
        expect(result).toEqual({ isValid: true });
    });

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

global.window = {
    addEventListener: (event, callback) => {
        if (!windowListeners[event]) windowListeners[event] = [];
        windowListeners[event].push(callback);
    },
    removeEventListener: (event, callback) => {
        if (windowListeners[event]) {
            windowListeners[event] = windowListeners[event].filter(cb => cb !== callback);
        }
    },
    dispatchEvent: (eventName) => {
        if (windowListeners[eventName]) {
            windowListeners[eventName].forEach(cb => cb({ type: eventName }));
        }
    },
    pageYOffset: 0,
    scrollY: 0,
    scrollTo: jest.fn(),
    alert: jest.fn(),
    navigator: {
        userAgent: 'node'
    },
    __listeners: windowListeners
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
    test('Should reject extremely long emails', () => {
        const longEmail = 'a'.repeat(300) + '@example.com';
        const result = validateContactForm('John', longEmail, 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });

    test('Should reject email without @', () => {
        const result = validateContactForm('John', 'johnexample.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
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
    test('Should reject email with special invalid characters', () => {
        const result = validateContactForm('John', 'john()@example.com', 'Hello world!');
        expect(result).toEqual({ isValid: false, error: 'Por favor ingresa un email válido' });
    });
