console.log("hello from daydream setup script");

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
