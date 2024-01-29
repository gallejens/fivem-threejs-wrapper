import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from ".";

import "./style.scss";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No root element");

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <Canvas>
      <App />
    </Canvas>
  </React.StrictMode>
);
