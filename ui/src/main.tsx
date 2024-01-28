import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

import "./style.scss";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No root element");

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <div className='wrapper'>
      <Canvas>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
