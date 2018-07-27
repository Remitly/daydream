const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.setViewport({ height: 1275, width: 1410 });
    await page.keyboard.up("MetaRight");
    await page.waitForSelector(".btn-info");
    await page.click(".btn-info");
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
