const fs = require("fs");
const puppeteer = require("puppeteer");
const { Polly } = require("@pollyjs/core");
const PuppeteerAdapter = require("@pollyjs/adapter-puppeteer");
const Persister = require("@pollyjs/persister");

Polly.register(PuppeteerAdapter);

const polly = new Polly("Daydream");
polly.replay();

class DaydreamPollyPersister extends Persister {
  static get name() {
    return "DaydreamReplayPersister";
  }

  findRecording(recordingId) {
    return JSON.parse(fs.readFileSync(`${__dirname}/network_log.har`, "utf8"));
  }

  saveRecording(recordingId, data) {
    throw new Error("Daydream shouldn't need to save a recording");
  }

  deleteRecording(recordingId) {
    throw new Error("Daydream shouldn't need to delete a recording");
  }
}

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    polly.configure({
      persister: DaydreamPollyPersister,
      adapters: ["puppeteer"],
      adapterOptions: {
        puppeteer: {
          page,
          requestResourceTypes: ["fetch", "xhr"],
        },
      },
    });

    await page.goto("http://localhost:3000/");
    await page.setViewport({ height: 1275, width: 1967 });
    await page.waitForSelector(".btn-info");
    await page.click(".btn-info");
    await page.waitForSelector(".btn-outline");
    await page.click(".btn-outline");
    await page.waitForSelector(".btn-info");
    await page.click(".btn-info");
    await page.waitForSelector(".inputs > :nth-child(1)");
    await page.click(".inputs > :nth-child(1)");
    await page.waitForSelector("#send-value");
    await page.click("#send-value");
    await page.waitForSelector("#send-value");
    await page.click("#send-value");
    await page.keyboard.down("Digit1");
    await page.keyboard.down("Digit2");
    await page.keyboard.down("Digit3");
    await page.keyboard.up("Digit1");
    await page.keyboard.up("Digit2");
    await page.keyboard.up("Digit3");
    await page.keyboard.down("Digit1");
    await page.keyboard.down("Digit2");
    await page.keyboard.down("Digit3");
    await page.keyboard.up("Digit1");
    await page.keyboard.up("Digit2");
    await page.keyboard.up("Digit3");
    await page.waitForSelector(":nth-child(3) > .content > .radio-btn-title");
    await page.click(":nth-child(3) > .content > .radio-btn-title");
    await page.waitForSelector(":nth-child(3) > :nth-child(3) > .content");
    await page.click(":nth-child(3) > :nth-child(3) > .content");
    await page.waitForSelector(".desktop-flow-navigation > .btn");
    await page.click(".desktop-flow-navigation > .btn");
    await page.waitForSelector(".modal-buttons > .btn-subdued");
    await page.click(".modal-buttons > .btn-subdued");
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})();
