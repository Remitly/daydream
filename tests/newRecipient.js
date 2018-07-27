const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ slowMo: 0, headless: false });
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.setViewport({ height: 1275, width: 1395 });

    await page.keyboard.up("MetaRight");

    await page.waitForSelector("h4");

    if (await page.$eval("h4", node => node.textContent === "Continue Sending?")) {
        await page.waitForSelector(".btn-info");
        await page.click(".btn-info");
        await page.waitForSelector("h4");
    }

    await page.waitForSelector(".btn-outline");
    await page.click(".btn-outline");
    await page.waitForSelector("#send-value");
    await page.click("#send-value");
    await page.keyboard.down("Digit1");
    await page.keyboard.up("Digit1");
    await page.keyboard.down("Digit0");
    await page.keyboard.up("Digit0");
    await page.keyboard.down("Digit0");
    await page.keyboard.up("Digit0");
    await page.waitForSelector(":nth-child(3) > .content > .radio-btn-title");
    await page.click(":nth-child(3) > .content > .radio-btn-title");
    await page.waitForSelector(
      ":nth-child(3) > .content > .select-details-container > .select-details-content",
    );
    await page.click(
      ":nth-child(3) > .content > .select-details-container > .select-details-content",
    );
    await page.waitForSelector(".desktop-flow-navigation > .btn");
    await page.click(".desktop-flow-navigation > .btn");
    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.down("KeyT");
    await page.keyboard.up("KeyT");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.down("KeyE");
    await page.keyboard.down("KeyS");
    await page.keyboard.down("KeyT");
    await page.keyboard.up("KeyE");
    await page.keyboard.up("KeyS");
    await page.keyboard.up("KeyT");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.down("KeyP");
    await page.keyboard.up("KeyP");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.down("KeyE");
    await page.keyboard.down("KeyR");
    await page.keyboard.up("KeyE");
    await page.keyboard.up("KeyR");
    await page.keyboard.down("KeyS");
    await page.keyboard.down("KeyO");
    await page.keyboard.up("KeyS");
    await page.keyboard.down("KeyN");
    await page.keyboard.up("KeyO");
    await page.keyboard.up("KeyN");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.down("Tab");
    await page.keyboard.up("Tab");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.down("KeyP");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.up("KeyP");
    await page.keyboard.down("KeyU");
    await page.keyboard.up("KeyU");
    await page.keyboard.down("KeyP");
    await page.keyboard.up("KeyP");
    await page.keyboard.down("KeyP");
    await page.keyboard.up("KeyP");
    await page.keyboard.down("KeyE");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyT");
    await page.keyboard.up("KeyT");
    await page.keyboard.down("KeyE");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyE");
    await page.keyboard.down("KeyR");
    await page.keyboard.up("KeyE");
    await page.keyboard.up("KeyR");
    await page.waitForSelector(
      ":nth-child(5) > .checkbox-container > .labeled-label",
    );
    await page.click(":nth-child(5) > .checkbox-container > .labeled-label");
    await page.waitForSelector(
      ":nth-child(5) > .checkbox-container > .checkbox-icon",
    );
    await page.click(":nth-child(5) > .checkbox-container > .checkbox-icon");
    await page.waitForSelector("#address-line1");
    await page.click("#address-line1");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.down("KeyH");
    await page.keyboard.up("KeyH");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.down("KeyE");
    await page.keyboard.up("KeyE");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyL");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyL");
    await page.keyboard.down("KeyO");
    await page.keyboard.up("KeyO");
    await page.keyboard.down("Tab");
    await page.keyboard.up("Tab");
    await page.keyboard.down("ShiftRight");
    await page.keyboard.down("KeyW");
    await page.keyboard.up("ShiftRight");
    await page.keyboard.up("KeyW");
    await page.keyboard.down("KeyO");
    await page.keyboard.up("KeyO");
    await page.keyboard.down("KeyR");
    await page.keyboard.down("KeyL");
    await page.keyboard.up("KeyR");
    await page.keyboard.up("KeyL");
    await page.keyboard.down("KeyD");
    await page.keyboard.up("KeyD");
    await page.keyboard.down("Tab");
    await page.keyboard.up("Tab");
    await page.keyboard.down("ArrowDown");
    await page.waitForSelector("#subdivision");
    await page.select("#subdivision", "PH-AUR");
    await page.waitForSelector(".btn-info");
    await page.click(".btn-info");
    await page.waitForSelector(":nth-child(6) > .btn-block");
    await page.click(":nth-child(6) > .btn-block");
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
