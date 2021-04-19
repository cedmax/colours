import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from "./App";
import "./style.css";

const data = JSON.parse(document.getElementById("data").innerText);

ReactDOM.render(<App data={data} />, document.getElementById("root"));
serviceWorkerRegistration.register();
