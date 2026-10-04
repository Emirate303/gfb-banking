import { useState } from "react";

import "./App.css";

import Auth from "./pages/Auth";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
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
  /*
   * Authentication
   *
   * This intentionally starts as false.
   * Therefore, refreshing the browser returns
   * the user to the Login / Sign Up screen.
   */
  const [isAuthenticated, setIsAuthenticated] =
  useState(false);

const [customerName, setCustomerName] =
  useState("");

const [currentPage, setCurrentPage] =
  useState<Page>("dashboard");

  /*
   * Navigation handler
   */
  function handleNavigate(page: Page) {
    setCurrentPage(page);
  }
  function handleLogin(name: string) {
  localStorage.setItem(
    "gfb_authenticated",
    "true"
  );

  setCustomerName(name);

  setIsAuthenticated(true);
}
  /*
   * Render the selected banking page
   */
  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
  onNavigate={handleNavigate}
  customerName={customerName}
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

  /*
   * Show authentication screen before
   * displaying the banking application.
   */
  if (!isAuthenticated) {
    return (
     <Auth
  onLogin={(name) => {
    setIsAuthenticated(true);
    setCustomerName(name);
  }}
/>
    );
  }
  if (!isAuthenticated) {
  return (
    <Login
      onLogin={handleLogin}
    />
  );
}
  /*
   * Main banking application
   */
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
              Guardian Federal Bank
            </strong>

            <span>
              Online Banking
            </span>
          </div>

          <div className="app-header-actions">
            <div className="app-header-status">
              Secure Session
            </div>

            <button
              type="button"
              className="sign-out-button"
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentPage("dashboard");
              }}
            >
              Sign Out
            </button>
          </div>
        </header>

        {renderPage()}
      </div>
    </div>
  );
}

export default App;