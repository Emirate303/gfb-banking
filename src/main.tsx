import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BankingProvider } from "./BankingContext";
import {
  BankingSettingsProvider,
} from "./BankingSettingsContext";
import {
  NotificationProvider,
} from "./NotificationContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <NotificationProvider>
      <BankingSettingsProvider>
        <BankingProvider>
          <App />
        </BankingProvider>
      </BankingSettingsProvider>
    </NotificationProvider>
  </React.StrictMode>
);