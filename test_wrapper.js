const fs = require('fs');

// We need to re-evaluate the test logic and see how the script handles mock elements, because scripts runs *before* tests inside Jest file due to require('./script.js');

let content = fs.readFileSync('script.test.js', 'utf8');

const regexRequire = /require\('\.\/script\.js'\);/;

// Move require script to be inside beforeEach or just to make sure we reset the mocked elements before execution? No, require caches the file. We need to delete require cache.

const testBeforeEach = `
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset classes
        documentMock.elements.hamburger.classList.classes.clear();
        documentMock.elements.navLinks.classList.classes.clear();
        documentMock.elements.navLinksAs.forEach(l => l.classList.classes.clear());
        documentMock.elements.nameInput.value = '';
        documentMock.elements.emailInput.value = '';
        documentMock.elements.messageTextArea.value = '';

        // Reset script file cache and re-evaluate script so logic can pick up modified DOM (if necessary, though we just modify scrollY)
        jest.isolateModules(() => {
           require('./script.js');
        });
    });
`;

content = content.replace(/beforeEach\(\(\) => \{[\s\S]*?\}\);/, testBeforeEach);

// Remove the global require
content = content.replace(/require\('\.\/script\.js'\);/, '');

fs.writeFileSync('script.test.js', content);
