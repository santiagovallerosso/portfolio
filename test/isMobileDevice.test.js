// Mock global variables needed to load script.js without errors
global.window = {
    addEventListener: () => {}
};

// We need to spy on classList.add, so we mock document with more details
const classListAddSpy = jest.fn();

global.document = {
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: () => ({ textContent: "" }),
    head: { appendChild: () => {} },
    body: {
        classList: {
            add: classListAddSpy
        }
    }
};

global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Initialize navigator with a configurable userAgent
global.navigator = {
    userAgent: ""
};

const { isMobileDevice } = require('../script.js');

describe('isMobileDevice function', () => {
    let originalUserAgent;

    beforeAll(() => {
        originalUserAgent = global.navigator.userAgent;
    });

    afterAll(() => {
        global.navigator.userAgent = originalUserAgent;
    });

    beforeEach(() => {
        classListAddSpy.mockClear();
    });

    // Test positive cases for mobile devices
    const mobileUserAgents = [
        "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36", // Android
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1", // iPhone
        "Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1", // iPad
        "Mozilla/5.0 (iPod touch; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4", // iPod
        "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+", // BlackBerry
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)", // IEMobile
        "Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54", // Opera Mini
        "Mozilla/5.0 (webOS/1.4.1.1; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0" // webOS
    ];

    mobileUserAgents.forEach((ua) => {
        test(`should return true for mobile user agent: ${ua.split(';')[0]}...`, () => {
            Object.defineProperty(global.navigator, 'userAgent', { value: ua, configurable: true });
            expect(isMobileDevice()).toBe(true);
        });
    });

    // Test negative cases for non-mobile devices (desktop)
    const desktopUserAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // Windows Chrome
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15", // macOS Safari
        "Mozilla/5.0 (X11; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0" // Linux Firefox
    ];

    desktopUserAgents.forEach((ua) => {
        test(`should return false for desktop user agent: ${ua.split('(')[1]?.split(')')[0] || 'Desktop'}`, () => {
            Object.defineProperty(global.navigator, 'userAgent', { value: ua, configurable: true });
            expect(isMobileDevice()).toBe(false);
        });
    });
});

describe('Mobile class injection', () => {
    beforeEach(() => {
        jest.resetModules(); // This is critical so require evaluates script.js again!
        classListAddSpy.mockClear();
    });

    test('should append "mobile" class to document.body if device is mobile', () => {
        // Set userAgent to mobile
        Object.defineProperty(global.navigator, 'userAgent', {
            value: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15",
            configurable: true
        });

        // Re-require the script so the top-level if-statement evaluates
        require('../script.js');

        expect(classListAddSpy).toHaveBeenCalledWith('mobile');
    });

    test('should NOT append "mobile" class to document.body if device is desktop', () => {
        // Set userAgent to desktop
        Object.defineProperty(global.navigator, 'userAgent', {
            value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            configurable: true
        });

        // Re-require the script
        require('../script.js');

        // It might have been called zero times, so check that it wasn't called with 'mobile'
        expect(classListAddSpy).not.toHaveBeenCalledWith('mobile');
    });
});
