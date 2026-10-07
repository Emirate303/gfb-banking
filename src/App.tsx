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
  /*
   * The app intentionally starts logged out.
   * Refreshing the browser therefore returns
   * the user to the GFB Login / Sign Up screen.
   */
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

  function handleNavigate(page: Page) {
    setCurrentPage(page);
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
        return <Accounts />;

      case "transfers":
        return <Transfers />;

      case "transactions":
        return <Transactions />;

      case "payments":
        return <Payments />;

      case "cards":
        return <Cards />;

      case "profile":
        return <Profile />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  /*
   * LOGIN / SIGN UP
   */
  if (!isAuthenticated) {
    return (
      <BankingProvider>
        <NotificationProvider>
          <Auth onLogin={handleLogin} />
        </NotificationProvider>
      </BankingProvider>
    );
  }

  /*
   * MAIN GFB BANKING APPLICATION
   */
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

  <div className="app-topbar">

    <div className="app-topbar-title">
      <span>
        GFB
      </span>

      <strong>
        Guardian Federal Bank
      </strong>
    </div>

    <NotificationBell />

  </div>

  {renderPage()}

</main>

        </div>

      </NotificationProvider>
    </BankingProvider>
  );
}

export default App;