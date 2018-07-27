const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ sloMo: 100, headless: false });
    const page = await browser.newPage();

    await page.goto(
      "https://www.w3.org/TR/DOM-Level-3-Events/#webidl-events-Event",
    );
    await page.setViewport({ height: 1020, width: 1116 });
    await page.waitForSelector(".u-url");
    await page.click(".u-url");
    await page.goto("https://www.w3.org/TR/2016/WD-uievents-20160804/");
    await page.setViewport({ height: 1020, width: 1116 });
    await page.waitForSelector(".copyright > :nth-child(2) > abbr");
    await page.click(".copyright > :nth-child(2) > abbr");
    await page.goto("https://www.w3.org/");
    await page.setViewport({ height: 1020, width: 1116 });
    await page.waitForSelector(".text");
    await page.click(".text");
    await page.keyboard.down("KeyH");
    await page.keyboard.down("KeyE");
    await page.keyboard.up("KeyH");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyL");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyL");
    await page.keyboard.down("KeyO");
    await page.keyboard.up("KeyO");
    await page.keyboard.down("Enter");
    await page.waitForSelector("#search-submit");
    await page.click("#search-submit");
    await page.keyboard.up("Enter");
    await page.goto(
      "https://duckduckgo.com/?q=site:w3.org+hello&search-submit=",
    );
    await page.setViewport({ height: 1275, width: 1410 });
    await page.goto("https://duckduckgo.com/post2.html");
    await page.setViewport({ height: 1275, width: 1410 });
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
