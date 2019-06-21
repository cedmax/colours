import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./style.css";

const data = JSON.parse(document.getElementById("data").innerText);

ReactDOM.render(<App data={data} />, document.getElementById("root"));
serviceWorker.register();
