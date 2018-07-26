import { Polly } from "@pollyjs/core";
import FetchAdapter from "@pollyjs/adapter-fetch";
import { DaydreamPollyPersister } from "./custom-persister";

console.log("hello from daydream setup script");

const polly = new Polly("Daydream", {
  adapters: [FetchAdapter],
  persister: DaydreamPollyPersister,
  // logging: true,
});

polly.record();

window.__daydream_stop_recording = function stop() {
  polly.stop();
};

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

console.log("setup script complete");

chrome.runtime.sendMessage("fbdkcimbgmagndmffloohnmilekglfaf", {
  msg: "setup script complete",
});
