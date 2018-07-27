const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://deploy.int.remitly.com/apps");
    await page.setViewport({ height: 1275, width: 1395 });
    await page.waitForSelector(".form-control");
    await page.click(".form-control");
    await page.keyboard.down("KeyR");
    await page.keyboard.down("KeyE");
    await page.keyboard.down("KeyM");
    await page.keyboard.up("KeyR");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyI");
    await page.keyboard.down("KeyT");
    await page.keyboard.up("KeyM");
    await page.keyboard.up("KeyI");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyT");
    await page.keyboard.down("KeyY");
    await page.keyboard.down("KeyW");
    await page.keyboard.down("KeyE");
    await page.keyboard.up("KeyY");
    await page.keyboard.up("KeyL");
    await page.keyboard.up("KeyW");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyB");
    await page.keyboard.up("KeyB");
    await page.keyboard.down("Enter");
    await page.waitForSelector(".tooltipped-no-delay");
    await page.click(".tooltipped-no-delay");
    await page.keyboard.up("Enter");
    await page.goto(
      "https://deploy.int.remitly.com/apps/remitlyweb/domain/prod",
    );
    await page.setViewport({ height: 1275, width: 1395 });
    await page.waitForSelector(".form-select");
    await page.click(".form-select");
    await page.waitForSelector("#preview > .btn");
    await page.click("#preview > .btn");
    await page.goto("https://deploy.int.remitly.com/deploy/preview");
    await page.setViewport({ height: 1275, width: 1410 });
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
