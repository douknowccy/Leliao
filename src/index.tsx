import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "mobx-react";
import Store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import "lib-flexible";
import "./index.scss";
// var VConsole = require("vconsole");
// var vConsole = new VConsole();
console.log("Hello world");
ReactDOM.render(
  <Provider {...Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
