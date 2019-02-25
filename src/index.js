import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Modal from "react-modal";

Modal.setAppElement("#root");
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
