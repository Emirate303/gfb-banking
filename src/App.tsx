import { useState } from "react";

import { NotificationProvider } from "./NotificationContext";
import { BankingProvider } from "./BankingContext";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfers from "./pages/Transfers";
import Transactions from "./pages/Transactions";
import Payments from "./pages/Payments";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

  function handleNavigate(page: Page) {
    setCurrentPage(page);
  }

  function handleSignOut() {
    setCurrentPage("dashboard");
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
        return <Profile />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <NotificationProvider>
      <BankingProvider>

        <div className="app-layout">

          <Sidebar
  activePage={currentPage}
  onNavigate={handleNavigate}
  onLogout={handleSignOut}
/>

          <main className="app-main">

            <div className="app-topbar">

              <div className="app-topbar-title">
                <span>GFB</span>

                <strong>
                  Guardian Federal Bank
                </strong>
              </div>

            </div>

            {renderPage()}

          </main>

        </div>

      </BankingProvider>
    </NotificationProvider>
  );
}

export default App;