import SelectorGenerator from "css-selector-generator";

console.log("hello from daydream content script");

const scriptTag = document.createElement("script");
// TODO: add "script.js" to web_accessible_resources in manifest.json
scriptTag.src = chrome.extension.getURL("setup-script.js");
scriptTag.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(scriptTag);

const selectorGenerator = new SelectorGenerator();

selectorGenerator.setOptions({ selectors: ["id", "class", "tag", "nthchild"] });

function record(data) {
  chrome.runtime.sendMessage({
    messageType: "userInteraction",
    data,
  });
}

record({
  action: "viewport",
  config: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    deviceScaleFactor: window.screen.devicePixelRatio,
  },
});

function handleKey(ev) {
  record({
    selector: selectorGenerator.getSelector(ev.target),
    value: ev.code,
    action: ev.type,
  });
}

function handleClick(ev) {
  if (ev.target.href) {
    record({
      action: "url",
      value: ev.target.href,
    });
  }
  record({
    selector: selectorGenerator.getSelector(ev.target),
    value: ev.target.value,
    action: ev.type,
  });
}

function handleChange(ev) {
  if (ev.target.tagName === "SELECT") {
    record({
      selector: selectorGenerator.getSelector(ev.target),
      value: ev.target.value,
      action: ev.type,
    });
  }
}

function handleFocus(ev) {
  record({
    selector: selectorGenerator.getSelector(ev.target),
    action: ev.type,
  });
}

function handleBlur(ev) {
  record({
    selector: selectorGenerator.getSelector(ev.target),
    action: ev.type,
  });
}

let selectionTimeout;
function handleSelection(ev) {
  clearTimeout(selectionTimeout);
  selectionTimeout = setTimeout(() => {
    const selection = getSelection()
    if (selection.toString()) {
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);
        let container = range.commonAncestorContainer;
        if (!container.tagName) {
          container = container.parentElement;
        }
        record({
          action: "selection",
          selector: selectorGenerator.getSelector(container),
          value: container.textContent,
        });
        const originalColor = container.style.backgroundColor;
        const originalTransition = container.style.transition;
        container.style.backgroundColor = "red";
        setTimeout(() => {
          container.style.WebkitTransition = "background-color 2s";
          container.style.backgroundColor = originalColor;
          setTimeout(() => {
            container.style.transition = originalTransition;
          }, 1000);
        }, 10);
      }
      selection.removeAllRanges();
    }
  }, 500);
}

// hack!
const overriddenStop = Event.prototype.stopPropagation;
Event.prototype.stopPropagation = function() {
  console.log("stopPropagation called!", this);
  this._propagationStopped = true;
  overriddenStop.apply(this, arguments);
};
const overriddenStopImmediate = Event.prototype.stopImmediatePropagation;
Event.prototype.stopImmediatePropagation = function() {
  console.log("stopImmediatePropagation called!", this);
  this._propagationStopped = true;
  overriddenStopImmediate.apply(this, arguments);
};

document.addEventListener("keydown", handleKey);
// document.addEventListener('keypress', handleKey); // don't want to duplicate this with keydown
document.addEventListener("keyup", handleKey);
document.addEventListener("click", handleClick);
document.addEventListener("focus", handleFocus);
document.addEventListener("blur", handleBlur);
document.addEventListener("change", handleChange);
document.addEventListener("selectionchange", handleSelection);

console.log("content scripts started");
