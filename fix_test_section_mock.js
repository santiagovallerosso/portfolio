const fs = require('fs');
let content = fs.readFileSync('script.test.js', 'utf8');

// We see "0 test-id" in the console.log instead of "0 home", "800 about".
// It means the initial replacement didn't stick or there's another place sections are declared.

content = content.replace(/documentMock\.elements\.sections = \[new MockElement\('section'\), new MockElement\('section'\)\];\s*documentMock\.elements\.sections\.forEach\(s => \{\s*s\.offsetTop = 0;\s*s\.clientHeight = 500;\s*s\.getAttribute = \(attr\) => attr === 'id' \? 'test-id' : null;\s*\}\);/, '');

const newSectionsStr = `
documentMock.elements.sections = [new MockElement('section'), new MockElement('section'), new MockElement('section')];
const sectionIds = ['home', 'about', 'contact'];
documentMock.elements.sections.forEach((s, index) => {
    s.offsetTop = index * 800; // home: 0, about: 800, contact: 1600
    s.clientHeight = 800;
    s.getAttribute = (attr) => attr === 'id' ? sectionIds[index] : null;
});`;

// Buscamos donde se declaran documentMock.elements.sections
// Ya que console mostraba 2 secciones con id "test-id" y offset 0
const fallbackReplace = `documentMock.elements.sections = [new MockElement('section'), new MockElement('section')];
documentMock.elements.sections.forEach(s => {
    s.offsetTop = 0;
    s.clientHeight = 500;
    s.getAttribute = (attr) => attr === 'id' ? 'test-id' : null;
});`;

if (content.includes(fallbackReplace)) {
    content = content.replace(fallbackReplace, newSectionsStr);
} else {
    // just append it before require
    content = content.replace(/global\.FormData = jest\.fn\(\);/, 'global.FormData = jest.fn();\n' + newSectionsStr);
}

fs.writeFileSync('script.test.js', content);
