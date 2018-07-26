export default class Recorder {
  constructor() {
    this.recording = [];
    this.network = [];
    this.tab = null;
    this.lastUrl = null;
  }

  async start() {
    chrome.webNavigation.onCompleted.addListener(
      this.handleCompletedNavigation,
    );
    chrome.webNavigation.onCommitted.addListener(
      this.handleCommittedNavigation,
    );
    chrome.runtime.onMessage.addListener(this.handleMessage);

    this.tab = await new Promise(resolve => {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        resolve(tabs[0]);
      });
    });
  }

  async stop() {
    chrome.tabs.sendMessage(this.tab.id, { action: "stop" });
    chrome.webNavigation.onCommitted.removeListener(
      this.handleCommittedNavigation,
    );
    chrome.webNavigation.onCompleted.removeListener(
      this.handleCompletedNavigation,
    );
    chrome.runtime.onMessage.removeListener(this.handleMessage);
  }

  handleCompletedNavigation = ({ url, frameId }) => {};

  handleCommittedNavigation = ({ transitionQualifiers, url, tabId }) => {
    this.handleMessage({
      messageType: "userInteraction",
      data: { action: "goto", url },
    });
    if (tabId === this.tab.id) {
      chrome.tabs.executeScript(this.tab.id, {
        file: "content-script.js",
        runAt: "document_start",
      });
      chrome.browserAction.setIcon({ path: "./images/icon-recording.png" });
    }
  };

  handleMessage = ({ messageType, data }) => {
    switch (messageType) {
      case "userInteraction":
        if (data.action === "url") {
          this.lastUrl = data.value;
        } else {
          this.recording.push(data);
        }
        break;
    }
  };
}
