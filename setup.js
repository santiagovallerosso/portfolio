global.document = {
    querySelector: jest.fn().mockReturnValue(null),
    querySelectorAll: jest.fn().mockReturnValue([]),
    createElement: jest.fn().mockReturnValue({}),
    getElementById: jest.fn().mockReturnValue(null),
    head: { appendChild: jest.fn() },
    body: { classList: { add: jest.fn(), remove: jest.fn() } }
};
global.window = {
    addEventListener: jest.fn(),
    scrollY: 0,
    pageYOffset: 0
};
global.navigator = {
    userAgent: ''
};
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
global.window.requestAnimationFrame = jest.fn(cb => cb());
global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
