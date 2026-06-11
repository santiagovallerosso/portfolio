const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  // Configurar dummy video
  fs.writeFileSync('mivideo.mp4', '');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.route('**/*', route => {
      const url = route.request().url();
      if (url.includes('via.placeholder') || url.includes('youtube') || url.includes('font-awesome')) {
          route.abort();
      } else {
          route.continue();
      }
  });

  await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'networkidle' });

  const videoVisible = await page.isVisible('#hero-bg-video');
  console.log("Is video visible to Playwright?", videoVisible);

  const videoBox = await page.locator('#hero-bg-video').boundingBox();
  console.log("Video bounding box:", videoBox);

  const overlayBox = await page.locator('.hero-overlay').boundingBox();
  console.log("Overlay bounding box:", overlayBox);

  const titleBox = await page.locator('.hero-cinematic-content').boundingBox();
  console.log("Title bounding box:", titleBox);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
