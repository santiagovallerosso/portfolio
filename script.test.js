
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
    });
});
