import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/main.scss";
import "./css/dark-leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
