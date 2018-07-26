import prettier from "prettier/standalone";
import prettierBabylon from "prettier/parser-babylon";
import React from "react";
import SyntaxHighlighter, {
  registerLanguage,
} from "react-syntax-highlighter/dist/light";
import highlightStyles from "react-syntax-highlighter/dist/styles/github";
import js from "react-syntax-highlighter/dist/languages/javascript";
import cssStyles from "./App.css";

registerLanguage("javascript", js);

export default class App extends React.Component {
  state = {
    slowMo: 0,
    headless: false,
    autoClose: false,
  };

  render() {
    const {
      onSelectTab,
      selectedTab,
      onRestart,
      recording,
      network,
    } = this.props;

    const script = getPuppeteer(recording, {
      slowMo: this.state.slowMo,
      headless: this.state.headless,
      autoClose: this.state.autoClose,
    });

    const har = JSON.stringify(network.har, null, "  ");

    function copyScript() {
      void navigator.clipboard.writeText(script);
    }

    function copyHar() {
      void navigator.clipboard.writeText(har);
    }

    function download() {
      let filenamePrefix = `daydream_${(new Date()).toISOString().slice(0, -8).replace("T", "_").replace(":", "-")}`;
      const scriptBlob = new Blob([script], {
        type: "application/javascript",
      });
      const scriptUrl = URL.createObjectURL(scriptBlob);
      chrome.downloads.download({
        url: scriptUrl,
        filename: `${filenamePrefix}/index.js`,
      });
      if (har) {
        const harBlob = new Blob([har], {
          type: "application/json",
        });
        const harUrl = URL.createObjectURL(harBlob);
        chrome.downloads.download({
          url: harUrl,
          filename: `${filenamePrefix}/network_log.har`,
        });
      }
    }

    return (
      <div>
        <p>
          <label>
            Headless{" "}
            <input
              type="checkbox"
              name="headless"
              checked={this.state.headless}
              onChange={this.handleHeadlessChange}
            />
          </label>
          <br />
          <label>
            Close after running{" "}
            <input
              type="checkbox"
              name="close-after"
              checked={this.state.autoClose}
              onChange={this.handleAutocloseChange}
            />
          </label>
          <br />
          <label>
            Slow down speed{" "}
            <input
              type="range"
              name="slowdown"
              value={this.state.slowMo}
              min={0}
              max={1000}
              step={25}
              onChange={this.handleSlowdownChange}
            />
          </label>{" "}
          {this.state.slowMo}ms
        </p>

        <p>
          <button onClick={download}>Download</button>
          <button onClick={onRestart}>Reset</button>
        </p>

        <SyntaxHighlighter language="javascript" style={highlightStyles}>
          {script}
        </SyntaxHighlighter>
        <button onClick={copyScript}>Copy</button>

        {har && (
          <div>
            <SyntaxHighlighter language="javascript" style={highlightStyles}>
              {har}
            </SyntaxHighlighter>
            <button onClick={copyHar}>Copy</button>
          </div>
        )}
      </div>
    );
  }

  handleHeadlessChange = ev => {
    this.setState({ headless: ev.target.checked });
  };

  handleSlowdownChange = ev => {
    this.setState({ slowMo: parseInt(ev.target.value) });
  };

  handleAutocloseChange = ev => {
    this.setState({ autoClose: ev.target.checked });
  };
}

function getPuppeteer(recording, options) {
  const { slowMo, headless, autoClose } = options;
  return prettier.format(
    `
const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch(${JSON.stringify({
      slowMo: slowMo || undefined,
      headless: headless && undefined,
    })})
    const page = await browser.newPage()
        
    ${recording
      .map(record => {
        const { action, url, selector, value } = record;
        switch (action) {
          case "goto":
            return `await page.goto('${url}');`;
          case "viewport":
            return `await page.setViewport(${JSON.stringify(record.config)});`;
          case "keydown":
            return `await page.keyboard.down('${value}');`;
          case "keyup":
            return `await page.keyboard.up('${value}');`;
          case "keypress":
            return `await page.keyboard.press('${value}');`;
          case "click":
            return `await page.waitForSelector('${selector}'); await page.click('${selector}');`;
          case "change":
          return `await page.waitForSelector('${selector}'); await page.select('${selector}', '${value}');`;
          case "reload":
            return `await page.reload();`;
          case "focus":
            return `await page.waitForSelector('${selector}'); await page.focus('${selector}');`;
          case "blur":
            return `await page.focus('body');`;
          case "selection":
            return `await page.waitForSelector('${selector}');
            if ((await page.$eval('${selector}', node => node.textContent)) !== ${JSON.stringify(value)}) {
              throw new Error("${selector}'s content doesn't match expected");
            }`;
          default:
            throw new Error(`unsupported action ${action}`);
        }
      })
      .join("\n")}
    ${autoClose ? `await browser.close();` : ""}
  } catch (err) {
    console.log("Test failed");
    console.error(err);
  }
})()`,
    {
      parser: "babylon",
      plugins: [prettierBabylon],
      trailingComma: "all",
    },
  );
}
