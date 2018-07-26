import Recorder from "./recorder";

export default class Daydream {
  constructor() {
    this.isRunning = false;
    this.recorder = new Recorder();
  }

  boot() {
    console.log("hello from daydream");
    chrome.browserAction.onClicked.addListener(async () => {
      if (this.isRunning) {
        await this.recorder.stop();
        chrome.storage.local.set({ recording: this.recorder.recording });
        chrome.storage.local.set({ network: this.recorder.network });
        chrome.browserAction.setIcon({ path: "./images/icon.png" });
        chrome.browserAction.setPopup({ popup: "index.html" });
        chrome.browserAction.setBadgeText({ text: "1" });
      } else {
        await this.recorder.start();
        chrome.browserAction.setIcon({ path: "./images/icon-pending.png" });
      }
      this.isRunning = !this.isRunning;
    });
  }
}
