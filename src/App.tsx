import { useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Accounts from "./pages/Accounts";
import Transfers from "./pages/Transfers";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export type Page =
  | "dashboard"
  | "payments"
  | "accounts"
  | "transfers"
  | "transactions"
  | "cards"
  | "profile"
  | "settings";

function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

  function handleNavigate(page: Page) {
    setCurrentPage(page);
  }

  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigate}
          />
        );

      case "payments":
        return <Payments />;

      case "accounts":
        return <Accounts />;

      case "transfers":
        return <Transfers />;

      case "transactions":
        return <Transactions />;

      case "cards":
        return <Cards />;

      case "profile":
        return <Profile />;

      case "settings":
        return <Settings />;

      default:
        return (
          <Dashboard
            onNavigate={handleNavigate}
          />
        );
    }
  }

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <div className="app-content">
        <header className="app-header">
          <div>
            <strong>
              CapitalOne Federal Credit Union
            </strong>

            <span>
              Online Banking
            </span>
          </div>

          <div className="app-header-status">
            Secure Session
          </div>
        </header>

        {renderPage()}
      </div>
    </div>
  );
}

export default App;