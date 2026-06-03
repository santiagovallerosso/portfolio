const fs = require('fs');
const { performance } = require('perf_hooks');

// Simple DOM element mock
class MockElement {
    constructor(tagName = 'div', options = {}) {
        this.tagName = tagName.toUpperCase();
        this.classList = {
            classes: new Set(),
            add: (c) => this.classList.classes.add(c),
            remove: (c) => this.classList.classes.delete(c)
        };
        this.attributes = options.attributes || {};
        this.id = options.attributes ? options.attributes.id : '';
        this._offsetTop = options.offsetTop || 0;
        this._clientHeight = options.clientHeight || 1000;
        // Simulate layout thrashing by reading properties (makes it slower)
        this.reads = 0;
    }

    get offsetTop() {
        this.reads++;
        // Adding a slight delay to simulate the cost of layout calculation in a real browser
        for(let i=0; i<1000; i++) {}
        return this._offsetTop;
    }

    get clientHeight() {
        this.reads++;
        for(let i=0; i<1000; i++) {}
        return this._clientHeight;
    }

    getAttribute(name) {
        if (name === 'href') return this.attributes[name];
        if (name === 'id') return this.attributes[name];
        return null;
    }
}

// Setup fake environment
const numSections = 5;
const sections = [];
const navItems = [];

for (let i = 0; i < numSections; i++) {
    sections.push(new MockElement('section', {
        offsetTop: i * 1000,
        clientHeight: 1000,
        attributes: { id: `section${i}` }
    }));
    navItems.push(new MockElement('a', {
        attributes: { href: `#section${i}` }
    }));
}

let pageYOffset = 0;

// The unoptimized function
function updateActiveNavLink_Unoptimized() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Optimized function
let cachedSections = [];
function updateSectionCache() {
    cachedSections = sections.map(section => ({
        top: section.offsetTop,
        height: section.clientHeight,
        id: section.getAttribute('id')
    }));
}
updateSectionCache(); // Call once initially

function updateActiveNavLink_Optimized() {
    let current = '';

    cachedSections.forEach(section => {
        const sectionTop = section.top;
        const sectionHeight = section.height;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

function runBenchmark() {
    const iterations = 10000;

    // Test unoptimized
    let startUnoptimized = performance.now();
    for (let i = 0; i < iterations; i++) {
        pageYOffset = (i * 10) % 5000;
        updateActiveNavLink_Unoptimized();
    }
    let endUnoptimized = performance.now();
    let timeUnoptimized = endUnoptimized - startUnoptimized;

    // Reset reads count
    sections.forEach(s => s.reads = 0);

    // Test optimized
    let startOptimized = performance.now();
    for (let i = 0; i < iterations; i++) {
        pageYOffset = (i * 10) % 5000;
        updateActiveNavLink_Optimized();
    }
    let endOptimized = performance.now();
    let timeOptimized = endOptimized - startOptimized;

    console.log(`Benchmark Results (${iterations} iterations):`);
    console.log(`Unoptimized: ${timeUnoptimized.toFixed(2)} ms`);
    console.log(`Optimized:   ${timeOptimized.toFixed(2)} ms`);
    console.log(`Improvement: ${((timeUnoptimized - timeOptimized) / timeUnoptimized * 100).toFixed(2)}% faster`);
}

runBenchmark();
