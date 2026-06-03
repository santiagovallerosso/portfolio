const { execSync } = require('child_process');

try {
  execSync('npx jest script.test.js', { stdio: 'inherit' });
} catch (e) {
  console.log("Tests failed, let's see why.");
}
