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
