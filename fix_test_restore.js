const fs = require('fs');

let content = fs.readFileSync('script.test.js', 'utf8');

// We just need to restore the first test back to its assert state and remove logs
const debugTest = `
    test('Navigation scroll updates active link - scrollY = 0', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll at top
        global.window.scrollY = 0;
        console.log("Before dispatch, sections mock:");
        documentMock.elements.sections.forEach(s => console.log(s.offsetTop, s.getAttribute('id')));

        global.window.dispatchEvent(new Event('scroll'));

        console.log("After dispatch, links classes:", documentMock.elements.navLinksAs.map(l => Array.from(l.classList.classes)));

        // First link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(true);
    });
`;

const restoredTest = `
    test('Navigation scroll updates active link - scrollY = 0', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll at top
        global.window.scrollY = 0;
        global.window.dispatchEvent(new Event('scroll'));

        // First link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(true);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(false);
    });
`;

content = content.replace(debugTest.trim(), restoredTest.trim());
fs.writeFileSync('script.test.js', content);
