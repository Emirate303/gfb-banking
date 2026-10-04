import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./App.css";

import { BankingProvider } from "./BankingContext";
import {
  BankingSettingsProvider,
} from "./BankingSettingsContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BankingProvider>
      <BankingSettingsProvider>
        <App />
      </BankingSettingsProvider>
    </BankingProvider>
  </React.StrictMode>
);