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
import NotificationCenter from "./components/NotificationCenter";

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

  function handleNavigate(page: Page) {
    setCurrentPage(page);
  }

  function handleStringNavigate(page: string) {
    if (
      page === "dashboard" ||
      page === "accounts" ||
      page === "transfers" ||
      page === "transactions" ||
      page === "payments" ||
      page === "cards" ||
      page === "profile" ||
      page === "settings"
    ) {
      setCurrentPage(page);
    }
  }

  function handleLogin() {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  }

  function renderPage() {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;

      case "accounts":
        return (
          <Accounts
            onNavigate={handleStringNavigate}
          />
        );

      case "transfers":
        return <Transfers />;

      case "transactions":
        return (
          <Transactions
            onNavigate={handleStringNavigate}
          />
        );

      case "payments":
        return <Payments />;

      case "cards":
        return (
          <Cards
            onNavigate={handleStringNavigate}
          />
        );

      case "profile":
        return <Profile />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  if (!isAuthenticated) {
    return (
      <BankingProvider>
        <NotificationProvider>
          <Auth onLogin={handleLogin} />
        </NotificationProvider>
      </BankingProvider>
    );
  }

  return (
    <BankingProvider>
      <NotificationProvider>

        <div className="app-layout">

          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onSignOut={handleLogout}
          />

          <main className="app-main">

            <header className="app-topbar">

              <div className="app-topbar-title">
                <span>GFB</span>

                <strong>
                  Guardian Federal Bank
                </strong>
              </div>

              <div className="app-topbar-actions">
                <NotificationCenter />
              </div>

            </header>

            {renderPage()}

          </main>

        </div>

      </NotificationProvider>
    </BankingProvider>
  );
}

export default App;