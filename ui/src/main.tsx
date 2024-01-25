import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No root element");

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
