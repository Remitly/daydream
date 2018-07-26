export default class Recorder {
  constructor() {
    this.recording = [];
    this.network = [];
    this.tab = null;
    this.lastUrl = null;
    this.networkPromise = new Promise(
      resolve => (this.resolveNetworkPromise = resolve),
    );
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

    chrome.runtime.onMessageExternal.addListener(this.handleExternalMessage);
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
    this.network = await this.networkPromise;
    chrome.runtime.onMessageExternal.removeListener(this.handleExternalMessage);
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

  handleExternalMessage = (request, sender, sendResponse) => {
    console.log("external message", request, sender);
    const { messageType, data } = request;
    switch (messageType) {
      case "saveHar":
        this.resolveNetworkPromise(data);
        break;
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
