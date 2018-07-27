const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.setViewport({ height: 1275, width: 1521 });
    await page.keyboard.up("MetaRight");
    await page.waitForSelector(
      ":nth-child(3) > .content > .titled-stacked-content",
    );
    await page.click(":nth-child(3) > .content > .titled-stacked-content");
    await page.waitForSelector(".btn-info");
    await page.click(".btn-info");
    await page.waitForSelector("#extra-destinations");
    await page.click("#extra-destinations");
    await page.waitForSelector("#extra-destinations");
    await page.select(
      "#extra-destinations",
      "0afdc6cd6121ec190b21970682738400",
    );
    await page.waitForSelector(".desktop-flow-navigation > .btn");
    await page.click(".desktop-flow-navigation > .btn");
    await page.waitForSelector(
      ":nth-child(2) > .summary-section-title > .btn-blank",
    );
    await page.click(":nth-child(2) > .summary-section-title > .btn-blank");
    await page.waitForSelector("#send-value");
    await page.click("#send-value");
    await page.waitForSelector(".inputs > .field-focused");
    if (
      (await page.$eval(
        ".inputs > .field-focused",
        node => node.textContent,
      )) !== "EUR"
    ) {
      throw new Error(
        ".inputs > .field-focused's content doesn't match expected",
      );
    }
    await page.keyboard.down("Digit3");
    await page.keyboard.up("Digit3");
    await page.waitForSelector("#send-value");
    await page.click("#send-value");
    await page.keyboard.down("Digit3");
    await page.keyboard.up("Digit3");
    await page.waitForSelector(":nth-child(1) > .screen-header > h4");
    await page.click(":nth-child(1) > .screen-header > h4");
    await page.waitForSelector(":nth-child(1) > .screen-header > h4");
    await page.click(":nth-child(1) > .screen-header > h4");
    await page.waitForSelector(":nth-child(1) > .screen-header > h4");
    await page.click(":nth-child(1) > .screen-header > h4");
    await page.waitForSelector(".amount-entry-screen > :nth-child(1)");
    // if (
    //   (await page.$eval(
    //     ".amount-entry-screen > :nth-child(1)",
    //     node => node.textContent,
    //   )) !==
    //   "Send Money to the PhilippinesYou send€They receive₱ EUR PHPUSDdropdown-arrowFunds transferred immediatelyPay with debit/credit card1 EUR = 62.10 PHP€4.49 fee"
    // ) {
    //   throw new Error(
    //     ".amount-entry-screen > :nth-child(1)'s content doesn't match expected",
    //   );
    // }
    await page.waitForSelector(".desktop-flow-navigation > .btn");
    await page.click(".desktop-flow-navigation > .btn");
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
