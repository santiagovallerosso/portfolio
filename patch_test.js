const fs = require('fs');

let content = fs.readFileSync('script.test.js', 'utf8');

const testsStr = `
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

    test('Navigation scroll updates active link - scrolled to middle section', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll to the second section (offsetTop is 800)
        // With threshold of 200 (800 - 200 = 600), so 600 should trigger it.
        global.window.scrollY = 650;
        global.window.dispatchEvent(new Event('scroll'));

        // Second link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(true);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(false);
    });

    test('Navigation scroll updates active link - scrolled to bottom section', () => {
        // Reset classes
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());

        // Simulate scroll to the last section (offsetTop is 1600)
        global.window.scrollY = 1500; // >= 1600 - 200 (1400)
        global.window.dispatchEvent(new Event('scroll'));

        // Third link should be active
        expect(documentMock.elements.navLinksAs[0].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[1].classList.contains('active')).toBe(false);
        expect(documentMock.elements.navLinksAs[2].classList.contains('active')).toBe(true);
    });
});
`;

// Replace the closing `});` of the describe block with the new tests and a closing `});`
content = content.replace(/}\);\s*$/, testsStr);

fs.writeFileSync('script.test.js', content);
console.log("Tests appended successfully.");
