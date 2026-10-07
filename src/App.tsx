import { useState } from "react";

import { BankingProvider } from "./BankingContext";
import { NotificationProvider } from "./NotificationContext";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfers from "./pages/Transfers";
import Transactions from "./pages/Transactions";
import Payments from "./pages/Payments";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Sidebar from "./components/Sidebar";
import NotificationBell from "./components/NotificationBell";

export type Page =
  | "dashboard"
  | "accounts"
  | "transfers"
  | "transactions"
  | "payments"
  | "cards"
  | "profile"
  | "settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  function handleNavigate(page: Page) {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  }

  function handleLogin() {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    setIsMobileMenuOpen(false);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
    setIsMobileMenuOpen(false);
  }

  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;

      case "accounts":
        return (
          <Accounts
            onNavigate={handleNavigate}
          />
        );

      case "transfers":
        return <Transfers />;

      case "transactions":
        return (
          <Transactions
            onNavigate={handleNavigate}
          />
        );

      case "payments":
        return <Payments />;

      case "cards":
        return (
          <Cards
            onNavigate={handleNavigate}
          />
        );

      case "profile":
        return (
          <Profile
            onNavigate={handleNavigate}
          />
        );

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  if (!isAuthenticated) {
    return (
      <NotificationProvider>
        <BankingProvider>
          <Auth onLogin={handleLogin} />
        </BankingProvider>
      </NotificationProvider>
    );
  }

  return (
    <NotificationProvider>
      <BankingProvider>
        <div className="app-layout">

          <Sidebar
            activePage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            isMobileOpen={isMobileMenuOpen}
            onMobileClose={() =>
              setIsMobileMenuOpen(false)
            }
          />

          <main className="app-main">

            <header className="app-topbar">

              <div className="app-topbar-left">

                <button
                  type="button"
                  className="mobile-menu-button"
                  aria-label="Open navigation menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() =>
                    setIsMobileMenuOpen(true)
                  }
                >
                  <span />
                  <span />
                  <span />
                </button>

                <div className="app-topbar-title">

                  <span>
                    GFB
                  </span>

                  <strong>
                    Guardian Federal Bank
                  </strong>

                </div>

              </div>

              <NotificationBell />

            </header>

            <div className="app-page-content">
              {renderPage()}
            </div>

          </main>

        </div>
      </BankingProvider>
    </NotificationProvider>
  );
}

export default App;