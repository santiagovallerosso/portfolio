// --- Manual Mocks ---
class MockElement {
  constructor(tag = 'div') {
    this.tag = tag;
    this.value = '';
    this.classList = {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn()
    };
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.children = [];
  }

  getAttribute(attr) {
    return this.attributes[attr];
  }

  setAttribute(attr, val) {
    this.attributes[attr] = val;
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  querySelector(selector) {
    if (selector === 'input[type="text"]') {
        return this.children.find(c => c.tag === 'input' && c.getAttribute('type') === 'text') || new MockElement('input');
    }
    if (selector === 'input[type="email"]') {
        return this.children.find(c => c.tag === 'input' && c.getAttribute('type') === 'email') || new MockElement('input');
    }
    if (selector === 'textarea') {
        return this.children.find(c => c.tag === 'textarea') || new MockElement('textarea');
    }
    return new MockElement();
  }

  querySelectorAll(selector) {
    return [];
  }

  reset() {
      // simulate form reset
      this.children.forEach(c => c.value = '');
  }

  appendChild(child) {
      this.children.push(child);
  }
}

// Global mocks required by script.js globally
global.document = {
  querySelector: jest.fn(() => new MockElement()),
  querySelectorAll: jest.fn(() => []),
  createElement: jest.fn((tag) => new MockElement(tag)),
  head: new MockElement('head'),
  body: new MockElement('body'),
  getElementById: jest.fn(() => new MockElement())
};

global.window = {
  addEventListener: jest.fn(),
  pageYOffset: 0,
  scrollY: 0,
  alert: jest.fn(),
  scrollTo: jest.fn()
};

global.navigator = {
  userAgent: 'node.js'
};

// Requires to run script.js top-level execution
const { setupContactForm } = require('./script.js');

describe('Form Validation (setupContactForm)', () => {
    let formElement;
    let nameInput;
    let emailInput;
    let messageTextarea;
    let submitEvent;

    beforeEach(() => {
        formElement = new MockElement('form');

        nameInput = new MockElement('input');
        nameInput.setAttribute('type', 'text');

        emailInput = new MockElement('input');
        emailInput.setAttribute('type', 'email');

        messageTextarea = new MockElement('textarea');

        formElement.appendChild(nameInput);
        formElement.appendChild(emailInput);
        formElement.appendChild(messageTextarea);

        formElement.reset = jest.fn();

        submitEvent = { preventDefault: jest.fn() };

        // Reset the alert mock
        window.alert.mockClear();
    });

    test('should prevent submission and alert if any field is empty', async () => {
        setupContactForm(formElement);

        // Set empty values
        nameInput.value = '';
        emailInput.value = 'test@example.com';
        messageTextarea.value = 'Hello';

        // Trigger submit
        const submitCallback = formElement.listeners['submit'][0];
        await submitCallback(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Por favor completa todos los campos');
        expect(formElement.reset).not.toHaveBeenCalled();
    });

    test('should prevent submission and alert if email is invalid', async () => {
        setupContactForm(formElement);

        // Set invalid email
        nameInput.value = 'John Doe';
        emailInput.value = 'invalid-email';
        messageTextarea.value = 'Hello';

        // Trigger submit
        const submitCallback = formElement.listeners['submit'][0];
        await submitCallback(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Por favor ingresa un email válido');
        expect(formElement.reset).not.toHaveBeenCalled();
    });

    test('should succeed and alert success if fields are valid', async () => {
        setupContactForm(formElement);

        // Set valid values
        nameInput.value = 'John Doe';
        emailInput.value = 'john@example.com';
        messageTextarea.value = 'Hello';

        // Trigger submit
        const submitCallback = formElement.listeners['submit'][0];
        await submitCallback(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('¡Mensaje enviado! Gracias por contactarme.');
        expect(formElement.reset).toHaveBeenCalled();
    });
});
