const fs = require('fs');

let content = fs.readFileSync('script.test.js', 'utf8');

// Buscamos dónde se define global.window
const windowDefStr = `global.window = {
    addEventListener: jest.fn(),
    pageYOffset: 0,
    scrollY: 0,
    scrollTo: jest.fn(),
    IntersectionObserver: intersectionObserverMock,
    alert: alertMock,
    navigator: {
        userAgent: 'node'
    }
};`;

const windowDefReplacement = `
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

global.window = new MockWindow();`;

content = content.replace(windowDefStr, windowDefReplacement);

fs.writeFileSync('script.test.js', content);
console.log("MockWindow updated successfully.");
