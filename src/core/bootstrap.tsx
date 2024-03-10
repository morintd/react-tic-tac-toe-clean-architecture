import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "../tic-tac-toe/app";
import "./index.css";

export function bootstrap() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
