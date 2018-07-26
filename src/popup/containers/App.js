import React, { Component } from "react";
import App from "../components/App";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: [],
      network: [],
    };

    this.onRestart = this.onRestart.bind(this);
  }

  render() {
    return React.createElement(App, {
      ...this.props,
      ...this.state,
      onRestart: this.onRestart,
    });
  }

  componentDidMount() {
    chrome.storage.local.get("recording", ({ recording }) => {
      this.setState({ recording });
    });
    chrome.storage.local.get("network", ({ network }) => {
      this.setState({ network });
    });
  }

  onRestart() {
    chrome.browserAction.setBadgeText({ text: "" });
    chrome.runtime.reload();
    window.close();
  }
}
