const fs = require('fs');

let content = fs.readFileSync('script.test.js', 'utf8');

// The issue might be that require doesn't work that way or global.window variables aren't picking up the mocked document.elements because we isolate modules but global state persists weirdly.
// Let's debug inside one of the tests.

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

content = content.replace(/test\('Navigation scroll updates active link - scrollY = 0', \(\) => \{[\s\S]*?\}\);/, debugTest);
fs.writeFileSync('script.test.js', content);
