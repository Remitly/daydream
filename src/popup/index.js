import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import App from "./containers/App";
import "./base.css";

console.log("hello from daydream popup");
render(<App />, document.getElementById("root"));
