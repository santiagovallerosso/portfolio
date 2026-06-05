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