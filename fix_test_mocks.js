const fs = require('fs');
let content = fs.readFileSync('script.test.js', 'utf8');

// Buscamos donde se declaran los navLinksAs para tener 3 elementos y no 2
content = content.replace(/documentMock\.elements\.navLinksAs = \[new MockElement\('a'\), new MockElement\('a'\)\];/, `
documentMock.elements.navLinksAs = [new MockElement('a'), new MockElement('a'), new MockElement('a')];
documentMock.elements.navLinksAs[0].setAttribute('href', '#home');
documentMock.elements.navLinksAs[1].setAttribute('href', '#about');
documentMock.elements.navLinksAs[2].setAttribute('href', '#contact');
`);

fs.writeFileSync('script.test.js', content);
