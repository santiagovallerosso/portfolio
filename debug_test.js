const fs = require('fs');

const content = fs.readFileSync('script.test.js', 'utf8');

console.log("Mocks length:", content.match(/navLinksAs = \[(.*?)\];/)[1].split('new MockElement').length - 1);
