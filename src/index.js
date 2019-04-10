import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./style.css";

Modal.setAppElement("#root");
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
