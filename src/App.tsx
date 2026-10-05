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

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  function handleNavigate(page: Page) {
    setCurrentPage(page);
    setIsMenuOpen(false);
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

      {/* GFB NAVIGATION MENU */}

      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={isMenuOpen}
        onClose={() =>
          setIsMenuOpen(false)
        }
      />

      {/* MAIN APPLICATION */}

      <div className="app-content">

        {/* THREE-LINE MENU BUTTON */}

        <button
          type="button"
          className="gfb-menu-button"
          onClick={() =>
            setIsMenuOpen(true)
          }
          aria-label="Open navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* TOP HEADER */}

        <header className="app-header">

          <div className="app-header-brand">

            <strong>
              Guardian Federal Bank
            </strong>

            <span>
              GFB Online Banking
            </span>

          </div>

          <div className="app-header-status">
            <span className="header-secure-dot"></span>
            Secure Session
          </div>

        </header>

        {/* CURRENT PAGE */}

        {renderPage()}

      </div>

    </div>
  );
}

export default App;