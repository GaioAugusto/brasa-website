import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./aws";
import { LocaleProvider } from "./contexts/Locale";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
);

reportWebVitals();
